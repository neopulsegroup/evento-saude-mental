export const SITE = {
  name: "Encontro de Líderes e Gestores — Oporto Forte Group",
  shortName: "Encontro de Líderes e Gestores",
  url: "https://eventorecife.oportoforte.com",
  title: "Encontro de Líderes e Gestores em Recife | 3 de novembro de 2026 | OFG",
  description:
    "Encontro exclusivo em Recife (Hub Plural Espinheiro, 3 de novembro de 2026) sobre saúde mental, riscos psicossociais, NR-1 e gestão de pessoas, com experiências do Brasil e da Europa. Garanta sua vaga.",
  startDate: "2026-11-03T09:00:00-03:00",
  endDate: "2026-11-03T18:00:00-03:00",
  venue: "Hub Plural Espinheiro",
  street: "Av. Gov. Agamenon Magalhães, 2939",
  district: "Espinheiro",
  postalCode: "52021-170",
  mapsQuery: "Hub Plural Espinheiro, Av. Gov. Agamenon Magalhães, 2939 - Espinheiro, Recife - PE, 52021-170",
  city: "Recife",
  region: "PE",
  country: "BR",
  ogImage: "/og.jpg",
  formEndpoint: import.meta.env.PUBLIC_FORM_ENDPOINT ?? "",
};

export const TOPICS = [
  { icon: "brain", title: "Saúde mental, burnout e segurança psicológica 2027" },
  { icon: "globe", title: "Experiências de empresas portuguesas e europeias na gestão de pessoas" },
  { icon: "shield", title: "NR-1 e prevenção de riscos psicossociais no Brasil" },
  { icon: "trend", title: "Como transformar desafios de gestão de pessoas em oportunidades de evolução" },
  { icon: "users", title: "Conexões e troca de experiências entre líderes e gestores" },
] as const;

export const FAQ = [
  { q: "Quando e onde acontece o encontro?", a: "No dia 3 de novembro de 2026 (terça-feira), no Hub Plural Espinheiro (Av. Gov. Agamenon Magalhães, 2939, Espinheiro), em Recife, de forma presencial." },
  { q: "Para quem é o evento?", a: "Para líderes, gestores e decisores que acreditam que o futuro das empresas começa nas pessoas." },
  { q: "Quais temas serão abordados?", a: "Saúde mental e burnout, segurança psicológica, NR-1 e prevenção de riscos psicossociais, e experiências de gestão de pessoas do Brasil e da Europa." },
  { q: "Como minha participação ajuda o projeto social?", a: "Ao participar, você poderá adquirir um Passe de Ouro e transformar o valor da sua contribuição em um par de tênis para uma criança do projeto Um Saque para a Vida." },
];
