export const personalInfo = {
  name: "Vikraman V.",
  wordmark: "VIKRAMAN V.",
  role: "Electronics & Communication Engineering Student",
  designation: "B.TECH ECE · SRM IST ('25–'29)",
  email: "byvikraman@gmail.com",
  location: "Kattankulathur, Tamil Nadu, India",
  linkedin: "https://www.linkedin.com/in/byvikraman/",
  github: "https://github.com/V1kraman",
  resume: "/Vikraman_V_Resume.pdf",
  heroIntro:
    "I’m Vikraman—an Electronics and Communication Engineering undergraduate at SRM Institute of Science and Technology. I spend most of my time working where physical circuits meet software: bringing up ESP32-S3 and Arduino prototypes on the breadboard, debugging SPI and I²C buses, experimenting with embedded intelligence, and writing notes about what breaks along the way.",
  aboutNarrative: [
    "I’m an undergraduate studying Electronics and Communication Engineering at SRM Institute of Science and Technology (2025–2029) in Kattankulathur, Tamil Nadu. My curiosity started with wanting to know what happens beneath an interface—how a line of C or Python translates into voltage levels, clock edges, register states, and physical behaviour.",
    "Much of my learning happens on the workbench. Whether that means wiring a multi-peripheral ESP32-S3 pocket platform, building an astable 555 timer piano on a breadboard, reproducing TinyML vibration pipelines on resource-constrained microcontrollers, or coordinating the GARUDA disaster-response architecture, I enjoy taking systems from rough schematics to working prototypes.",
    "Alongside hardware experimentation, I care deeply about clear documentation and thoughtful software. This site is my personal digital notebook—a quiet space where I archive my engineering builds, lab repairs, and field notes.",
  ],
  about:
    "Electronics and Communication Engineering student at SRM Institute of Science and Technology working across embedded systems, discrete electronics, and software development.",
};

export interface CurrentlyItem {
  id: string;
  category: "Studying" | "Building" | "Researching" | "Learning" | "Reading & Exploring";
  code: string;
  title: string;
  description: string;
  meta: string;
  href?: string;
}

/**
 * Single verified source of truth for the Homepage "Currently" section and the /now page.
 * All entries strictly reflect verified academic, project, and personal context in the repository.
 */
export const currentlyItems: CurrentlyItem[] = [
  {
    id: "cur-building",
    category: "Building",
    code: "NOW·01",
    title: "GARUDA Disaster-Response Architecture",
    description:
      "Refining the prototype-stage autonomous aerial search, onboard edge verification, and resilient mesh reporting pipeline with human-in-the-loop rescue confirmation.",
    meta: "Prototype Architecture · U1",
    href: "/projects/garuda-disaster-assistance",
  },
  {
    id: "cur-studying",
    category: "Studying",
    code: "NOW·02",
    title: "B.Tech in Electronics & Communication Engineering",
    description:
      "Undergraduate coursework and laboratory experimentation in analog circuits, digital logic, signals, and microcontroller systems at SRM Institute of Science and Technology.",
    meta: "SRM IST · 2025 – 2029",
  },
  {
    id: "cur-researching",
    category: "Researching",
    code: "NOW·03",
    title: "Multi-Bus Embedded Firmware & Edge Inference",
    description:
      "Investigating SPI/I²C bus arbitration on the ESP32-S3 (N8R8), register-level sensor validation (MPU6050, PN532, NRF24L01+), and lightweight TinyML inference on microcontrollers.",
    meta: "ESP32-S3 · TinyML · RF",
    href: "/projects/bruce-pocket-lab",
  },
  {
    id: "cur-learning",
    category: "Learning",
    code: "NOW·04",
    title: "PCB Layout, Signal Integrity & Systems Architecture",
    description:
      "Moving breadboard prototypes toward cleaner schematic capture, PCB routing discipline, and structured software interfaces using TypeScript and Next.js.",
    meta: "Hardware × Software",
  },
  {
    id: "cur-exploring",
    category: "Reading & Exploring",
    code: "NOW·05",
    title: "Technical Essays, Guitar Practice & Cinema",
    description:
      "Writing field notes on hardware-software co-design and mathematical UI rhythms, practicing acoustic and electric guitar, reading, and watching cinema.",
    meta: "Field Notes · Off-Bench",
    href: "/work",
  },
];

export interface SkillGroup {
  id: string;
  code: string;
  title: string;
  subtitle: string;
  description: string;
  items: string[];
  evidence?: { label: string; href: string }[];
}

/**
 * Six structured skill categories required by the design specification (Page 7):
 * Programming, Electronics, Embedded Experimentation, Hardware & Circuit Design,
 * Development Tools, and Creative Software.
 */
export const skillCategories: SkillGroup[] = [
  {
    id: "programming",
    code: "SK·01",
    title: "Programming",
    subtitle: "Firmware · Scripting · Web Interfaces",
    description:
      "Writing low-level C/C++ firmware for microcontrollers alongside Python tooling, Java fundamentals, and typed TypeScript/Next.js web applications.",
    items: [
      "C / C++",
      "Python",
      "Java",
      "TypeScript",
      "Next.js & React",
      "Tailwind CSS",
      "MDX Content Systems",
    ],
    evidence: [
      { label: "Personal Portfolio", href: "/projects/personal-portfolio" },
      { label: "OLED Video Playback", href: "/projects/esp32-s3-oled-video" },
    ],
  },
  {
    id: "electronics",
    code: "SK·02",
    title: "Electronics",
    subtitle: "Analog · Discrete Logic · Sensors",
    description:
      "Designing and testing discrete analog and digital circuits, frequency generation networks, and gas/inertial sensor front-ends.",
    items: [
      "Analog Circuit Design",
      "Digital Logic",
      "555 Timer IC (Astable)",
      "MQ-6 Gas Sensor Interfacing",
      "RC Frequency Networks",
      "Signal Conditioning",
      "Power Rail Filtering",
    ],
    evidence: [
      { label: "555 Timer Piano", href: "/projects/555-timer-piano" },
      { label: "LPG Gas Detector", href: "/projects/lpg-gas-leakage-detection" },
    ],
  },
  {
    id: "embedded",
    code: "SK·03",
    title: "Embedded Experimentation",
    subtitle: "MCU Bring-Up · Bus Protocols · Edge AI",
    description:
      "Coordinating multi-peripheral buses, direct register verification, wireless RF/NFC modules, and embedded machine learning workflows.",
    items: [
      "ESP32-S3 (N8R8)",
      "Arduino Uno",
      "SPI & I²C Buses",
      "UART / NMEA GPS",
      "MPU6050 IMU & Complementary Filter",
      "NRF24L01+ 2.4GHz & PN532 NFC",
      "TinyML Reproduction",
      "Mesh Networking Concepts",
    ],
    evidence: [
      { label: "Bruce Pocket Lab", href: "/projects/bruce-pocket-lab" },
      { label: "GARUDA Architecture", href: "/projects/garuda-disaster-assistance" },
    ],
  },
  {
    id: "hardware-design",
    code: "SK·04",
    title: "Hardware & Circuit Design",
    subtitle: "Prototyping · Pin Mapping · Diagnostics",
    description:
      "Taking hardware from initial pin-budget allocation and breadboard wiring through thermal/component diagnostics and PCB layout fundamentals.",
    items: [
      "PCB Design Fundamentals",
      "Breadboard Prototyping",
      "Multi-Device GPIO Pin Mapping",
      "ST7735 TFT & SH1106 OLED Wiring",
      "Hardware Diagnostics & Thermal Servicing",
      "Decoupling & Power Budgeting",
    ],
    evidence: [
      { label: "Laptop Thermal Servicing", href: "/projects/laptop-servicing-thermal-maintenance" },
      { label: "TinyML Vibration Setup", href: "/projects/tinyml-vibration-reproduction" },
    ],
  },
  {
    id: "dev-tools",
    code: "SK·05",
    title: "Development Tools",
    subtitle: "Build Systems · Version Control · AI Workflows",
    description:
      "Daily workbench environments for compiling firmware, inspecting serial telemetry, managing repositories, and prototyping with local/cloud AI models.",
    items: [
      "PlatformIO",
      "Arduino IDE",
      "Visual Studio Code",
      "Git & GitHub",
      "Serial Telemetry & Bus Debugging",
      "Local LLMs",
      "Google AI Studio",
    ],
  },
  {
    id: "creative-software",
    code: "SK·06",
    title: "Creative Software",
    subtitle: "Video Post-Production · Visual Editing",
    description:
      "Editing project demonstrations, colour-grading footage, and preparing technical diagrams and visual documentation.",
    items: [
      "DaVinci Resolve",
      "Adobe Photoshop",
      "Technical Diagramming",
      "Documentation Layout",
    ],
  },
];

export interface PersonalInterestItem {
  code: string;
  title: string;
  tag: string;
  description: string;
  href?: string;
}

/**
 * Compact personal interests (Page 4, 7, 10):
 * Mentions music & guitar, books & reading, cinema & films, and gaming subtly.
 * Strictly omits any photography section.
 */
export const personalInterests: PersonalInterestItem[] = [
  {
    code: "INT·01",
    title: "Music & Guitar",
    tag: "ACOUSTICS · RHYTHM",
    description:
      "Practicing guitar and exploring how physical vibration and analog circuits—like our 555 timer astable breadboard piano—turn waveforms into sound.",
    href: "/projects/555-timer-piano",
  },
  {
    code: "INT·02",
    title: "Books & Reading",
    tag: "READING · NOTES",
    description:
      "Reading technical non-fiction, systems design essays, and long-form writing that sharpens how I think and document engineering work.",
  },
  {
    code: "INT·03",
    title: "Cinema & Films",
    tag: "CINEMA · PACING",
    description:
      "Appreciating deliberate pacing, sound design, and visual storytelling in film—an influence that also shaped my editing workflow in DaVinci Resolve.",
  },
  {
    code: "INT·04",
    title: "Gaming",
    tag: "SYSTEMS · INTERACTION",
    description:
      "Unwinding with thoughtfully designed games and observing how real-time mechanics, feedback loops, and world-building come together.",
  },
];

export interface TimelineEntry {
  id: string;
  date: string;
  category: "Academic" | "Experience" | "Milestone" | "Project";
  title: string;
  organization: string;
  description: string;
  href?: string;
}

/**
 * Verified Academic & Project Timeline (Page 7):
 * Uses only verified dates and milestones from the repository.
 */
export const verifiedTimeline: TimelineEntry[] = [
  {
    id: "TL·08",
    date: "2026-10",
    category: "Project",
    title: "GARUDA Disaster-Response Architecture",
    organization: "Prototype Systems Architecture · U1",
    description:
      "Designed a coordinated disaster-response architecture integrating autonomous aerial search, onboard candidate detection, resilient mesh reporting, and human verification.",
    href: "/projects/garuda-disaster-assistance",
  },
  {
    id: "TL·07",
    date: "2026-09",
    category: "Project",
    title: "Bruce Pocket Lab, TinyML & ESP32-S3 Systems",
    organization: "Embedded Hardware & Firmware · U2–U5",
    description:
      "Built the ESP32-S3 (N8R8) Bruce Pocket Lab, reproduced a TinyML vibration-monitoring pipeline, developed a 60 FPS OLED video receiver, and documented laptop thermal servicing.",
    href: "/projects/bruce-pocket-lab",
  },
  {
    id: "TL·06",
    date: "2026-09",
    category: "Milestone",
    title: "NIPAM Workshop on Intellectual Property",
    organization: "National IP Awareness Mission · FN2",
    description:
      "Completed the NIPAM workshop on patents, copyrights, and protecting hardware/software engineering innovations.",
    href: "/blog/ip-awareness-for-engineers",
  },
  {
    id: "TL·05",
    date: "2026-08 — 2026-09",
    category: "Experience",
    title: "Software & AI Systems Intern",
    organization: "SYNK · Remote",
    description:
      "Worked on AI-based systems architecture, structured prompt workflows, and applied software engineering practices.",
  },
  {
    id: "TL·04",
    date: "2026-04",
    category: "Project",
    title: "555 Timer Breadboard Piano",
    organization: "Analog Electronics Build · U6",
    description:
      "Constructed a multi-key astable 555 Timer electronic instrument on a breadboard, tuning resistor ladders to generate distinct audible frequencies.",
    href: "/projects/555-timer-piano",
  },
  {
    id: "TL·03",
    date: "2025-10",
    category: "Project",
    title: "LPG Gas Leakage Detection System",
    organization: "Arduino Safety Prototype · U7",
    description:
      "Built an early undergraduate safety prototype interfacing an MQ-6 gas sensor with an Arduino Uno for threshold detection and audible alerting.",
    href: "/projects/lpg-gas-leakage-detection",
  },
  {
    id: "TL·02",
    date: "2025 — 2029",
    category: "Academic",
    title: "B.Tech in Electronics & Communication Engineering",
    organization: "SRM Institute of Science and Technology · Kattankulathur",
    description:
      "Pursuing undergraduate studies in analog and digital electronics, embedded systems, communication engineering, and software development.",
  },
  {
    id: "TL·01",
    date: "2023 — 2025",
    category: "Academic",
    title: "Higher Secondary Certificate (Computer Science)",
    organization: "Brindavan Public School · Chengalpattu",
    description:
      "Graduated with distinction in Physics, Chemistry, Mathematics, and Computer Science.",
  },
];

export const experience = [
  {
    id: "EXP·01",
    role: "Intern",
    company: "SYNK",
    period: "Aug 2026 - Sept 2026",
    location: "Remote",
    description: "Focused on AI-based systems architecture and applied software workflows.",
  },
];

export const education = [
  {
    id: "EDU·01",
    institution: "SRM Institute of Science and Technology",
    degree: "B.Tech in Electronics & Communication Engineering",
    period: "2025 - 2029",
    location: "Kattankulathur, Tamil Nadu",
    description: "Focusing on embedded systems, digital & analog electronics, IoT, and modern software development.",
  },
  {
    id: "EDU·02",
    institution: "Brindavan Public School",
    degree: "Higher Secondary Certificate (Computer Science)",
    period: "2023 - 2025",
    location: "Chengalpattu, Tamil Nadu",
    description: "Graduated with distinction. Core subjects: Physics, Chemistry, Mathematics, and Computer Science.",
  },
];
