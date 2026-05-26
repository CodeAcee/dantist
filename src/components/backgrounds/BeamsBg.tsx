import { useEffect, useRef } from 'react';

interface Props {
  style?: React.CSSProperties;
}

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

    const beams = Array.from({ length: 6 }, (_, i) => ({
      x: (w / 6) * i + w / 12,
      speed: 0.0004 + Math.random() * 0.0003,
      phase: Math.random() * Math.PI * 2,
      width: 60 + Math.random() * 80,
      opacity: 0.04 + Math.random() * 0.05,
    }));

    let t = 0;

    const draw = () => {
      ctx.clearRect(0, 0, w, h);

      beams.forEach(b => {
        const x = b.x + Math.sin(t * b.speed + b.phase) * 60;
        const grad = ctx.createLinearGradient(x, 0, x, h);
        grad.addColorStop(0, `rgba(200,169,110,0)`);
        grad.addColorStop(0.3, `rgba(200,169,110,${b.opacity})`);
        grad.addColorStop(0.7, `rgba(200,169,110,${b.opacity * 0.6})`);
        grad.addColorStop(1, `rgba(200,169,110,0)`);
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
