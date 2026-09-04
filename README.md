# Vikraman V — Developer & Electronics Engineer Portfolio

A modern, high-performance personal portfolio and engineering showcase built with **Next.js 15 (App Router)**, **React 19**, **TypeScript**, and **Tailwind CSS v4**.

Designed with an aesthetic dark theme, responsive typography, smooth entrance animations via Motion, and an MDX-powered content system for technical case studies and articles.

https://byvikraman.vercel.app/

---

## ✨ Features

- **⚡ Modern Tech Stack**: Next.js 15 App Router, React 19 Server & Client Components, and TypeScript.
- **🎨 Dark Minimalist Design**: Custom luxury dark aesthetic with subtle grain texture, curated typography using Google Font *Manrope*, and gold/neutral accents.
- **🛠️ Electronics & Software Showcase**: Dual-focus presentation highlighting embedded systems (Arduino, sensors, analog circuit design) alongside full-stack software development.
- **📝 MDX-Powered Case Studies & Journal**: Full Markdown/MDX engine (`gray-matter`, `react-markdown`, `remark-gfm`, `rehype-highlight`) supporting syntax-highlighted code snippets and deep-dive technical project writeups.
- **📱 Fully Responsive**: Tailored fluid layouts across mobile, tablet, and ultra-wide screens.
- **🛡️ Robust Reliability**: Embedded client error boundaries and serialization safety guards ensuring rock-solid stability.

---

## 🚀 Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Library**: [React 19](https://react.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Animations**: [Motion](https://motion.dev/)
- **Markdown / MDX**: `react-markdown`, `gray-matter`, `remark-gfm`, `rehype-highlight`
- **Language**: [TypeScript](https://www.typescriptlang.org/)

---

## 📁 Project Structure

```text
├── app/                  # Next.js App Router routes & layouts
│   ├── blog/             # Writing & project case study pages (/blog & /blog/[slug])
│   ├── projects/         # Filterable projects catalog (/projects)
│   ├── globals.css       # Tailwind CSS v4 styling & animations
│   ├── layout.tsx        # Root layout with font configuration & metadata
│   └── page.tsx          # Homepage assembling sections
├── components/           # Reusable UI & section components
│   ├── About.tsx         # About & personal bio
│   ├── Contact.tsx       # Contact details & social links
│   ├── Education.tsx     # Academic qualifications
│   ├── Experience.tsx    # Professional & internship experience
│   ├── Footer.tsx        # Site footer
│   ├── Hero.tsx          # Hero section with introduction & action links
│   ├── Navbar.tsx        # Responsive navigation bar
│   ├── Projects.tsx      # Featured projects grid
│   ├── Reveal.tsx        # Motion scroll-reveal wrapper
│   ├── SafeJsonProtection.tsx # Client-side runtime guard
│   └── Skills.tsx        # Categorized technical & engineering skills
├── content/posts/        # Markdown & MDX articles / project case studies
├── lib/                  # Site configuration, static data & MDX loaders
│   ├── content/          # Markdown parsing & reading time utilities
│   └── data.ts           # Personal info, education, skills, and projects data
└── public/               # Static assets & images
```

---

## 🛠️ Getting Started

### Prerequisites

- **Node.js**: v18.18.0 or newer (v20+ recommended)
- **Package Manager**: npm, yarn, or bun

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/V1kraman/portfolio.git
   cd portfolio
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

---

## 📜 Available Scripts

- `npm run dev`: Starts the Next.js local development server with Turbopack / Fast Refresh.
- `npm run build`: Compiles and bundles the production-optimized application.
- `npm run start`: Starts the Next.js production server.
- `npm run lint`: Runs ESLint across the codebase.

---

## 📬 Contact & Links

- **Name**: Vikraman V
- **Email**: [byvikraman@gmail.com](mailto:byvikraman@gmail.com)
- **LinkedIn**: [linkedin.com/in/byvikraman](https://www.linkedin.com/in/byvikraman/)
- **GitHub**: [github.com/V1kraman](https://github.com/V1kraman)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
