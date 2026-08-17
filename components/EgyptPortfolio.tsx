import Image from "next/image";
import { siteData } from "@/data/dadosSite";
import { cn } from "@/lib/utils";
import SectionTitle from "./SectionTitle";

export default function EgyptPortfolio() {
  const { projects, emptyMessage } = siteData.portfolio;

  return (
    <section id="trabalhos" className="bg-egypt-black px-5 py-24 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionTitle index="02" label={siteData.portfolio.label} title="TRABALHOS" />

        {projects.length === 0 ? (
          <div className="mt-16 flex flex-col items-start justify-center border border-dashed border-egypt-white/20 px-8 py-24">
            <p className="font-display text-3xl uppercase leading-tight text-egypt-white/80 sm:text-5xl">
              {emptyMessage}
            </p>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-egypt-white/50">
              Adicione projetos em <code className="text-egypt-orange">data/dadosSite.ts</code> —
              campo <code>portfolio.projects</code> — com imagens em{" "}
              <code className="text-egypt-orange">public/images/portfolio/</code>.
            </p>
          </div>
        ) : (
          <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2">
            {projects.map((project, i) => (
              <a
                key={project.title}
                href="#contato"
                className={cn(
                  "group relative block overflow-hidden",
                  i % 3 === 1 && "md:translate-y-10",
                )}
              >
                <Image
                  src={project.image}
                  alt={project.alt}
                  width={1200}
                  height={800}
                  className="aspect-[3/2] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-egypt-black/80 to-transparent p-5">
                  <div>
                    <p className="text-[0.6rem] font-medium uppercase tracking-[0.3em] text-egypt-silver">
                      {project.category}
                    </p>
                    <h3 className="font-display text-2xl uppercase tracking-tight text-egypt-white">
                      {project.title}
                    </h3>
                  </div>
                  <span className="font-display text-3xl text-egypt-orange">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
