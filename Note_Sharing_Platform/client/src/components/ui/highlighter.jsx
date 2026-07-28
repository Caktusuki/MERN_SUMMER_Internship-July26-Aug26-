import React, { useRef, useCallback } from "react";
import { motion, useMotionValue } from "framer-motion";

export function HighlightGroup({ children, className }) {
  return <div className={className}>{children}</div>;
}

export function HighlighterItem({ children, className }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const handleMouseMove = useCallback(
    (e) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      x.set(e.clientX - rect.left);
      y.set(e.clientY - rect.top);
    },
    [x, y]
  );

  return (
    <div
      ref={ref}
      className={className}
      onMouseMove={handleMouseMove}
      style={{ position: "relative", overflow: "hidden" }}
    >
      <motion.div
        className="pointer-events-none absolute -z-10 opacity-0 transition-opacity duration-300"
        style={{
          x,
          y,
          width: 300,
          height: 300,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(61,90,241,0.15) 0%, transparent 70%)",
          left: -150,
          top: -150,
        }}
      />
      <div
        className="absolute -z-10 h-[250px] w-[250px] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(circle, rgba(61,90,241,0.08) 0%, transparent 70%)",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          borderRadius: "50%",
        }}
      />
      {children}
    </div>
  );
}

export function Particles({
  quantity = 50,
  color = "#999",
  vy = -0.2,
  className = "",
}) {
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const particlesRef = useRef([]);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const resize = () => {
      canvas.width = canvas.parentElement?.offsetWidth || 400;
      canvas.height = canvas.parentElement?.offsetHeight || 300;
    };
    resize();
    window.addEventListener("resize", resize);

    particlesRef.current = Array.from({ length: quantity }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.5 + 0.5,
      vx: (Math.random() - 0.5) * 0.3,
      vy: vy + (Math.random() - 0.5) * 0.2,
      alpha: Math.random() * 0.5 + 0.2,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particlesRef.current.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.globalAlpha = p.alpha;
        ctx.fill();
      });
      ctx.globalAlpha = 1;
      animRef.current = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animRef.current);
    };
  }, [quantity, color, vy]);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none ${className}`}
    />
  );
}
