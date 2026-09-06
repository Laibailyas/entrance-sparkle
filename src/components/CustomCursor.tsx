import { motion, useMotionValue, useSpring } from "motion/react";
import { useEffect, useState } from "react";
import cursorAsset from "@/assets/cursor.png.asset.json";

export function CustomCursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 900, damping: 45, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 900, damping: 45, mass: 0.4 });
  const rx = useSpring(x, { stiffness: 120, damping: 20, mass: 0.6 });
  const ry = useSpring(y, { stiffness: 120, damping: 20, mass: 0.6 });
  const [active, setActive] = useState(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    setEnabled(true);
    document.documentElement.classList.add("cursor-none-deep");

    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const el = e.target as HTMLElement | null;
      setActive(!!el?.closest("a,button,[data-cursor-hover]"));
    };
    window.addEventListener("pointermove", move);
    return () => {
      window.removeEventListener("pointermove", move);
      document.documentElement.classList.remove("cursor-none-deep");
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[100] hidden md:block"
        style={{ x: sx, y: sy }}
      >
        <motion.img
          src={cursorAsset.url}
          alt=""
          width={28}
          height={28}
          className="block w-7 origin-top-left"
          animate={{ scale: active ? 1.35 : 1, rotate: active ? -12 : 0 }}
          transition={{ type: "spring", stiffness: 400, damping: 22 }}
        />
      </motion.div>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[99] hidden md:block"
        style={{ x: rx, y: ry }}
      >
        <motion.div
          className="-ml-5 -mt-5 h-10 w-10 rounded-full border border-flare/50"
          animate={{ scale: active ? 1.9 : 1, opacity: active ? 0.9 : 0.35 }}
          transition={{ type: "spring", stiffness: 250, damping: 20 }}
        />
      </motion.div>
    </>
  );
}
