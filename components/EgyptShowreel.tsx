"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Play, X } from "lucide-react";
import { siteData } from "@/data/dadosSite";
import { EASE } from "@/lib/constants";
import { lockBodyScroll } from "@/lib/utils";
import SectionTitle from "./SectionTitle";

export default function EgyptShowreel() {
  const [open, setOpen] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    lockBodyScroll(open);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      lockBodyScroll(false);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const { showreel } = siteData;

  return (
    <section id="showreel" className="relative bg-egypt-black px-5 py-24 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionTitle index="03" label="SHOWREEL" title={showreel.title} />

        <button
          type="button"
          onClick={() => {
            setFailed(false);
            setOpen(true);
          }}
          className="group mt-10 flex w-full items-center justify-between border border-egypt-white/20 px-6 py-8 text-left transition-colors hover:border-egypt-orange hover:bg-egypt-orange sm:px-10 sm:py-12"
        >
          <span className="flex items-center gap-5">
            <Play
              size={28}
              className="text-egypt-orange transition-transform duration-300 group-hover:scale-110 group-hover:text-egypt-black"
              aria-hidden
            />
            <span className="font-display text-4xl uppercase leading-none tracking-tight text-egypt-white sm:text-7xl">
              {showreel.year}
            </span>
          </span>
          <span className="text-[0.65rem] font-medium uppercase tracking-[0.3em] text-egypt-silver group-hover:text-egypt-black">
            Assistir
          </span>
        </button>

        <p className="mt-3 text-[0.6rem] font-medium uppercase tracking-[0.3em] text-egypt-silver">
          {showreel.note}
        </p>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-egypt-black/95 p-4 sm:p-10"
            onClick={() => setOpen(false)}
            role="dialog"
            aria-modal="true"
            aria-label="Showreel"
          >
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Fechar showreel"
              className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center text-egypt-white hover:text-egypt-orange"
            >
              <X size={26} />
            </button>

            <div
              className="relative aspect-video w-full max-w-5xl bg-egypt-black"
              onClick={(e) => e.stopPropagation()}
            >
              {failed ? (
                <div className="flex h-full w-full flex-col items-center justify-center gap-4">
                  <p className="font-display text-3xl uppercase tracking-tight text-egypt-white/70">
                    REEL INDISPONÍVEL
                  </p>
                  <p className="text-[0.6rem] font-medium uppercase tracking-[0.3em] text-egypt-silver">
                    O vídeo ainda não foi publicado em public/videos/showreel.mp4
                  </p>
                </div>
              ) : (
                /* o vídeo só monta quando o modal abre (lazy — não pré-carrega) */
                <video
                  src={showreel.video}
                  controls
                  autoPlay
                  playsInline
                  className="h-full w-full bg-egypt-black object-contain"
                  onError={() => setFailed(true)}
                />
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
