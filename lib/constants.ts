import type { Variants } from "framer-motion";

/** curva usada em todas as transições (expressive, sem easing default) */
export const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/** variante de linha: sobe e revela; index custom para stagger manual */
export const lineReveal = (i: number = 0): Variants => ({
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: i * 0.12, ease: EASE },
  },
});

/** fade + subida simples */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE },
  },
};

/** stagger container para listas */
export const stagger: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};
