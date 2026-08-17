/** junta classes condicionais: cn("a", ok && "b") -> "a b" */
export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}

/** trava o scroll do body (menus fullscreen / modais) */
export function lockBodyScroll(locked: boolean) {
  document.documentElement.style.overflow = locked ? "hidden" : "";
  document.body.style.overflow = locked ? "hidden" : "";
}
