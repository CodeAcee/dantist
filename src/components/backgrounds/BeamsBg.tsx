import { useEffect, useRef } from 'react';

interface Props {
  style?: React.CSSProperties;
}

// alternating gold + rose beams for the luxury pink palette
const BEAMS = [
  { color: '201,168,124', opacityBase: 0.07 }, // gold
  { color: '196,64,110',  opacityBase: 0.09 }, // rose
  { color: '201,168,124', opacityBase: 0.05 }, // gold
  { color: '196,64,110',  opacityBase: 0.08 }, // rose
  { color: '201,168,124', opacityBase: 0.06 }, // gold
  { color: '224,112,154', opacityBase: 0.07 }, // rose-light
];

export default function BeamsBg({ style }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const raf = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let w = canvas.offsetWidth;
    let h = canvas.offsetHeight;
    canvas.width = w;
    canvas.height = h;

    const beams = BEAMS.map((b, i) => ({
      x: (w / BEAMS.length) * i + w / (BEAMS.length * 2),
      speed: 0.0003 + Math.random() * 0.0004,
      phase: Math.random() * Math.PI * 2,
      width: 70 + Math.random() * 90,
      opacity: b.opacityBase + Math.random() * 0.03,
      color: b.color,
    }));

    let t = 0;

    const draw = () => {
      ctx.clearRect(0, 0, w, h);

      beams.forEach(b => {
        const x = b.x + Math.sin(t * b.speed + b.phase) * 70;
        const grad = ctx.createLinearGradient(x, 0, x, h);
        grad.addColorStop(0,   `rgba(${b.color},0)`);
        grad.addColorStop(0.3, `rgba(${b.color},${b.opacity})`);
        grad.addColorStop(0.7, `rgba(${b.color},${b.opacity * 0.6})`);
        grad.addColorStop(1,   `rgba(${b.color},0)`);
        ctx.save();
        ctx.translate(x, h / 2);
        ctx.rotate(-0.12 + Math.sin(t * b.speed * 0.5 + b.phase) * 0.04);
        ctx.translate(-x, -h / 2);
        ctx.fillStyle = grad;
        ctx.fillRect(x - b.width / 2, 0, b.width, h);
        ctx.restore();
      });

      t++;
      raf.current = requestAnimationFrame(draw);
    };

    draw();

    const resize = () => {
      w = canvas.offsetWidth;
      h = canvas.offsetHeight;
      canvas.width = w;
      canvas.height = h;
    };
    window.addEventListener('resize', resize);
    return () => {
      window.removeEventListener('resize', resize);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        ...style,
      }}
    />
  );
}
