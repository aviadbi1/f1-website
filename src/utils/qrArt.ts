export interface FlowerFieldOptions {
  width: number;
  height: number;
  bloomCount?: number;
  palette?: string[];
  accentColor?: string;
  stemColor?: string;
  gradientStops?: string[];
}

const defaultPalette = ['#FEC6C2', '#F9A8D4', '#C4B5FD', '#FDE68A', '#A5F3FC'];

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
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    return;
  }

  const dpr = window.devicePixelRatio || 1;
  canvas.width = width * dpr;
  canvas.height = height * dpr;
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  ctx.resetTransform();
  ctx.scale(dpr, dpr);

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
