import { motion, useScroll, useTransform } from "motion/react";

/** Ambient animated glow + subtle parallax behind the hero. Purely decorative. */
export default function HeroBackdrop() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, 120]);
  return (
    <motion.div style={{ y }} aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute -left-24 top-10 h-[420px] w-[420px] animate-float rounded-full bg-brand/25 blur-[110px]" />
      <div className="absolute right-[-80px] top-1/3 h-[480px] w-[480px] animate-float rounded-full bg-blue-600/30 blur-[120px] [animation-delay:-4s]" />
      <div className="absolute bottom-0 left-1/3 h-[300px] w-[500px] animate-float rounded-full bg-cyan-400/10 blur-[100px] [animation-delay:-7s]" />
      <div className="absolute inset-0 opacity-[0.07] [background-image:radial-gradient(#fff_1px,transparent_1px)] [background-size:28px_28px]" />
    </motion.div>
  );
}
