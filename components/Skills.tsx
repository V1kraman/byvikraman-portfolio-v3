"use client";

import { Reveal } from "./Reveal";
import { skills } from "@/lib/data";
import { motion } from "motion/react";
import { Code2, Cpu, Wrench, Users } from "lucide-react";

export function Skills() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  const icons = {
    programming: <Code2 className="w-5 h-5 text-muted-foreground mb-4 group-hover:text-primary transition-colors" />,
    electronics: <Cpu className="w-5 h-5 text-muted-foreground mb-4 group-hover:text-primary transition-colors" />,
    tools: <Wrench className="w-5 h-5 text-muted-foreground mb-4 group-hover:text-primary transition-colors" />,
    soft: <Users className="w-5 h-5 text-muted-foreground mb-4 group-hover:text-primary transition-colors" />
  };

  return (
    <section className="py-24 md:py-32 relative border-t border-border/60 bg-card/35">
      <div className="container px-8 md:px-12 mx-auto">
        <Reveal>
          <div className="text-center mb-16">
            <h2 className="text-[10px] font-medium uppercase tracking-[0.2em] text-primary mb-4">Expertise</h2>
            <div className="text-[40px] md:text-[50px] font-light tracking-[-0.02em] text-foreground">
              Tools &amp; Technologies
            </div>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Object.entries(skills).map(([category, items], idx) => (
            <Reveal key={category} delay={idx * 0.1}>
              <div className="group h-full p-8 rounded-2xl bg-card border border-border hover:border-primary/40 transition-colors duration-500">
                {icons[category as keyof typeof icons]}
                <h3 className="text-sm uppercase tracking-widest text-foreground/90 mb-6 font-medium">
                  {category}
                </h3>
                <motion.ul
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-10%" }}
                  className="flex flex-wrap gap-2"
                >
                  {items.map((skill) => (
                    <motion.li
                      key={skill}
                      variants={itemVariants}
                      className="px-3 py-1.5 bg-secondary/70 border border-border rounded-md text-[11px] uppercase tracking-wider text-muted-foreground hover:text-foreground hover:border-primary/40 transition-all cursor-default"
                    >
                      {skill}
                    </motion.li>
                  ))}
                </motion.ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
