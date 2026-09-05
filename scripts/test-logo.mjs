import fs from 'fs';
import sharp from 'sharp';

/**
 * Mathematically Pure Model with Unbroken Collinear Inner & Outer Edges
 */
export function generatePureLogo({
  canvasSize = 1000,
  markWidth = 840,       // Total width of V at top (halfTopOuter = 420)
  markHeight = 680,      // Total height of V from top to bottom
  armWidth = 245,        // Horizontal arm width (halfTopInner = 175)
  bottomWidth = 190,     // Flat bottom width (halfBotOuter = 95)
  hCutYRatio = 0.25,     // Position of horizontal cut from top (25%)
  gapWidth = 32,         // Uniform thickness of all cuts
  yOffset = -12,         // Optical centering offset
  color = '#111817',
  bg = 'none',
}) {
  const cx = canvasSize / 2;
  const topY = (canvasSize - markHeight) / 2 + yOffset;
  const botY = topY + markHeight;

  const halfTopOuter = markWidth / 2;      // 420
  const halfBotOuter = bottomWidth / 2;   // 95
  const halfTopInner = halfTopOuter - armWidth; // 175

  // Outer slope: dx/dy = (420 - 95) / 680 = 325 / 680 = 0.47794
  const m = (halfTopOuter - halfBotOuter) / markHeight;

  // Outer edges:
  const xOutL = (y) => (cx - halfTopOuter) + (y - topY) * m;
  const xOutR = (y) => (cx + halfTopOuter) - (y - topY) * m;

  // Inner edges of the V arms (completely parallel to outer edges):
  const xInL = (y) => (cx - halfTopInner) + (y - topY) * m;
  const xInR = (y) => (cx + halfTopInner) - (y - topY) * m;

  // Horizontal cut:
  const hTop = topY + markHeight * hCutYRatio;
  const hBot = hTop + gapWidth;

  // 1. Top-Left Parallelogram:
  const p_tl = [
    [xOutL(topY), topY],
    [xInL(topY), topY],
    [xInL(hTop), hTop],
    [xOutL(hTop), hTop],
  ];

  // 2. Top-Right Parallelogram:
  const p_tr = [
    [xInR(topY), topY],
    [xOutR(topY), topY],
    [xOutR(hTop), hTop],
    [xInR(hTop), hTop],
  ];

  // Crossing Point of the two inner edges:
  // (cx - halfTopInner) + (y_cross - topY)*m = cx
  // (y_cross - topY)*m = halfTopInner
  // y_cross = topY + halfTopInner / m
  const y_cross = topY + halfTopInner / m;

  // Vertical gap distance for perpendicular thickness gapWidth:
  const dy_gap = gapWidth * Math.sqrt(1 + m * m);

  // Lower edges meet at (cx, y_bot_apex):
  const y_bot_apex = y_cross + dy_gap;

  // Cut 3 upper edge: line through (cx, y_cross) with slope -m:
  // x(y) = cx - (y - y_cross) * m
  // Intersection with outer left edge xOutL(y) = cx - halfTopOuter + (y - topY)*m:
  // cx - (y - y_cross)*m = cx - halfTopOuter + (y - topY)*m
  // 2 * (y - topY) * m = halfTopOuter + (y_cross - topY)*m = halfTopOuter + halfTopInner
  // y_midL_bot = topY + (halfTopOuter + halfTopInner) / (2 * m)
  const y_midL_bot = topY + (halfTopOuter + halfTopInner) / (2 * m);

  // Cut 3 lower edge: line through (cx, y_bot_apex) with slope -m:
  // Intersection with outer left edge:
  const y_bot_L_corner = y_midL_bot + dy_gap / 2;
  const y_midR_bot = y_midL_bot;
  const y_bot_R_corner = y_bot_L_corner;

  // 3. Middle-Left Piece:
  // - Top: hBot
  // - Inner edge: perfectly collinear along xInL down to (cx, y_cross)
  // - Bottom edge: along Cut 3 upper edge down-left to (xOutL(y_midL_bot), y_midL_bot)
  // - Outer edge: along xOutL back up to hBot
  const p_ml = [
    [xOutL(hBot), hBot],
    [xInL(hBot), hBot],
    [cx, y_cross],
    [xOutL(y_midL_bot), y_midL_bot],
  ];

  // 4. Middle-Right Piece (reflection of Middle-Left across cx):
  const p_mr = [
    [xInR(hBot), hBot],
    [xOutR(hBot), hBot],
    [xOutR(y_midR_bot), y_midR_bot],
    [cx, y_cross],
  ];

  // 5. Bottom Piece:
  // - Top apex at (cx, y_bot_apex)
  // - Slopes down-left along Cut 3 lower edge to (xOutL(y_bot_L_corner), y_bot_L_corner)
  // - Follows outer left edge down to (xOutL(botY), botY)
  // - Flat bottom to (xOutR(botY), botY)
  // - Follows outer right edge up to (xOutR(y_bot_R_corner), y_bot_R_corner)
  // - Slopes up-left along Cut 2 lower edge to (cx, y_bot_apex)
  const p_bot = [
    [cx, y_bot_apex],
    [xOutL(y_bot_L_corner), y_bot_L_corner],
    [xOutL(botY), botY],
    [xOutR(botY), botY],
    [xOutR(y_bot_R_corner), y_bot_R_corner],
  ];

  const formatPoints = (pts) => pts.map(([x, y]) => `${x.toFixed(2)},${y.toFixed(2)}`).join(' ');

  const svg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${canvasSize} ${canvasSize}" width="${canvasSize}" height="${canvasSize}">
  ${bg !== 'none' ? `<rect width="${canvasSize}" height="${canvasSize}" fill="${bg}" />` : ''}
  <g fill="${color}">
    <polygon points="${formatPoints(p_tl)}" />
    <polygon points="${formatPoints(p_tr)}" />
    <polygon points="${formatPoints(p_ml)}" />
    <polygon points="${formatPoints(p_mr)}" />
    <polygon points="${formatPoints(p_bot)}" />
  </g>
</svg>
  `.trim();

  return {
    svg,
    metrics: {
      cx,
      topY,
      botY,
      y_cross,
      y_bot_apex,
      y_midL_bot,
      y_bot_L_corner,
      markWidth,
      markHeight,
      m: m.toFixed(4),
      bottomPieceHeight: (botY - y_bot_apex).toFixed(1),
      bottomSideLength: (botY - y_bot_L_corner).toFixed(1),
    }
  };
}

const res = generatePureLogo({});
fs.writeFileSync('public/pure-preview.svg', res.svg);
sharp(Buffer.from(res.svg))
  .png()
  .toFile('public/pure-preview.png')
  .then(() => {
    console.log("Rendered pure-preview.png successfully!", res.metrics);
  });
