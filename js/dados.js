// Dados do site. Para mudar texto, contato ou acrescentar um serviço, edite só este arquivo:
// o main.js monta os cards e a janela de detalhes a partir destas listas.
// visual: "ondas" (natação), "boia" (hidroginástica) ou "halter" (personal).

const CONTATO = {
  // Número com DDI e DDD, só dígitos. Por enquanto é o WhatsApp da Aquarius;
  // troque pelo número do Raziel para os pedidos chegarem direto nele.
  whatsapp: "556599241529",
  mensagem: "Olá, Raziel! Vi seu site e quero saber mais sobre as aulas.",
  instagramAcademia: "https://www.instagram.com/aquariusacademiavg/",
};

const SERVICOS = [
  {
    id: "natacao-infantil",
    nome: "Natação infantil",
    resumo: "Aulas para crianças perderem o medo da água e aprenderem a nadar brincando.",
    publico: "Crianças",
    visual: "ondas",
    descricao:
      "As aulas começam pela adaptação ao meio líquido: entrar na água com confiança, flutuar e respirar do jeito certo. Depois vêm os estilos, sempre com brincadeiras e no ritmo de cada criança.",
    destaques: [
      "Adaptação à água para quem ainda tem medo",
      "Flutuação, respiração e deslocamento com segurança",
      "Aprendizado dos estilos: crawl, costas, peito e borboleta",
      "Aulas lúdicas, com atenção a cada aluno",
      "Mais coordenação, fôlego e disposição no dia a dia",
    ],
    tags: ["Adaptação", "Segurança na água", "Técnica", "Coordenação motora"],
  },
  {
    id: "hidroginastica",
    nome: "Hidroginástica",
    resumo: "Exercício na água para a melhor idade, com baixo impacto e muita animação.",
    publico: "Idosos",
    visual: "boia",
    descricao:
      "A água sustenta o corpo e diminui o impacto nas articulações, por isso a hidroginástica é ideal para a terceira idade. As aulas trabalham força, equilíbrio e condicionamento com música e em turma.",
    destaques: [
      "Baixo impacto nas articulações e na coluna",
      "Fortalecimento muscular e mais equilíbrio, prevenindo quedas",
      "Melhora da circulação e do condicionamento",
      "Exercícios adaptados ao limite de cada aluno",
      "Aula em grupo: saúde e convivência",
    ],
    tags: ["Baixo impacto", "Equilíbrio", "Força", "Bem-estar"],
  },
  {
    id: "personal",
    nome: "Personal trainer",
    resumo: "Treino montado para você, com acompanhamento e ajustes conforme a evolução.",
    publico: "Jovens e adultos",
    visual: "halter",
    descricao:
      "Antes de tudo, uma conversa sobre seu objetivo, sua rotina e seu histórico. A partir disso o Raziel monta um treino individual e acompanha a evolução, ajustando cargas e exercícios ao longo do caminho.",
    destaques: [
      "Avaliação inicial e definição de objetivo",
      "Treino individual: emagrecimento, ganho de massa, condicionamento ou saúde",
      "Correção de postura e execução para treinar sem lesão",
      "Ajustes periódicos conforme os resultados",
    ],
    tags: ["Treino individual", "Emagrecimento", "Hipertrofia", "Condicionamento"],
  },
];

const ETAPAS = [
  { titulo: "Conversa", texto: "Você conta seu objetivo, sua rotina e se tem alguma limitação ou lesão." },
  { titulo: "Avaliação", texto: "Um ponto de partida para medir sua evolução de forma concreta." },
  { titulo: "Treino montado", texto: "Exercícios, séries e cargas pensados só para você." },
  { titulo: "Acompanhamento", texto: "Correção de execução e ajustes do treino conforme você evolui." },
];
