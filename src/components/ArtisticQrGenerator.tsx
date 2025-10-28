import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Download, Flower2, RefreshCw, Sparkles } from 'lucide-react';
import QRCodeStyling from 'qr-code-styling';
import { drawPromptedArt } from '../utils/qrArt';

const QR_SIZE = 320;
const palettePresets = [
  ['#FEC6C2', '#FDA4AF', '#A5B4FC', '#C4B5FD', '#F9A8D4'],
  ['#FDE68A', '#FCA5A5', '#FBCFE8', '#BAE6FD', '#C7D2FE'],
  ['#BBF7D0', '#A7F3D0', '#99F6E4', '#E9D5FF', '#E0F2FE'],
];

const defaultData = 'https://www.formula1.com/';

type QRCodeInstance = InstanceType<typeof QRCodeStyling>;

const promptPresets = [
  'floral garden at sunrise with soft light',
  'ocean waves at twilight with glowing jellyfish',
  'galactic nebula with shimmering stardust',
  'desert sunset with sweeping dunes',
  'neon cyberpunk skyline with electric hues',
];

const ArtisticQrGenerator: React.FC = () => {
  const [data, setData] = useState(defaultData);
  const [accentColor, setAccentColor] = useState('#0f766e');
  const [selectedPalette, setSelectedPalette] = useState(0);
  const [detailLevel, setDetailLevel] = useState(20);
  const [prompt, setPrompt] = useState(promptPresets[0]);
  const qrContainerRef = useRef<HTMLDivElement | null>(null);
  const overlayCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const qrCodeRef = useRef<QRCodeInstance | null>(null);

  const promptPalette = useMemo(() => {
    const normalized = prompt?.toLowerCase() ?? '';
    if (!normalized.trim()) {
      return null;
    }

    if (/space|galaxy|star|nebula|cosmic/.test(normalized)) {
      return ['#0F172A', '#1E3A8A', '#4338CA', accentColor ?? '#F472B6'];
    }
    if (/ocean|sea|wave|coral|underwater/.test(normalized)) {
      return ['#0EA5E9', '#38BDF8', '#22D3EE', accentColor ?? '#14B8A6'];
    }
    if (/desert|dune|sunset|canyon|sand/.test(normalized)) {
      return ['#FDBA74', '#FB923C', '#F97316', accentColor ?? '#FACC15'];
    }
    if (/forest|jungle|grove|leaves|moss|woodland/.test(normalized)) {
      return ['#DCFCE7', '#86EFAC', '#4ADE80', accentColor ?? '#166534'];
    }
    if (/tech|neon|cyber|futur|circuit|synth/.test(normalized)) {
      return ['#0F172A', '#111827', accentColor ?? '#22D3EE', '#F472B6'];
    }
    return null;
  }, [accentColor, prompt]);

  const palette = useMemo(() => {
    if (promptPalette) {
      return promptPalette;
    }
    const chosen = palettePresets[selectedPalette] ?? palettePresets[0];
    return accentColor ? [...chosen.slice(0, chosen.length - 1), accentColor] : chosen;
  }, [accentColor, promptPalette, selectedPalette]);

  useEffect(() => {
    if (!qrContainerRef.current || qrCodeRef.current) {
      return;
    }

    const qrCode = new QRCodeStyling({
      width: QR_SIZE,
      height: QR_SIZE,
      type: 'canvas',
      data,
      image: undefined,
      dotsOptions: {
        type: 'rounded',
        color: '#0f172a',
        gradient: {
          type: 'linear',
          rotation: 0.85,
          colorStops: [
            { offset: 0, color: '#0f172a' },
            { offset: 1, color: accentColor },
          ],
        },
      },
      backgroundOptions: {
        color: 'transparent',
      },
      cornersSquareOptions: {
        type: 'extra-rounded',
        color: accentColor,
      },
      cornersDotOptions: {
        type: 'dot',
        color: '#0f172a',
      },
    });

    qrCode.append(qrContainerRef.current);
    qrCodeRef.current = qrCode;
  }, [accentColor, data]);

  useEffect(() => {
    if (!qrCodeRef.current) {
      return;
    }

    qrCodeRef.current.update({
      data,
      dotsOptions: {
        type: 'rounded',
        gradient: {
          type: 'linear',
          rotation: 0.85,
          colorStops: [
            { offset: 0, color: '#0f172a' },
            { offset: 1, color: accentColor },
          ],
        },
      },
      cornersSquareOptions: {
        type: 'extra-rounded',
        color: accentColor,
      },
    });
  }, [data, accentColor]);

  useEffect(() => {
    const canvas = overlayCanvasRef.current;
    if (!canvas) {
      return;
    }

    drawPromptedArt(canvas, {
      width: QR_SIZE,
      height: QR_SIZE,
      bloomCount: detailLevel,
      detailLevel,
      palette,
      accentColor,
      prompt,
    });
  }, [accentColor, detailLevel, palette, prompt]);

  const randomizePalette = () => {
    setSelectedPalette((current) => (current + 1) % palettePresets.length);
  };

  const handleDownload = () => {
    qrCodeRef.current?.download({ extension: 'png' });
  };

  return (
    <section id="qr" className="relative py-24 px-6 bg-white/70">
      <div className="max-w-6xl mx-auto grid gap-12 lg:grid-cols-2 items-center">
        <div className="space-y-6">
          <span className="inline-flex items-center space-x-2 rounded-full bg-[#008250]/10 px-3 py-1 text-sm font-medium text-[#008250]">
            <Flower2 className="h-4 w-4" />
            <span>Creative tools</span>
          </span>
          <h2 className="text-4xl font-bold text-gray-900 leading-tight">
            Describe the mood and watch your QR code <span className="text-[#008250]">adapt in real time</span>.
          </h2>
          <p className="text-lg text-gray-600 max-w-xl">
            Share event passes, fan club links, or exclusive content with bespoke scenery—lush gardens, cosmic clouds, neon grids, and more—all generated from your creative prompt without sacrificing scan reliability.
          </p>

          <div className="space-y-4">
            <label className="block text-sm font-semibold text-gray-700 uppercase tracking-wide">Target link or message</label>
            <input
              value={data}
              onChange={(event) => setData(event.target.value)}
              placeholder="https://"
              className="w-full rounded-xl border border-gray-200 bg-white/90 px-4 py-3 text-base shadow-sm focus:border-[#008250] focus:outline-none focus:ring-2 focus:ring-[#008250]/40"
            />
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="block text-sm font-semibold text-gray-700 uppercase tracking-wide">Visual prompt</label>
              <span className="text-xs text-gray-500">Describe the vibe you want</span>
            </div>
            <textarea
              value={prompt}
              onChange={(event) => setPrompt(event.target.value)}
              rows={3}
              placeholder="e.g. neon city skyline with glowing lights"
              className="w-full rounded-xl border border-gray-200 bg-white/90 px-4 py-3 text-base shadow-sm focus:border-[#008250] focus:outline-none focus:ring-2 focus:ring-[#008250]/40"
            />
            <div className="flex flex-wrap gap-2 text-xs">
              {promptPresets.map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => setPrompt(preset)}
                  className={`rounded-full px-3 py-1 font-medium transition ${
                    prompt === preset
                      ? 'bg-[#008250] text-white shadow-sm'
                      : 'bg-[#008250]/10 text-[#008250] hover:bg-[#008250]/20'
                  }`}
                >
                  {preset}
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <label className="flex items-center justify-between text-sm font-semibold text-gray-700 uppercase tracking-wide">
                Accent color
                <Sparkles className="h-4 w-4 text-[#008250]" />
              </label>
              <input
                type="color"
                value={accentColor}
                onChange={(event) => setAccentColor(event.target.value)}
                className="h-12 w-full cursor-pointer rounded-xl border border-gray-200 bg-white"
              />
            </div>
            <div className="space-y-2">
              <label className="flex items-center justify-between text-sm font-semibold text-gray-700 uppercase tracking-wide">
                Detail density
                <RefreshCw className="h-4 w-4 text-[#008250]" />
              </label>
              <input
                type="range"
                min={8}
                max={36}
                value={detailLevel}
                onChange={(event) => setDetailLevel(Number(event.target.value))}
                className="w-full accent-[#008250]"
              />
              <p className="text-xs text-gray-500">{detailLevel} layers of detail</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={randomizePalette}
              className="inline-flex items-center space-x-2 rounded-xl bg-[#008250]/10 px-4 py-2 text-sm font-semibold text-[#008250] transition hover:bg-[#008250]/20"
            >
              <RefreshCw className="h-4 w-4" />
              <span>Cycle palette</span>
            </button>
            <button
              type="button"
              onClick={handleDownload}
              className="inline-flex items-center space-x-2 rounded-xl bg-[#008250] px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-[#008250]/30 transition hover:shadow-xl"
            >
              <Download className="h-4 w-4" />
              <span>Download PNG</span>
            </button>
          </div>
        </div>

        <div className="relative flex items-center justify-center">
          <div className="relative">
            <div className="floral-shell absolute -inset-10" />
            <div className="relative z-10 rounded-3xl border border-white/60 bg-white/50 p-6 shadow-2xl shadow-[#116dff]/10 backdrop-blur-xl">
              <div className="relative aspect-square w-[320px] overflow-hidden rounded-2xl">
                <canvas
                  ref={overlayCanvasRef}
                  className="absolute inset-0 h-full w-full floral-canvas pointer-events-none"
                />
                <div ref={qrContainerRef} className="relative z-10 h-full w-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ArtisticQrGenerator;
