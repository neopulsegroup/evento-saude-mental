import { useEffect, useState, type FormEvent } from "react";
import { z } from "zod";
import { User, Mail, Phone, Building2, Briefcase, Send, Lock, CheckCircle2, Loader2, CalendarCheck } from "lucide-react";

const schema = z.object({
  nome: z.string().trim().min(3, "Informe seu nome completo"),
  email: z.string().trim().email("E-mail inválido"),
  telefone: z.string().trim().refine((v) => v.replace(/\D/g, "").length >= 10, "Telefone inválido"),
  empresa: z.string().trim().min(2, "Informe a empresa"),
  cargo: z.string().trim().min(2, "Informe o cargo"),
});
type Fields = keyof z.infer<typeof schema>;

const maskPhone = (v: string) => {
  const d = v.replace(/\D/g, "").slice(0, 11);
  if (d.length <= 2) return d;
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
};

const FIELDS: { name: Fields; label: string; type: string; autoComplete: string; Icon: typeof User; inputMode?: "tel" | "email" }[] = [
  { name: "nome", label: "Nome completo", type: "text", autoComplete: "name", Icon: User },
  { name: "email", label: "E-mail corporativo", type: "email", autoComplete: "email", Icon: Mail, inputMode: "email" },
  { name: "telefone", label: "Telefone", type: "tel", autoComplete: "tel", Icon: Phone, inputMode: "tel" },
  { name: "empresa", label: "Empresa", type: "text", autoComplete: "organization", Icon: Building2 },
  { name: "cargo", label: "Cargo", type: "text", autoComplete: "organization-title", Icon: Briefcase },
];

export default function RegistrationForm({ endpoint }: { endpoint: string }) {
  const [values, setValues] = useState<Record<Fields, string>>({ nome: "", email: "", telefone: "", empresa: "", cargo: "" });
  const [errors, setErrors] = useState<Partial<Record<Fields | "captcha" | "form", string>>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "done">("idle");
  const [captcha, setCaptcha] = useState("");
  const [honey, setHoney] = useState("");
  // Random challenge generated after hydration (keeps SSR markup deterministic).
  const [[a, b], setPair] = useState<[number, number]>([8, 3]);
  useEffect(() => setPair([Math.floor(Math.random() * 6) + 3, Math.floor(Math.random() * 6) + 2]), []);

  const set = (k: Fields, v: string) => {
    setValues((s) => ({ ...s, [k]: k === "telefone" ? maskPhone(v) : v }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined }));
  };

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (honey) return; // bot
    const parsed = schema.safeParse(values);
    const next: typeof errors = {};
    if (!parsed.success) for (const i of parsed.error.issues) next[i.path[0] as Fields] ??= i.message;
    if (Number(captcha) !== a + b) next.captcha = "Resposta incorreta";
    setErrors(next);
    if (Object.keys(next).length) return;

    setStatus("loading");
    try {
      if (endpoint) {
        const res = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({ ...parsed.data, evento: "Encontro de Líderes e Gestores — Recife 2026", origem: location.href, enviadoEm: new Date().toISOString() }),
        });
        if (!res.ok) throw new Error(String(res.status));
      }
      setStatus("done");
    } catch {
      setErrors({ form: "Não foi possível enviar agora. Tente novamente em instantes." });
      setStatus("idle");
    }
  }

  if (status === "done")
    return (
      <div role="status" className="flex min-h-[420px] flex-col items-center justify-center gap-4 px-6 text-center text-white">
        <CheckCircle2 size={56} className="text-brand" />
        <h3 className="text-2xl font-bold">Inscrição recebida!</h3>
        <p className="text-sm text-white/80">Obrigado, {values.nome.split(" ")[0]}. Enviaremos os detalhes do encontro para <b>{values.email}</b>.</p>
        <p className="inline-flex items-center gap-2 text-sm text-white/70"><CalendarCheck size={16} /> 3 de novembro de 2026 · Hub Plural Espinheiro, Recife</p>
      </div>
    );

  return (
    <form onSubmit={onSubmit} noValidate aria-labelledby="form-title" className="p-6 sm:p-7">
      <div className="mb-5 flex items-start gap-3 text-white">
        <span className="mt-0.5 grid size-11 place-items-center rounded-full bg-brand/15 text-brand"><User size={22} /></span>
        <div>
          <h2 id="form-title" className="text-lg font-bold">Garanta sua vaga</h2>
          <p className="text-xs text-white/70">Preencha o formulário e participe deste encontro exclusivo.</p>
        </div>
      </div>

      <div className="space-y-3">
        {FIELDS.map(({ name, label, type, autoComplete, Icon, inputMode }) => (
          <div key={name}>
            <label htmlFor={`f-${name}`} className="sr-only">{label}</label>
            <div className={`flex items-center gap-3 rounded-lg border bg-white/[0.06] px-3.5 transition focus-within:border-brand focus-within:bg-white/10 ${errors[name] ? "border-red-400" : "border-white/20"}`}>
              <Icon size={16} className="shrink-0 text-white/60" aria-hidden />
              <input id={`f-${name}`} name={name} type={type} inputMode={inputMode} autoComplete={autoComplete} placeholder={`${label}*`} required
                value={values[name]} onChange={(e) => set(name, e.target.value)}
                aria-invalid={!!errors[name]} aria-describedby={errors[name] ? `e-${name}` : undefined}
                className="w-full bg-transparent py-3 text-sm text-white outline-none placeholder:text-white/55" />
            </div>
            {errors[name] && <p id={`e-${name}`} className="mt-1 text-xs text-red-300">{errors[name]}</p>}
          </div>
        ))}

        <div>
          <label htmlFor="f-captcha" className="sr-only">Verificação: quanto é {a} + {b}?</label>
          <div className={`flex items-center gap-3 rounded-lg border bg-white/[0.06] px-3.5 focus-within:border-brand ${errors.captcha ? "border-red-400" : "border-white/20"}`}>
            <span className="shrink-0 whitespace-nowrap text-sm font-semibold text-white/80" aria-hidden>{a} + {b} =</span>
            <input id="f-captcha" inputMode="numeric" autoComplete="off" placeholder="?" value={captcha} onChange={(e) => { setCaptcha(e.target.value); setErrors((s) => ({ ...s, captcha: undefined })); }}
              className="w-full bg-transparent py-3 text-sm text-white outline-none placeholder:text-white/55" />
          </div>
          {errors.captcha && <p className="mt-1 text-xs text-red-300">{errors.captcha}</p>}
        </div>

        {/* honeypot */}
        <input type="text" tabIndex={-1} autoComplete="off" aria-hidden value={honey} onChange={(e) => setHoney(e.target.value)} className="absolute -left-[9999px] h-0 w-0 opacity-0" name="website" />
      </div>

      {errors.form && <p role="alert" className="mt-3 text-sm text-red-300">{errors.form}</p>}

      <button type="submit" disabled={status === "loading"}
        className="mt-5 flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-brand to-brand-600 py-3.5 text-sm font-bold tracking-wide text-white shadow-lg shadow-brand/30 transition hover:brightness-110 active:scale-[0.99] disabled:opacity-70">
        {status === "loading" ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
        QUERO PARTICIPAR
      </button>
      <p className="mt-3 flex items-center justify-center gap-1.5 text-[11px] text-white/70"><Lock size={12} /> Seus dados estão seguros.</p>
    </form>
  );
}
