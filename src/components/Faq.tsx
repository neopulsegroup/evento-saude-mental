import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { FAQ } from "../lib/site";

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white">
      {FAQ.map((f, i) => (
        <div key={f.q}>
          <h3>
            <button className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-sm font-semibold" aria-expanded={open === i} aria-controls={`faq-${i}`} onClick={() => setOpen(open === i ? null : i)}>
              {f.q}
              <ChevronDown size={18} className={`shrink-0 transition ${open === i ? "rotate-180" : ""}`} />
            </button>
          </h3>
          {/* Answers stay in the SSR HTML (hidden attr toggled) so crawlers always see them */}
          <AnimatePresence initial={false}>
            {open === i && (
              <motion.div id={`faq-${i}`} initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                <p className="px-5 pb-4 text-sm text-muted">{f.a}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
