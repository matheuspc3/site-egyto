"use client";

import { motion } from "framer-motion";
import { siteData } from "@/data/dadosSite";
import { EASE } from "@/lib/constants";

export default function EgyptManifesto() {
  return (
    <section
      id="manifesto"
      className="flex min-h-[80svh] items-center bg-egypt-orange px-5 py-28 sm:px-8"
    >
      <div className="mx-auto w-full max-w-6xl">
        <p className="mb-10 text-[0.65rem] font-medium uppercase tracking-[0.3em] text-egypt-black/60">
          MANIFESTO
        </p>
        {siteData.manifesto.lines.map((line, i) => (
          <div key={line} className="overflow-hidden">
            <motion.h2
              initial={{ y: "100%" }}
              whileInView={{ y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.9, delay: i * 0.12, ease: EASE }}
              className="font-display text-5xl uppercase leading-[1.02] tracking-tight text-egypt-black sm:text-7xl md:text-8xl"
            >
              {line}
            </motion.h2>
          </div>
        ))}
      </div>
    </section>
  );
}
