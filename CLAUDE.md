# Echoes Among the Stars — Working Notes for Claude

## What this project is

A narrative-driven detective visual novel built as a web page (plain HTML/JS, no frameworks, no build step). The player is Amelia Drake, a detective investigating the murder of Dr. Marcus Rourke aboard the Valkyrie-7 research station orbiting Europa. The game runs from Day 0 (linear visual novel: arrival and murder discovery) through Day 5 (free investigation, then a final confrontation). Two major endings: Surface (accuse Shaw) and Conspiracy (expose Lawson), plus an optional Izzy reunion "S-rank" ending inside the conspiracy path.

The developer (Sam) has no game design or programming background and mostly works from the Claude mobile app. He generates art with Leonardo AI. All code, narrative design and systems design is done with Claude. **Explain technical decisions in plain language, and whenever you change the code, say what changed and why.**

## How Sam works with this repo

- This GitHub repo is the single source of truth. Work on a branch and open a pull request unless Sam says to commit straight to `main`.
- The site is published with GitHub Pages from `main`. Anything merged to `main` goes live within a couple of minutes at https://samthurrell-dot.github.io/Echoes-among-stars/ — so after a change, give Sam the link to the page that changed so he can check it on his phone.
- The repo is **public**, on purpose. Spoilers are fine in here.
- Keep files small and readable on GitHub's mobile view. Prefer Markdown for new notes and documents.

## Repo layout

```
echoes-among-stars/
├── index.html                ← Front page of the published site (links to everything)
├── CLAUDE.md                 ← This file
├── README.md                 ← Plain-language guide for Sam
├── diary/                    ← DEV DIARY: README.md is the diary; index.html shows it on the website
│   ├── README.md             ← The only file to edit when adding an entry
│   ├── index.html            ← Renders README.md (don't put diary text in here)
│   ├── img/                  ← Screenshots for the diary (JPEG, 1024px wide)
│   └── vendor/marked.min.js  ← Markdown library used by index.html
├── game/                     ← THE GAME (current build)
│   ├── index.html            ← Engine: UI, rendering, state, all systems
│   ├── game_data.js          ← ALL content: scenes, characters, clues, events, trust text
│   └── assets/images/
│       ├── Characters/       ← Portrait PNGs (transparent bg, ~600×900) — empty: the art was lost in Oct 2026
│       └── Scenes/           ← Background JPGs (16:9, ~1920×1080) — empty: the art was lost in Oct 2026
├── design/                   ← Design documents and spreadsheets
│   ├── ECHOES AMONG THE STARS-Game Design Document 2 Feb 2025.docx
│   ├── Echoes_Technical_Design_Guide.docx
│   ├── Echoes_Systems_Update_v2.docx
│   ├── Echoes_Clue_System_v2.xlsx   ← The clue map. Follow this when writing new days.
│   ├── Echoes_Clue_System_v1.xlsx   ← Older version, kept for reference
│   ├── Scene tracker.xlsx
│   ├── authorial-voice-spec-v0.6.md ← How the prose should sound
│   ├── echoes_clue_dependency_chain.html            ← Original widget files
│   ├── echoes_red_herrings_and_information_economy.html
│   └── view-*.html           ← Stand-alone viewer copies of the two widgets, for the website
├── characters/               ← Character sheets (.docx)
├── writing/scenes/           ← Draft prose scenes (Markdown), e.g. Shaw interview, Shaw logs
├── prototypes/               ← Earlier standalone builds (not the current game)
│   └── damaged/              ← Two prototypes with unrecoverable file damage — reference only, they don't run
└── trailer/                  ← Announce-trailer script, rebuild notes and reference frames
```

Images: `config.imagePath` in `game/game_data.js` is `"assets/images/"` (relative to `game/`). The engine adds `Characters/` or `Scenes/` plus the filename. The game runs without images (starfield fallback for backgrounds, portraits hidden). When Sam uploads art, it goes in `game/assets/images/Characters/` and `game/assets/images/Scenes/` with filenames that match `game_data.js` exactly (case-sensitive on the web).

## Architecture — the two game files

**game/index.html** — The engine. All CSS, HTML structure and JavaScript for: VN-mode playback, investigation loop (map, actions, events), daily report, evidence board, smart-folio, modals, save/load, typewriter text, HUD. Rarely needs editing unless adding a new gameplay system.

**game/game_data.js** — All content. Defines a single `GAME_DATA` object:

| Section | Purpose |
|---------|---------|
| `config` | Title, start scene, actions per day, image path, initial state (trust values, stats, empty collections) |
| `characters` | 15 characters with name, role, accent colour, portrait filenames |
| `backgrounds` | Shorthand keys → background image filenames |
| `locations` | 9 station locations for the investigation map |
| `clues` | 36 clue definitions (name, description, category) |
| `trustAssessments` | Smart-folio text bands for 7 key characters |
| `locationEvents` | Day-gated events triggered when visiting locations |
| `scenes` | All narrative scenes — the bulk of the content |

## The two game modes

**VN mode** (`state.mode === "vn"`) — Day 0. Linear scene playback: dialogue → choices → branching → journal. No action economy. Scenes chain via `goto`.

**Investigation mode** (`state.mode === "investigation"`) — Days 1-5. Daily cycle: morning briefing → 3 location visits via map → daily report → next day. When a scene ends, the engine returns to the investigation hub, or triggers the report if actions are used up.

The switch happens via a `{ type: "start_investigation" }` node at the end of Day 0's murder discovery scene. That node also moves the day counter to Day 1.

## Scene node types

Scenes are arrays of nodes. The engine steps through them in order.

| Node | Behaviour | Waits? |
|------|-----------|--------|
| `{ type: "bg", key: "command_center" }` | Change background | No |
| `{ type: "portrait", character: "shaw", variant: "default" }` | Show character portrait | No |
| `{ type: "dialogue", character: "shaw", text: "..." }` | Character speaks (name + portrait + typewriter) | Yes |
| `{ type: "narration", text: "..." }` | Descriptive italic serif text, no name | Yes |
| `{ type: "thought", text: "..." }` | Amelia's inner monologue (italic, her name shown) | Yes |
| `{ type: "choice", options: [...] }` | Player picks from buttons | Yes |
| `{ type: "goto", scene: "scene_id" }` | Jump to another scene | No |
| `{ type: "flag", key: "name", value: true }` | Set a story flag | No |
| `{ type: "check", flag: "name", ifTrue: "scene", ifFalse: "scene" }` | Conditional branch | No |
| `{ type: "effect", effects: { trust: { shaw: 5 }, insight: 3 } }` | Apply stat changes silently | No |
| `{ type: "clue", id: "shaw_badge_log" }` | Collect a clue (toast notification) | No |
| `{ type: "journal", entry: "..." }` | Add journal entry silently | No |
| `{ type: "modal", title: "...", content: "html...", sender: "..." }` | Open popup (emails, docs) | Yes |
| `{ type: "start_investigation" }` | Switch to investigation mode (and to Day 1) | No |
| `{ type: "open_map" }` | Open the map | Yes |
| `{ type: "end_day" }` | Trigger daily report → next day | Yes |

## Choice options — full format

```javascript
{
  text: "\"I found something in the manifests...\"",      // Button label (required)
  condition: { hasClue: "dup_manifest", trustMin: { emily: 40 } },  // Visibility gate
  leverageTag: "leverage",                                 // Small blue tag on button
  effects: { trust: { emily: 8 }, shawGuilt: -5 },        // Stat changes
  flag: { traded_manifest: true },                         // Set flag(s)
  journal: "Traded the manifest anomaly for comms access.",// Journal entry
  clue: "comms_restricted",                                // Collect a clue
  modal: { title: "...", content: "...", sender: "..." },  // Show popup first
  dialogue: [ { type: "dialogue", ... }, ... ],            // Follow-up lines
  goto: "next_scene_id",                                   // Scene transition after dialogue
  goto_fn: () => { ... }                                   // Programmatic action (investigation hub only)
}
```

Condition fields: `hasClue`, `hasFlag`, `noFlag`, `trustMin: { charId: N }`, `trustMax`, `insightMin`, `shawGuiltMax`, `dayMin`.

Note: `shawGuilt` is a top-level effect (`effects: { shawGuilt: -5 }`). If it is put inside `trust: {...}` the engine ignores it — some Day 1 choices currently do this and should be fixed when that content is next touched.

## Location events — how the investigation map works

Defined in `GAME_DATA.locationEvents`, keyed by location ID. Each location has an array of events. The engine plays the **first** event that passes all conditions, so put stricter (higher-trust) events before fallbacks.

```javascript
locationEvents: {
  comms_room: [
    { id: "d1_comms_emily", day: 1, once: true, scene: "d1_comms_room",
      requires: { trustMin: { emily: 50 } } },        // High-trust version first
    { id: "d1_comms_locked", day: 1, once: true, scene: "d1_comms_locked",
      requires: null }                                  // Fallback
  ]
}
```

Event gates: `day` (exact), `dayMin`/`dayMax` (range), `once` (sets flag `evt_[id]`), `requires.flag`, `requires.noFlag`, `requires.clue`, `requires.trustMin`, `requires.shawGuiltMax`.

## The true story (SPOILER — needed for writing)

1. Rourke and Shaw had a lifelong rivalry from school
2. Rourke assaulted Shaw's fiancée Isabelle "Izzy" Cole, then arranged her "death" — Shaw was told she died
3. On Valkyrie-7, Rourke threatened Lawson's command, lobbying his family to replace her
4. Lawson discovered Izzy was actually alive on a remote station
5. Lawson fabricated "proof" of a Rourke–Izzy affair and showed it to Shaw — a lie designed to push Shaw into confronting Rourke
6. Shaw, enraged, confronted Rourke in the lab and killed him
7. Shaw tried to cover his tracks; Lawson knew this would happen
8. Lawson locked down the station and called in Amelia, wanting the investigation to find Shaw guilty without discovering her manipulation

## The four evidence layers

| Layer | Name | Count | Purpose | Ending |
|-------|------|-------|---------|--------|
| 1 | Surface | 7 clues (S1-S7) | Prove Shaw killed Rourke | Surface ending (4+ needed) |
| 2 | Doubt | 7 clues (D1-D7) | Question the simple answer | Opens conspiracy path (3+ needed) |
| 3 | Conspiracy | 6 clues (C1-C6) | Expose Lawson's manipulation | Conspiracy ending (C1 required + 2 more) |
| 4 | Redemption | 4 clues (R1-R4) | Find Izzy, enable reunion | Izzy reunion (all 4 + Emily 80+ + Shaw 60+) |
| — | Red herrings | 8 clues | False leads that teach character | Replay value |
| — | Noise | 4 clues | Atmosphere and pressure | Immersion |

**Critical path bottleneck:** Emily Anderson gates most conspiracy and redemption clues. The player MUST invest in Emily's trust to reach the deeper endings. This is by design.

**C1 (Forged Comm Log) is the cornerstone** — required for the conspiracy ending. Needs Emily trust 65+ and prerequisites D2 + D3.

## Ending requirements summary

- **Surface:** 4+ Layer 1 clues, fewer than 3 doubt clues, no conspiracy clues. Feels hollow if doubt clues were collected.
- **Conspiracy:** 4+ L1 + 3+ L2 + C1 (required) + 2 more C-layer. Shaw testimony (C5) strongly recommended. Insight ≥60.
- **Izzy Reunion:** All conspiracy requirements + R1→R4 chain. Emily trust ≥80, Shaw trust ≥60, Shaw guilt ≤30.
- **Day 5 design:** Player chooses to investigate (1-2 more actions) OR present their case.

## Information economy — clues as currency

Clues have three uses beyond solving the case:
1. **Daily report** — choose what to share with Lawson. Full report = trust gain but suspects adjust. Withholding = protects the investigation but Lawson loses patience. Reporting a red herring buys time but is risky.
2. **Leverage in dialogue** — holding a clue unlocks trade/confront/bond options. E.g. trade D4 (manifest) for access to comms logs.
3. **Exonerating evidence** — sharing proof that clears a red-herring suspect is the fastest trust-builder in the game.

Reported clues are flagged as `reported_[clueId]` so later scenes can react.

## Trust system — design philosophy

Trust is shown through **behaviour, not numbers**:
- **Body language** in stage directions (Shaw's arms uncross, Emily leans forward)
- **Conversational breadcrumbs** — characters almost confide, then pull back ("I've noticed some things... no, never mind")
- **Amelia's smart-folio** — qualitative readings ("Shaw is a wall, but the wall has cracks")
- **HUD bars** show a gradient only — numbers hidden by default (hover to reveal)

Trust readings live in `GAME_DATA.trustAssessments`, keyed by character ID, with min/max bands and text.

## Key character trust thresholds

| Character | Start | Key gates | How to build |
|-----------|-------|-----------|--------------|
| Emily | 70 | 50 (D2), 55 (R1), 65 (C1★), 70 (R2/C6), 80 (R4) | Earth spices quest, confide findings, don't leave her out of reports |
| Shaw | 30 | 60 + guilt ≤40 (C5/C3 access), 60 (R4) | Call him "Daniel", acknowledge grief, show empathy, present manipulation evidence gently |
| Lawson | 50 | >70 = easy access (her pawn), <30 = curfew BUT stealth route to her quarters | Agree with her, thorough reports. Double-edged. |
| Clara | 70 | 55 (D6 — pre-murder change, crucial doubt clue) | Attend morale session, be open |
| Max | 55 | 50 (D3), 60 (C2) | Coffee machine quest, hallway friendliness on Day 0 |

Shaw also has a hidden **guilt meter** starting at 80. Must reach ≤40 for confession (C5), ≤30 for the Izzy reunion. It drops with empathy and with evidence of Lawson's manipulation.

## Writing conventions

- Read `design/authorial-voice-spec-v0.6.md` before writing new prose.
- **Amelia:** Analytical, empathetic, dry wit. Open-ended prompts ("Help me understand..."). Sardonic under pressure. Inner thoughts use `{ type: "thought" }`.
- **Lawson:** Corporate polish, "we" over "I", management buzzwords, threat sandwiches. Under pressure: fleet cadence.
- **Shaw:** Military brevity, subject-verb-object, avoids contractions on duty. Softens with trust. Stress: clenched jaw, breathing cadence.
- **Emily:** Soft, lightly teasing, Midwestern metaphors. Guarded about comms until trust is high.
- **Narration** uses `{ type: "narration" }` — scene-setting, no character name.
- **Stage directions** go inside dialogue text wrapped in asterisks, or as separate narration nodes.
- **Flag naming:** `met_[character]`, `read_[item]`, `dinner_[action]`, `day[N]_[event]`, `[character]_[state]`, `reported_[clueId]`, `evt_[eventId]`.
- **Scene IDs:** `snake_case`. Day-specific scenes: `d[N]_[location]` or `day[N]_briefing`.
- **Clue IDs:** `snake_case`, matching the key in `GAME_DATA.clues`.

## Current state of development

### Complete
- Game engine v2 with VN mode + investigation loop
- Day 0 narrative (arrival → dinner → murder discovery) — 8 scenes
- Day 1 content (morning briefing + location events) — 12 scenes
- All 36 clue definitions
- Location events with trust/flag/day gating
- Daily report with selective sharing
- Evidence board with category grouping
- Smart-folio with trust readings for 7 characters
- Conditional/leverage dialogue choices
- Save/load
- Character sheets for Amelia, Lawson, Shaw, Emily, Liu, Max, Vega, Das, Clara, Pierce (+ Character Overview)

### Not yet built
- **Days 2-5 location events and scenes** — `design/Echoes_Clue_System_v2.xlsx` maps which clues become available on which day, at which location, from which character, behind which trust gate. Follow it.
- **Day 5 ending decision scene** — investigate or present the case
- **Surface ending scene** — accuse Shaw, hollow resolution
- **Conspiracy ending scene** — expose Lawson, confrontation
- **Izzy reunion scene** — Shaw speaks to Izzy via secure channel
- **Character sheet for Dr. Simone Marquez** (the old file was empty)
- **Trust quest mini-scenes** (coffee machine for Max, Earth spices for Emily, hull drill for Vega, morale session for Clara, Titan scandal confession for Amelia)
- **Art assets** — the original art folder was lost to the October 2026 disk damage. Only upload images the game actually uses (Sam has lots of drafts, especially of Amelia — those stay out of `game/`). Filenames must match `game_data.js` exactly; the checklist is in the Technical Design Guide, section 8. Leonardo AI's generation history may still hold the originals.
- **Red herring resolution scenes** — investigating and clearing Pierce, Marquez, Liu
- **Dialogue variants by trust band**
- **Lawson confrontation mechanics** — presenting conspiracy evidence triggers a point of no return

### Repair log (October 2026)
Many files in Sam's local folder were found damaged at the disk level when the repo was set up. What was done:
- `game/game_data.js` — the last ~140 characters were lost. The end of the `d1_whisper_event` journal line, one closing thought and the closing brackets were rebuilt (marked with a comment). All scene and clue references check out.
- `game/index.html` — the local copy was an older v1 engine; the v2 engine was restored from the Claude Project copy. Two bugs fixed: (1) the day counter stayed at 0 after Day 0, so no Day 1 location events could trigger — `start_investigation` now moves to Day 1; (2) tapping to skip the typewriter on the investigation hub meant the choice buttons never appeared — skipping now runs whatever was meant to happen when the text finished.
- GDD and Technical Design Guide `.docx` — rebuilt from the damaged files, with the lost final sections restored from the Claude Project text copies.
- Daniel Shaw and Emily Anderson sheets, Scene tracker — the file index was damaged but all content was intact; rebuilt losslessly.
- `prototypes/systems-slice.html`, `prototypes/vn-systems.html` — lost endings (button wiring and start-up) rebuilt; marked in the file.
- `prototypes/damaged/` — two prototypes with parts of the file overwritten mid-way. Not repairable; kept for reference only.
- Not in the repo: the 128 MB demo recording (over GitHub's 100 MB file limit), and the old v1 engine (replaced by the current game).

## Dev diary — keep it going

Sam wants the repo and the website to work as a dev diary that shows how much iteration has gone into the game. **At the end of any session that changes something meaningful** (new scenes, a system change, new art, a design decision, trailer progress), add an entry at the end of the timeline in `diary/README.md`, just above the `## Session stats` heading:

- Heading format: `## 12 October 2026 — Short title` (date, space, em dash, space, title). The website splits on the em dash, and the heading becomes the link anchor.
- A few short paragraphs or bullets in plain language: what changed, what was tried and dropped, and why. Mention versions and revisions; the point is to show the iteration.
- Be honest about who did what: Sam directs and decides; Claude builds and drafts. Don't invent Sam's feelings or quotes; only quote him if he said it.
- Screenshots: save as JPEG, 1024×576, around quality 80, in `diary/img/` named `YYYY-MM-what.jpg`. Put the image on its own line with an italic caption on the line straight after it: `![alt text](img/2026-10-day2-comms.jpg)` then `*Caption.*`
- Update the "By the numbers" table if a number changed.
- Never edit `diary/index.html` to add content; it only displays `README.md`.
- Add a `*Made with:*` line naming the tools and models used. Use the exact model ID from the session (for Claude Code sessions it's in the stats log). Never guess a model; write "not recorded" instead.

## Session stats — log every session

Sam is tracking how much the game changes per session and how token-efficient different models are. At the end of **every** working session in Claude Code:

1. Commit the session's work.
2. Run `python3 tools/session_stats.py --summary "One plain-language line about what was done"`. It reads this session's model and token counts from the local transcript, the git changes since the last logged commit (ignoring `diary/stats/`), and the game's size, and appends a row to `diary/stats/sessions.csv`.
3. Commit the CSV with the rest of the session (same branch/PR).
4. Mention the headline numbers (model, output tokens, lines changed) in the diary entry and in your reply to Sam.

If the work happened outside Claude Code (e.g. in the Claude app), use `--no-tokens --model "<model, if known>"`. Use `--dry-run` to preview. Don't edit past rows except to fix a clear mistake, and say so in the diary if you do.

## How to work on this project

1. **Always read `game/game_data.js` first** — it's the source of truth for what's implemented. Search it before creating duplicate content.
2. **Follow the clue spreadsheet** when adding new days.
3. **Test by changing `config.startScene`** — point it at any scene ID to jump straight there. Change it back before merging.
4. **Check after changes** — every `goto`, `check`, `clue` and `locationEvents` scene reference must exist. Run a quick Node check that loads `game_data.js` and reports missing references, and if possible a headless browser playthrough. Report the result to Sam.
5. **Keep content in `game_data.js`, systems in `index.html`** — never put narrative text in the engine.
6. **Event priority matters** — in `locationEvents`, higher-trust variants go BEFORE fallbacks.
7. **Every red herring teaches something** — no dead-end false leads. Clearing a suspect should reveal character, build trust, or teach a skill.
8. **Trust signals go in the writing** — body language, hesitations, near-confessions. The engine handles numbers; scenes handle feeling.
9. **New day scenes follow the Day 1 pattern** — set background, show portrait, dialogue/narration, collect clues with `{ type: "clue" }`, offer meaningful choices, end naturally (the engine returns to the hub).
10. **Art comes from Leonardo AI.** When new art is needed, describe the requirements (dimensions, style, mood, transparency) clearly so Sam can prompt Leonardo.
