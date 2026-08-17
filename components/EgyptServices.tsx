"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { siteData, type Service } from "@/data/dadosSite";
import { cn } from "@/lib/utils";
import SectionTitle from "./SectionTitle";

export default function EgyptServices() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section id="servicos" className="bg-egypt-black px-5 py-24 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionTitle index="01" label={siteData.services.label} title="O QUE FAZEMOS" />

        <div className="mt-16">
          {siteData.services.items.map((service, i) => (
            <ServiceRow
              key={service.index}
              service={service}
              isActive={active === i}
              onHover={() => setActive(i)}
              onLeave={() => setActive(null)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceRow({
  service,
  isActive,
  onHover,
  onLeave,
}: {
  service: Service;
  isActive: boolean;
  onHover: () => void;
  onLeave: () => void;
}) {
  return (
    <div
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      className={cn(
        "group relative grid grid-cols-[3rem_1fr_1fr] items-center gap-4 border-t border-egypt-white/12 py-6 transition-colors sm:grid-cols-[4rem_1fr_1fr] sm:gap-8 sm:py-8",
        isActive && "text-egypt-orange",
      )}
    >
      <span className="text-[0.7rem] font-medium tracking-[0.2em] text-egypt-silver">
        {service.index}
      </span>

      <h3 className="font-display text-2xl uppercase leading-none tracking-tight sm:text-4xl">
        {service.title}
      </h3>

      <p className="hidden max-w-sm text-sm leading-relaxed text-egypt-white/60 sm:block">
        {service.description}
      </p>

      {/* faixa laranja de destaque (desktop) */}
      {isActive && (
        <motion.span
          layoutId="service-orange"
          className="absolute left-0 top-0 h-full w-1 bg-egypt-orange"
        />
      )}
    </div>
  );
}
