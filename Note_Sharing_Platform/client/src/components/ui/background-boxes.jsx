import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "../../lib/utils";

export function Boxes({ className }) {
  const [rows, setRows] = useState(50);
  const [cols, setCols] = useState(30);

  useEffect(() => {
    const w = window.innerWidth;
    if (w < 640) {
      setRows(15);
      setCols(10);
    } else if (w < 1024) {
      setRows(25);
      setCols(18);
    } else {
      setRows(50);
      setCols(30);
    }
  }, []);

  const randomColor = () => {
    const colors = [
      { bg: "rgba(61, 90, 241, 0.2)", shadow: "0 0 15px rgba(61, 90, 241, 0.3)" },
      { bg: "rgba(225, 29, 72, 0.18)", shadow: "0 0 15px rgba(225, 29, 72, 0.3)" },
      { bg: "rgba(31, 157, 110, 0.18)", shadow: "0 0 15px rgba(31, 157, 110, 0.3)" },
      { bg: "rgba(217, 119, 6, 0.18)", shadow: "0 0 15px rgba(217, 119, 6, 0.3)" },
      { bg: "rgba(139, 92, 246, 0.18)", shadow: "0 0 15px rgba(139, 92, 246, 0.3)" },
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <div
      className={cn(
        "absolute inset-0 overflow-hidden [perspective:800px] [transform-style:preserve-3d]",
        className
      )}
    >
      <div
        className="absolute inset-0 [transform:rotateX(65deg)_scale(2.5)_translateY(-20%)]"
        style={{
          gridTemplateColumns: `repeat(${cols}, minmax(32px, 1fr))`,
          gridTemplateRows: `repeat(${rows}, minmax(32px, 1fr))`,
          display: "grid",
        }}
      >
        {Array.from({ length: rows * cols }).map((_, i) => (
          <Box key={i} getRandomColor={randomColor} />
        ))}
      </div>
    </div>
  );
}

function Box({ getRandomColor }) {
  const [color, setColor] = useState("rgba(0,0,0,0.03)");
  const [shadow, setShadow] = useState("none");
  const timeoutRef = useRef(null);

  const handleMouseEnter = () => {
    const c = getRandomColor();
    setColor(c.bg);
    setShadow(c.shadow);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setColor("rgba(0,0,0,0.03)");
      setShadow("none");
    }, 300);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <motion.div
      onMouseEnter={handleMouseEnter}
      className="border-[0.5px] border-black/[0.12] transition-colors duration-300"
      style={{
        backgroundColor: color,
        boxShadow: shadow,
      }}
    />
  );
}
