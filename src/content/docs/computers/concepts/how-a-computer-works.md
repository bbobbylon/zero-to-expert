---
title: "How a computer works"
description: "What the CPU, RAM, storage, graphics, motherboard, power supply, and cooling each do, and how heat and memory limits show up as slowness."
domain: computers
pageType: explanation
level: 0
status: draft
safetyCritical: false
sources:
  - title: "What is a Central Processing Unit (CPU)?"
    url: "https://www.arm.com/glossary/cpu"
    publisher: "Arm"
  - title: "CPU Speed: What Is CPU Clock Speed?"
    url: "https://www.intel.com/content/www/us/en/gaming/resources/cpu-clock-speed.html"
    publisher: "Intel"
  - title: "How to Check the Number of Cores and Threads in Your Intel Processor"
    url: "https://www.intel.com/content/www/us/en/support/articles/000029254/processors.html"
    publisher: "Intel Support"
  - title: "Win32_Processor class"
    url: "https://learn.microsoft.com/en-us/windows/win32/cimwin32prov/win32-processor"
    publisher: "Microsoft Learn"
  - title: "What Is a GPU? Graphics Processing Units Defined"
    url: "https://www.intel.com/content/www/us/en/products/docs/processors/what-is-a-gpu.html"
    publisher: "Intel"
  - title: "What's the difference between memory (RAM) and storage?"
    url: "https://www.corsair.com/us/en/explorer/diy-builder/memory/whats-the-difference-between-memory-ram-and-storage/"
    publisher: "Corsair"
  - title: "What is a Motherboard?"
    url: "https://www.corsair.com/us/en/explorer/glossary/what-is-a-motherboard/"
    publisher: "Corsair"
  - title: "What is a PSU? Power supply units explained"
    url: "https://www.corsair.com/us/en/explorer/diy-builder/power-supply-units/what-is-a-psu-power-supply-units-explained/"
    publisher: "Corsair"
  - title: "Introduction to the page file"
    url: "https://learn.microsoft.com/en-us/troubleshoot/windows-client/performance/introduction-to-the-page-file"
    publisher: "Microsoft Learn"
  - title: "What Is Throttling and How Can It Be Resolved?"
    url: "https://www.intel.com/content/www/us/en/support/articles/000088048/processors.html"
    publisher: "Intel Support"
  - title: "What Is the Maximum Operating Temperature (Tjunction) for Intel Processors?"
    url: "https://www.intel.com/content/www/us/en/support/articles/000005597/processors.html"
    publisher: "Intel Support"
  - title: "Z790-C user manual (example motherboard manual)"
    url: "https://download.asrock.com/Manual/Z790-C.pdf"
    publisher: "ASRock"
tags: [computers, cpu, ram, storage, gpu, motherboard, psu, cooling, fundamentals]
sidebar:
  order: 50
---

## The one-line version

A computer follows instructions (the **CPU**), keeps the work it's doing on hand (**RAM**), files everything else away (**storage**), and needs power (**PSU**), a place for every part to plug in (**motherboard**), and a way to shed heat (**cooling**). Analogy: a kitchen. The CPU is the cook, RAM is the counter where ingredients sit while you cook, storage is the pantry and freezer, the graphics processor is a second cook who is very good at doing one kind of prep on lots of items at once, the motherboard is the kitchen's layout and wiring, the PSU is the utility feed, and cooling is the extractor hood. A slow kitchen has a specific cause: a small counter, a slow pantry, a hot stove, or a bad supply. The rest of this page is how to tell which.

## How it works

```
                 +-------------------- motherboard ---------------------+
  wall outlet    |                                                      |
  (AC) --> PSU --+--> low-voltage DC to every part                      |
                 |                                                      |
                 |   CPU  <---- memory slots ----> RAM (working memory) |
                 |    |                                                 |
                 |    +---- PCIe slots ----> graphics card (optional)   |
                 |    +---- M.2 slots, SATA ports ----> storage         |
                 |                                                      |
                 |   firmware chip: wakes everything up at power-on     |
                 +------------------------------------------------------+
   Cooling: heatsinks and fans carry heat away from the CPU and GPU
```

### The CPU: fetch, decode, execute, store

Arm describes the CPU as "the core engine" of a computing system. It performs calculations, executes instructions, and manages data flow between memory, storage, and peripherals. It does this through a repeating four-stage **instruction cycle**:

1. **Fetch** the next instruction from memory.
2. **Decode** it: work out what it means and what resources it needs.
3. **Execute** it.
4. **Store** the result back to memory or a register.

Two speed-ups sit inside the CPU itself: **registers** (very fast places for temporary data) and **cache** (L1, L2, L3), fast memory near each core that holds recently used instructions and data so the CPU doesn't keep waiting on RAM.

**Cores and threads.** A modern CPU has several **cores** on one chip so it can run several tasks at once (Arm). Windows also reports **logical processors** (often called *threads*). Microsoft's `Win32_Processor` documentation says `NumberOfCores` counts physical cores, and that when hyperthreading is enabled it will be lower than `NumberOfLogicalProcessors`. You can see both numbers in Task Manager: Intel's support article says to open Task Manager, select the **Performance** tab, then **CPU**, and read the "Cores" and "Logical processors" values.

**Clock speed.** Clock speed is "the number of cycles your CPU executes per second," measured in gigahertz (GHz); a 3.2 GHz processor runs 3.2 billion cycles per second (Intel). A CPU has a base frequency and, on many models, a higher **turbo** (boost) frequency it can reach for short stretches. Intel's caution matters: a higher clock speed only *generally* means a faster CPU. A newer CPU with a lower clock speed can beat an older, higher-clocked one because the newer design does more per cycle, so compare clock speeds only within the same brand and generation. Intel also notes that higher clock speeds generate more heat.

### RAM and storage: the counter and the pantry

Corsair's short version: RAM temporarily stores the data the computer is working on; storage is where you save files permanently. RAM decides how many files and applications the computer can have open at the same time; storage capacity decides how many files and programs you can keep. Corsair also notes that even SSDs are slower than RAM, so when the computer has to lean on storage instead of memory, it feels slower.

| | RAM | Storage |
| --- | --- | --- |
| Analogy | The kitchen counter | The pantry and freezer |
| Holds | What you're using right now | Everything you've kept |
| Speed | Faster (Corsair) | Slower, even for SSDs (Corsair) |
| When power is off | Treat anything not saved to storage as lost. Corsair calls RAM's contents temporary. | Kept |
| More of it lets you | Keep more things open at once | Keep more files and programs |

**When RAM fills up.** Windows can use a **page file** on storage as an overflow: it moves infrequently used pages out of RAM so RAM can serve the frequently used ones (Microsoft, whose article is written for Windows 10). The system's **commit limit** is RAM plus the page file, and Task Manager's Performance tab shows both the committed amount and the limit. If the commit charge reaches the limit, Microsoft says the system and its processes might not get memory, which "can cause freezing, crashing, and other malfunctions." The page file is a safety net, not extra RAM; it lives on storage, which is slower.

For the storage side in depth (HDD versus SSD, SATA versus NVMe, M.2 keys, health), see [Storage, drives, and health](/computers/concepts/storage-drives-and-health/).

### The GPU: the specialist cook

Intel defines a GPU as a "specialized processor originally designed to accelerate graphics rendering" that can process many pieces of data at the same time. That makes it useful for gaming, video editing and content creation, and machine learning. It evolved as a complement to the CPU, and the two work together.

### The motherboard: layout and wiring

Corsair calls the motherboard the backbone of the computer: it lets the CPU, RAM, GPU, storage, and peripherals communicate. On it you'll find the CPU **socket**, **RAM slots**, **PCIe slots** (graphics cards and other expansion cards), the **chipset** (which controls communication between the CPU and other components), storage connectors (**SATA** ports and **M.2** slots), power connectors, the rear I/O ports, and onboard extras like Wi-Fi and lighting headers. Every motherboard is different, which is why exact slot order, header positions, and jumper settings always come from *that board's manual*, not from a general guide.

### The PSU: the utility feed

The power supply unit converts alternating current from the wall outlet into the lower-voltage direct current the parts need, and it distributes that power to the motherboard, CPU, GPU, and drives (Corsair). Good ones include protection against overvoltage, undervoltage, short circuits, and overcurrent. Corsair also says that a bad PSU can cause system instability, crashes, and hardware damage, so a "mystery" crash is sometimes a power problem. The **80 PLUS** rating tells you the PSU meets at least 80% efficiency at 20%, 50%, and 100% of its rated load, with higher tiers (Bronze through Titanium) being more efficient. *Never open the PSU itself*: see [Hazards and safe handling](/computers/concepts/hazards-and-safe-handling/).

### Cooling and thermal throttling

Every part above turns some of its power into heat. **Heatsinks** spread it and **fans** carry it away. When the CPU gets too hot, it protects itself:

- Intel calls the limit **TJ Max** (Tjunction max): the maximum temperature the processor allows before it uses internal thermal controls to reduce power and limit temperature. Intel's support article gives a typical range of 100 to 110 degrees Celsius, varying by model. Look up the number for your processor on Intel's ARK site.
- **Throttling** is the first response: the CPU lowers its clock speed when the temperature goes above TJ Max. You notice it as reduced CPU speed and stuttering during gaming or other heavy work.
- If throttling can't hold the temperature down, the processor shuts the computer down to prevent permanent damage.
- Running at the maximum temperature under a heavy load is not necessarily a fault. Turbo Boost can reach the limit quickly, and Intel says damage from overheating is unlikely because of these protections.

For a desktop with a boxed Intel processor, Intel's suggested checks are: the right cooler for that CPU, installed correctly, the right amount of **thermal paste** (thermal interface material) between the CPU and the cooler, working system fans, and adequate airflow through the case. For laptops Intel says to contact the maker (the OEM), because the manufacturer controls the power limits.

> TODO(source): throttling temperatures and behavior for AMD processors and Apple silicon. The sources read for this page cover Intel only.

## Choosing between options

### Integrated or discrete graphics

| | Integrated GPU | Discrete GPU |
| --- | --- | --- |
| What it is | Embedded alongside the CPU | A distinct chip on its own circuit board |
| Good for | Thinner and lighter systems, lower power use, lower system cost | Resource-intensive work: gaming at higher resolution and frame rates, video editing, machine learning |
| Costs you | Less processing power for graphics-heavy work | More energy and dedicated cooling |
| Pick it when | You don't do the heavy graphics work Intel lists | You do, or you need more performance for it |

Pick by workload. A discrete GPU adds power draw and cooling needs that a machine you only browse and type on never uses; an integrated GPU has less processing power for heavy graphics work (Intel).

### Motherboard sizes (form factors)

| Size | Dimensions (Corsair) | Traits |
| --- | --- | --- |
| ATX | 305 mm x 244 mm | The most common; up to 4 RAM slots and multiple PCIe slots |
| Micro ATX | 244 mm x 244 mm | Compact; fewer expansion options |
| Mini ITX | 170 mm x 170 mm | Smallest; typically 1 PCIe slot and 1-2 M.2 slots |

The case has to fit the board: ASRock's manual tells you to study your chassis first to ensure the motherboard fits. If you're upgrading rather than building, you don't choose the board's size; you find out which one you have ([walkthrough 1](/computers/walkthroughs/1-identify-your-components/)).

### What to compare when a CPU seems "slow"

| Measure | What it tells you | Watch out for |
| --- | --- | --- |
| Clock speed (GHz) | How many cycles per second | Only comparable within the same brand and generation (Intel) |
| Cores and logical processors | How many tasks can run at the same time (Arm) | Check both numbers; they differ when hyperthreading is on |
| Cache | How often the CPU avoids waiting on RAM (Arm) | Intel lists it as one factor alongside clock speed and cores |
| Temperature and throttling | Whether the CPU is running below its potential | Reduced speed plus stutter under load is the throttling signature |

## Common mistakes

| Mistake | Why it costs you | Instead |
| --- | --- | --- |
| "More GHz always means faster" | Design generations differ (Intel) | Compare within a brand and generation |
| Mixing up RAM and storage capacity | A big drive doesn't help a computer that runs out of RAM | Look at each separately in Task Manager or About |
| Treating the page file as free RAM | It's on storage, which is slower (Corsair) | Add RAM if the machine constantly runs short |
| Blaming the operating system when it's heat | Throttling looks like slowness | Check for dust, fans, and airflow first ([walkthrough 5](/computers/walkthroughs/5-clean-dust-and-check-cooling/)) |
| Assuming a discrete GPU is always better | It adds power and cooling needs (Intel) | Choose by workload |
| Reading one board's manual for another | Slot order and headers differ | Use the manual for *your* board |

## Where this shows up

- [Level 0: Orientation](/computers/levels/0-orientation/) turns this page into a vocabulary list and a map.
- [Identify your components](/computers/walkthroughs/1-identify-your-components/) reads these values from your own machine.
- [Diagnose from symptoms](/computers/concepts/diagnose-from-symptoms/) uses the distinctions above to narrow a fault.

<!-- Every fact above that isn't common knowledge traces to an entry in `sources` (frontmatter). Read 2026-09-26. Intel, Corsair, and Arm pages are vendor educational pages, not standards: they explain the ideas but their numbers apply to the products they describe. -->
