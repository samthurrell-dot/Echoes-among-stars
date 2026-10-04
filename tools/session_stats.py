#!/usr/bin/env python3
"""
Record one working session in diary/stats/sessions.csv.

What it measures
  - Models and tokens: read from the Claude Code session transcript(s) on this
    machine (~/.claude/projects/*/*.jsonl). Only Claude Code sessions have these;
    chats in the Claude app don't expose token counts, so log those with --no-tokens.
  - How much changed: git diff between the last logged commit and HEAD
    (all files, and the game/ folder on its own).
  - Game size: a snapshot of game/game_data.js (scenes, clues, choices, words...).

Typical use, at the end of a session after committing:
  python3 tools/session_stats.py --summary "Wrote Day 2 comms room scene"

Options
  --since / --until   ISO times (UTC) bounding which transcript replies count.
                      Default: since the previous row's end time, until now.
  --from-commit       Commit to diff from (default: previous row's commit).
  --commit            Commit to measure at (default: HEAD).
  --no-tokens         Don't read transcripts (e.g. work done in the Claude app).
  --model             Override/label the model when tokens aren't available.
  --dry-run           Print the row without saving it.
"""
import argparse, csv, glob, json, os, subprocess, sys, datetime as dt

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CSV_PATH = os.path.join(ROOT, "diary", "stats", "sessions.csv")
FIELDS = ["date", "end_utc", "commit", "summary", "models", "replies",
          "output_tokens", "fresh_input_tokens", "cache_read_tokens",
          "files_changed", "lines_added", "lines_removed", "game_lines_changed",
          "scenes", "clues", "location_events", "choice_options", "ingame_words",
          "tokens_per_line_changed"]

def sh(*args):
    return subprocess.run(args, cwd=ROOT, capture_output=True, text=True, check=True).stdout.strip()

def parse_time(s):
    return dt.datetime.fromisoformat(s.replace("Z", "+00:00")) if s else None

def read_rows():
    if not os.path.exists(CSV_PATH):
        return []
    with open(CSV_PATH, newline="", encoding="utf-8") as f:
        return list(csv.DictReader(f))

def token_usage(since, until):
    """Sum usage per model across all local transcripts, de-duplicated by message id."""
    seen, models, totals, replies = set(), {}, {"output": 0, "fresh_in": 0, "cache_read": 0}, 0
    for path in glob.glob(os.path.expanduser("~/.claude/projects/*/*.jsonl")):
        with open(path, encoding="utf-8", errors="replace") as f:
            for line in f:
                try:
                    d = json.loads(line)
                except ValueError:
                    continue
                m = d.get("message")
                if not isinstance(m, dict) or not m.get("usage"):
                    continue
                mid = m.get("id") or d.get("uuid")
                if mid in seen:
                    continue
                t = parse_time(d.get("timestamp"))
                if t and ((since and t <= since) or (until and t > until)):
                    continue
                seen.add(mid)
                u = m["usage"]
                replies += 1
                model = m.get("model") or "unknown"
                models[model] = models.get(model, 0) + 1
                totals["output"] += u.get("output_tokens", 0) or 0
                totals["fresh_in"] += (u.get("input_tokens", 0) or 0) + (u.get("cache_creation_input_tokens", 0) or 0)
                totals["cache_read"] += u.get("cache_read_input_tokens", 0) or 0
    return models, totals, replies

def diff_stats(base, head, path=None):
    args = ["git", "diff", "--numstat", base, head] if base else ["git", "show", "--numstat", "--format=", head]
    args += ["--", path] if path else ["--", ".", ":(exclude)diary/stats"]
    added = removed = files = 0
    for line in sh(*args).splitlines():
        parts = line.split("\t")
        if len(parts) < 3:
            continue
        files += 1
        if parts[0] != "-":
            added += int(parts[0]); removed += int(parts[1])
    return files, added, removed

def game_metrics(commit):
    src = sh("git", "show", f"{commit}:game/game_data.js")
    js = r"""
const vm=require('vm');const c={};vm.runInNewContext(require('fs').readFileSync(0,'utf8')+';this.G=GAME_DATA',c);const G=c.G;
let words=0,choices=0;
const walk=n=>{if(!n||typeof n!=='object')return;if(Array.isArray(n)){n.forEach(walk);return;}
 if(typeof n.text==='string'&&['dialogue','narration','thought'].includes(n.type))words+=n.text.replace(/<[^>]+>/g,' ').split(/\s+/).filter(Boolean).length;
 if(n.type==='choice'&&Array.isArray(n.options))choices+=n.options.length;
 Object.values(n).forEach(v=>{if(v&&typeof v==='object')walk(v)});};
Object.values(G.scenes).forEach(s=>walk(s.nodes));
const ev=Object.values(G.locationEvents||{}).reduce((a,b)=>a+b.length,0);
console.log(JSON.stringify({scenes:Object.keys(G.scenes).length,clues:Object.keys(G.clues).length,location_events:ev,choice_options:choices,ingame_words:words}));
"""
    out = subprocess.run(["node", "-e", js], input=src, capture_output=True, text=True, check=True).stdout
    return json.loads(out)

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--summary", required=True)
    ap.add_argument("--since"); ap.add_argument("--until")
    ap.add_argument("--from-commit"); ap.add_argument("--commit", default="HEAD")
    ap.add_argument("--no-tokens", action="store_true"); ap.add_argument("--model")
    ap.add_argument("--dry-run", action="store_true")
    a = ap.parse_args()

    rows = read_rows()
    prev = rows[-1] if rows else None
    head = sh("git", "rev-parse", "--short", a.commit)
    base = a.from_commit or (prev["commit"] if prev else None)
    since = parse_time(a.since) or (parse_time(prev["end_utc"]) if prev else None)
    until = parse_time(a.until) or dt.datetime.now(dt.timezone.utc)

    if a.no_tokens:
        models, totals, replies = ({a.model: 0} if a.model else {}), None, ""
    else:
        models, totals, replies = token_usage(since, until)

    files, added, removed = diff_stats(base, head)
    _, g_add, g_rem = diff_stats(base, head, "game/")
    gm = game_metrics(head)
    changed = added + removed

    row = {
        "date": until.astimezone().strftime("%Y-%m-%d"),
        "end_utc": until.strftime("%Y-%m-%dT%H:%M:%SZ"),
        "commit": head, "summary": a.summary,
        "models": "; ".join(f"{k} ({v})" if v else k for k, v in models.items()) or (a.model or "not recorded"),
        "replies": replies,
        "output_tokens": totals["output"] if totals else "",
        "fresh_input_tokens": totals["fresh_in"] if totals else "",
        "cache_read_tokens": totals["cache_read"] if totals else "",
        "files_changed": files, "lines_added": added, "lines_removed": removed,
        "game_lines_changed": g_add + g_rem,
        **gm,
        "tokens_per_line_changed": round(totals["output"] / changed, 1) if totals and changed else "",
    }

    if a.dry_run:
        print(json.dumps(row, indent=1)); return
    os.makedirs(os.path.dirname(CSV_PATH), exist_ok=True)
    new = not os.path.exists(CSV_PATH)
    with open(CSV_PATH, "a", newline="", encoding="utf-8") as f:
        w = csv.DictWriter(f, fieldnames=FIELDS)
        if new:
            w.writeheader()
        w.writerow(row)
    print(f"Logged: {row['summary']} | {row['models']} | {row['output_tokens']} output tokens | "
          f"{files} files, +{added}/-{removed} lines | {gm['scenes']} scenes, {gm['ingame_words']} words")

if __name__ == "__main__":
    sys.exit(main())
