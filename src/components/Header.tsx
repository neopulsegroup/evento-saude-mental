import { useEffect, useState } from "react";
import { Menu, X, ShieldCheck } from "lucide-react";

const LINKS = [
  { href: "#home", label: "Home" },
  { href: "#sobre", label: "Sobre o evento" },
  { href: "#temas", label: "Programação" },
  { href: "#impacto", label: "Projeto social" },
  { href: "#local", label: "Local" },
  { href: "#inscricao", label: "Inscrições" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("#home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(`#${e.target.id}`)),
      { rootMargin: "-40% 0px -55% 0px" },
    );
    LINKS.forEach((l) => {
      const el = document.querySelector(l.href);
      el && io.observe(el);
    });
    return () => { window.removeEventListener("scroll", onScroll); io.disconnect(); };
  }, []);

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled || open ? "bg-navy-950/90 py-3 shadow-lg backdrop-blur-md" : "py-5"}`}>
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5">
        <a href="#home" aria-label="OFG — Oporto Forte Group" className="flex items-center gap-2">
          <svg width="40" height="40" viewBox="0 0 64 64" aria-hidden="true">
            <defs><linearGradient id="hg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#6fd6ff" /><stop offset="1" stopColor="#1457d9" /></linearGradient></defs>
            <circle cx="32" cy="32" r="28" fill="url(#hg)" />
            <path d="M6 24h52M5 32h54M7 40h50M12 48h40" stroke="#fff" strokeOpacity=".75" strokeWidth="2.5" />
          </svg>
          <span className="leading-none text-white">
            <span className="block font-display text-[28px] font-extrabold">OFG</span>
            <span className="block text-[8px] text-white/80">Oporto Forte Group</span>
          </span>
        </a>

        <nav aria-label="Principal" className="hidden items-center gap-7 lg:flex">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} aria-current={active === l.href ? "true" : undefined}
              className={`relative py-1 text-[13px] font-medium transition-colors hover:text-white ${active === l.href ? "text-white" : "text-white/75"}`}>
              {l.label}
              {active === l.href && <span className="absolute inset-x-0 -bottom-1 h-0.5 rounded bg-brand" />}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-2 rounded-lg border border-white/25 px-3 py-2 text-white lg:flex">
          <ShieldCheck size={22} aria-hidden />
          <span className="text-[8px] leading-tight tracking-wider text-white/70">CERTIFICADO<br /><b className="text-[11px] text-white">ISO 9001</b></span>
        </div>

        <button className="rounded-md p-2 text-white lg:hidden" aria-label={open ? "Fechar menu" : "Abrir menu"} aria-expanded={open} onClick={() => setOpen((o) => !o)}>
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <nav aria-label="Mobile" className="mx-auto mt-3 flex max-w-6xl flex-col gap-1 px-5 pb-3 lg:hidden">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="rounded-md px-3 py-3 text-sm font-medium text-white/90 hover:bg-white/10">{l.label}</a>
          ))}
        </nav>
      )}
    </header>
  );
}
