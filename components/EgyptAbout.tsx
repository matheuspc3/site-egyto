import Image from "next/image";
import { siteData } from "@/data/dadosSite";
import { cn } from "@/lib/utils";
import Logo from "./Logo";

export default function EgyptAbout() {
  const { about } = siteData;

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

        {/* strip editorial de branding */}
        <div className="mt-16 grid grid-cols-2 gap-4 sm:gap-6">
          {about.images.map((img, i) => (
            <figure
              key={img.src}
              className={cn("overflow-hidden", i % 2 === 1 && "mt-10 sm:mt-16")}
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
      </div>
    </section>
  );
}
