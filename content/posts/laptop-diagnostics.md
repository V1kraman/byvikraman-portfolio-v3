---
title: "Fixing WiFi and the Hinge of my Laptop"
date: "2026-09-05"
type: "bloog"
summary: "Documenting hands-on laptop hardware diagnostics, repairs, maintenance, and troubleshooting experiments."
tags: ["hardware", "wifi"]
published: true
featured: true
image: "hinge.jpeg"
tech: ["DIY","Diagnosis"]
github: "https://github.com/V1kraman/laptop-diagnostics"

---
# Laptop Hardware Diagnostics: Recovering a Missing Wi-Fi Adapter on an ASUS TUF A15

> A hands-on hardware troubleshooting project documenting the diagnosis and repair of a missing Wi-Fi adapter, internal chassis damage, and a post-maintenance display issue.

---

## 📖 Overview

This repository documents a real-world troubleshooting session involving an **ASUS TUF Gaming A15** laptop. What began as a simple missing Wi-Fi adapter quickly evolved into a complete hardware inspection, internal cleaning, structural repair, and graphics recovery.

The goal of this repository is to document the diagnostic process, highlight the reasoning behind each step, and share the lessons learned during the repair.

---

## 💻 System Specifications

| Component        | Specification                      |
| ---------------- | ---------------------------------- |
| Laptop           | ASUS TUF Gaming A15                |
| CPU              | AMD Ryzen 7 6800H                  |
| GPU              | NVIDIA GeForce RTX 3060 Laptop GPU |
| Storage          | NVMe SSD                           |
| Operating System | Windows                            |

---

# Problem Statement

While booting into Windows, the laptop failed to detect the wireless network adapter.

### Symptoms

* No Wi-Fi icon
* No wireless networks available
* Wireless adapter appeared to be missing

---

# Initial Software Diagnostics

Before opening the laptop, several software troubleshooting steps were attempted.

### Investigated

* Device Manager
* Network Adapters
* Windows Services
* Network Settings
* Windows restart procedures
* Community troubleshooting guides

Despite these attempts, the issue remained unresolved.

At this stage, the investigation shifted from software to hardware.

---

# Hardware Investigation

The laptop was carefully disassembled to inspect the wireless hardware.

The following steps were performed:

* Removed the bottom cover.
* Removed the NVMe SSD to access the Wi-Fi module.
* Reseated the Wi-Fi card.
* Checked antenna cable connections.
* Cleaned accumulated dust from internal components.
* Reassembled the laptop.

---

# Unexpected Discovery

During the cleaning process, an unrelated mechanical issue was discovered.

Two brass threaded inserts near the display hinge had detached from the plastic chassis and were loose inside the laptop.

This explained a rattling noise that had been present for some time.

### Temporary Repair

A temporary repair was performed using **M-Seal** to secure the inserts back into position until a permanent repair or chassis replacement can be carried out.

---

# A New Problem

After reassembling the laptop:

* ✅ Power LED turned on
* ✅ Keyboard backlight worked
* ✅ Cooling fans operated normally
* ❌ Internal display remained completely black

Although the system appeared to power on successfully, there was no display output.

---

# Display Recovery

Further troubleshooting suggested resetting the Windows graphics subsystem using the keyboard shortcut:

```text
Win + Ctrl + Shift + B
```

After several restart attempts, the display recovered successfully and the laptop booted normally.

---

# Results

| Task                                  | Status |
| ------------------------------------- | ------ |
| Wi-Fi module reseated                 | ✅      |
| Internal cleaning completed           | ✅      |
| Loose hinge inserts identified        | ✅      |
| Temporary structural repair completed | ✅      |
| Display recovered                     | ✅      |
| Laptop fully operational              | ✅      |

---

# Skills Demonstrated

* Hardware troubleshooting
* Laptop disassembly and reassembly
* Wi-Fi module reseating
* NVMe SSD removal
* Internal cleaning and maintenance
* Mechanical inspection
* Temporary chassis repair
* Windows diagnostics
* Graphics driver recovery
* Technical documentation

---

# Lessons Learned

This project reinforced several important engineering principles:

* Begin with software diagnostics before moving to hardware.
* Follow a systematic troubleshooting process instead of making assumptions.
* Hardware maintenance can uncover unrelated issues that would otherwise remain unnoticed.
* Reseating removable components can resolve intermittent hardware faults.
* Community resources such as technical forums can provide useful recovery techniques, but they should be evaluated critically.

Perhaps the most valuable takeaway was that successful troubleshooting is less about immediately finding the answer and more about methodically eliminating possibilities until the root cause becomes clear.

---

# Future Improvements

* Replace the damaged chassis section with a permanent repair.
* Replace the thermal paste.
* Upgrade the wireless network card.
* Benchmark temperatures before and after cleaning.
* Benchmark Wi-Fi performance after reseating the adapter.

---

# Repository Structure

```text
laptop-hardware-diagnostics/
│
├── README.md
├── images/
│   ├── laptop-open.jpg
│   ├── wifi-card.jpg
│   ├── hinge-damage.jpg
│   ├── mseal-repair.jpg
│   └── final-boot.jpg
│
└── docs/
    └── troubleshooting-notes.md
```

---

# Conclusion

What started as a missing Wi-Fi adapter turned into a complete hardware investigation involving laptop disassembly, internal cleaning, structural inspection, temporary mechanical repair, and display recovery.

Although the original objective was simply to restore wireless connectivity, the project ultimately provided valuable experience in systematic troubleshooting, hardware maintenance, and practical problem solving.

This repository documents not only the successful outcome but also the engineering process that led there.
