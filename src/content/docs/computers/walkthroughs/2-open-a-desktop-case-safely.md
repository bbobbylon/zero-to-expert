---
title: "2. Open a desktop case safely"
description: "Shut down, isolate, ground yourself, and take the side panel off a desktop computer, then close it up again, without hurting yourself or the parts."
domain: computers
pageType: walkthrough
level: 1
difficulty: easy
status: draft
safetyCritical: true
time: "15-30 minutes (estimate)"
tools: ["Screwdriver that fits your case's panel screws (case-specific; check the case manual)", "Phone camera", "Small cup or tray for screws", "Anti-static wrist strap (recommended)", "Stable table with a bare floor or non-carpeted surface"]
parts: []
sources:
  - title: "Safety precautions when working with electrical equipment"
    url: "https://www.dell.com/support/kbdoc/en-us/000137973/safety-precautions-when-working-with-electrical-equipment"
    publisher: "Dell Support"
  - title: "Z790-C user manual (example motherboard manual)"
    url: "https://download.asrock.com/Manual/Z790-C.pdf"
    publisher: "ASRock"
  - title: "Replacing the power supply assembly (desktop hardware maintenance manual)"
    url: "https://download.lenovo.com/pccbbs/pubs/m710s/en/contents/crus16.html"
    publisher: "Lenovo"
  - title: "How to clean your PC and how often you should do it"
    url: "https://www.corsair.com/us/en/explorer/diy-builder/how-tos/how-to-clean-your-pc-and-how-often-you-should-do-it/"
    publisher: "Corsair"
  - title: "What is a PSU? Power supply units explained"
    url: "https://www.corsair.com/us/en/explorer/diy-builder/power-supply-units/what-is-a-psu-power-supply-units-explained/"
    publisher: "Corsair"
tags: [computers, desktop, safety, esd, case]
sidebar:
  order: 101
---

:::danger[Safety]
- A desktop is connected to mains power until you unplug it. **Shut down completely, then unplug the power cable from the wall and from the computer** before the side panel comes off. Sleep is not off.
- **Never open the power supply unit (PSU)**, the metal box the power cable plugs into. Lenovo's maintenance manual warns that hazardous voltage, current, and energy levels are present inside and that it has no serviceable parts.
- Static electricity can destroy memory, processors, and motherboards without any visible sign. Ground yourself before touching a part and again every few minutes.
- This walkthrough covers **desktop cases only**. Laptops open differently and carry batteries; use the maker's service manual for the exact model.
- Fasteners, latches, and panel design are case-specific. If your case's manual disagrees with a step here, follow the manual.
:::

:::caution[Not yet run end to end]
The steps follow Dell's, ASRock's, Lenovo's, and Corsair's published guidance (read 2026-09-26). They haven't been performed start to finish on a specific case for this guide.
:::

## Before you start

- Read [Hazards and safe handling](/computers/concepts/hazards-and-safe-handling/) once. It explains the reasons behind every step below.
- Back up anything important. Opening a case doesn't touch your files, but the jobs you do next might.
- Find your case's manual (search the case maker's site for the model name on the case or the box). It tells you how the panel is held on.
- Clear a stable table with a non-carpeted floor beneath it. Dell recommends a non-carpeted work surface, moderate humidity (40-60%), and avoiding synthetic fabrics such as fleece or polyester.
- Have a small cup for screws and your phone for photos.

## Steps

1. **Save your work and shut the computer down completely.** Use your operating system's Shut down option (on Windows, Start > Power > Shut down). Dell says not to use sleep mode. *You should see:* the screen goes dark and the fans stop.
2. **Switch the PSU off if it has a switch.** Many desktops have a rocker switch on the PSU, near where the power cable plugs in. Corsair's cleaning guide tells you to make sure the PC is powered down *and* the PSU switch is off. *You should see:* the switch in the off position. The PSU's label shows which way is off.
3. **Unplug the power cable from the wall outlet, then from the back of the computer.** Dell says to unplug from both. *You should see:* no light or sound from the computer. Put the cable where it can't be plugged back in by accident.
4. **Unplug everything else.** Monitor, keyboard, mouse, USB devices, network cable, and external drives (Dell). Eject any media first (SD card, USB drive, disc).
5. **Move the computer to your work surface.** Set it on a stable desk or table. Dell says never to place devices on beds, sofas, carpets, or fabric surfaces.
6. **Press and hold the power button for 15-20 seconds, with the cable unplugged.** Dell says this drains remaining electrical charge. *You should see:* nothing lights up or spins. If anything does, the computer is still receiving power: re-check steps 2 and 3 before going on.
7. **Ground yourself.** Put on the wrist strap and clip it to a grounded metal object. If you have no strap, touch an unpainted metal surface, such as the metal I/O panel on the back of the computer, for at least 5 seconds (Dell). *Why:* static you can't feel can still destroy memory and processors.
8. **Find the side panel that opens.** Your case manual shows which panel comes off and how it's held. Look for thumbscrews, screws, or a latch.

   > TODO(source): which side panel opens on your specific case. This is case-specific, so it comes from the case manual.
9. **Photograph the back panel connections**, then unplug nothing else unless the manual says to. The photo is your map for putting everything back.
10. **Remove the panel fasteners.** Put each screw in your cup as it comes out. Corsair's instruction is to unscrew and *gently* remove the side panel. *You should feel:* the panel come free with light pressure. If it sticks, look for a hidden latch, a slide direction, or a screw you missed. Never pry hard.
11. **Set the panel down flat, away from where you'll be working.** Ground yourself again (touch metal or check the strap).
12. **Look, but don't touch yet.** Photograph the inside from above. Find the power supply (a boxy metal unit with a label and a bundle of cables leaving it) and *treat it as off-limits*. Then, using the map in [Level 0: Orientation](/computers/levels/0-orientation/), find the CPU cooler, the RAM sticks, the graphics card if there is one, and the drives.
13. **Touch the metal case or I/O panel again before you handle any part**, and hold every part by its edges (Dell).
14. **When the job is done, close up in reverse.** Check that nothing loose is left inside (a dropped screw can short a board). Put the panel back, fit the screws snug, not forced, and reconnect the cables in the order your photo shows. Plug the power cable back in last, and switch the PSU on if you switched it off.
15. **Power on and watch for the operating system to load.** If it doesn't, follow the [diagnose from symptoms](/computers/concepts/diagnose-from-symptoms/) page starting at "No power" or "No POST."

## Check it worked

1. The computer starts, reaches the desktop, and all its fans spin.
2. No screws remain in your cup that don't belong to a job you did on purpose.
3. The side panel sits flush and is fastened.
4. Nothing smells hot or burnt, and nothing rattles.

## Troubleshooting

| Symptom | Likely cause | Fix |
| --- | --- | --- |
| The panel won't come off | A hidden thumbscrew, a latch, or a slide direction you haven't found | Check the case manual. Don't pry. |
| Something still lights or spins at step 6 | Cable still connected or the PSU switch is on | Re-check steps 2 and 3, and unplug again |
| Nothing at all happens after you close up | Power cable not reseated, PSU switch off, or a connector disturbed inside | Recheck the cable and switch, then follow the "No power" table on the [diagnosis page](/computers/concepts/diagnose-from-symptoms/) |
| Fans spin but there is no picture | A cable or card disturbed while working | Check the monitor cable, then follow "No video" on the diagnosis page |
| You dropped a screw inside | Easy to do | Shut down and unplug again, and retrieve it before you power on. Don't run the computer with a loose screw inside. |
| You felt a shock or tingle | A static discharge, or contact with a live circuit | Stop. Unplug, wait, and re-check that the computer is fully isolated. If it happened near the PSU, don't open anything else; contact a service technician. |
| A thick layer of dust inside | Normal over time | Follow [Clean dust and check cooling](/computers/walkthroughs/5-clean-dust-and-check-cooling/) |

## Next

[3. Install or reseat RAM](/computers/walkthroughs/3-install-or-reseat-ram/) uses this exact routine, or [5. Clean dust and check cooling](/computers/walkthroughs/5-clean-dust-and-check-cooling/) if you opened the case to look at dust.

<!-- Every spec and procedure detail above must trace to an entry in `sources` (frontmatter). Read 2026-09-26. Case layout, fastener type, and panel choice are case-specific and come from the case manual. -->
