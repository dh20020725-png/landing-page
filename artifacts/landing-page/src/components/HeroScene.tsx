import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
  hue: number;
}

interface FloatingShape {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  rotation: number;
  rotationSpeed: number;
  type: "hex" | "triangle" | "ring" | "diamond";
  hue: number;
  opacity: number;
  pulseOffset: number;
}

const HUES = [230, 260, 210, 280, 220];

function drawHexagon(ctx: CanvasRenderingContext2D, x: number, y: number, r: number, rot: number) {
  ctx.beginPath();
  for (let i = 0; i < 6; i++) {
    const a = (Math.PI / 3) * i + rot;
    i === 0 ? ctx.moveTo(x + r * Math.cos(a), y + r * Math.sin(a)) : ctx.lineTo(x + r * Math.cos(a), y + r * Math.sin(a));
  }
  ctx.closePath();
}

function drawTriangle(ctx: CanvasRenderingContext2D, x: number, y: number, r: number, rot: number) {
  ctx.beginPath();
  for (let i = 0; i < 3; i++) {
    const a = (Math.PI * 2 / 3) * i + rot;
    i === 0 ? ctx.moveTo(x + r * Math.cos(a), y + r * Math.sin(a)) : ctx.lineTo(x + r * Math.cos(a), y + r * Math.sin(a));
  }
  ctx.closePath();
}

function drawDiamond(ctx: CanvasRenderingContext2D, x: number, y: number, r: number, rot: number) {
  ctx.beginPath();
  for (let i = 0; i < 4; i++) {
    const a = (Math.PI / 2) * i + rot;
    i === 0 ? ctx.moveTo(x + r * Math.cos(a), y + r * Math.sin(a)) : ctx.lineTo(x + r * Math.cos(a), y + r * Math.sin(a));
  }
  ctx.closePath();
}

export function HeroScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let w = 0, h = 0;
    let particles: Particle[] = [];
    let shapes: FloatingShape[] = [];

    const resize = () => {
      w = canvas.width = canvas.offsetWidth;
      h = canvas.height = canvas.offsetHeight;
      initScene();
    };

    const initScene = () => {
      const count = Math.min(Math.floor((w * h) / 7000), 140);
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 2 + 0.8,
        opacity: Math.random() * 0.6 + 0.4,
        hue: HUES[Math.floor(Math.random() * HUES.length)],
      }));

      const shapeCount = Math.min(Math.floor(w / 160), 8);
      shapes = Array.from({ length: shapeCount }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 55 + 30,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.009,
        type: (["hex", "triangle", "ring", "diamond"] as const)[Math.floor(Math.random() * 4)],
        hue: HUES[Math.floor(Math.random() * HUES.length)],
        opacity: Math.random() * 0.22 + 0.1,
        pulseOffset: Math.random() * Math.PI * 2,
      }));
    };

    const MAX_DIST = 140;

    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h);

      // large ambient glow blobs
      const glows: [number, number, number, string][] = [
        [w * 0.15, h * 0.25, w * 0.45, "230"],
        [w * 0.85, h * 0.55, w * 0.4, "265"],
        [w * 0.5,  h * 0.8,  w * 0.35, "210"],
      ];
      for (const [gx, gy, gr, hue] of glows) {
        const g = ctx.createRadialGradient(gx, gy, 0, gx, gy, gr);
        g.addColorStop(0, `hsla(${hue},75%,60%,0.12)`);
        g.addColorStop(1, `hsla(${hue},75%,60%,0)`);
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, w, h);
      }

      // lines between close particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const p1 = particles[i], p2 = particles[j];
          const dx = p1.x - p2.x, dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MAX_DIST) {
            const alpha = (1 - dist / MAX_DIST) * 0.45;
            const grad = ctx.createLinearGradient(p1.x, p1.y, p2.x, p2.y);
            grad.addColorStop(0, `hsla(${p1.hue},80%,75%,${alpha})`);
            grad.addColorStop(1, `hsla(${p2.hue},80%,75%,${alpha})`);
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = grad;
            ctx.lineWidth = 0.9;
            ctx.stroke();
          }
        }
      }

      // dots with glow
      for (const p of particles) {
        const glowG = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * 5);
        glowG.addColorStop(0, `hsla(${p.hue},90%,80%,${p.opacity * 0.8})`);
        glowG.addColorStop(0.4, `hsla(${p.hue},85%,70%,${p.opacity * 0.25})`);
        glowG.addColorStop(1, `hsla(${p.hue},85%,70%,0)`);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * 5, 0, Math.PI * 2);
        ctx.fillStyle = glowG;
        ctx.fill();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue},95%,90%,${p.opacity})`;
        ctx.fill();
        p.x += p.vx; p.y += p.vy;
        if (p.x < -10) p.x = w + 10; if (p.x > w + 10) p.x = -10;
        if (p.y < -10) p.y = h + 10; if (p.y > h + 10) p.y = -10;
      }

      // wireframe shapes
      for (const s of shapes) {
        const pulse = Math.sin(t * 0.0008 + s.pulseOffset) * 0.35 + 0.65;
        const op = s.opacity * pulse;
        ctx.save();
        ctx.strokeStyle = `hsla(${s.hue},80%,78%,${op})`;
        ctx.lineWidth = 1.3;
        ctx.shadowColor = `hsla(${s.hue},80%,70%,0.8)`;
        ctx.shadowBlur = 12;

        if (s.type === "hex") {
          drawHexagon(ctx, s.x, s.y, s.size, s.rotation); ctx.stroke();
          ctx.globalAlpha = 0.4;
          drawHexagon(ctx, s.x, s.y, s.size * 0.55, s.rotation + Math.PI / 6); ctx.stroke();
          ctx.globalAlpha = 1;
        } else if (s.type === "triangle") {
          drawTriangle(ctx, s.x, s.y, s.size, s.rotation); ctx.stroke();
          ctx.globalAlpha = 0.35;
          drawTriangle(ctx, s.x, s.y, s.size * 0.5, s.rotation + Math.PI); ctx.stroke();
          ctx.globalAlpha = 1;
        } else if (s.type === "ring") {
          ctx.beginPath(); ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2); ctx.stroke();
          ctx.globalAlpha = 0.3;
          ctx.beginPath(); ctx.arc(s.x, s.y, s.size * 0.58, 0, Math.PI * 2); ctx.stroke();
          ctx.globalAlpha = op * 0.6;
          for (let k = 0; k < 4; k++) {
            const a = (Math.PI / 2) * k + s.rotation;
            ctx.beginPath();
            ctx.moveTo(s.x + s.size * 0.75 * Math.cos(a), s.y + s.size * 0.75 * Math.sin(a));
            ctx.lineTo(s.x + s.size * 1.15 * Math.cos(a), s.y + s.size * 1.15 * Math.sin(a));
            ctx.stroke();
          }
          ctx.globalAlpha = 1;
        } else {
          drawDiamond(ctx, s.x, s.y, s.size, s.rotation); ctx.stroke();
          ctx.globalAlpha = 0.3;
          drawDiamond(ctx, s.x, s.y, s.size * 0.5, s.rotation + Math.PI / 4); ctx.stroke();
          ctx.globalAlpha = 1;
        }

        ctx.restore();
        s.rotation += s.rotationSpeed;
        s.x += s.vx; s.y += s.vy;
        if (s.x < -s.size * 2) s.x = w + s.size * 2; if (s.x > w + s.size * 2) s.x = -s.size * 2;
        if (s.y < -s.size * 2) s.y = h + s.size * 2; if (s.y > h + s.size * 2) s.y = -s.size * 2;
      }

      animId = requestAnimationFrame(draw);
    };

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();
    animId = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(animId); ro.disconnect(); };
  }, []);

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" />
      {/* subtle top radial to pull focus inward */}
      <div
        className="absolute inset-0"
        style={{ background: "radial-gradient(ellipse 80% 50% at 50% 0%, transparent 30%, rgba(8,10,24,0.3) 65%, rgba(8,10,24,0.0) 100%)" }}
      />
      {/* bottom blend into next section */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </div>
  );
}
