import { useEffect, useRef } from "react";
import { createNoise2D } from "simplex-noise";

type Wave = {
  amplitude: number;
  wavelength: number;
  speed: number;
  opacity: number;
  offsetY: number;
};

export default function WaveBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const noise2D = createNoise2D();

  const waves: Wave[] = [
    { amplitude: 60, wavelength: 0.001, speed: 0.0006, opacity: 0.15, offsetY: 0.65 },
    { amplitude: 80, wavelength: 0.0015, speed: 0.0008, opacity: 0.25, offsetY: 0.7 },
    { amplitude: 100, wavelength: 0.002, speed: 0.001, opacity: 0.35, offsetY: 0.75 },
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener("resize", resize);

    const drawWave = (wave: Wave) => {
      ctx.beginPath();
      ctx.moveTo(0, canvas.height);

      for (let x = 0; x <= canvas.width; x += 8) {
        const y =
          canvas.height * wave.offsetY +
          noise2D(x * wave.wavelength, time * wave.speed) *
            wave.amplitude;

        ctx.lineTo(x, y);
      }

      ctx.lineTo(canvas.width, canvas.height);
      ctx.closePath();

      ctx.fillStyle = `rgba(99,102,241,${wave.opacity})`;
      ctx.fill();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      waves.forEach(drawWave);

      time += 1;
      requestAnimationFrame(animate);
    };

    animate();

    return () => window.removeEventListener("resize", resize);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10"
    />
  );
}
