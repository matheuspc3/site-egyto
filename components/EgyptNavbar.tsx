"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { siteData } from "@/data/dadosSite";
import { cn, lockBodyScroll } from "@/lib/utils";
import { EASE } from "@/lib/constants";
import Logo from "./Logo";

function smoothTo(href: string) {
  const el = document.querySelector(href);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function EgyptNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // lock body + Esc
  useEffect(() => {
    lockBodyScroll(open);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      lockBodyScroll(false);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const go = (href: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setOpen(false);
    // espera o menu fechar antes de rolar
    setTimeout(() => smoothTo(href), open ? 250 : 0);
  };

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        scrolled
          ? "border-b border-egypt-white/10 bg-egypt-black/80 backdrop-blur-md"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <nav
        aria-label="Navegação principal"
        className="flex h-16 items-center justify-between px-5 sm:px-8"
      >
        <a href="#inicio" onClick={go("#inicio")} className="shrink-0">
          <Logo variant="white" className="h-6" alt="EGYPT PRODUÇÕES — início" />
        </a>

        <ul className="hidden items-center gap-6 lg:flex">
          {siteData.nav.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={go(link.href)}
                className="text-[0.7rem] font-medium uppercase tracking-[0.25em] text-egypt-white/80 transition-colors hover:text-egypt-orange"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="menu-mobile"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          className="flex h-10 w-10 items-center justify-center text-egypt-white lg:hidden"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="menu-mobile"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="fixed inset-x-0 top-16 bottom-0 z-40 flex flex-col justify-between bg-egypt-orange px-6 pb-8 pt-6 lg:hidden"
          >
            <ul className="flex flex-col gap-1">
              {siteData.nav.map((link, i) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={go(link.href)}
                    className="group flex items-baseline gap-4 border-b border-egypt-black/15 py-3 text-egypt-black"
                  >
                    <span className="font-display text-4xl uppercase leading-none transition-transform duration-300 group-hover:translate-x-2">
                      {link.label}
                    </span>
                    <span className="text-[0.6rem] font-medium tracking-[0.2em] opacity-60">
                      0{i + 1}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
            <p className="text-[0.65rem] font-medium uppercase tracking-[0.3em] text-egypt-black/70">
              {siteData.hero.location}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
