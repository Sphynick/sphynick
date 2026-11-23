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

/** Clean URL paths that scroll to a section of the one-page home. */
export const SECTION_BY_PATH: Record<string, string> = {
  '/about': 'about',
  '/work': 'work',
  '/process': 'process',
  '/services': 'services',
  '/reviews': 'testimonials',
  '/writing': 'updates',
  '/contact': 'contact',
};
