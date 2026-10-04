# Echoes trailer — v1 diagnosis and v2 rebuild plan

## What I found

21 seconds, 24fps, 1280×720. The last third is genuinely good — the straighten, the tilt up to her mouth, the light spill as she exits. Don't touch that.

The first two thirds have one shared root cause, and it isn't three separate problems.

**The shot starts in a black void, and that's what breaks everything.**

With nothing in frame but a small badge, the model has no fixed objects to measure movement against. So:

- **It never moves the camera. Not once.** I checked the whole clip. Every "move" in the video is a dissolve or a scale change. Your instinct that the camera doesn't pan to reveal her was right — it doesn't, because there was nowhere to pan *from*.
- **The badge morphs because it's tiny.** In the opening it's about 4% of the frame width — roughly 50 pixels across. That's not enough for the model to hold a consistent shape between frames, so it re-invents the silhouette each time. Compare it to the frame at 8.6 seconds where the badge is about 18% of frame width: that one is rock solid, every detail legible.
- **Her body appears rather than being revealed** because black has no depth. There's no "behind" for her to be standing in, so the only move available is fading her up.
- **The lights don't turn on, they crossfade,** for the same reason. There are no light fixtures in frame to switch on. A model can ramp a light it can see. It can't invent one and then switch it.

So the fix isn't better prompting on the same setup. It's changing the setup.

---

## The one change that fixes all of it

**Light the room from frame one.** Very dim — underexposed, deep shadow, mostly black — but with visible structure. One or two practical light strips in frame, a suggestion of a bulkhead, some depth behind the badge.

That single change gives you all four things back:

| Problem | Why the dim room fixes it |
|---|---|
| No camera move | Fixed geometry gives the model parallax to work with |
| Badge morph | Also fixed by framing it bigger — see below |
| Body appears from nothing | She's already there, just underexposed. Exposure lift reveals her |
| Lights crossfade | Real fixtures in frame can ramp up. That's a move the model can do |

And a second change: **frame the badge two to three times bigger in the opening.** Your frame at 8.6s is the reference for how large it needs to be.

---

## The five frames I've pulled out

All at full resolution in the `trailer_frames` folder.

### FRAME A — badge in hand, 8.60s
**The best frame in the entire video.** The badge is large, hard rim light down the silver edge, gold banner legible, the whole thing reads as a real object. This is your badge reference from now on — use it in every generation instead of the original Gemini still.

**Edit it into your new opening frame.** In an image generator, inpaint out the hand and the shoulder, then replace the background with a very dim command centre interior — pull the geometry from the Lucid Origin bridge image you already have. Keep the badge exactly where it is, exactly that size, exactly that lighting.

> **Edit prompt:** Remove the hand and the person entirely. The badge floats alone, unsupported. Replace the black background with a dark spaceship command centre interior, very underexposed — one thin white light strip visible on the ceiling in the upper left, a large circular viewport faintly visible behind, everything else in deep shadow. Keep the badge at exactly its current size, position and rim lighting.

### FRAME B — badge on chest, dark, 11.20s
Good composition, but the background is pure black. **Edit in the same dim room** so the gravity beat has somewhere to happen.

> **Edit prompt:** Keep the woman, the navy flight suit and the badge exactly as they are. Replace the black background behind her with a dark spaceship command centre, heavily underexposed — a thin ceiling light strip and a faint circular viewport visible in deep shadow, no bright areas.

### FRAME C — badge on chest, lit, 13.60s
**Use as-is, no edit needed.** This is your "lights are on" state and your start frame for the final beat. It's also the target to match when you make the lit version of Frame B.

### FRAME D — hand entering, 4.80s
Only useful as a hand and skin-tone reference. The badge in it is already morphing. Don't use it as a start frame.

### FRAME E — exit light spill, 19.60s
Your cut point out of the hero shot and into the title card. Keep it.

---

## Rebuild plan — five short generations instead of one long one

Don't ask for a camera move and a lighting change in the same generation. Split them.

### Segment 1 — badge tumbling
**Start frame:** edited Frame A
> The badge tumbles slowly end over end in the near-dark. The camera pushes in steadily, the ceiling light strip and viewport drifting past behind it as it moves. Light rakes across the raised silver edge with each rotation.

The background objects moving past is what makes it read as a real push in. Say it explicitly.

### Segment 2 — hand catch
**Start frame:** last frame of segment 1
> A hand in a navy sleeve enters from the lower right, fingertips first, and closes on the badge, stopping its rotation. The camera continues its slow push in throughout.

### Segment 3 — clip to chest
**Start frame:** last frame of segment 2
> The camera pulls back and tilts down as the hand carries the badge to her chest and presses it flat against the navy flight suit. The room stays dark.

Pulling back is what reveals her body without her having to appear. This is the beat that was broken.

### Segment 4 — lights on
**Start frame:** edited Frame B
**End frame (if your model takes one):** Frame C
> Static camera. The ceiling lights ramp up sharply from dark to full. Floating dust falls straight down as gravity engages, her hair drops and settles, her shoulders lower slightly. The badge tips a few degrees off level.

Lock the camera here. One thing at a time. If Seedance takes a last frame as well as a first, giving it Frame C removes all the guesswork about where the lighting ends up.

### Segment 5 — straighten and line
**Start frame:** Frame C
> A hand rises into frame and straightens the badge with one small precise adjustment. The camera tilts up to her mouth and jaw. She says, "Right. Let's get started," then steps forward out of frame to the left as light spills across the lens.

This already worked in v1. Same prompt, now with a locked start frame so it matches.

---

## Two smaller notes

**The badge text is gibberish** — "UNITED COSMOS FEDERATION" reads, but the name banner is illegible scribble at every size. At the scale you're using it that's invisible, but if you ever want a real close-up you'll need to fix the banner in an image editor and re-reference from that.

**Say what the camera is moving past, not just that it moves.** "Push in" gives these models nothing. "Push in, the light strip drifting past behind it" gives them a thing to animate. That phrasing difference is most of the fix.
