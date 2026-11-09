export const personalInfo = {
  name: "Vikraman V",
  role: "Electronics & Communication Engineering Student",
  designation: "ECE UNDERGRADUATE · SRM IST '29",
  email: "byvikraman@gmail.com",
  location: "Tamil Nadu, India",
  linkedin: "https://www.linkedin.com/in/byvikraman/",
  github: "https://github.com/V1kraman",
  resume: "/Vikraman_V_Resume.pdf",
  about:
    "Electronics and Communication Engineering student at SRM Institute of Science and Technology with a strong interest in embedded systems, electronics, and software development. Hands-on experience in designing Arduino-, ESP32-S3-, and analog circuit-based projects, complemented by programming skills in Python, Java, C/C++, and TypeScript. A proactive learner with strong teamwork and problem-solving abilities, seeking opportunities to apply technical knowledge through internships and real-world engineering projects.",
};

export interface CapabilityLayer {
  id: string;
  name: string;
  domain: string;
  summary: string;
  items: string[];
}

export const capabilityLayers: CapabilityLayer[] = [
  {
    id: "L1",
    name: "EMBEDDED & HARDWARE PROTOTYPING",
    domain: "Microcontrollers · Discrete Circuits · Sensors",
    summary: "Breadboard bring-up, microcontroller pin mapping, power regulation, and sensor interfacing.",
    items: [
      "ESP32-S3 (N8R8)",
      "Arduino Uno",
      "555 Timer IC",
      "Analog Circuit Design",
      "PCB Design",
      "Digital Logic",
      "MQ-6 Gas Sensor",
      "MPU6050 IMU",
      "ST7735 TFT & SH1106 OLED",
    ],
  },
  {
    id: "L2",
    name: "BUS PROTOCOLS, RF & EDGE INTELLIGENCE",
    domain: "Communication · Signal Processing · Edge AI",
    summary: "Multi-device bus coordination, register-level sensor validation, and on-device inference architectures.",
    items: [
      "SPI & I²C Buses",
      "UART / NMEA GPS",
      "Direct Register Access",
      "Complementary Filter",
      "TinyML Reproduction",
      "NRF24L01+ 2.4GHz & PN532 NFC",
      "Mesh Networking Concepts",
      "Local LLMs",
    ],
  },
  {
    id: "L3",
    name: "PROGRAMMING & FIRMWARE",
    domain: "Embedded C/C++ · Application Code · Web Stack",
    summary: "Writing firmware for resource-constrained targets alongside modern typed web applications.",
    items: [
      "C / C++",
      "Python",
      "Java",
      "TypeScript",
      "Next.js & React",
      "Tailwind CSS",
      "MDX Content Systems",
      "Vibe Coding",
    ],
  },
  {
    id: "L4",
    name: "WORKBENCH & CREATIVE TOOLING",
    domain: "Build Systems · Diagnostics · Media Production",
    summary: "Development environments, version control, schematic capture, and visual post-production tools.",
    items: [
      "PlatformIO",
      "Arduino IDE",
      "Visual Studio Code",
      "Git & GitHub",
      "Hardware Diagnostics",
      "DaVinci Resolve",
      "Adobe Photoshop",
      "Google AI Studio",
    ],
  },
  {
    id: "L5",
    name: "ENGINEERING PRACTICE & COLLABORATION",
    domain: "Documentation · Teamwork · IP Awareness",
    summary: "Translating lab experiments and team builds into reproducible, well-documented engineering case studies.",
    items: [
      "Technical Documentation",
      "Problem Solving",
      "Team Coordination",
      "Iterative Debugging",
      "IP & Patent Awareness (NIPAM)",
      "Critical Thinking",
      "Attention to Detail",
    ],
  },
];

export interface BeyondTheBenchItem {
  code: string;
  title: string;
  tag: string;
  description: string;
  detail: string;
  href?: string;
}

export const beyondTheBench: BeyondTheBenchItem[] = [
  {
    code: "AUX·01",
    title: "Photography & Visual Framing",
    tag: "OBSERVATION · OPTICS",
    description:
      "Capturing quiet moments, hardware macro details, and everyday geometry behind a lens—training patience, composition, and attention to light.",
    detail: "Camera craft & post-processing in Adobe Photoshop / DaVinci Resolve",
  },
  {
    code: "AUX·02",
    title: "Guitar & Sound Synthesis",
    tag: "ACOUSTICS · RHYTHM",
    description:
      "Practicing guitar and exploring how physical vibration and analog circuits (like our 555 Timer astable piano) turn electrical waveforms into music.",
    detail: "Musical practice & analog audio experimentation",
    href: "/projects/555-timer-piano",
  },
  {
    code: "AUX·03",
    title: "Technical Writing & Design Notes",
    tag: "FIELD NOTES · ESSAYS",
    description:
      "Writing reflections on the boundary between hardware and software, mathematical UI design, and lessons from workshops and lab repairs.",
    detail: "Published in the unified /work archive",
    href: "/work",
  },
];

export const skills = {
  programming: ["Python", "Java", "C Programming", "TypeScript", "Vibe Coding"],
  electronics: ["PCB Design", "ESP32", "Analog Circuit Design", "Mesh", "Digital Logic", "Arduino", "Local LLMS"],
  tools: ["PlatformIO", "DaVinci Resolve", "Adobe Photoshop", "Visual Studio Code", "Git", "Google AI Studio"],
  soft: [
    "Problem Solving",
    "Communication",
    "Teamwork",
    "Leadership",
    "Time Management",
    "Adaptability",
    "Creativity",
    "Attention to Detail",
    "Critical Thinking",
    "Project Coordination",
  ],
};

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

export const projects = [
  {
    title: "Smart Gas Leak Detector",
    description: "An Arduino-based gas leak detection system utilizing the MQ-6 sensor to identify LPG leaks and trigger an alarm system.",
    tech: ["Arduino", "MQ-6 Sensor", "C++", "Circuit Design"],
    link: "/projects/lpg-gas-leakage-detection",
    github: "https://github.com/byvikraman",
    image: "/images/projects/gas-leak.png.jpeg",
  },
  {
    title: "555 Timer Breadboard Piano",
    description: "A multi-key electronic piano built on a breadboard using analog electronics and the 555 Timer IC in astable mode.",
    tech: ["555 Timer IC", "Analog Electronics", "Breadboard Circuits"],
    link: "/projects/555-timer-piano",
    github: "#",
    image: "/images/projects/piano.png.jpeg",
  },
];
