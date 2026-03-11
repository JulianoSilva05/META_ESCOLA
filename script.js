const appData = {
  title: "Meta",
  modules: [
    {
      id: "modulo-1",
      name: "Módulo 1",
      description: "Disciplinas iniciais",
      disciplines: [
        {
          id: "bd1",
          name: "Banco de Dados 1",
          folder: "Banco de Dados 1",
        },
        {
          id: "esw",
          name: "Engenharia de Software",
          folder: "Endegenhaia de Software",
        },
      ],
    },
  ],
};

function $(selector) {
  const el = document.querySelector(selector);
  if (!el) throw new Error(`Elemento não encontrado: ${selector}`);
  return el;
}

function normalizeHash(hash) {
  const raw = (hash || "").trim();
  if (!raw || raw === "#") return "#/";
  if (raw.startsWith("#/")) return raw;
  if (raw.startsWith("#")) return `#/${raw.slice(1)}`;
  return `#/${raw}`;
}

function setText(selector, text) {
  $(selector).textContent = text;
}

function setBreadcrumbs(current) {
  const currentEl = document.querySelector("[data-breadcrumbs-current]");
  if (currentEl) currentEl.textContent = current;
}

function clearGrid() {
  const grid = document.querySelector("[data-grid]");
  if (!grid) return;
  grid.innerHTML = "";
}

function createCard({ title, meta, href }) {
  const tpl = document.getElementById("card-template");
  if (!tpl || !(tpl instanceof HTMLTemplateElement)) {
    const a = document.createElement("a");
    a.className = "card";
    a.href = href;
    a.innerHTML = `<div class="card__icon" aria-hidden="true"></div><div class="card__body"><div class="card__title"></div><div class="card__meta"></div></div>`;
    a.querySelector(".card__title").textContent = title;
    a.querySelector(".card__meta").textContent = meta;
    return a;
  }

  const node = tpl.content.firstElementChild.cloneNode(true);
  node.href = href;
  node.querySelector(".card__title").textContent = title;
  node.querySelector(".card__meta").textContent = meta;
  return node;
}

function renderModules() {
  setText("[data-page-title]", "Módulos");
  setText(
    "[data-page-subtitle]",
    "Selecione um módulo para ver as disciplinas."
  );
  setBreadcrumbs("Módulos");

  const grid = $("[data-grid]");
  clearGrid();

  for (const mod of appData.modules) {
    const card = createCard({
      title: mod.name,
      meta: mod.description,
      href: `#/${mod.id}`,
    });
    grid.appendChild(card);
  }
}

function renderModule(moduleId) {
  const mod = appData.modules.find((m) => m.id === moduleId);
  if (!mod) {
    renderNotFound();
    return;
  }

  setText("[data-page-title]", mod.name);
  setText(
    "[data-page-subtitle]",
    "Selecione uma disciplina para acessar os materiais."
  );
  setBreadcrumbs(mod.name);

  const grid = $("[data-grid]");
  clearGrid();

  for (const d of mod.disciplines) {
    const card = createCard({
      title: d.name,
      meta: `Pasta: ${d.folder}`,
      href: `#/${mod.id}/${d.id}`,
    });
    grid.appendChild(card);
  }
}

function renderDiscipline(moduleId, disciplineId) {
  const mod = appData.modules.find((m) => m.id === moduleId);
  const disc = mod?.disciplines.find((d) => d.id === disciplineId);
  if (!mod || !disc) {
    renderNotFound();
    return;
  }

  setText("[data-page-title]", disc.name);
  setText(
    "[data-page-subtitle]",
    `Conteúdos: ${disc.folder}. Em breve: lista de aulas e arquivos.`
  );
  setBreadcrumbs(`${mod.name} / ${disc.name}`);

  const grid = $("[data-grid]");
  clearGrid();

  const back = createCard({
    title: "Voltar para o Módulo",
    meta: mod.name,
    href: `#/${mod.id}`,
  });
  grid.appendChild(back);

  const info = document.createElement("div");
  info.className = "card";
  info.setAttribute("role", "group");
  info.innerHTML =
    '<div class="card__icon" aria-hidden="true"></div><div class="card__body"><div class="card__title"></div><div class="card__meta"></div></div>';
  info.querySelector(".card__title").textContent = "Estrutura sugerida";
  info.querySelector(".card__meta").textContent =
    "00-Admin, 01-Aulas, 02-Exercicios, 03-Projetos, 04-SQL, 05-Avaliacoes, 99-Materiais";
  grid.appendChild(info);

  const openFolder = document.createElement("div");
  openFolder.className = "card";
  openFolder.setAttribute("role", "group");
  openFolder.innerHTML =
    '<div class="card__icon" aria-hidden="true"></div><div class="card__body"><div class="card__title"></div><div class="card__meta"></div></div>';
  openFolder.querySelector(".card__title").textContent = "Pasta da disciplina";
  openFolder.querySelector(".card__meta").textContent = disc.folder;
  grid.appendChild(openFolder);
}

function renderNotFound() {
  setText("[data-page-title]", "Página não encontrada");
  setText("[data-page-subtitle]", "Use o menu inicial para navegar.");
  setBreadcrumbs("404");

  const grid = $("[data-grid]");
  clearGrid();

  grid.appendChild(
    createCard({
      title: "Ir para Início",
      meta: "Módulos",
      href: "#/",
    })
  );
}

function render() {
  const hash = normalizeHash(location.hash);
  if (hash !== location.hash) {
    history.replaceState(null, "", hash);
  }

  const parts = hash.replace(/^#\//, "").split("/").filter(Boolean);
  if (parts.length === 0) {
    renderModules();
    return;
  }

  if (parts.length === 1) {
    renderModule(parts[0]);
    return;
  }

  if (parts.length >= 2) {
    renderDiscipline(parts[0], parts[1]);
    return;
  }

  renderNotFound();
}

window.addEventListener("hashchange", render);
window.addEventListener("DOMContentLoaded", render);

