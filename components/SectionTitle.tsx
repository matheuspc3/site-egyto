import { cn } from "@/lib/utils";

type SectionTitleProps = {
  /** número editorial opcional, ex. "01" */
  index?: string;
  label?: string;
  title?: string;
  align?: "left" | "center" | "right";
  className?: string;
};

export default function SectionTitle({
  index,
  label,
  title,
  align = "left",
  className,
}: SectionTitleProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3",
        align === "center" && "items-center text-center",
        align === "right" && "items-end text-right",
        className,
      )}
    >
      {(index || label) && (
        <p className="flex items-center gap-3 text-[0.65rem] font-medium uppercase tracking-[0.3em] text-egypt-silver">
          {index && <span className="text-egypt-orange">{index}</span>}
          {label && (
            <>
              {index && <span className="h-px w-8 bg-egypt-silver/40" />}
              {label}
            </>
          )}
        </p>
      )}
      {title && (
        <h2 className="font-display text-4xl uppercase leading-[0.95] tracking-tight sm:text-6xl">
          {title}
        </h2>
      )}
    </div>
  );
}
