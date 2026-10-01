import React from 'react';

// Draw sprites from a character grid. One char = one pixel.
type Palette = Record<string, string>;

interface SpriteProps {
  rows: string[];
  palette: Palette;
  size?: number; // pixel size in px
  className?: string;
  label?: string;
}

export const Sprite: React.FC<SpriteProps> = ({ rows, palette, size = 8, className, label }) => {
  const h = rows.length;
  const w = Math.max(...rows.map((r) => r.length));
  const rects: React.ReactNode[] = [];
  rows.forEach((row, y) => {
    [...row].forEach((c, x) => {
      if (palette[c]) rects.push(<rect key={`${x}-${y}`} x={x} y={y} width={1} height={1} fill={palette[c]} />);
    });
  });
  return (
    <svg
      className={`pixel ${className ?? ''}`}
      width={w * size}
      height={h * size}
      viewBox={`0 0 ${w} ${h}`}
      shapeRendering="crispEdges"
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      {rects}
    </svg>
  );
};

// Sphynx cat mascot (a nod to "Sphynick"). 16 x 16.
export const CAT_ROWS = [
  '..K..........K..',
  '.KPK........KPK.',
  '.KPPK......KPPK.',
  '.KPPPKKKKKKPPPK.',
  'KPPPPPPPPPPPPPPK',
  'KPPPPPPPPPPPPPPK',
  'KPPKKPPPPPPKKPPK',
  'KPPKGKPPPPKGKPPK',
  'KPPKKKPPPPKKKPPK',
  'KPPPPPPKKPPPPPPK',
  '.KPPPPPPPPPPPPK.',
  '..KPPPPKKPPPPK..',
  '...KKPPPPPPKK...',
  '.....KKKKKK.....',
];

export const CAT_PALETTE: Palette = {
  K: '#0e0f12',
  P: '#e7b9a0',
  G: '#7ee0a8',
};

export const HEART_ROWS = [
  '.KK.KK.',
  'KRRKRRK',
  'KRRRRRK',
  '.KRRRK.',
  '..KRK..',
  '...K...',
];
export const HEART_PALETTE: Palette = { K: '#0e0f12', R: '#ff6b6b' };

export const PixelCat: React.FC<{ size?: number; className?: string }> = ({ size = 10, className }) => (
  <Sprite rows={CAT_ROWS} palette={CAT_PALETTE} size={size} className={className} label="Pixel sphynx cat" />
);
