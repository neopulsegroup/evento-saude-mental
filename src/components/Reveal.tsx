import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

interface Props { children: ReactNode; delay?: number; y?: number; x?: number; className?: string }

/** Scroll-reveal wrapper. Content is SSR-rendered visible-by-default for SEO; animation only runs on the client. */
export default function Reveal({ children, delay = 0, y = 24, x = 0, className }: Props) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div className={className} initial={{ opacity: 0, y, x }} whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </motion.div>
  );
}
