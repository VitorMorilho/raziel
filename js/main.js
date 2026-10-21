// Monta os cards a partir de SERVICOS/ETAPAS (js/dados.js) e cuida da janela de detalhes,
// links do WhatsApp, tema e animações. Sem bibliotecas.

const $ = (seletor, raiz = document) => raiz.querySelector(seletor);

// Escapa texto vindo dos dados antes de entrar no innerHTML
function esc(texto) {
  return String(texto).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

function tags(lista) {
  return `<ul class="tags">${lista.map((t) => `<li>${esc(t)}</li>`).join("")}</ul>`;
}

function linkWhatsapp(servico) {
  const texto = servico ? `Olá, Raziel! Vi seu site e quero saber mais sobre ${servico.nome.toLowerCase()}.` : CONTATO.mensagem;
  return `https://wa.me/${CONTATO.whatsapp}?text=${encodeURIComponent(texto)}`;
}

// Ilustrações em SVG para cada serviço (o site ainda não tem fotos)
const SVGS = {
  ondas: `
    <svg class="ilustra" viewBox="0 0 200 200" fill="none" stroke="currentColor" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <circle cx="132" cy="62" r="16"/>
      <path d="M40 104l44-22 26 22 32-14"/>
      <path d="M20 132c14 0 14-10 28-10s14 10 28 10 14-10 28-10 14 10 28 10 14-10 28-10 14 10 20 10"/>
      <path d="M20 162c14 0 14-10 28-10s14 10 28 10 14-10 28-10 14 10 28 10 14-10 28-10 14 10 20 10"/>
    </svg>`,
  boia: `
    <svg class="ilustra" viewBox="0 0 200 200" fill="none" stroke="currentColor" stroke-width="6" stroke-linecap="round" aria-hidden="true">
      <circle cx="100" cy="90" r="58"/>
      <circle cx="100" cy="90" r="26"/>
      <path d="M59 49l22 22M141 49l-22 22M59 131l22-22M141 131l-22-22"/>
      <path d="M20 172c14 0 14-10 28-10s14 10 28 10 14-10 28-10 14 10 28 10 14-10 28-10 14 10 20 10"/>
    </svg>`,
  halter: `
    <svg class="ilustra" viewBox="0 0 200 200" fill="none" stroke="currentColor" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M66 100h68"/>
      <rect x="44" y="66" width="22" height="68" rx="6"/>
      <rect x="134" y="66" width="22" height="68" rx="6"/>
      <rect x="26" y="80" width="18" height="40" rx="5"/>
      <rect x="156" y="80" width="18" height="40" rx="5"/>
    </svg>`,
};

function renderServicos() {
  $("#servicos").innerHTML = SERVICOS.map(
    (s) => `
      <article class="card revelar" data-id="${esc(s.id)}">
        <div class="card__corpo">
          <span class="card__status">${esc(s.publico)}</span>
          <h3>${esc(s.nome)}</h3>
          <p class="card__resumo">${esc(s.resumo)}</p>
          ${tags(s.tags)}
          <button type="button" class="card__mais">Ver detalhes</button>
        </div>
        <div class="card__visual visual--${esc(s.visual)}">${SVGS[s.visual]}</div>
      </article>`
  ).join("");
}

function renderEtapas() {
  $("#etapas").innerHTML = ETAPAS.map(
    (e, i) => `<li class="revelar"><span class="etapa__num">${i + 1}</span><h3>${esc(e.titulo)}</h3><p>${esc(e.texto)}</p></li>`
  ).join("");
}

// ---------- Janela de detalhes ----------
function abrirDetalhe(id) {
  const s = SERVICOS.find((x) => x.id === id);
  if (!s) return;

  $("#detalhe-conteudo").innerHTML = `
    <div class="detalhe__corpo">
      <div>
        <p class="sobretitulo">${esc(s.publico)}</p>
        <h2 id="detalhe-titulo">${esc(s.nome)}</h2>
      </div>
      <p>${esc(s.descricao)}</p>
      <h3>O que você ganha</h3>
      <ul class="lista">${s.destaques.map((d) => `<li>${esc(d)}</li>`).join("")}</ul>
      ${tags(s.tags)}
      <div class="hero__acoes">
        <a class="botao botao--cheio" href="${linkWhatsapp(s)}" target="_blank" rel="noopener">Agendar pelo WhatsApp</a>
      </div>
    </div>`;

  const dialogo = $("#detalhe");
  dialogo.showModal();
  dialogo.scrollTop = 0;
  history.replaceState(null, "", `#${s.id}`);
}

function configurarDetalhe() {
  const dialogo = $("#detalhe");
  $("#servicos").addEventListener("click", (e) => {
    const card = e.target.closest(".card");
    if (card) abrirDetalhe(card.dataset.id);
  });
  $(".detalhe__fechar").addEventListener("click", () => dialogo.close());
  // Clique fora do conteúdo (no fundo escurecido) fecha
  dialogo.addEventListener("click", (e) => {
    if (e.target === dialogo) dialogo.close();
  });
  dialogo.addEventListener("close", () => history.replaceState(null, "", "#aulas"));

  // Link direto para um serviço, ex.: site.com/#hidroginastica
  const hash = location.hash.slice(1);
  if (SERVICOS.some((s) => s.id === hash)) abrirDetalhe(hash);
}

function configurarContato() {
  document.querySelectorAll("[data-whatsapp]").forEach((a) => (a.href = linkWhatsapp()));
  document.querySelectorAll("[data-instagram]").forEach((a) => (a.href = CONTATO.instagramAcademia));
}

// ---------- Tema ----------
function configurarTema() {
  $(".tema").addEventListener("click", () => {
    const raiz = document.documentElement;
    const escuroAgora =
      raiz.dataset.theme === "dark" ||
      (!raiz.dataset.theme && matchMedia("(prefers-color-scheme: dark)").matches);
    raiz.dataset.theme = escuroAgora ? "light" : "dark";
    try {
      localStorage.setItem("tema", raiz.dataset.theme);
    } catch (e) {}
  });
}

// ---------- Animações ao rolar ----------
function configurarRevelar() {
  const elementos = document.querySelectorAll(".revelar");
  if (!("IntersectionObserver" in window)) {
    elementos.forEach((el) => el.classList.add("visivel"));
    return;
  }
  const obs = new IntersectionObserver(
    (entradas) =>
      entradas.forEach((en) => {
        if (en.isIntersecting) {
          en.target.classList.add("visivel");
          obs.unobserve(en.target);
        }
      }),
    { threshold: 0.12 }
  );
  elementos.forEach((el) => obs.observe(el));
}

function configurarTopo() {
  const topo = $(".topo");
  const atualizar = () => topo.classList.toggle("rolou", scrollY > 8);
  addEventListener("scroll", atualizar, { passive: true });
  atualizar();
}

renderServicos();
renderEtapas();
configurarDetalhe();
configurarContato();
configurarTema();
configurarRevelar();
configurarTopo();
$("#ano").textContent = new Date().getFullYear();
