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
 * Logo oficial: PNG gerado do LOGO EGITO.pdf (branco/preto).
 * Único ponto de troca da identidade — fallback para wordmark Anton
 * caso o PNG não exista (converta o PDF e nomeie public/brand/logo-white.png
 * e logo-black.png).
 */
export default function Logo({
  variant = "white",
  className,
  alt = "EGYPT PRODUÇÕES",
}: LogoProps) {
  const [failed, setFailed] = useState(false);
  const src = variant === "black" ? "/brand/logo-black.png" : "/brand/logo-white.png";

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
      src={src}
      alt={alt}
      className={cn("block h-8 w-auto", className)}
      onError={() => setFailed(true)}
    />
  );
}
