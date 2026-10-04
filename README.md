# Echoes Among the Stars

A sci-fi detective visual novel. Detective Amelia Drake has five days aboard the Valkyrie-7 research station, orbiting Europa, to solve the murder of Dr. Marcus Rourke before the Chief Inspector arrives.

**Play it and browse everything:** https://samthurrell-dot.github.io/Echoes-among-stars/

> ⚠️ Spoilers: this repo contains the full solution, clue map and character secrets.

## What's where

| Folder | What's in it |
|---|---|
| [`game/`](game/) | The current playable build. `index.html` is the engine, `game_data.js` is all the story content. |
| [`design/`](design/) | Game design document, technical guide, systems update, clue spreadsheets, scene tracker, authorial voice spec. |
| [`characters/`](characters/) | Character sheets. |
| [`writing/scenes/`](writing/scenes/) | Draft prose scenes. |
| [`prototypes/`](prototypes/) | Earlier standalone builds, kept for reference. |
| [`trailer/`](trailer/) | Announce-trailer script, rebuild notes and reference frames. |
| [`CLAUDE.md`](CLAUDE.md) | Working notes Claude reads before touching anything: how the engine works, the true story, writing rules, what's left to build. |

## Working on it

- **With Claude:** start a Claude Code session on this repo (from the Claude app or claude.ai/code) and ask for what you want, e.g. "write the Day 2 comms room scene with Emily". Claude reads `CLAUDE.md` first, makes the change on a branch and opens a pull request for you to look at.
- **Checking a change:** once a pull request is merged into `main`, the website updates by itself within a couple of minutes.
- **Adding art:** upload portraits to `game/assets/images/Characters/` and backgrounds to `game/assets/images/Scenes/` (GitHub → the folder → Add file → Upload files). Filenames must match the ones in `game/game_data.js` exactly, including capital letters and spaces. The Technical Design Guide (section 8) lists every file the game expects.

## Status

Day 0 (arrival to murder) and Day 1 (briefing plus nine location scenes) are playable. Days 2–5, the endings and all art are still to come. See the "Current state of development" section of [`CLAUDE.md`](CLAUDE.md) for the full list.

## File repairs (October 2026)

When this repo was set up, many of the project files on the local computer turned out to be damaged at the disk level. Everything here has been checked, and repaired where possible. Details are in the "Repair log" section of `CLAUDE.md`. In short: the game, the design documents and all character sheets are complete; two very early prototypes couldn't be saved and sit in `prototypes/damaged/` for reference only.
