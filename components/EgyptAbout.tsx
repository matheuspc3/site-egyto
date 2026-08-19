"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { siteData } from "@/data/dadosSite";
import { cn } from "@/lib/utils";
import Logo from "./Logo";

export default function EgyptAbout() {
  const { about } = siteData;
  const trackRef = useRef<HTMLDivElement>(null);

  const slide = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth, behavior: "smooth" });
  };

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const stopAutoplay = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const startAutoplay = () => {
    if (timerRef.current) return;
    timerRef.current = setInterval(() => {
      const el = trackRef.current;
      if (!el) return;
      const max = el.scrollWidth - el.clientWidth;
      if (el.scrollLeft >= max - 4) el.scrollTo({ left: 0, behavior: "smooth" });
      else el.scrollBy({ left: el.clientWidth, behavior: "smooth" });
    }, 4000);
  };

  // autoplay: avança a cada 4s e volta ao início ao chegar no fim
  useEffect(() => {
    startAutoplay();
    return stopAutoplay;
  }, []);

  return (
    <section id="sobre" className="bg-egypt-white px-5 py-24 text-egypt-black sm:px-8">
      <div className="mx-auto max-w-6xl">
        <p className="text-[0.65rem] font-medium uppercase tracking-[0.3em] text-egypt-black/50">
          {about.label}
        </p>

        <h2 className="mt-6 max-w-4xl font-display text-4xl uppercase leading-[1.02] tracking-tight sm:text-6xl md:text-7xl">
          {about.headline}
        </h2>

        <div className="mt-12 grid grid-cols-1 gap-10 md:grid-cols-[1fr_1.4fr]">
          <div>
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-egypt-orange">
              {about.location}
            </p>
            <Logo variant="black" className="mt-6 h-8" />
          </div>
          <div className="flex flex-col gap-5 text-base leading-relaxed text-egypt-black/75">
            {about.text.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>

        {/* carrossel editorial */}
        <div className="mt-16">
          <div
            ref={trackRef}
            onMouseEnter={stopAutoplay}
            onMouseLeave={startAutoplay}
            className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 sm:gap-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {about.images.map((img) => (
              <figure
                key={img.src}
                className="w-[82%] shrink-0 snap-start overflow-hidden sm:w-[58%] md:w-[44%]"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  width={900}
                  height={1200}
                  className="aspect-[3/4] w-full object-cover"
                />
              </figure>
            ))}
          </div>

          <div className="mt-6 flex items-center gap-2">
            <button
              onClick={() => slide(-1)}
              aria-label="Imagem anterior"
              className="flex h-10 w-10 items-center justify-center border border-egypt-black/20 font-display text-lg text-egypt-black transition-colors hover:border-egypt-orange hover:text-egypt-orange"
            >
              ←
            </button>
            <button
              onClick={() => slide(1)}
              aria-label="Imagem seguinte"
              className="flex h-10 w-10 items-center justify-center border border-egypt-black/20 font-display text-lg text-egypt-black transition-colors hover:border-egypt-orange hover:text-egypt-orange"
            >
              →
            </button>
            <span className="ml-2 text-[0.6rem] font-medium uppercase tracking-[0.3em] text-egypt-black/40">
              Estúdio
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
