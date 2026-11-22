export const NAV_OFFSET = 72;

/** Smooth-scrolls to an element id, leaving room for the sticky header. */
export function scrollToId(id: string): boolean {
  const el = document.getElementById(id);
  if (!el) return false;
  window.scrollTo({
    top: el.getBoundingClientRect().top + window.scrollY - NAV_OFFSET,
    behavior: 'smooth',
  });
  return true;
}
