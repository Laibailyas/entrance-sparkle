import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useEffect } from "react";
import { Apple, ArrowDown, Play } from "lucide-react";
import { TiltPhoto } from "./TiltPhoto";
import { PartnerMarquee } from "./PartnerMarquee";
import firefighter from "@/assets/firefighter.jpg";
import dog from "@/assets/dog.jpg";
import volunteer from "@/assets/volunteer.jpg";
import koala from "@/assets/koala.jpg";

const ease = [0.16, 1, 0.3, 1] as const;

function WordsUp({ text, className, delay = 0 }: { text: string; className?: string; delay?: number }) {
  return (
    <span className={`block overflow-hidden whitespace-nowrap ${className ?? ""}`}>
      <motion.span
        className="block"
        initial={{ y: "110%", rotate: 4 }}
        animate={{ y: "0%", rotate: 0 }}
        transition={{ duration: 1.05, delay, ease }}
      >
        {text}
      </motion.span>
    </span>
  );
}

export function Hero() {
  // global pointer parallax for the collage layers
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const smx = useSpring(mx, { stiffness: 60, damping: 20 });
  const smy = useSpring(my, { stiffness: 60, damping: 20 });
  const layerA = useTransform(smx, [-0.5, 0.5], [-26, 26]);
  const layerAy = useTransform(smy, [-0.5, 0.5], [-16, 16]);
  const layerB = useTransform(smx, [-0.5, 0.5], [18, -18]);
  const layerBy = useTransform(smy, [-0.5, 0.5], [12, -12]);
  const centerTilt = useTransform(smx, [-0.5, 0.5], [4, -4]);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      mx.set(e.clientX / window.innerWidth - 0.5);
      my.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, [mx, my]);

  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-paper">
      {/* header */}
      <motion.header
        initial={{ opacity: 0, y: -24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease }}
        className="relative z-30 border-b border-ink/10"
      >
        <div className="mx-auto flex max-w-[1600px] items-center justify-between px-6 py-5">
          <a href="/" data-cursor-hover className="flex items-center gap-3">
            <span className="grid h-8 w-8 place-items-center rounded-full bg-ink text-paper">
              <Play className="h-3.5 w-3.5 fill-current" />
            </span>
            <span className="font-display text-3xl tracking-tight">DOTTIS</span>
          </a>
          <nav className="hidden gap-8 font-stamp text-xs uppercase tracking-[0.2em] text-ink/70 md:flex">
            <a data-cursor-hover className="transition-colors hover:text-flare" href="#causes">Causes</a>
            <a data-cursor-hover className="transition-colors hover:text-flare" href="#how">How it works</a>
            <a data-cursor-hover className="transition-colors hover:text-flare" href="#impact">Impact</a>
          </nav>
        </div>
      </motion.header>

      {/* collage stage */}
      <div className="relative mx-auto grid w-full max-w-[1600px] flex-1 grid-cols-1 items-center gap-10 px-6 py-10 lg:grid-cols-[0.8fr_minmax(600px,1.15fr)_0.8fr] lg:gap-4">
        {/* left cluster */}
        <motion.div style={{ x: layerA, y: layerAy }} className="relative order-2 lg:order-1">
          <motion.div
            aria-hidden
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, delay: 0.15, ease }}
            className="absolute -top-6 left-24 h-48 w-48 rounded-full bg-flare md:h-60 md:w-60"
          />
          <motion.div
            aria-hidden
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="absolute right-2 top-10 hidden h-28 w-40 bg-[repeating-linear-gradient(0deg,var(--ink)_0_4px,transparent_4px_9px)] md:block"
          />
          <TiltPhoto
            src={firefighter}
            alt="Firefighter facing a burning forest as a helicopter drops water"
            width={900}
            height={1200}
            eager
            depth={16}
            rotate={-2}
            delay={0.25}
            from={{ x: -70, rotate: -8 }}
            className="relative z-10 w-[78%] max-w-[420px]"
          />
          <TiltPhoto
            src={dog}
            alt="Rescued dog held close by a volunteer"
            width={1000}
            height={800}
            depth={22}
            rotate={5}
            delay={0.55}
            from={{ y: 90, rotate: 14 }}
            className="relative z-20 -mt-24 ml-[32%] w-[62%] max-w-[330px]"
          />
        </motion.div>

        {/* center copy */}
        <motion.div
          style={{ rotate: centerTilt }}
          className="order-1 text-center lg:order-2 lg:px-2"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.9, rotate: -3 }}
            animate={{ opacity: 1, scale: 1, rotate: -1 }}
            transition={{ duration: 0.7, delay: 0.2, ease }}
            className="inline-block bg-tape px-6 py-2 font-stamp text-xs font-medium uppercase tracking-[0.3em] text-ink shadow-sm"
          >
            Together, we can
          </motion.span>

          <h1 className="mt-6 font-display text-[clamp(2.2rem,4.6vw,4.5rem)] leading-[0.92] tracking-tight">
            <WordsUp text="Let your feed," delay={0.35} />
            <WordsUp text="feed someone" className="text-flare" delay={0.5} />
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.8, ease }}
            className="mx-auto mt-7 max-w-md text-base leading-relaxed text-ink/80 md:text-lg"
          >
            Share your small slice of unused internet and generate donations for
            causes that need it most — at no cost to you.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.95, ease }}
            className="mt-9 [perspective:800px]"
          >
            <motion.a
              href="#install"
              data-cursor-hover
              whileHover={{ rotateX: -10, scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 320, damping: 18 }}
              className="inline-flex items-center gap-4 rounded-full bg-ink py-3.5 pl-8 pr-3.5 text-lg text-paper [transform-style:preserve-3d]"
            >
              Install Dottis
              <span className="grid h-9 w-9 place-items-center rounded-full bg-flare">
                <Play className="h-4 w-4 fill-current text-paper" />
              </span>
            </motion.a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.15 }}
            className="mt-7"
          >
            <p className="text-sm font-medium text-ink/80">Available for</p>
            <div className="mt-3 flex items-center justify-center gap-6 text-ink">
              {["Windows", "Android", "macOS"].map((os, i) => (
                <motion.span
                  key={os}
                  data-cursor-hover
                  title={os}
                  whileHover={{ y: -5, scale: 1.18, color: "var(--flare)" }}
                  transition={{ type: "spring", stiffness: 350, damping: 15 }}
                  className="inline-block"
                >
                  {i === 2 ? (
                    <Apple className="h-6 w-6 fill-current" />
                  ) : i === 0 ? (
                    <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current" aria-hidden>
                      <path d="M3 5.5 10.5 4.4v7.1H3zM11.6 4.2 21 3v8.5h-9.4zM3 12.5h7.5v7.1L3 18.5zM11.6 12.5H21V21l-9.4-1.3z" />
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current" aria-hidden>
                      <path d="M6 9h12v8a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2zM4 9.5a1.4 1.4 0 0 1 2.8 0v5a1.4 1.4 0 0 1-2.8 0zm13.2 0a1.4 1.4 0 0 1 2.8 0v5a1.4 1.4 0 0 1-2.8 0zM9 20h2v2.6a1.3 1.3 0 0 1-2.6 0V20zm4 0h2v2.6a1.3 1.3 0 0 1-2.6 0V20zM7.4 7.8A4.9 4.9 0 0 1 12 4.2a4.9 4.9 0 0 1 4.6 3.6zm2-4.9.9 1.4-.6.4-.9-1.4zm4.3 0 .6.4-.9 1.4-.6-.4z" />
                    </svg>
                  )}
                </motion.span>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.4 }}
            className="mt-10 flex flex-col items-center gap-2"
          >
            <span className="font-stamp text-[0.65rem] uppercase tracking-[0.35em] text-ink/70">
              Scroll to explore
            </span>
            <motion.span
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            >
              <ArrowDown className="h-5 w-5 text-ink/70" />
            </motion.span>
          </motion.div>
        </motion.div>

        {/* right cluster */}
        <motion.div style={{ x: layerB, y: layerBy }} className="relative order-3">
          <motion.div
            aria-hidden
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, delay: 0.3, ease }}
            className="absolute right-2 top-4 h-24 w-40 bg-flare"
          />
          <motion.div
            aria-hidden
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, delay: 0.6, ease }}
            className="absolute bottom-20 right-0 h-48 w-48 rounded-full bg-flare"
          />
          <TiltPhoto
            src={volunteer}
            alt="Volunteer packing food boxes in a warehouse"
            width={900}
            height={1200}
            eager
            depth={16}
            rotate={2}
            delay={0.35}
            from={{ x: 70, rotate: 9 }}
            className="relative z-10 ml-auto w-[76%] max-w-[400px]"
          />
          <TiltPhoto
            src={koala}
            alt="Koala clinging to a tree"
            width={1000}
            height={900}
            depth={22}
            rotate={-4}
            delay={0.65}
            from={{ y: 90, rotate: -14 }}
            className="relative z-20 -mt-28 mr-[8%] w-[64%] max-w-[340px]"
          />
        </motion.div>
      </div>

      <PartnerMarquee />
    </div>
  );
}
