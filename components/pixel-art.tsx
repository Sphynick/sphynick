import React, { useMemo } from 'react';

// Deterministic pixel mosaic generated from a string, so each project gets its own thumbnail.
function hash(str: string) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}
function rng(seed: number) {
  let s = seed;
  return () => {
    s = (Math.imul(s, 1664525) + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

const PALETTES = [
  ['#0e0f12', '#2a2d35', '#ffb454', '#ffd9a0'],
  ['#0e0f12', '#1f3a34', '#7ee0a8', '#c8f5dc'],
  ['#0e0f12', '#2b2a45', '#8f8cff', '#d2d1ff'],
  ['#0e0f12', '#45262b', '#ff6b6b', '#ffc3c3'],
];

export const PixelThumb: React.FC<{ seed: string; cols?: number; rows?: number; className?: string }> = ({
  seed,
  cols = 32,
  rows = 18,
  className,
}) => {
  const cells = useMemo(() => {
    const r = rng(hash(seed));
    const pal = PALETTES[hash(seed) % PALETTES.length];
    const out: { x: number; y: number; c: string }[] = [];
    // mirrored left-right for a symmetric, "designed" feel
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < Math.ceil(cols / 2); x++) {
        const v = r();
        const c = v > 0.92 ? pal[3] : v > 0.78 ? pal[2] : v > 0.45 ? pal[1] : pal[0];
        out.push({ x, y, c });
        out.push({ x: cols - 1 - x, y, c });
      }
    }
    return out;
  }, [seed, cols, rows]);

  return (
    <svg
      className={`pixel w-full h-full ${className ?? ''}`}
      viewBox={`0 0 ${cols} ${rows}`}
      preserveAspectRatio="xMidYMid slice"
      shapeRendering="crispEdges"
      aria-hidden
    >
      {cells.map((c, i) => (
        <rect key={i} x={c.x} y={c.y} width={1} height={1} fill={c.c} />
      ))}
    </svg>
  );
};

export const SectionTitle: React.FC<{ index: string; title: string }> = ({ index, title }) => (
  <div className="flex items-center gap-4 mb-10">
    <span className="font-pixel text-[10px] text-amber">{index}</span>
    <h2 className="font-pixel text-base sm:text-xl uppercase">{title}</h2>
    <span className="flex-1 h-[2px] bg-line" />
  </div>
);
