import React from 'react';

export const colors = {
  bg:      '#ddd8b0',
  dark:    '#1a1c2c',
  green:   '#98e060',
  white:   '#fff',
  muted:   '#8899a0',
  border:  '#000',
  card:    '#fff',
  error:   '#c05000',
  success: '#2a6020',
} as const;

export const typeColors: Record<string, { bg: string; accent: string }> = {
  fire:     { bg: '#ffc8a0', accent: '#c05000' },
  water:    { bg: '#a0c8f8', accent: '#1048a0' },
  grass:    { bg: '#b8e8a0', accent: '#2a6020' },
  electric: { bg: '#fff0a0', accent: '#b08000' },
  psychic:  { bg: '#e8b8f8', accent: '#701090' },
  normal:   { bg: '#d8c8a8', accent: '#504030' },
  flying:   { bg: '#c0d8f0', accent: '#4060a0' },
  poison:   { bg: '#d0a0e0', accent: '#502080' },
  ground:   { bg: '#e0c898', accent: '#705030' },
  rock:     { bg: '#c8b890', accent: '#605040' },
  bug:      { bg: '#c8e868', accent: '#406000' },
  ghost:    { bg: '#b0a0c8', accent: '#3a2060' },
  dragon:   { bg: '#b8a0f0', accent: '#4020a0' },
  ice:      { bg: '#b0e8e8', accent: '#106888' },
  fighting: { bg: '#f0b078', accent: '#803000' },
  dark:     { bg: '#a0a0a0', accent: '#303030' },
  steel:    { bg: '#c0c0d0', accent: '#505068' },
  fairy:    { bg: '#f0b0c8', accent: '#a03060' },
};

export function getTypeStyle(type: string) {
  const key = type.toLowerCase().split('/')[0].trim();
  return typeColors[key] || { bg: '#d8c8a8', accent: '#504030' };
}

export const FR_SPRITE = (id: number) =>
  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iii/firered-leafgreen/${id}.png`;

export const px = {
  card: { border: '3px solid #000', boxShadow: '4px 4px 0 0 #000' } as React.CSSProperties,
  badge: { fontSize: '7px', background: 'rgba(255,255,255,0.65)', padding: '3px 7px', border: '1px solid #000', display: 'inline-block' } as React.CSSProperties,
  sprite: { imageRendering: 'pixelated' } as React.CSSProperties,
  font: { fontFamily: "var(--font-pixel, 'Courier New', monospace)" } as React.CSSProperties,
  input: {
    background: '#fff',
    border: '3px solid #000',
    padding: '8px 10px',
    fontSize: '9px',
    fontFamily: "var(--font-pixel, 'Courier New', monospace)",
    outline: 'none',
    width: '100%',
  } as React.CSSProperties,
  btn: {
    fontFamily: "var(--font-pixel, 'Courier New', monospace)",
    fontSize: '8px',
    padding: '10px 16px',
    border: '3px solid #000',
    boxShadow: '3px 3px 0 0 #000',
    cursor: 'pointer',
    transition: 'transform 0.1s',
  } as React.CSSProperties,
  btnPrimary: { background: '#1a1c2c', color: '#98e060' } as React.CSSProperties,
  btnSecondary: { background: '#d8c8a8', color: '#1a1c2c' } as React.CSSProperties,
  btnDanger: { background: '#c05000', color: '#fff' } as React.CSSProperties,
  label: { fontSize: '8px', color: '#504030', marginBottom: '4px', display: 'block' } as React.CSSProperties,
};
