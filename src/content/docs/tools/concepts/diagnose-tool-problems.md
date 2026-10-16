---
title: "Diagnose tool problems from symptoms"
description: "Decision tables that take you from a symptom (drill stalls, blade burns, screw strips, battery will not charge) to ordered checks, the likely cause, and the fix."
domain: tools
pageType: explanation
level: 1
status: draft
safetyCritical: true
sources:
  - title: "Operator's manual, M18 Compact Brushless Drill/Driver and Hammer Drill 3601-20 / 3602-20"
    url: "https://documents.milwaukeetool.com/58-14-9845d2.pdf"
    publisher: "Milwaukee Tool"
  - title: "Operator's manual, M18 FUEL 7-1/4 in. Circular Saw 2732-20 (includes a troubleshooting list)"
    url: "https://documents.milwaukeetool.com/58-14-2563d1.pdf"
    publisher: "Milwaukee Tool"
  - title: "Powered Hand Tools - Drills"
    url: "https://www.ccohs.ca/oshanswers/safety_haz/power_tools/drills.html"
    publisher: "Canadian Centre for Occupational Health and Safety (CCOHS)"
  - title: "Powered Hand Tools - Saws - Circular"
    url: "https://www.ccohs.ca/oshanswers/safety_haz/power_tools/saw_circ.html"
    publisher: "Canadian Centre for Occupational Health and Safety (CCOHS)"
  - title: "Powered Hand Tools - Electric Tools - Basic Safety"
    url: "https://www.ccohs.ca/oshanswers/safety_haz/power_tools/saf_elec.html"
    publisher: "Canadian Centre for Occupational Health and Safety (CCOHS)"
  - title: "Hand Tools - Screwdrivers"
    url: "https://www.ccohs.ca/oshanswers/safety_haz/hand_tools/screwdrivers.html"
    publisher: "Canadian Centre for Occupational Health and Safety (CCOHS)"
  - title: "Hand Tools - Wood Chisels"
    url: "https://www.ccohs.ca/oshanswers/safety_haz/hand_tools/chisels.html"
    publisher: "Canadian Centre for Occupational Health and Safety (CCOHS)"
  - title: "Hand Tools - Hand Saws"
    url: "https://www.ccohs.ca/oshanswers/safety_haz/hand_tools/handsaw.html"
    publisher: "Canadian Centre for Occupational Health and Safety (CCOHS)"
  - title: "Hand Tools - Wrenches"
    url: "https://www.ccohs.ca/oshanswers/safety_haz/hand_tools/wrenches.html"
    publisher: "Canadian Centre for Occupational Health and Safety (CCOHS)"
  - title: "Hand Tools - Hammers"
    url: "https://www.ccohs.ca/oshanswers/safety_haz/hand_tools/hammers.html"
    publisher: "Canadian Centre for Occupational Health and Safety (CCOHS)"
  - title: "TM 9-867, Maintenance and Care of Hand Tools (April 1945)"
    url: "https://www.ibiblio.org/hyperwar/USA/ref/TM/pdfs/TM9-867.pdf"
    publisher: "U.S. War Department"
  - title: "Wood Handbook, Chapter 8: Fastenings (FPL-GTR-190)"
    url: "https://research.fs.usda.gov/treesearch/download/37424.pdf"
    publisher: "USDA Forest Service, Forest Products Laboratory"
  - title: "CamOut effect"
    url: "https://wiha.com/knowledge/camout-effect/"
    publisher: "Wiha Tools"
  - title: "Ground-Fault Circuit Interrupters (Construction eTool)"
    url: "https://www.osha.gov/etools/construction/electrical-incidents/ground-fault-circuit-interrupters"
    publisher: "OSHA, U.S. Department of Labor"
  - title: "Lithium-Ion Battery: A Consumer Safety Guide (2024)"
    url: "https://www.dhses.ny.gov/system/files/documents/2024/07/li_batteryconsumersafetyguide.pdf"
    publisher: "New York State Division of Homeland Security and Emergency Services and Department of State"
  - title: "Battery safety: lithium-ion batteries"
    url: "https://www.canada.ca/en/health-canada/services/household-products/battery-safety/lithium-ion.html"
    publisher: "Health Canada"
  - title: "Frequently asked questions on the Starrett combination square"
    url: "https://www.starrett.com/news-events/frequently-asked-questions-on-the-starrett-combination-square"
    publisher: "The L.S. Starrett Company"
  - title: "Reading Grain Direction (supporting context, a magazine article)"
    url: "https://www.popularwoodworking.com/projects/reading-grain-direction/"
    publisher: "Popular Woodworking"
tags: [tools, troubleshooting, diagnosis, drill, circular-saw, screws, batteries]
sidebar:
  order: 53
---

:::danger[Safety]
Diagnosis puts your hands near blades, bits, and batteries. **Before any check that means touching the blade, bit, chuck, or accessory: unplug the tool or remove the battery.** A tool that cannot start cannot hurt you. Never bypass a guard or switch to "test" a fault, never open a tool or battery pack to look inside, and stop and leave the area if a battery is smoking, swelling, or smells strongly. Tool makers say repairs belong to their service centers; this page tells you what to check, not how to repair electrical parts. Settings and procedures shown are examples from specific manuals read on 2026-09-26; your tool's manual is the authority for your model.
:::

## The one-line version

Diagnosis is what a doctor does with a fever: do not guess at the cure, work down a list of causes ordered from **cheapest and safest to check** to **most expensive and risky**, and change one thing at a time so you know what worked. A plumber checks the shut-off valve before taking the sink apart, and you check that the battery is latched and the switch is not locked before you blame the motor.

## The method

1. **Make it safe.** Unplug or remove the battery. Let any blade or bit stop completely first.
2. **Look before you touch.** Blade on backwards? Cord damaged? Cracked case? Work sagging? Most faults are visible.
3. **Check the free things first.** Power, latch, switch position, accessory, support, pressure.
4. **Change one thing, then test.** If you change three things and the tool works, you learned nothing.
5. **Know when to stop.** OSHA and the tool makers say damaged tools come out of service. Milwaukee's manuals say to return a tool that still does not work to a service facility, and CCOHS says never to attempt field repairs on electric tools. Stop using a tool that tingles (CCOHS).

Every table below reads top to bottom: do the first check first.

## Symptom: the drill or driver will not run

| Check, in order | If this is the answer | Fix |
| --- | --- | --- |
| Is the tool powered? Corded: is it plugged into a working outlet? Cordless: is the battery seated and latched, and charged? | Battery not latched, or flat | Milwaukee's drill manual says to slide the pack in until it latches securely. Charge the pack with its own charger. |
| Is the outlet GFCI-protected and has it tripped? | The GFCI opened the circuit | OSHA says every GFCI has test and reset buttons; press reset. If it trips again at once, stop: something is leaking current. |
| Is the direction or lock switch in the middle "lock" position? | The trigger is locked out | Milwaukee's manual says the trigger will not work while its control switch is centered. Set forward or reverse. Check your model's manual for its lockout. |
| Are the battery contacts dirty? | Poor contact | Milwaukee: if the tool does not start or run at full power with a fully charged pack, clean the pack contacts. |
| Still nothing? | Internal fault | Milwaukee: return the tool, charger, and battery to a service facility. Do not disassemble them. |
| Is the cord frayed, or do you feel tingling? | Damaged cord or fault | Stop. CCOHS says a tingle indicates a fault requiring repair, and to inspect the cord for cracking or fraying. |

## Symptom: the drill stalls, bogs down, or the bit smokes

| Check, in order | If this is the answer | Fix |
| --- | --- | --- |
| Are you pushing too hard? | Milwaukee's drill manual says too much pressure slows the bit | Ease off slightly so the bit regains speed. |
| Are you pushing too little? | Manual: too little pressure makes the bit slide and dulls its point | Apply firm, steady pressure in line with the bit. |
| Is the bit sharp and undamaged? | Dull or bent bits bind (CCOHS: keep bits sharp; avoid bent bits) | Replace the bit. |
| Are chips packed in the flutes? | Twist bits clog | Milwaukee says to pull the bit out frequently to clear chips. |
| Is the speed setting right? | Milwaukee's manual says to start slowly, and to choose low speeds for low-melting-point plastics | Slow down. Settings differ by model; check yours. |
| Drilling metal without lubricant? | Heat | Milwaukee: cutting oil for iron or steel, coolant for copper, brass, or aluminum. |
| Bigger hole than the tool's rated capacity? | Overload | CCOHS says not to exceed drilling capacity and to drill a pilot hole first for larger holes. Continuous overloading may permanently damage the tool or battery (Milwaukee). |
| Bit jammed in the work? | The tool is binding | Milwaukee: reverse the motor. CCOHS: unplug the tool and remove the bit; never free it by starting and stopping. |

## Symptom: a screw strips, cams out, sinks too far, or snaps

| Check, in order | If this is the answer | Fix |
| --- | --- | --- |
| Is the driver the right size and type for the screw? | A mismatch is the most common cause (CCOHS: match size and type; TM 9-867: wrong size battered screw heads) | Choose the driver that seats fully in the recess with no rock. |
| Are you pressing straight in and firmly? | Cam-out: Wiha explains conical drives (Phillips and Pozidriv) create a force that pushes the driver out; keep the shank in line (CCOHS) | Push in line with the screw before pulling the trigger (Milwaukee: apply firm pressure first). |
| Is the driver tip worn or rounded? | A rounded tip slips | CCOHS says to reject tools with rounded or damaged edges. Replace it. |
| Is the clutch or torque setting too high or too low? | Milwaukee's manual says the clutch slips at a preset torque so the screw is not driven too deep; it warns the table is only a guide | Test settings on scrap material before driving screws into the workpiece. |
| Is the speed set low for driving? | Milwaukee says to set low speed for driving screws | Switch to the low setting. |
| Did you skip the pilot hole in thick or hard material? | The screw binds and the wood can split | Milwaukee says to drill a pilot hole in thick or hard materials. The USDA Wood Handbook's screw-withdrawal equation assumes lead holes of about 70 percent of the thread root diameter in softwoods and about 90 percent in hardwoods, and recommends soap or a similar lubricant on the screw. See the [drill and drive walkthrough](/tools/walkthroughs/3-drill-a-hole-and-drive-a-screw/). |
| Are you hammering a stubborn screw? | Both CCOHS and the Wood Handbook say never | Turn screws in; never drive them with a hammer. It tears wood fibers and damages the threads. |
| Can you choose the drive? | Wiha rates Torx-type drives lower for cam-out than Phillips, Pozidriv, and slotted | Use a Torx-type screw where you have the choice. |

> TODO(source): how to remove a screw whose head is already stripped. No primary source was read for extraction methods. If a screw is stripped, stop forcing the driver and look up the screw maker's or a recognized reference's recovery method.

## Symptom: the circular saw blade burns the wood, smokes, or turns blue

Milwaukee's saw manual lists these causes for a blade that binds, smokes, or turns blue from friction. Work through them in order, with the battery out.

| Check, in order | If this is the answer | Fix |
| --- | --- | --- |
| Is the blade on backwards? | The teeth must point the way the arrow on the lower guard shows | Reinstall it correctly following the manual's blade-change procedure. |
| Is the blade dull? | Dull blades overload the tool and raise the risk of kickback (Milwaukee) | Replace the blade, or follow the blade maker's guidance on sharpening. |
| Is the blade bent, damaged, or missing teeth? | CCOHS and Milwaukee both say not to use damaged, warped, or bent blades | Replace it. |
| Is the blade dirty? | Milwaukee lists a dirty blade as a cause | Clean it following the blade maker's directions. |
| Is it the wrong blade for the material? | Milwaukee lists "incorrect blade" | Use the blade type the manual and the blade maker recommend for the material. |
| Is the workpiece supported so the cut stays open? | A sagging board pinches the blade | Support the work on both sides of the cut; see [kickback](/tools/concepts/power-tool-hazards/). |
| Is the battery low? | Milwaukee lists low battery charge | Swap in a charged pack. |
| Are you forcing the saw? | Forcing can cause kickback | Let the blade cut at its own pace, without twisting. |

## Symptom: the saw wanders off the line

| Saw | Check, in order | Likely cause | Fix |
| --- | --- | --- | --- |
| Circular | Is the blade dull on one side? | Milwaukee's manual says hitting a hard object such as a nail or stone dulls teeth on one side, and the blade cuts toward the side with the sharpest teeth | Replace the blade. |
| Circular | Is the shoe bent or out of line, or the blade bent? | Both are listed in the manual | Do not use a bent shoe or blade; service or replace. Check blade-to-shoe squareness the way the manual describes. |
| Circular | Are you using a guide? | Milwaukee's manual lists "rip fence or guide is not being used" | Use the rip fence or a clamped straight edge for long cuts. |
| Hand saw | Was it sharpened evenly? | TM 9-867 says filing all teeth from one side makes a saw run to one side; uneven tooth height makes it jump | Have it re-sharpened, or use another saw. |
| Hand saw | Is it bent or sprung? | TM 9-867: twisting off waste, or letting the blade end strike the floor, can spring it | Replace it. |
| Hand saw | Did you start the cut carefully? | CCOHS: begin slowly with your thumb guiding beside the mark | Restart the kerf with short strokes. |
| Either | Did the cut hit the wrong side of the line? | The blade removes a strip of wood (the kerf) and your saw's sight mark may not sit where you expect | Cut a scrap first to learn where your saw's mark falls. |

> TODO(source): which side of the marked line the kerf should fall on for a given saw. Milwaukee's saw manual says to line up the saw's sight line with the cut line; how that relates to the blade is model-specific. Make a test cut on scrap, then follow your manual.

## Symptom: the cut edge tears or splinters

| Check, in order | If this is the answer | Fix |
| --- | --- | --- |
| Are you cutting with a circular saw across the grain too fast? | Milwaukee's manual says to advance slowly when cross-cutting to avoid splintering | Slow the feed. Use the blade the manual recommends for the material. |
| Is the waste side unsupported so it breaks off at the end of the cut? | TM 9-867: the waste breaks off and splits the work | Support both sides and cut all the way through. |
| Drilling: is the bit breaking through the back face? | Milwaukee and CCOHS: slow the feed before breakthrough; back the work with scrap wood | Clamp scrap behind the hole. |
| Planing or paring: is the grain lifting ahead of the edge? | TM 9-867 says never plane with the grain sloping down, because the wood tears and jams the plane; Popular Woodworking (supporting) says read the grain on the board edge and cut so the fibers are pressed down, not lifted | Reverse direction. If the grain reverses across the board, work in two directions. |
| Is the edge dull? | CCOHS: dull tools are hard to control | Sharpen ([walkthrough 5](/tools/walkthroughs/5-sharpen-a-chisel/)). |

> TODO(source): chisel-specific guidance on cutting direction relative to grain. The plane advice above is the closest primary source found.

## Symptom: a chisel crushes or tears instead of cutting cleanly

| Check, in order | If this is the answer | Fix |
| --- | --- | --- |
| Is it sharp? | A dull edge tears; CCOHS says dull chisels are hard to control and must be sharpened | Hone it on a stone until it is sharp ([walkthrough 5](/tools/walkthroughs/5-sharpen-a-chisel/)). |
| Is the edge nicked, or the bevel rounded? | TM 9-867: grind or hone when the edge is nicked or the bevel is rounded out; a bevel must be flat or slightly concave and never rounded | Reshape; see the walkthrough. |
| Is the chisel wrong for the mallet or force you are using? | CCOHS: wooden or plastic mallets on standard chisels; finish cuts by hand pressure alone | Use the right striking tool; finish with hand pressure. |

## Symptom: a wrench slips or a nut rounds off

| Check, in order | If this is the answer | Fix |
| --- | --- | --- |
| Is the wrench the right size and seated flat? | CCOHS: the jaw should be in full contact, flat, not tilted | Change to the exact size. |
| Are the jaws spread or damaged? | OSHA: do not use wrenches whose jaws are sprung to the point of slipping | Replace the wrench. |
| Adjustable wrench: is force on the fixed jaw, and is the adjustment tight? | CCOHS: turn toward the permanent jaw and never pull a loosely adjusted wrench | Re-set the jaw snug against the flats. |
| Are you pushing or jerking? | CCOHS: pull with a slow, steady pull | Rearrange the work so you can pull. |
| Did pliers round the corners? | CCOHS and TM 9-867: pliers on nuts batter the corners | Use a wrench. |

> TODO(source): how to remove a fastener whose corners are already rounded. Look up the fastener or tool maker's recommended method before improvising.

## Symptom: the battery will not charge

Treat any battery problem as a fire-safety problem first. If the pack is swollen, very hot, hissing or popping, smoking, or smells strongly, stop, unplug, move away from flammables if it is safe, leave, and call 9-1-1 (New York State guide). Do not charge it.

| Check, in order | If this is the answer | Fix |
| --- | --- | --- |
| Is it the right charger for this pack? | Milwaukee: a charger for one pack may risk fire with another. The New York guide: use only the charger made for the device | Use the tool maker's charger for that battery. |
| Is the charger plugged directly into a working wall outlet? | New York's guide: plug directly into a wall outlet, not a power strip | Try a different wall outlet. If it is a GFCI outlet, check the reset button. |
| Is the pack or the room too hot or too cold? | The New York guide: do not charge below 32°F (0°C) or above 105°F. Milwaukee: do not charge outside the temperature range in the instructions | Bring pack and charger to room temperature first. Your charger manual gives the range for your model. |
| Are the contacts dirty, or is the case cracked or dented? | Milwaukee: clean contacts if the tool will not run at full power. Health Canada: do not use batteries that are swollen or dented | Clean contacts only as the manual says. If the case is damaged, stop using the pack. |
| Is the pack damaged? | Milwaukee: never use damaged or modified packs, and never service them | Take it to the tool maker's service center or a battery recycling program. |

> TODO(source): what each charger light or blink code means. It is model-specific; read the charger's own manual.

Never open a pack or try to "revive" one. New York's guide says not to disassemble or modify a battery.

## Common mistakes

- **Testing a fault with the tool still connected.** Take the battery out or unplug it first.
- **Changing several things at once.** You will not know what fixed it.
- **Working around a guard or switch.** If a guard sticks, the fault is the guard.
- **Treating a swollen battery as a nuisance.** It is a warning sign.

## Where this shows up

- [Power tool hazards](/tools/concepts/power-tool-hazards/) explains the mechanisms behind these symptoms.
- [How hand tools work and fail](/tools/concepts/how-hand-tools-work-and-fail/) explains the hand-tool misuse.
- [Choosing and maintaining tools](/tools/concepts/choosing-and-maintaining-tools/) covers how to prevent them.
