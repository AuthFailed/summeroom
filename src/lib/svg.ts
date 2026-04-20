import type { Plant } from '../data/plants';
import type { Pot } from '../data/pots';

export function createLeafSVG(plant: Plant): string {
  const { leafColor, spotColor, stripes, vertical, fern, veins, small } = plant;

  if (vertical) {
    return `
      <svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
        <rect width="300" height="300" fill="#e8e1ce"/>
        <ellipse cx="150" cy="260" rx="80" ry="15" fill="#8a6a48" opacity="0.4"/>
        <path d="M120 260 Q115 150, 125 50 Q130 45, 135 50 Q140 150, 135 260 Z" fill="${leafColor}"/>
        <path d="M150 265 Q145 130, 155 30 Q160 25, 165 30 Q170 130, 165 265 Z" fill="${leafColor}"/>
        <path d="M180 260 Q175 160, 185 60 Q190 55, 195 60 Q200 160, 195 260 Z" fill="${leafColor}"/>
        <path d="M120 260 Q115 150, 125 50" stroke="${spotColor}" stroke-width="1.5" fill="none" opacity="0.7"/>
        <path d="M150 265 Q145 130, 155 30" stroke="${spotColor}" stroke-width="1.5" fill="none" opacity="0.7"/>
        <path d="M180 260 Q175 160, 185 60" stroke="${spotColor}" stroke-width="1.5" fill="none" opacity="0.7"/>
        <g opacity="0.5">
          <path d="M118 80 L137 80 M118 110 L137 110 M118 140 L137 140 M118 170 L137 170 M118 200 L137 200 M118 230 L137 230" stroke="${spotColor}" stroke-width="1"/>
          <path d="M148 60 L167 60 M148 90 L167 90 M148 120 L167 120 M148 150 L167 150 M148 180 L167 180 M148 210 L167 210 M148 240 L167 240" stroke="${spotColor}" stroke-width="1"/>
          <path d="M178 90 L197 90 M178 120 L197 120 M178 150 L197 150 M178 180 L197 180 M178 210 L197 210 M178 240 L197 240" stroke="${spotColor}" stroke-width="1"/>
        </g>
      </svg>
    `;
  }

  if (fern) {
    let fronds = '';
    for (let i = 0; i < 9; i++) {
      const angle = -80 + i * 20;
      const pinnae = Array.from({ length: 14 }, (_, j) => {
        const y = -20 - j * 12;
        const len = 8 + Math.sin(j * 0.3) * 4;
        return `<ellipse cx="-${len}" cy="${y}" rx="${len}" ry="4" fill="${leafColor}" transform="rotate(-25 -${len} ${y})"/>
                <ellipse cx="${len}" cy="${y}" rx="${len}" ry="4" fill="${leafColor}" transform="rotate(25 ${len} ${y})"/>`;
      }).join('');
      fronds += `
        <g transform="translate(150 250) rotate(${angle})">
          <path d="M0 0 Q-8 -80, 0 -180" stroke="${leafColor}" stroke-width="3" fill="none"/>
          ${pinnae}
        </g>
      `;
    }
    return `
      <svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
        <rect width="300" height="300" fill="#e8e1ce"/>
        <ellipse cx="150" cy="265" rx="60" ry="10" fill="#8a6a48" opacity="0.4"/>
        ${fronds}
      </svg>
    `;
  }

  if (small) {
    let branches = '';
    for (let b = 0; b < 5; b++) {
      const angle = -50 + b * 25;
      let leaves = '';
      for (let l = 0; l < 8; l++) {
        const y = -30 - l * 22;
        leaves += `
          <ellipse cx="-14" cy="${y}" rx="13" ry="7" fill="${leafColor}" transform="rotate(-20 -14 ${y})"/>
          <ellipse cx="14" cy="${y}" rx="13" ry="7" fill="${leafColor}" transform="rotate(20 14 ${y})"/>
        `;
      }
      branches += `
        <g transform="translate(150 260) rotate(${angle})">
          <path d="M0 0 Q-2 -100, 0 -210" stroke="#2d4a2b" stroke-width="3" fill="none"/>
          ${leaves}
        </g>
      `;
    }
    return `
      <svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
        <rect width="300" height="300" fill="#e8e1ce"/>
        <ellipse cx="150" cy="265" rx="60" ry="10" fill="#8a6a48" opacity="0.4"/>
        ${branches}
      </svg>
    `;
  }

  const holes =
    spotColor === '#f3efe5'
      ? `
    <ellipse cx="100" cy="150" rx="18" ry="10" fill="${spotColor}"/>
    <ellipse cx="200" cy="170" rx="15" ry="8" fill="${spotColor}"/>
    <ellipse cx="130" cy="100" rx="12" ry="6" fill="${spotColor}"/>
    <ellipse cx="180" cy="110" rx="14" ry="7" fill="${spotColor}"/>
  `
      : '';

  const pinkSpot =
    spotColor === '#b8542e'
      ? `
    <path d="M90 90 Q130 100, 170 90 Q180 130, 150 180 Q110 170, 90 140 Z" fill="${spotColor}" opacity="0.85"/>
  `
      : '';

  const stripePattern = stripes
    ? `
    <path d="M150 40 C155 100, 155 200, 150 270" stroke="${spotColor}" stroke-width="2" fill="none"/>
    ${Array.from({ length: 12 })
      .map((_, i) => {
        const y = 60 + i * 16;
        const w = 40 + Math.sin(i * 0.5) * 20;
        return `<path d="M${150 - w} ${y} Q150 ${y - 5}, ${150 + w} ${y}" stroke="${spotColor}" stroke-width="1.5" fill="none" opacity="0.8"/>`;
      })
      .join('')}
  `
    : '';

  const veinPattern = veins
    ? `
    <path d="M150 40 L150 270" stroke="${spotColor}" stroke-width="3"/>
    <path d="M150 80 L90 100 M150 120 L80 150 M150 160 L85 200 M150 200 L100 240" stroke="${spotColor}" stroke-width="2" fill="none"/>
    <path d="M150 80 L210 100 M150 120 L220 150 M150 160 L215 200 M150 200 L200 240" stroke="${spotColor}" stroke-width="2" fill="none"/>
  `
    : '';

  return `
    <svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
      <rect width="300" height="300" fill="#e8e1ce"/>
      <ellipse cx="150" cy="270" rx="65" ry="12" fill="#8a6a48" opacity="0.4"/>
      <path d="M150 260 L148 180 L152 180 Z" fill="#2d4a2b"/>
      <path d="M150 40 C80 60, 50 140, 70 220 C90 250, 150 255, 170 250 C230 230, 250 150, 230 80 C210 50, 180 35, 150 40 Z" fill="${leafColor}"/>
      ${holes}
      ${pinkSpot}
      ${stripePattern}
      ${veinPattern}
      ${
        !stripes && !veins && !pinkSpot
          ? `
        <path d="M150 40 Q148 150, 152 250" stroke="#1a2419" stroke-width="1" fill="none" opacity="0.4"/>
        <path d="M150 80 L100 110 M150 110 L90 140 M150 140 L95 170 M150 170 L105 200 M150 200 L115 225" stroke="#1a2419" stroke-width="0.8" fill="none" opacity="0.3"/>
        <path d="M150 80 L200 110 M150 110 L210 140 M150 140 L205 170 M150 170 L195 200 M150 200 L185 225" stroke="#1a2419" stroke-width="0.8" fill="none" opacity="0.3"/>
      `
          : ''
      }
    </svg>
  `;
}

export function createPotSVG(pot: Pot): string {
  const { shape, colorA, colorB, code } = pot;

  const potBody = (pattern: string): string => `
    <svg viewBox="0 0 200 220" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="pot-${code}" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stop-color="${colorA}"/>
          <stop offset="1" stop-color="${colorB}"/>
        </linearGradient>
        <clipPath id="clip-${code}">
          <path d="M40 60 Q30 60 32 80 L45 190 Q48 210 60 210 L140 210 Q152 210 155 190 L168 80 Q170 60 160 60 Z"/>
        </clipPath>
      </defs>

      <ellipse cx="100" cy="212" rx="60" ry="6" fill="#1a2419" opacity="0.15"/>

      <path d="M40 60 Q30 60 32 80 L45 190 Q48 210 60 210 L140 210 Q152 210 155 190 L168 80 Q170 60 160 60 Z"
            fill="url(#pot-${code})"/>

      <g clip-path="url(#clip-${code})">
        ${pattern}
      </g>

      <g clip-path="url(#clip-${code})" opacity="0.25">
        ${Array.from({ length: 50 })
          .map(
            (_, i) =>
              `<line x1="30" y1="${62 + i * 3}" x2="170" y2="${62 + i * 3}" stroke="#1a2419" stroke-width="0.4"/>`,
          )
          .join('')}
      </g>

      <ellipse cx="100" cy="62" rx="65" ry="6" fill="${colorA}"/>
      <ellipse cx="100" cy="61" rx="60" ry="5" fill="#1a2419" opacity="0.4"/>
      <ellipse cx="100" cy="60" rx="55" ry="4" fill="#3a4238"/>

      <ellipse cx="100" cy="60" rx="55" ry="3.5" fill="#4a3826"/>
      <ellipse cx="100" cy="58" rx="40" ry="2" fill="#2a1e14" opacity="0.6"/>

      <path d="M45 70 L55 200" stroke="#ffffff" stroke-width="3" opacity="0.12" stroke-linecap="round"/>
    </svg>
  `;

  if (shape === 'wave') {
    const waves = Array.from({ length: 8 })
      .map((_, i) => {
        const y = 75 + i * 18;
        return `<path d="M30 ${y} Q65 ${y - 4}, 100 ${y} T170 ${y}" stroke="${colorB}" stroke-width="2.5" fill="none" opacity="0.7"/>`;
      })
      .join('');
    return potBody(waves);
  }

  if (shape === 'ribs') {
    const ribs = Array.from({ length: 11 })
      .map((_, i) => {
        const x = 40 + i * 12;
        return `<line x1="${x}" y1="65" x2="${x}" y2="210" stroke="${colorB}" stroke-width="2" opacity="0.6"/>`;
      })
      .join('');
    return potBody(ribs);
  }

  if (shape === 'spiral') {
    let spiral = '';
    for (let i = 0; i < 45; i++) {
      const y = 65 + i * 3.2;
      const offset = Math.sin(i * 0.25) * 3;
      spiral += `<path d="M${35 + offset} ${y} Q100 ${y - 2 + offset}, ${165 - offset} ${y}" stroke="${colorB}" stroke-width="1.2" fill="none" opacity="0.55"/>`;
    }
    return potBody(spiral);
  }

  if (shape === 'hex') {
    let hex = '';
    const hexSize = 10;
    for (let row = 0; row < 10; row++) {
      for (let col = 0; col < 10; col++) {
        const cx = 35 + col * hexSize * 1.5 + (row % 2 ? hexSize * 0.75 : 0);
        const cy = 72 + row * hexSize * 1.3;
        if (cx > 170 || cy > 205) continue;
        hex += `<polygon points="${cx},${cy - hexSize / 2} ${cx + (hexSize / 2) * 0.87},${cy - hexSize / 4} ${cx + (hexSize / 2) * 0.87},${cy + hexSize / 4} ${cx},${cy + hexSize / 2} ${cx - (hexSize / 2) * 0.87},${cy + hexSize / 4} ${cx - (hexSize / 2) * 0.87},${cy - hexSize / 4}" stroke="${colorB}" stroke-width="0.8" fill="none" opacity="0.5"/>`;
      }
    }
    return potBody(hex);
  }

  if (shape === 'crater') {
    let dots = '';
    for (let i = 0; i < 60; i++) {
      const x = 40 + Math.random() * 120;
      const y = 70 + Math.random() * 130;
      const r = 1.5 + Math.random() * 3;
      dots += `<circle cx="${x}" cy="${y}" r="${r}" fill="${colorB}" opacity="${0.3 + Math.random() * 0.4}"/>`;
    }
    return potBody(dots);
  }

  if (shape === 'facets') {
    let facets = '';
    for (let row = 0; row < 7; row++) {
      for (let col = 0; col < 8; col++) {
        const x = 40 + col * 16;
        const y = 70 + row * 20;
        const up = (row + col) % 2 === 0;
        if (up) {
          facets += `<polygon points="${x},${y + 15} ${x + 8},${y} ${x + 16},${y + 15}" stroke="${colorB}" stroke-width="0.6" fill="none" opacity="0.4"/>`;
        } else {
          facets += `<polygon points="${x},${y} ${x + 16},${y} ${x + 8},${y + 15}" stroke="${colorB}" stroke-width="0.6" fill="none" opacity="0.4"/>`;
        }
      }
    }
    return potBody(facets);
  }

  return potBody('');
}
