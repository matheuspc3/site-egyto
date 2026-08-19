"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

type LogoProps = {
  /** "white" (padrão) para fundos escuros/laranja; "black" para fundos claros */
  variant?: "white" | "black";
  className?: string;
  /** alt do img */
  alt?: string;
};

/**
 * Logo oficial: LOGO_EGITO_HORIZONTAL.svg (vetorial).
 * O SVG é preto — no modo "white" invertemos via filter para fundos escuros.
 * Único ponto de troca da identidade — fallback para wordmark Anton.
 */
export default function Logo({
  variant = "white",
  className,
  alt = "EGYPT PRODUÇÕES",
}: LogoProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <span
        className={cn(
          "font-display text-2xl leading-none tracking-wide",
          variant === "black" ? "text-egypt-black" : "text-egypt-white",
          className,
        )}
      >
        EGYPT
      </span>
    );
  }

  // eslint-disable-next-line @next/next/no-img-element
  return (
    <img
      src="/brand/logo-horizontal.svg"
      alt={alt}
      className={cn("block h-8 w-auto", variant === "white" && "invert", className)}
      onError={() => setFailed(true)}
    />
  );
}
