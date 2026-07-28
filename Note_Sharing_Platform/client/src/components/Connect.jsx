import React from "react";
import { useAnimate } from "framer-motion";
import { Particles } from "./ui/highlighter";

export default function Connect() {
  const [scope, animate] = useAnimate();

  React.useEffect(() => {
    animate(
      [
        ["#pointer", { left: 200, top: 60 }, { duration: 0 }],
        ["#tag-ds", { opacity: 1 }, { duration: 0.3 }],
        ["#pointer", { left: 50, top: 102 }, { at: "+0.5", duration: 0.5, ease: "easeInOut" }],
        ["#tag-ds", { opacity: 0.4 }, { at: "-0.3", duration: 0.1 }],
        ["#tag-math", { opacity: 1 }, { duration: 0.3 }],
        ["#pointer", { left: 224, top: 170 }, { at: "+0.5", duration: 0.5, ease: "easeInOut" }],
        ["#tag-math", { opacity: 0.4 }, { at: "-0.3", duration: 0.1 }],
        ["#tag-os", { opacity: 1 }, { duration: 0.3 }],
        ["#pointer", { left: 88, top: 198 }, { at: "+0.5", duration: 0.5, ease: "easeInOut" }],
        ["#tag-os", { opacity: 0.4 }, { at: "-0.3", duration: 0.1 }],
        ["#tag-ai", { opacity: 1 }, { duration: 0.3 }],
        ["#pointer", { left: 200, top: 60 }, { at: "+0.5", duration: 0.5, ease: "easeInOut" }],
        ["#tag-ai", { opacity: 0.5 }, { at: "-0.3", duration: 0.1 }],
      ],
      { repeat: Infinity }
    );
  }, [animate]);

  return (
    <div className="h-full w-full" ref={scope}>
      <Particles
        className="absolute inset-0 opacity-30"
        quantity={200}
        color="#999"
        vy={-0.2}
      />

      <div className="absolute left-1/2 top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[var(--accent)] text-base font-bold text-white shadow-lg">
        N
      </div>

      <div
        id="tag-ds"
        className="absolute bottom-[20%] left-[15%] rounded-3xl border border-[var(--line)] bg-[var(--accent-soft)] px-3 py-1.5 text-xs font-medium text-[var(--accent)] opacity-40"
      >
        Data Structures
      </div>
      <div
        id="tag-math"
        className="absolute left-[8%] top-[30%] rounded-3xl border border-[var(--line)] bg-[var(--accent-soft)] px-3 py-1.5 text-xs font-medium text-[var(--accent)] opacity-40"
      >
        Mathematics
      </div>
      <div
        id="tag-os"
        className="absolute bottom-[25%] right-[10%] rounded-3xl border border-[var(--line)] bg-[var(--accent-soft)] px-3 py-1.5 text-xs font-medium text-[var(--accent)] opacity-40"
      >
        Operating Systems
      </div>
      <div
        id="tag-ai"
        className="absolute right-[15%] top-[20%] rounded-3xl border border-[var(--line)] bg-[var(--accent-soft)] px-3 py-1.5 text-xs font-medium text-[var(--accent)] opacity-40"
      >
        AI & ML
      </div>

      <div id="pointer" className="absolute">
        <svg
          width="16.8"
          height="18.2"
          viewBox="0 0 12 13"
          className="fill-[#E11D48]"
          stroke="white"
          strokeWidth="1"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12 5.50676L0 0L2.83818 13L6.30623 7.86537L12 5.50676V5.50676Z"
          />
        </svg>
      </div>
    </div>
  );
}
