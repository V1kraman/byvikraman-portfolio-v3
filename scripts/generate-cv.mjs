import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import fs from "fs";
import path from "path";

async function generateCV() {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([595.28, 841.89]); // A4 dimensions in points
  const { width, height } = page.getSize();

  const helvetica = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const helveticaBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const helveticaOblique = await pdfDoc.embedFont(StandardFonts.HelveticaOblique);

  // Palette
  const gold = rgb(0.76, 0.64, 0.44); // #C2A370
  const dark = rgb(0.1, 0.1, 0.12);
  const gray = rgb(0.4, 0.4, 0.45);
  const lightGray = rgb(0.88, 0.88, 0.9);

  let y = height - 50;

  // Header
  page.drawText("VIKRAMAN V", {
    x: 50,
    y,
    size: 24,
    font: helveticaBold,
    color: dark,
  });

  y -= 18;
  page.drawText("Electronics & Communication Engineering Student | Hardware & Software", {
    x: 50,
    y,
    size: 10,
    font: helveticaBold,
    color: gold,
  });

  y -= 16;
  const contactLine = "Email: byvikraman@gmail.com   |   Phone: +91 9360625695   |   Location: Chengalpattu, Tamil Nadu";
  page.drawText(contactLine, {
    x: 50,
    y,
    size: 8.5,
    font: helvetica,
    color: gray,
  });

  y -= 14;
  const linksLine = "GitHub: github.com/V1kraman   |   LinkedIn: linkedin.com/in/byvikraman";
  page.drawText(linksLine, {
    x: 50,
    y,
    size: 8.5,
    font: helvetica,
    color: gray,
  });

  y -= 15;
  // Divider
  page.drawLine({
    start: { x: 50, y },
    end: { x: width - 50, y },
    thickness: 1,
    color: lightGray,
  });

  y -= 25;

  // Section: Summary
  function drawSectionHeading(title) {
    page.drawText(title.toUpperCase(), {
      x: 50,
      y,
      size: 11,
      font: helveticaBold,
      color: dark,
    });
    page.drawLine({
      start: { x: 50, y: y - 4 },
      end: { x: width - 50, y: y - 4 },
      thickness: 0.75,
      color: gold,
    });
    y -= 20;
  }

  drawSectionHeading("Professional Summary");
  const summaryText = [
    "Electronics and Communication Engineering student at SRM Institute of Science and Technology with a strong",
    "interest in embedded systems, analog electronics, and modern software development. Hands-on experience designing",
    "microcontroller and analog circuit-based systems, complemented by software skills in Python, Java, C, and Web.",
    "Proactive learner with strong teamwork, leadership, and problem-solving abilities seeking engineering opportunities.",
  ];
  for (const line of summaryText) {
    page.drawText(line, {
      x: 50,
      y,
      size: 9,
      font: helvetica,
      color: dark,
      lineHeight: 13,
    });
    y -= 14;
  }

  y -= 10;
  // Section: Education
  drawSectionHeading("Education");

  page.drawText("SRM Institute of Science and Technology", {
    x: 50,
    y,
    size: 10.5,
    font: helveticaBold,
    color: dark,
  });
  page.drawText("2025 - 2029", {
    x: width - 110,
    y,
    size: 9,
    font: helvetica,
    color: gray,
  });
  y -= 14;
  page.drawText("Bachelor of Technology (B.Tech) - Electronics & Communication Engineering", {
    x: 50,
    y,
    size: 9,
    font: helveticaOblique,
    color: gray,
  });
  y -= 13;
  page.drawText("Kattankulathur, Tamil Nadu. Focus: Embedded systems, IoT architecture, and digital electronics.", {
    x: 50,
    y,
    size: 8.5,
    font: helvetica,
    color: dark,
  });

  y -= 18;
  page.drawText("Brindavan Public School", {
    x: 50,
    y,
    size: 10.5,
    font: helveticaBold,
    color: dark,
  });
  page.drawText("2023 - 2025", {
    x: width - 110,
    y,
    size: 9,
    font: helvetica,
    color: gray,
  });
  y -= 14;
  page.drawText("Higher Secondary Certificate (HSC) - Computer Science", {
    x: 50,
    y,
    size: 9,
    font: helveticaOblique,
    color: gray,
  });
  y -= 13;
  page.drawText("Graduated with distinction. Core subjects: Physics, Chemistry, Mathematics, and Computer Science.", {
    x: 50,
    y,
    size: 8.5,
    font: helvetica,
    color: dark,
  });

  y -= 18;
  // Section: Experience
  drawSectionHeading("Experience");

  page.drawText("SYNK", {
    x: 50,
    y,
    size: 10.5,
    font: helveticaBold,
    color: dark,
  });
  page.drawText("Aug 2026 - Sept 2026", {
    x: width - 150,
    y,
    size: 9,
    font: helvetica,
    color: gray,
  });
  y -= 14;
  page.drawText("Engineering Intern - AI Systems Architecture (Remote)", {
    x: 50,
    y,
    size: 9,
    font: helveticaOblique,
    color: gray,
  });
  y -= 13;
  page.drawText("• Researched and prototyped AI-based system architectures and integrations.", {
    x: 60,
    y,
    size: 8.5,
    font: helvetica,
    color: dark,
  });
  y -= 12;
  page.drawText("• Collaborated with engineering teams on systems analysis and pipeline optimization.", {
    x: 60,
    y,
    size: 8.5,
    font: helvetica,
    color: dark,
  });

  y -= 18;
  // Section: Technical Projects
  drawSectionHeading("Key Projects");

  page.drawText("Smart LPG Gas Leak Detection System", {
    x: 50,
    y,
    size: 10,
    font: helveticaBold,
    color: dark,
  });
  page.drawText("Hardware & Embedded C++", {
    x: width - 180,
    y,
    size: 8.5,
    font: helveticaBold,
    color: gold,
  });
  y -= 13;
  page.drawText("• Built an autonomous gas leak monitor utilizing MQ-6 sensor, buzzer alerts, and Arduino logic.", {
    x: 60,
    y,
    size: 8.5,
    font: helvetica,
    color: dark,
  });
  y -= 12;
  page.drawText("• Designed analog comparator thresholds and automated buzzer/LED early warning sequences.", {
    x: 60,
    y,
    size: 8.5,
    font: helvetica,
    color: dark,
  });

  y -= 16;
  page.drawText("Digital Synthesizer & Tone Generator", {
    x: 50,
    y,
    size: 10,
    font: helveticaBold,
    color: dark,
  });
  page.drawText("Arduino & Audio Electronics", {
    x: width - 180,
    y,
    size: 8.5,
    font: helveticaBold,
    color: gold,
  });
  y -= 13;
  page.drawText("• Designed a multi-key digital synthesizer utilizing PWM frequency modulation on ATMega microcontrollers.", {
    x: 60,
    y,
    size: 8.5,
    font: helvetica,
    color: dark,
  });
  y -= 12;
  page.drawText("• Engineered switch debouncing algorithms and low-latency audio response buffers.", {
    x: 60,
    y,
    size: 8.5,
    font: helvetica,
    color: dark,
  });

  y -= 18;
  // Section: Skills
  drawSectionHeading("Technical & Core Competencies");

  const skillsList = [
    { cat: "Electronics & Hardware:", items: "PCB Design, 555 Timer IC, Analog Circuits, MQ-6 Sensor, Arduino, Embedded Systems, Digital Logic" },
    { cat: "Programming Languages:", items: "Python, Java, C Programming, TypeScript, JavaScript, C++" },
    { cat: "Web & Frameworks:", items: "React, Next.js, Tailwind CSS, Node.js, REST APIs" },
    { cat: "Engineering Tools:", items: "Git & GitHub, VS Code, Altium / KiCad, Figma, Adobe Photoshop, DaVinci Resolve" },
    { cat: "Soft Skills:", items: "Problem Solving, Technical Communication, Leadership, Team Collaboration, Project Coordination" },
  ];

  for (const s of skillsList) {
    page.drawText(s.cat, {
      x: 50,
      y,
      size: 8.5,
      font: helveticaBold,
      color: dark,
    });
    page.drawText(s.items, {
      x: 175,
      y,
      size: 8.5,
      font: helvetica,
      color: gray,
    });
    y -= 14;
  }

  const pdfBytes = await pdfDoc.save();
  const publicDir = path.resolve("./public");
  fs.writeFileSync(path.join(publicDir, "Vikraman_V_Resume.pdf"), pdfBytes);
  fs.writeFileSync(path.join(publicDir, "cv.pdf"), pdfBytes);
  console.log("Successfully generated Vikraman_V_Resume.pdf and cv.pdf");
}

generateCV().catch(console.error);
