"use client";

import { motion } from "framer-motion";
import { siteData } from "@/data/dadosSite";
import { fadeUp, stagger } from "@/lib/constants";
import Logo from "./Logo";

export default function EgyptHero() {
  return (
    <section
      id="inicio"
      className="relative flex min-h-[100svh] flex-col justify-between overflow-hidden bg-egypt-black px-5 pt-24 pb-6 sm:px-8"
    >
      {/* texto técnico superior */}
      <motion.div
        initial="hidden"
        animate="show"
        variants={stagger}
        className="flex items-center justify-between text-[0.6rem] font-medium uppercase tracking-[0.3em] text-egypt-silver"
      >
        <motion.p variants={fadeUp}>{siteData.hero.kicker}</motion.p>
        <motion.p variants={fadeUp} className="hidden sm:block">
          {siteData.hero.location}
        </motion.p>
      </motion.div>

      {/* palavra EGYPT gigante */}
      <div className="my-6">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15 }}
          className="font-display text-[26vw] leading-[0.85] tracking-tight text-egypt-white sm:text-[20vw]"
        >
          EGYPT
        </motion.h1>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="-mt-2 flex items-center gap-3 sm:-mt-4"
        >
          <Logo variant="white" className="h-5 sm:h-6" />
          <span className="text-[0.65rem] font-medium uppercase tracking-[0.3em] text-egypt-silver">
            Produções
          </span>
        </motion.div>
      </div>

      {/* linha de palavras */}
      <motion.div
        initial="hidden"
        animate="show"
        variants={stagger}
        className="flex flex-wrap items-center gap-x-5 gap-y-1 border-t border-egypt-white/15 pt-5"
      >
        {siteData.hero.words.map((word, i) => (
          <motion.span
            key={word}
            variants={fadeUp}
            className="flex items-center gap-5 text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-egypt-white/70"
          >
            {i > 0 && <span className="h-px w-6 bg-egypt-orange" />}
            {word}
          </motion.span>
        ))}
        <motion.span
          variants={fadeUp}
          className="ml-auto hidden text-[0.6rem] font-medium uppercase tracking-[0.3em] text-egypt-silver sm:block"
        >
          22.94° S — 43.19° W
        </motion.span>
      </motion.div>
    </section>
  );
}
