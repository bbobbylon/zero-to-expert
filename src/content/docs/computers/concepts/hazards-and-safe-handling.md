---
title: "Hazards and safe handling"
description: "The three ways working on a computer goes wrong (mains power, static electricity, and lithium batteries), why each one matters, and the habits that control them."
domain: computers
pageType: explanation
level: 0
status: draft
safetyCritical: true
sources:
  - title: "Safety precautions when working with electrical equipment"
    url: "https://www.dell.com/support/kbdoc/en-us/000137973/safety-precautions-when-working-with-electrical-equipment"
    publisher: "Dell Support"
  - title: "Handling swollen lithium-ion batteries (Latitude 14 5480 manual)"
    url: "https://www.dell.com/support/manuals/en-us/latitude-14-5480-laptop/swollenbattery/handling-swollen-lithium-ion-batteries"
    publisher: "Dell Support"
  - title: "Replacing the power supply assembly (desktop hardware maintenance manual)"
    url: "https://download.lenovo.com/pccbbs/pubs/m710s/en/contents/crus16.html"
    publisher: "Lenovo"
  - title: "What is a PSU? Power supply units explained"
    url: "https://www.corsair.com/us/en/explorer/diy-builder/power-supply-units/what-is-a-psu-power-supply-units-explained/"
    publisher: "Corsair"
  - title: "How to test a PSU (power supply unit)"
    url: "https://www.corsair.com/us/en/explorer/diy-builder/power-supply-units/how-to-test-a-psu-power-supply-unit/"
    publisher: "Corsair"
  - title: "Z790-C user manual (example motherboard manual)"
    url: "https://download.asrock.com/Manual/Z790-C.pdf"
    publisher: "ASRock"
  - title: "How to troubleshoot the power supply unit (PSU) of a Dell desktop computer"
    url: "https://www.dell.com/support/kbdoc/en-us/000125185/how-to-troubleshoot-the-power-supply-unit-psu-of-a-dell-desktop-computer"
    publisher: "Dell Support"
  - title: "Back up business data (3-2-1 rule)"
    url: "https://www.cisa.gov/audiences/small-and-medium-businesses/secure-your-business/back-up-business-data"
    publisher: "CISA"
tags: [computers, safety, esd, psu, batteries, backups]
sidebar:
  order: 51
---

:::danger[Safety]
- **Mains voltage.** Before any panel comes off a desktop: shut down completely (not Sleep), unplug the power cable from the wall and from the computer, and disconnect everything else.
- **Never open a power supply unit (PSU).** Lenovo's maintenance manual warns that hazardous voltage, current, and energy are present inside, and that there are no serviceable parts. A faulty PSU gets replaced, not repaired.
- **Static electricity** can destroy memory modules, processors, and motherboards without any visible sign. Ground yourself before you touch a part, and again every few minutes.
- **Swollen or damaged laptop batteries.** Stop using the laptop, and never press, bend, puncture, or pry at the battery. Contact the manufacturer.
- Exact procedures are model-specific. When this page and your computer's manual disagree, follow the manual.
:::

## The one-line version

Working on a computer carries three separate risks, and each has a different control: mains electricity can hurt **you**, static electricity can hurt the **parts**, and lithium batteries store energy that can hurt **both** if the pack is damaged. There is a fourth, quieter risk: hardware work can cost you your **data**, so back up first.

| Hazard | Analogy | What it damages | The control |
| --- | --- | --- | --- |
| Mains voltage and the PSU | The sealed transformer box on a utility pole: you work on what it feeds, never inside it. | You | Unplug first; never open the PSU |
| Static electricity (ESD) | The spark from a doorknob after you shuffle across a carpet. The spark you *can't* feel still hurts chips. | The parts | Ground yourself; handle by the edges |
| Lithium batteries | A fuel can, not a paperweight: a bulge is a warning, not a cosmetic flaw. | You and the device | Stop using a damaged pack; never force it |
| Data loss | A filing cabinet you're about to move: empty it into a second cabinet first. | Your files | A backup before any hands-on work |

## How it works

### Hazard 1: mains voltage and the power supply

The PSU's job is to convert the alternating current (AC) from the wall outlet into the lower-voltage direct current (DC) that every other part runs on (Corsair). That makes the PSU the boundary between the outlet side, where the voltage can hurt you, and the low-voltage side that the other parts run on. You control the first by unplugging before you open anything, and you respect the second by never opening the PSU box itself.

What the manufacturers say:

- **Lenovo:** never remove the cover on a power supply. Hazardous voltage, current, and energy levels are present inside, and there are no serviceable parts. If you suspect a fault, contact a service technician.
- **ASRock (motherboard manual):** unplug the power cord before installing or removing components. Failing to do so may cause physical injuries and damage to the components.
- **Dell:** never open a monitor's casing either. Monitors contain high-voltage components that can cause severe electric shock even when unplugged.
- **Dell:** some desktop power supplies have a voltage selector switch, or sense the supply automatically. If yours has a manual switch, check it against your local supply *before* you connect power. The correct setting is on the PSU's label and in its manual, not on this page.

**A note on "testing a PSU."** Guides online show how to start a PSU on its own by jumping pins on its connector. Corsair, which publishes one, warns that jumping the wrong pins may result in injury and damage to the PSU. This guide doesn't teach that. If you suspect the PSU, the safer routes are the maker's built-in self-test on models that have one (Dell documents one for its desktops; see the [diagnosis page](/computers/concepts/diagnose-from-symptoms/)) or swapping in a known-good PSU.

### Hazard 2: static electricity (ESD)

Electrostatic discharge (ESD) happens when static electricity built up on your body or an object transfers to an electronic component. Dell's guidance is blunt: a discharge you can't see or feel can destroy memory modules, processors, and motherboards. The damage can be permanent and invisible, so a part that "seems fine" may still be dead, or worse, fail later.

The controls, all from Dell's and ASRock's guidance:

1. **Ground yourself.** Wear an anti-static wrist strap connected to a grounded metal object for the whole session. Without a strap, touch an unpainted metal surface (Dell's example is the metal I/O panel on the back of the computer) for at least 5 seconds.
2. **Re-ground as you work.** Touch grounded metal every few minutes, especially after you move around or touch non-conductive materials, because you build up charge again.
3. **Handle parts by the edges.** Never touch the gold contacts, pins, or circuitry. Hold memory modules and cards by their edges or brackets.
4. **Keep parts in their anti-static bags** until the moment you install them, and put removed parts on a grounded anti-static pad or in a bag.
5. **Choose the room.** Dell recommends a non-carpeted surface, moderate humidity (40-60%), and avoiding synthetic fabrics such as fleece or polyester. ASRock's manual says to never place a motherboard directly on a carpet.

> TODO(source): which surfaces count as "grounded" when the computer itself is unplugged. Dell's example is the metal I/O panel; neither fetched source lists other grounded objects.

### Hazard 3: lithium batteries

Laptops contain a lithium-ion battery pack. Dell's rule for any battery: do not use one that is dented, punctured, swollen, leaking, or otherwise physically damaged, and never carry loose batteries with metal objects that could short the terminals.

If a laptop battery swells, Dell's swollen-battery guidance says to:

1. Stop using the laptop and disconnect the AC adapter.
2. Not crush, drop, puncture, or bend the battery, apply pressure to its surface, or use tools to pry on or against it.
3. Not try to free a battery that has become stuck in the device, because puncturing, bending, or crushing a battery can be dangerous.
4. Contact the manufacturer's product support for replacement and disposal. Dell says swollen batteries go back to Dell in an approved shipping container or to an approved recycling center.

> TODO(source): battery guidance for makers other than Dell (Apple, Lenovo, HP), and where a regulator such as a consumer-safety agency says to take a swollen pack. The consumer-agency pages that were tried returned no usable text.

### Hazard 4: your data

Opening a computer doesn't touch your files, but the jobs you do next (swapping drives, resetting settings, reinstalling Windows) can. CISA's backup guidance gives the rule of thumb most people use: **3-2-1**, meaning three copies of important files, on two different types of storage media (for example a hard drive and the cloud), with one copy stored off-site. It also says backups should run automatically and be tested so you know you can restore from them. A drive that reports "healthy" is not a backup; see [Storage, drives, and health](/computers/concepts/storage-drives-and-health/).

## Choosing between options

### What "off" means

| State | Safe to open? | Why |
| --- | --- | --- |
| Sleep | No | Dell says to shut down completely, not sleep mode. Sleep keeps memory powered. |
| Shut down, cable still plugged in | No | Dell says to unplug the power cable from the outlet and the device. A shut-down computer can still be connected to the mains. |
| Shut down, unplugged, peripherals removed, power button held 15-20 seconds | Yes | Dell's drain step removes remaining stored charge. The 15-20 second figure is Dell's; other makers' procedures may differ, so check the manual for your model. |

### Ways to ground yourself

| Method | What you do | Use it when | Limits |
| --- | --- | --- | --- |
| Wrist strap to grounded metal | Wear it for the whole session. | Any time you touch internal parts. Dell's recommended method. | Only works if the clip is on a grounded metal object. |
| Touch unpainted metal for 5+ seconds | Touch the metal I/O panel, for example. | Before you start, and every few minutes after moving. | It discharges you only at that moment. Walking away and touching fleece or carpet charges you again. |
| Nothing | Skip it. | Never, for internal parts. | You won't know when you've caused damage. |

**Recommendation:** wear the strap, and still touch metal after you move around. The strap is continuous protection; the touch is the backup if the strap isn't connected. Touching metal alone is the weakest option that still counts, because the protection only lasts until your next step across the room.

## Common mistakes

| Mistake | Why it hurts | Instead |
| --- | --- | --- |
| Using Sleep as "off" | Memory stays powered, and the computer isn't isolated | Shut down completely, then unplug |
| Leaving the power cable connected "because the PSU switch is off" | The switch is not the same as unplugging | Unplug at the wall and at the computer |
| Opening the PSU to clean or fix it | Hazardous voltage, no serviceable parts (Lenovo) | Replace the PSU; clean only the outside |
| Working on carpet in a fleece | Builds static charge | Bare floor or a desk, natural fibers, wrist strap |
| Touching gold contacts or chips | Static and skin oils | Hold by edges and brackets |
| Forcing a part that "almost fits" | ASRock warns a memory module forced in the wrong way causes permanent damage to the board and the module | Stop, re-check the notch and the manual |
| Using a swollen battery until it dies | Dell says stop using it immediately | Stop, disconnect the charger, contact the maker |
| Starting hardware work with no backup | A slip can cost you data, not just parts | Follow 3-2-1 before you begin |

## Where this shows up

- [Open a desktop case safely](/computers/walkthroughs/2-open-a-desktop-case-safely/) turns this page into a step-by-step routine, and every other hands-on walkthrough starts from it.
- [Install or reseat RAM](/computers/walkthroughs/3-install-or-reseat-ram/), [Install an M.2 SSD](/computers/walkthroughs/4-install-an-m2-ssd/), and [Clean dust and check cooling](/computers/walkthroughs/5-clean-dust-and-check-cooling/) all rely on grounding and handling.
- [Diagnose from symptoms](/computers/concepts/diagnose-from-symptoms/) tells you when to stop and get help.
- [Level 0: Orientation](/computers/levels/0-orientation/) links this page as required reading.

<!-- Every fact above that isn't common knowledge traces to an entry in `sources` (frontmatter). Read 2026-09-26. Manufacturer procedures (drain time, voltage switches) are model-specific; the source is the maker's manual for the exact model. -->
