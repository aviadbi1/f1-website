export interface FlowerFieldOptions {
  width: number;
  height: number;
  bloomCount?: number;
  palette?: string[];
  accentColor?: string;
  stemColor?: string;
  gradientStops?: string[];
}

export interface PromptedArtOptions extends FlowerFieldOptions {
  prompt?: string;
  detailLevel?: number;
}

type MotifType = 'flowers' | 'ocean' | 'space' | 'desert' | 'forest' | 'tech';

const defaultPalette = ['#FEC6C2', '#F9A8D4', '#C4B5FD', '#FDE68A', '#A5F3FC'];

function setupCanvas(canvas: HTMLCanvasElement, width: number, height: number) {
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    return null;
  }

  const dpr = window.devicePixelRatio || 1;
  canvas.width = width * dpr;
  canvas.height = height * dpr;
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  if (typeof ctx.resetTransform === 'function') {
    ctx.resetTransform();
  } else {
    ctx.setTransform(1, 0, 0, 1, 0, 0);
  }
  ctx.scale(dpr, dpr);
  ctx.clearRect(0, 0, width, height);

  return ctx;
}

function drawPetal(
  ctx: CanvasRenderingContext2D,
  radius: number,
  thickness: number,
  angle: number,
  color: string,
  opacity = 0.85
) {
  ctx.save();
  ctx.rotate(angle);
  const gradient = ctx.createLinearGradient(0, -radius, 0, radius);
  gradient.addColorStop(0, `${color}cc`);
  gradient.addColorStop(0.5, `${color}e6`);
  gradient.addColorStop(1, `${color}99`);
  ctx.beginPath();
  ctx.ellipse(0, 0, thickness, radius, 0, 0, Math.PI * 2);
  ctx.fillStyle = gradient;
  ctx.globalAlpha = opacity;
  ctx.fill();
  ctx.restore();
}

function drawBloom(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  size: number,
  palette: string[],
  accentColor?: string
) {
  ctx.save();
  ctx.translate(x, y);
  ctx.shadowColor = 'rgba(17, 109, 255, 0.15)';
  ctx.shadowBlur = size * 0.45;

  const petals = Math.floor(5 + Math.random() * 3);
  const baseColor = palette[Math.floor(Math.random() * palette.length)];
  const petalThickness = size * (0.45 + Math.random() * 0.2);

  for (let i = 0; i < petals; i += 1) {
    const angle = (i / petals) * Math.PI * 2 + Math.random() * 0.2;
    drawPetal(ctx, size, petalThickness, angle, baseColor, 0.8 + Math.random() * 0.1);
  }

  ctx.beginPath();
  ctx.fillStyle = accentColor ?? '#0F172A';
  ctx.globalAlpha = 0.9;
  ctx.arc(0, 0, size * 0.25, 0, Math.PI * 2);
  ctx.fill();

  ctx.beginPath();
  ctx.fillStyle = 'rgba(255,255,255,0.85)';
  ctx.globalAlpha = 0.75;
  ctx.arc(size * 0.1, -size * 0.1, size * 0.12, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
}

function drawStem(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  color: string
) {
  ctx.save();
  ctx.beginPath();
  ctx.strokeStyle = color;
  ctx.lineWidth = width;
  ctx.lineCap = 'round';
  ctx.moveTo(x, y);
  const controlX = x + (Math.random() - 0.5) * width * 15;
  ctx.quadraticCurveTo(controlX, y + height * 0.5, x, y + height);
  ctx.stroke();
  ctx.restore();
}

function scatterDew(ctx: CanvasRenderingContext2D, width: number, height: number) {
  const dewDrops = 30;
  for (let i = 0; i < dewDrops; i += 1) {
    const x = Math.random() * width;
    const y = Math.random() * height;
    const radius = Math.random() * 2 + 1;
    ctx.beginPath();
    ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
  }
}

export function drawFlowerField(
  canvas: HTMLCanvasElement,
  {
    width,
    height,
    bloomCount = 18,
    palette = defaultPalette,
    accentColor,
    stemColor = 'rgba(16, 185, 129, 0.6)',
    gradientStops = [
      'rgba(252, 231, 243, 0.95)',
      'rgba(221, 242, 253, 0.7)',
      'rgba(209, 250, 229, 0.65)'
    ]
  }: FlowerFieldOptions
) {
  const ctx = setupCanvas(canvas, width, height);
  if (!ctx) {
    return;
  }

  const gradient = ctx.createLinearGradient(0, 0, width, height);
  gradientStops.forEach((stop, index) => {
    gradient.addColorStop(index / Math.max(gradientStops.length - 1, 1), stop);
  });
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  const horizon = height * 0.75;
  ctx.save();
  ctx.fillStyle = 'rgba(16, 185, 129, 0.2)';
  ctx.beginPath();
  ctx.moveTo(0, horizon);
  ctx.quadraticCurveTo(width * 0.25, horizon - 20, width * 0.5, horizon - 10);
  ctx.quadraticCurveTo(width * 0.75, horizon, width, horizon - 15);
  ctx.lineTo(width, height);
  ctx.lineTo(0, height);
  ctx.closePath();
  ctx.fill();
  ctx.restore();

  for (let i = 0; i < bloomCount; i += 1) {
    const x = Math.random() * width;
    const y = horizon - Math.random() * (height * 0.35);
    const stemHeight = height - y;
    drawStem(ctx, x, y, 2 + Math.random() * 1.5, stemHeight, stemColor);
  }

  for (let i = 0; i < bloomCount; i += 1) {
    const x = Math.random() * width;
    const y = horizon - Math.random() * (height * 0.4);
    const size = 10 + Math.random() * 16;
    drawBloom(ctx, x, y, size, palette, accentColor);
  }

  scatterDew(ctx, width, height);
}

function drawOceanDream(
  canvas: HTMLCanvasElement,
  {
    width,
    height,
    palette = ['#0EA5E9', '#38BDF8', '#A5F3FC', '#0F172A'],
    accentColor,
    detailLevel = 22,
  }: PromptedArtOptions
) {
  const ctx = setupCanvas(canvas, width, height);
  if (!ctx) {
    return;
  }

  const baseAccent = accentColor ?? '#0EA5E9';
  const gradient = ctx.createLinearGradient(0, 0, 0, height);
  gradient.addColorStop(0, palette[0] ?? '#0EA5E9');
  gradient.addColorStop(0.5, palette[1] ?? '#38BDF8');
  gradient.addColorStop(1, palette[2] ?? '#0F172A');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  const waves = Math.max(3, Math.round(detailLevel / 6));
  for (let i = 0; i < waves; i += 1) {
    const amplitude = 6 + Math.random() * 12;
    const yOffset = (height / waves) * i * 0.6 + height * 0.2;
    ctx.beginPath();
    ctx.moveTo(0, yOffset);
    const segments = 6;
    for (let s = 0; s <= segments; s += 1) {
      const x = (width / segments) * s;
      const y =
        yOffset + Math.sin((s / segments) * Math.PI * 2 + i) * amplitude * (0.6 + Math.random() * 0.4);
      ctx.lineTo(x, y);
    }
    ctx.lineTo(width, height);
    ctx.lineTo(0, height);
    ctx.closePath();
    ctx.fillStyle = `rgba(14, 165, 233, ${0.12 + i * 0.08})`;
    ctx.fill();
  }

  const bubbles = detailLevel + 10;
  for (let i = 0; i < bubbles; i += 1) {
    const x = Math.random() * width;
    const y = height * 0.2 + Math.random() * (height * 0.7);
    const radius = Math.random() * 4 + 1;
    ctx.beginPath();
    ctx.fillStyle = 'rgba(255,255,255,0.35)';
    ctx.globalAlpha = 0.8;
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.globalAlpha = 1;
  ctx.strokeStyle = `${baseAccent}88`;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(width * 0.8, height * 0.25, 26, 0, Math.PI * 2);
  ctx.stroke();
}

function drawSpaceNebula(
  canvas: HTMLCanvasElement,
  {
    width,
    height,
    palette = ['#0F172A', '#1E3A8A', '#7C3AED', '#F472B6'],
    accentColor,
    detailLevel = 24,
  }: PromptedArtOptions
) {
  const ctx = setupCanvas(canvas, width, height);
  if (!ctx) {
    return;
  }

  const gradient = ctx.createRadialGradient(width * 0.3, height * 0.4, 40, width * 0.5, height * 0.6, width);
  gradient.addColorStop(0, palette[3] ?? '#F472B6');
  gradient.addColorStop(0.4, palette[2] ?? '#7C3AED');
  gradient.addColorStop(1, palette[0] ?? '#0F172A');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  const nebulae = Math.max(3, Math.round(detailLevel / 8));
  for (let i = 0; i < nebulae; i += 1) {
    const x = Math.random() * width;
    const y = Math.random() * height;
    const radius = 60 + Math.random() * 90;
    const radial = ctx.createRadialGradient(x, y, 0, x, y, radius);
    const color = palette[(i + 1) % palette.length] ?? '#7C3AED';
    radial.addColorStop(0, `${color}aa`);
    radial.addColorStop(1, `${color}00`);
    ctx.fillStyle = radial;
    ctx.fillRect(x - radius, y - radius, radius * 2, radius * 2);
  }

  const stars = detailLevel * 4;
  ctx.fillStyle = '#ffffff';
  for (let i = 0; i < stars; i += 1) {
    const x = Math.random() * width;
    const y = Math.random() * height;
    const radius = Math.random() * 1.5 + 0.5;
    ctx.globalAlpha = Math.random() * 0.8 + 0.2;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.globalAlpha = 1;
  if (accentColor) {
    ctx.strokeStyle = `${accentColor}aa`;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(width * 0.75, height * 0.25, 18, 0, Math.PI * 2);
    ctx.stroke();
  }
}

function drawDesertSunset(
  canvas: HTMLCanvasElement,
  {
    width,
    height,
    palette = ['#FDBA74', '#FB923C', '#F97316', '#FACC15'],
    accentColor,
    detailLevel = 16,
  }: PromptedArtOptions
) {
  const ctx = setupCanvas(canvas, width, height);
  if (!ctx) {
    return;
  }

  const gradient = ctx.createLinearGradient(0, 0, 0, height);
  gradient.addColorStop(0, palette[3] ?? '#FACC15');
  gradient.addColorStop(0.5, palette[1] ?? '#FB923C');
  gradient.addColorStop(1, palette[0] ?? '#FDBA74');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  const dunes = Math.max(2, Math.round(detailLevel / 8));
  for (let i = 0; i < dunes; i += 1) {
    const yBase = height * (0.5 + i * 0.15);
    ctx.beginPath();
    ctx.moveTo(0, yBase);
    const peak = yBase - 25 - Math.random() * 15;
    ctx.quadraticCurveTo(width * 0.25, peak, width * 0.5, yBase - 10);
    ctx.quadraticCurveTo(width * 0.75, yBase + 10, width, yBase - 5);
    ctx.lineTo(width, height);
    ctx.lineTo(0, height);
    ctx.closePath();
    ctx.fillStyle = `rgba(249, 115, 22, ${0.25 + i * 0.15})`;
    ctx.fill();
  }

  ctx.fillStyle = accentColor ?? '#fde68a';
  ctx.globalAlpha = 0.9;
  ctx.beginPath();
  ctx.arc(width * 0.2, height * 0.28, 28, 0, Math.PI * 2);
  ctx.fill();
  ctx.globalAlpha = 1;
}

function drawForestGlade(
  canvas: HTMLCanvasElement,
  {
    width,
    height,
    palette = ['#DCFCE7', '#A7F3D0', '#4ADE80', '#166534'],
    accentColor,
    detailLevel = 20,
  }: PromptedArtOptions
) {
  const ctx = setupCanvas(canvas, width, height);
  if (!ctx) {
    return;
  }

  const gradient = ctx.createLinearGradient(0, 0, 0, height);
  gradient.addColorStop(0, palette[0] ?? '#DCFCE7');
  gradient.addColorStop(0.5, palette[1] ?? '#A7F3D0');
  gradient.addColorStop(1, palette[3] ?? '#166534');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  const treeCount = Math.max(6, detailLevel);
  for (let i = 0; i < treeCount; i += 1) {
    const x = Math.random() * width;
    const base = height * (0.6 + Math.random() * 0.3);
    const heightFactor = height * 0.25 + Math.random() * height * 0.2;
    ctx.fillStyle = 'rgba(22, 101, 52, 0.55)';
    ctx.beginPath();
    ctx.moveTo(x, base - heightFactor);
    ctx.lineTo(x - 14, base);
    ctx.lineTo(x + 14, base);
    ctx.closePath();
    ctx.fill();
  }

  const fireflies = Math.max(12, detailLevel * 1.2);
  for (let i = 0; i < fireflies; i += 1) {
    const x = Math.random() * width;
    const y = Math.random() * height * 0.7;
    const radius = Math.random() * 2 + 1;
    ctx.beginPath();
    ctx.fillStyle = `${accentColor ?? '#fef08a'}aa`;
    ctx.globalAlpha = Math.random() * 0.6 + 0.3;
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.globalAlpha = 1;
}

function drawNeonCircuit(
  canvas: HTMLCanvasElement,
  {
    width,
    height,
    palette = ['#0F172A', '#0EA5E9', '#22D3EE', '#F472B6'],
    accentColor,
    detailLevel = 24,
  }: PromptedArtOptions
) {
  const ctx = setupCanvas(canvas, width, height);
  if (!ctx) {
    return;
  }

  const gradient = ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, palette[0] ?? '#0F172A');
  gradient.addColorStop(1, palette[1] ?? '#0EA5E9');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  ctx.strokeStyle = `${accentColor ?? '#22D3EE'}66`;
  ctx.lineWidth = 1.5;
  const gridSize = 24;
  for (let x = 0; x < width; x += gridSize) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
    ctx.stroke();
  }
  for (let y = 0; y < height; y += gridSize) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }

  const traces = Math.max(6, detailLevel);
  for (let i = 0; i < traces; i += 1) {
    let currentX = Math.random() * width;
    let currentY = Math.random() * height;
    ctx.beginPath();
    ctx.moveTo(currentX, currentY);
    for (let segment = 0; segment < 4; segment += 1) {
      const direction = Math.random() > 0.5 ? 1 : -1;
      const length = 16 + Math.random() * 40;
      if (Math.random() > 0.5) {
        currentX += direction * length;
      } else {
        currentY += direction * length;
      }
      ctx.lineTo(currentX, currentY);
    }
    ctx.strokeStyle = [palette[2] ?? '#22D3EE', palette[3] ?? '#F472B6'][i % 2];
    ctx.stroke();
  }

  ctx.globalAlpha = 0.6;
  ctx.fillStyle = `${accentColor ?? '#22D3EE'}55`;
  ctx.beginPath();
  ctx.arc(width * 0.85, height * 0.2, 18, 0, Math.PI * 2);
  ctx.fill();
  ctx.globalAlpha = 1;
}

function detectMotif(prompt?: string): MotifType {
  if (!prompt) {
    return 'flowers';
  }

  const normalized = prompt.toLowerCase();
  if (/space|galaxy|star|cosmic|nebula/.test(normalized)) {
    return 'space';
  }
  if (/ocean|sea|wave|coral|underwater/.test(normalized)) {
    return 'ocean';
  }
  if (/desert|dune|sunset|canyon|sand/.test(normalized)) {
    return 'desert';
  }
  if (/forest|jungle|grove|leaves|moss|woodland/.test(normalized)) {
    return 'forest';
  }
  if (/tech|neon|cyber|futur|circuit|synth/.test(normalized)) {
    return 'tech';
  }
  if (/flower|floral|garden|bloom|petal/.test(normalized)) {
    return 'flowers';
  }
  return 'flowers';
}

function motifPalette(motif: MotifType, accentColor?: string): string[] {
  switch (motif) {
    case 'ocean':
      return ['#0EA5E9', '#38BDF8', '#22D3EE', accentColor ?? '#14B8A6'];
    case 'space':
      return ['#0F172A', '#1E3A8A', '#4338CA', accentColor ?? '#F472B6'];
    case 'desert':
      return ['#FDBA74', '#FB923C', '#F97316', accentColor ?? '#FACC15'];
    case 'forest':
      return ['#DCFCE7', '#86EFAC', '#4ADE80', accentColor ?? '#166534'];
    case 'tech':
      return ['#0F172A', '#111827', accentColor ?? '#22D3EE', '#F472B6'];
    case 'flowers':
    default:
      return ['#FEC6C2', '#F9A8D4', '#C4B5FD', accentColor ?? '#0F172A'];
  }
}

export function drawPromptedArt(canvas: HTMLCanvasElement, options: PromptedArtOptions) {
  const { prompt, accentColor, palette, bloomCount, detailLevel, ...rest } = options;
  const motif = detectMotif(prompt);
  const paletteForMotif = palette?.length ? palette : motifPalette(motif, accentColor);
  const shared: PromptedArtOptions = {
    accentColor,
    palette: paletteForMotif,
    bloomCount,
    detailLevel,
    ...rest,
  };

  switch (motif) {
    case 'ocean':
      drawOceanDream(canvas, shared);
      break;
    case 'space':
      drawSpaceNebula(canvas, shared);
      break;
    case 'desert':
      drawDesertSunset(canvas, shared);
      break;
    case 'forest':
      drawForestGlade(canvas, shared);
      break;
    case 'tech':
      drawNeonCircuit(canvas, shared);
      break;
    case 'flowers':
    default:
      drawFlowerField(canvas, shared);
  }
}
