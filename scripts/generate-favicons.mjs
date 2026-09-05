import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

/**
 * PRODUCTION-GRADE MASTER FAVICON & APP ICON GENERATOR
 * Brand: Vikraman V
 * Master geometry: 5-polygon geometric monogram with horizontal and crossing cuts
 */

// Master Coordinate Space: 1000 x 1000
function getPolygonPoints({
  canvasSize = 1000,
  // Scale of mark inside the canvas (e.g. 0.72 = 72% of canvas, leaving 14% padding each side)
  markScale = 0.74,
  // Optical adjustments for micro sizes (16px, 32px)
  gapMultiplier = 1.0,
  strokeMultiplier = 1.0,
  yOffsetRatio = -0.015, // Optical center shift upwards (V visual gravity)
}) {
  const cx = canvasSize / 2;
  const H = canvasSize * markScale;
  const topY = (canvasSize - H) / 2 + canvasSize * yOffsetRatio;
  const botY = topY + H;

  // Base proportions
  // Aspect ratio of the mark: width / height = 840 / 680 = 1.235
  const W = H * 1.235;
  const halfTopOuter = W / 2;
  const halfBotOuter = (W * 0.23) / 2; // flat bottom width ~ 23% of top width

  // Arm width
  const baseArmWidth = W * 0.285 * strokeMultiplier;
  const halfTopInner = halfTopOuter - baseArmWidth;

  // Outer slope m = dx/dy
  const m = (halfTopOuter - halfBotOuter) / H;

  // Outer edges:
  const xOutL = (y) => (cx - halfTopOuter) + (y - topY) * m;
  const xOutR = (y) => (cx + halfTopOuter) - (y - topY) * m;

  // Inner edges (parallel to outer edges):
  const xInL = (y) => (cx - halfTopInner) + (y - topY) * m;
  const xInR = (y) => (cx + halfTopInner) - (y - topY) * m;

  // Gap width
  const baseGap = (H * 0.046) * gapMultiplier;
  const hCutTop = topY + H * 0.25;
  const hBot = hCutTop + baseGap;

  // 1. Top-Left Parallelogram:
  const p_tl = [
    [xOutL(topY), topY],
    [xInL(topY), topY],
    [xInL(hCutTop), hCutTop],
    [xOutL(hCutTop), hCutTop],
  ];

  // 2. Top-Right Parallelogram:
  const p_tr = [
    [xInR(topY), topY],
    [xOutR(topY), topY],
    [xOutR(hCutTop), hCutTop],
    [xInR(hCutTop), hCutTop],
  ];

  // Crossing Cuts:
  const y_cross = topY + halfTopInner / m;
  const dy_gap = baseGap * Math.sqrt(1 + m * m);
  const y_bot_apex = y_cross + dy_gap;

  const y_midL_bot = topY + (halfTopOuter + halfTopInner) / (2 * m);
  const y_bot_L_corner = y_midL_bot + dy_gap / 2;
  const y_midR_bot = y_midL_bot;
  const y_bot_R_corner = y_bot_L_corner;

  // 3. Middle-Left Piece:
  const p_ml = [
    [xOutL(hBot), hBot],
    [xInL(hBot), hBot],
    [cx, y_cross],
    [xOutL(y_midL_bot), y_midL_bot],
  ];

  // 4. Middle-Right Piece:
  const p_mr = [
    [xInR(hBot), hBot],
    [xOutR(hBot), hBot],
    [xOutR(y_midR_bot), y_midR_bot],
    [cx, y_cross],
  ];

  // 5. Bottom Piece:
  const p_bot = [
    [cx, y_bot_apex],
    [xOutL(y_bot_L_corner), y_bot_L_corner],
    [xOutL(botY), botY],
    [xOutR(botY), botY],
    [xOutR(y_bot_R_corner), y_bot_R_corner],
  ];

  return { p_tl, p_tr, p_ml, p_mr, p_bot };
}

function formatPoints(pts) {
  return pts.map(([x, y]) => `${x.toFixed(2)},${y.toFixed(2)}`).join(' ');
}

export function buildSvgString({
  canvasSize = 512,
  markScale = 0.74,
  gapMultiplier = 1.0,
  strokeMultiplier = 1.0,
  yOffsetRatio = -0.015,
  colorSchemeAdaptive = true,
  fixedColor = '#000000',
}) {
  const { p_tl, p_tr, p_ml, p_mr, p_bot } = getPolygonPoints({
    canvasSize,
    markScale,
    gapMultiplier,
    strokeMultiplier,
    yOffsetRatio,
  });

  const styleTag = colorSchemeAdaptive
    ? `<style>
    .mark { fill: #000000; }
    @media (prefers-color-scheme: dark) {
      .mark { fill: #ffffff; }
    }
  </style>`
    : `<style>
    .mark { fill: ${fixedColor}; }
  </style>`;

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${canvasSize} ${canvasSize}" width="${canvasSize}" height="${canvasSize}">
  ${styleTag}
  <g class="mark">
    <polygon points="${formatPoints(p_tl)}" />
    <polygon points="${formatPoints(p_tr)}" />
    <polygon points="${formatPoints(p_ml)}" />
    <polygon points="${formatPoints(p_mr)}" />
    <polygon points="${formatPoints(p_bot)}" />
  </g>
</svg>`.trim();
}

async function run() {
  const publicDir = path.resolve('public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  console.log("Generating production favicon and app icon set...");

  // 1. favicon.svg (Adaptive pure vector with clean paths and theme switching)
  const faviconSvg = buildSvgString({
    canvasSize: 512,
    markScale: 0.74,
    colorSchemeAdaptive: true,
  });
  fs.writeFileSync(path.join(publicDir, 'favicon.svg'), faviconSvg);

  // Inverted / White version
  const faviconWhiteSvg = buildSvgString({
    canvasSize: 512,
    markScale: 0.74,
    colorSchemeAdaptive: false,
    fixedColor: '#ffffff',
  });
  fs.writeFileSync(path.join(publicDir, 'favicon-white.svg'), faviconWhiteSvg);

  // Black version
  const faviconBlackSvg = buildSvgString({
    canvasSize: 512,
    markScale: 0.74,
    colorSchemeAdaptive: false,
    fixedColor: '#000000',
  });
  fs.writeFileSync(path.join(publicDir, 'favicon-black.svg'), faviconBlackSvg);

  // 2. favicon-16x16.png
  // At 16px, we apply subtle optical compensation:
  // - Mark fills slightly more of the canvas (82%) so details don't shrink into nothing
  // - Gap multiplier 1.6x ensures the 1-2px separation channel remains distinct without blur
  // - Rendered at 512px then downsampled with lanczos3 to preserve razor-sharp pixel edges
  const svg16Source = buildSvgString({
    canvasSize: 512,
    markScale: 0.82,
    gapMultiplier: 1.55,
    strokeMultiplier: 1.05,
    yOffsetRatio: -0.015,
    colorSchemeAdaptive: false,
    fixedColor: '#000000',
  });
  await sharp(Buffer.from(svg16Source))
    .resize(16, 16, { kernel: sharp.kernel.lanczos3 })
    .png({ compressionLevel: 9 })
    .toFile(path.join(publicDir, 'favicon-16x16.png'));

  // White version for 16px
  const svg16WhiteSource = buildSvgString({
    canvasSize: 512,
    markScale: 0.82,
    gapMultiplier: 1.55,
    strokeMultiplier: 1.05,
    yOffsetRatio: -0.015,
    colorSchemeAdaptive: false,
    fixedColor: '#ffffff',
  });
  await sharp(Buffer.from(svg16WhiteSource))
    .resize(16, 16, { kernel: sharp.kernel.lanczos3 })
    .png({ compressionLevel: 9 })
    .toFile(path.join(publicDir, 'favicon-16x16-white.png'));

  // 3. favicon-32x32.png
  // Subtle optical compensation for 32px
  const svg32Source = buildSvgString({
    canvasSize: 512,
    markScale: 0.78,
    gapMultiplier: 1.25,
    strokeMultiplier: 1.02,
    yOffsetRatio: -0.015,
    colorSchemeAdaptive: false,
    fixedColor: '#000000',
  });
  await sharp(Buffer.from(svg32Source))
    .resize(32, 32, { kernel: sharp.kernel.lanczos3 })
    .png({ compressionLevel: 9 })
    .toFile(path.join(publicDir, 'favicon-32x32.png'));

  // White version for 32px
  const svg32WhiteSource = buildSvgString({
    canvasSize: 512,
    markScale: 0.78,
    gapMultiplier: 1.25,
    strokeMultiplier: 1.02,
    yOffsetRatio: -0.015,
    colorSchemeAdaptive: false,
    fixedColor: '#ffffff',
  });
  await sharp(Buffer.from(svg32WhiteSource))
    .resize(32, 32, { kernel: sharp.kernel.lanczos3 })
    .png({ compressionLevel: 9 })
    .toFile(path.join(publicDir, 'favicon-32x32-white.png'));

  // 4. apple-touch-icon.png (180 x 180)
  // Transparent background, centered logo, no rounded rectangle
  const svg180Source = buildSvgString({
    canvasSize: 720,
    markScale: 0.72,
    gapMultiplier: 1.0,
    strokeMultiplier: 1.0,
    yOffsetRatio: -0.015,
    colorSchemeAdaptive: false,
    fixedColor: '#000000',
  });
  await sharp(Buffer.from(svg180Source))
    .resize(180, 180, { kernel: sharp.kernel.lanczos3 })
    .png({ compressionLevel: 9 })
    .toFile(path.join(publicDir, 'apple-touch-icon.png'));

  // White version of apple-touch-icon
  const svg180WhiteSource = buildSvgString({
    canvasSize: 720,
    markScale: 0.72,
    gapMultiplier: 1.0,
    strokeMultiplier: 1.0,
    yOffsetRatio: -0.015,
    colorSchemeAdaptive: false,
    fixedColor: '#ffffff',
  });
  await sharp(Buffer.from(svg180WhiteSource))
    .resize(180, 180, { kernel: sharp.kernel.lanczos3 })
    .png({ compressionLevel: 9 })
    .toFile(path.join(publicDir, 'apple-touch-icon-white.png'));

  // 5. Android Chrome 192x192
  const svg192Source = buildSvgString({
    canvasSize: 768,
    markScale: 0.72,
    gapMultiplier: 1.0,
    strokeMultiplier: 1.0,
    yOffsetRatio: -0.015,
    colorSchemeAdaptive: false,
    fixedColor: '#000000',
  });
  await sharp(Buffer.from(svg192Source))
    .resize(192, 192, { kernel: sharp.kernel.lanczos3 })
    .png({ compressionLevel: 9 })
    .toFile(path.join(publicDir, 'android-chrome-192x192.png'));

  // White version for 192x192
  const svg192WhiteSource = buildSvgString({
    canvasSize: 768,
    markScale: 0.72,
    gapMultiplier: 1.0,
    strokeMultiplier: 1.0,
    yOffsetRatio: -0.015,
    colorSchemeAdaptive: false,
    fixedColor: '#ffffff',
  });
  await sharp(Buffer.from(svg192WhiteSource))
    .resize(192, 192, { kernel: sharp.kernel.lanczos3 })
    .png({ compressionLevel: 9 })
    .toFile(path.join(publicDir, 'android-chrome-192x192-white.png'));

  // 6. Android Chrome 512x512
  const svg512Source = buildSvgString({
    canvasSize: 1024,
    markScale: 0.72,
    gapMultiplier: 1.0,
    strokeMultiplier: 1.0,
    yOffsetRatio: -0.015,
    colorSchemeAdaptive: false,
    fixedColor: '#000000',
  });
  await sharp(Buffer.from(svg512Source))
    .resize(512, 512, { kernel: sharp.kernel.lanczos3 })
    .png({ compressionLevel: 9 })
    .toFile(path.join(publicDir, 'android-chrome-512x512.png'));

  // White version for 512x512
  const svg512WhiteSource = buildSvgString({
    canvasSize: 1024,
    markScale: 0.72,
    gapMultiplier: 1.0,
    strokeMultiplier: 1.0,
    yOffsetRatio: -0.015,
    colorSchemeAdaptive: false,
    fixedColor: '#ffffff',
  });
  await sharp(Buffer.from(svg512WhiteSource))
    .resize(512, 512, { kernel: sharp.kernel.lanczos3 })
    .png({ compressionLevel: 9 })
    .toFile(path.join(publicDir, 'android-chrome-512x512-white.png'));

  // Also copy favicon.ico or generate a multi-size ICO if needed
  // We can write the 32x32 png as a fallback or generate favicon.ico
  // Also create site.webmanifest
  const manifest = {
    name: "Vikraman V",
    short_name: "Vikraman",
    icons: [
      {
        src: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/favicon.svg",
        sizes: "any",
        type: "image/svg+xml",
      }
    ],
    theme_color: "#0A0A0C",
    background_color: "#0A0A0C",
    display: "standalone"
  };
  fs.writeFileSync(path.join(publicDir, 'site.webmanifest'), JSON.stringify(manifest, null, 2));

  console.log("All favicon and app icon assets generated successfully in /public !");
}

run().catch(console.error);
