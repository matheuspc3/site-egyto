"use client";

import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { siteData, type ScrollScene } from "@/data/dadosSite";
import { cn } from "@/lib/utils";
import Logo from "./Logo";

const SEEK_STEP_MS = 30; // cadência mínima entre seeks (evita rate-limit do Chrome)

/* ------------------------------------------------------------------ */
/* SceneLine — usa hooks estáveis por cena (não pode viver em um map)  */
/* ------------------------------------------------------------------ */

type SceneLineProps = {
  scene: ScrollScene;
  progress: MotionValue<number>;
};

function SceneLine({ scene, progress }: SceneLineProps) {
  const { start, end, fade = 0.04 } = scene;
  const opacity = useTransform(progress, [start - fade, start, end, end + fade], [0, 1, 1, 0]);
  const y = useTransform(progress, [start, end], [20, -20]);

  const tone = scene.tone === "dark" ? "text-egypt-black" : "text-egypt-white";
  const size =
    scene.size === "xl"
      ? "text-6xl sm:text-8xl lg:text-9xl"
      : scene.size === "xs"
        ? "text-2xl sm:text-3xl"
        : "text-4xl sm:text-6xl";
  const align =
    scene.align === "center"
      ? "items-center text-center"
      : scene.align === "right"
        ? "items-end text-right"
        : "items-start text-left";
  const vpos =
    scene.vpos === "top" ? "justify-start" : scene.vpos === "bottom" ? "justify-end" : "justify-center";

  return (
    <motion.div
      style={{ opacity, y }}
      className={cn(
        "pointer-events-none absolute inset-0 z-[6] flex flex-col px-5 pb-28 sm:px-8",
        vpos,
        align,
      )}
    >
      <div className={cn("font-display uppercase leading-[0.95] tracking-tight", tone, size)}>
        {scene.lines.map((line) => (
          <div key={line}>{line}</div>
        ))}
      </div>
      {scene.tagline && (
        <p
          className={cn(
            "mt-4 max-w-md text-[0.65rem] font-medium uppercase tracking-[0.3em]",
            tone === "dark" ? "text-egypt-black/80" : "text-egypt-white/70",
          )}
        >
          {scene.tagline}
        </p>
      )}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Componente principal                                                */
/* ------------------------------------------------------------------ */

export default function EgyptScrollFilm() {
  const reduced = useReducedMotion(); // boolean | null — null = pode animar
  const trackRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  const canScrub = useRef(false);
  const pending = useRef(0);
  const lastSeek = useRef(0);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const staticMode = !!reduced || error;

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });

  // overlay laranja no fim do filme (12% final)
  const orangeOpacity = useTransform(scrollYProgress, [0.88, 1], [0, 1]);
  // dica "role para cima" no fim
  const hintOpacity = useTransform(scrollYProgress, [0.94, 1], [0, 1]);
  // barra de progresso
  const progressScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const flushSeek = () => {
    timer.current = null;
    const v = videoRef.current;
    if (!v) return;
    v.currentTime = pending.current;
    lastSeek.current = performance.now();
  };

  const scheduleSeek = (time: number) => {
    pending.current = time;
    if (timer.current) return; // já agendado — o flush pega o valor mais recente
    const delay = Math.max(0, SEEK_STEP_MS - (performance.now() - lastSeek.current));
    timer.current = setTimeout(flushSeek, delay);
  };

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (!canScrub.current) return;
    const dur = videoRef.current?.duration ?? 0;
    if (!dur || Number.isNaN(dur)) return;
    scheduleSeek(v * dur);
  });

  // cleanup dos timers
  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  // fallback: se o vídeo nunca carregar, sai do loading e mostra conteúdo estático
  useEffect(() => {
    if (staticMode) return;
    const t = setTimeout(() => setLoading(false), 6000);
    return () => clearTimeout(t);
  }, [staticMode]);

  const onLoadedMetadata = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;
    v.defaultMuted = true;
    canScrub.current = true;
  };

  const onLoadedData = () => setLoading(false);

  return (
    <div ref={trackRef} className="relative h-[380svh] md:h-[500svh]">
      <div className="sticky top-0 h-[100svh] overflow-hidden bg-egypt-black">
        {/* vídeo sincronizado com o scroll */}
        {!staticMode ? (
          <video
            ref={videoRef}
            src={siteData.scrollFilm.video}
            poster={siteData.scrollFilm.poster}
            muted
            playsInline
            preload="auto"
            disablePictureInPicture
            aria-hidden
            tabIndex={-1}
            className="absolute inset-0 z-0 h-full w-full object-cover"
            onLoadedMetadata={onLoadedMetadata}
            onLoadedData={onLoadedData}
            onError={() => setError(true)}
          />
        ) : (
          <div className="absolute inset-0 z-0 bg-egypt-black" />
        )}

        {/* scrim leve para legibilidade do texto */}
        <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t from-egypt-black/60 via-transparent to-egypt-black/30" />

        {/* cenas */}
        {!staticMode ? (
          <SceneOverlayScrub progress={scrollYProgress} />
        ) : (
          <SceneOverlayStatic />
        )}

        {/* overlay laranja — o frame "vira laranja" e segue para o manifesto */}
        {!staticMode && (
          <motion.div
            style={{ opacity: orangeOpacity }}
            className="pointer-events-none absolute inset-0 z-[5] bg-egypt-orange"
          />
        )}

        {/* dica de reverso no fim */}
        {!staticMode && (
          <motion.p
            style={{ opacity: hintOpacity }}
            className="pointer-events-none absolute bottom-20 right-5 z-[6] text-right text-[0.6rem] font-medium uppercase tracking-[0.3em] text-egypt-black sm:right-8"
          >
            {siteData.scrollFilm.durationHint}
          </motion.p>
        )}

        {/* barra de progresso */}
        {!staticMode && (
          <div className="absolute inset-x-0 bottom-0 z-[8] h-px bg-egypt-white/15">
            <motion.div
              style={{ scaleX: progressScale }}
              className="h-full w-full origin-left bg-egypt-orange"
            />
          </div>
        )}

        {/* loading */}
        {!staticMode && (
          <AnimatePresence>
            {loading && (
              <motion.div
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0 z-[10] flex flex-col items-center justify-center gap-6 bg-egypt-black"
              >
                <Logo variant="white" className="h-8" />
                <div className="h-px w-32 overflow-hidden bg-egypt-white/15">
                  <div
                    className="h-full w-full origin-left bg-egypt-orange"
                    style={{ animation: "loadline 1.4s ease-in-out infinite" }}
                  />
                </div>
                <p className="text-[0.6rem] font-medium uppercase tracking-[0.4em] text-egypt-silver">
                  Carregando
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Overlays de cena (scrub e estático)                                 */
/* ------------------------------------------------------------------ */

function SceneOverlayScrub({ progress }: { progress: MotionValue<number> }) {
  return (
    <>
      {siteData.scrollFilm.scenes.map((scene) => (
        <SceneLine key={scene.id} scene={scene} progress={progress} />
      ))}
    </>
  );
}

/** Reduced-motion / erro de vídeo: frame estático + cenas empilhadas. */
function SceneOverlayStatic() {
  return (
    <div className="absolute inset-0 z-[6] flex flex-col justify-end gap-6 overflow-y-auto px-5 pb-24 sm:px-8">
      {siteData.scrollFilm.scenes.map((scene) => (
        <div key={scene.id} className="max-w-md">
          <p className="font-display text-2xl uppercase leading-[1.05] tracking-tight text-egypt-white sm:text-4xl">
            {scene.lines.join(" ")}
          </p>
          {scene.tagline && (
            <p className="mt-2 text-[0.65rem] font-medium uppercase tracking-[0.3em] text-egypt-silver">
              {scene.tagline}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
