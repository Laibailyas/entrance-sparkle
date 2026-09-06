import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import type { ReactNode } from "react";

type Props = {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  /** parallax depth: bigger = moves more with pointer */
  depth?: number;
  rotate?: number;
  delay?: number;
  from?: { x?: number; y?: number; rotate?: number };
  eager?: boolean;
  children?: ReactNode;
};

export function TiltPhoto({
  src,
  alt,
  width,
  height,
  className = "",
  depth = 18,
  rotate = 0,
  delay = 0,
  from = {},
  eager = false,
  children,
}: Props) {
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 150, damping: 18 });
  const sy = useSpring(py, { stiffness: 150, damping: 18 });
  const rotateY = useTransform(sx, [-0.5, 0.5], [-depth, depth]);
  const rotateX = useTransform(sy, [-0.5, 0.5], [depth, -depth]);
  const glareX = useTransform(sx, [-0.5, 0.5], ["18%", "82%"]);

  return (
    <motion.div
      className={`[perspective:1100px] ${className}`}
      initial={{ opacity: 0, x: from.x ?? 0, y: from.y ?? 40, rotate: (from.rotate ?? rotate) + 6, scale: 0.94 }}
      animate={{ opacity: 1, x: 0, y: 0, rotate, scale: 1 }}
      transition={{ duration: 1.1, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.div
        data-cursor-hover
        className="photo-frame relative [transform-style:preserve-3d]"
        style={{ rotateX, rotateY }}
        whileHover={{ scale: 1.035, z: 40 }}
        transition={{ type: "spring", stiffness: 220, damping: 20 }}
        onPointerMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          px.set((e.clientX - r.left) / r.width - 0.5);
          py.set((e.clientY - r.top) / r.height - 0.5);
        }}
        onPointerLeave={() => {
          px.set(0);
          py.set(0);
        }}
      >
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          loading={eager ? "eager" : "lazy"}
          className="block h-full w-full object-cover grayscale contrast-[1.08]"
        />
        <motion.span
          aria-hidden
          className="pointer-events-none absolute inset-0 mix-blend-overlay"
          style={{
            background: `radial-gradient(circle at ${glareX} 30%, rgba(255,255,255,0.5), transparent 55%)`,
          }}
        />
        {children}
      </motion.div>
    </motion.div>
  );
}
