import { motion, useReducedMotion } from "motion/react";
import { TOPICS } from "../lib/site";
import TopicIcon from "./TopicIcon";

export default function Topics() {
  const reduce = useReducedMotion();
  return (
    <ul className="space-y-4">
      {TOPICS.map((t, i) => (
        <motion.li key={t.title} className="flex items-center gap-4"
          initial={reduce ? false : { opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-40px" }} transition={{ delay: i * 0.08, duration: 0.5 }}
          whileHover={reduce ? undefined : { x: 4 }}>
          <span className="grid size-12 shrink-0 place-items-center rounded-full bg-gradient-to-br from-brand-600 to-navy-700 text-white shadow-md"><TopicIcon name={t.icon} /></span>
          <span className="text-sm leading-snug text-ink">{t.title}</span>
        </motion.li>
      ))}
    </ul>
  );
}
