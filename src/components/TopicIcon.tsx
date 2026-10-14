import { Brain, Globe, ShieldCheck, TrendingUp, Users } from "lucide-react";
const map = { brain: Brain, globe: Globe, shield: ShieldCheck, trend: TrendingUp, users: Users };
export default function TopicIcon({ name }: { name: keyof typeof map }) {
  const I = map[name];
  return <I size={22} aria-hidden />;
}
