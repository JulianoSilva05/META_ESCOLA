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
          syllabus: {
            competencies: [
              "Modelar e implementar bancos de dados relacionais.",
              "Aplicar comandos SQL para manipulação de dados.",
            ],
            skills: [
              "Apresentar conceitos básicos de BD e SGBD.",
              "Representar dados usando modelo conceitual.",
              "Apresentar conceitos do modelo lógico relacional.",
              "Gerar esquemas relacionais a partir do conceitual.",
              "Apresentar operações da álgebra relacional.",
              "Utilizar SQL para implementação, recuperação e manipulação.",
            ],
            topics: [
              "Conceitos básicos e terminologias de bancos de dados",
              "O modelo entidade-relacionamento",
              "O modelo relacional",
              "Mapeamento ER para o modelo relacional",
              "Álgebra relacional",
              "A linguagem SQL",
              "Dependência funcional e normalização",
              "Procedimentos armazenados",
              "Asserções",
              "Gatilhos",
              "Controle de transações",
            ],
          },
          lessons: [
            {
              id: "aula-01",
              title: "Aula 1 - Introdução a Banco de Dados",
              subtitle: "Conceitos básicos, terminologias, BD e SGBD",
            },
            {
              id: "aula-02",
              title: "Aula 2 - O modelo entidade-relacionamento",
              subtitle: "Entidades, atributos, relacionamentos, cardinalidade",
            },
            {
              id: "aula-03",
              title: "Aula 3 - O modelo relacional",
              subtitle: "Tabelas, chaves, integridade e relações",
            },
            {
              id: "aula-04",
              title: "Aula 4 - Mapeamento ER → Relacional",
              subtitle: "Geração de esquema relacional a partir do conceitual",
            },
            {
              id: "aula-05",
              title: "Aula 5 - Álgebra relacional",
              subtitle: "Seleção, projeção, junção e operações básicas",
            },
            {
              id: "aula-06",
              title: "Aula 6 - Linguagem SQL (DDL e DML)",
              subtitle: "CREATE/ALTER/DROP, INSERT/UPDATE/DELETE",
            },
            {
              id: "aula-07",
              title: "Aula 7 - SQL (consultas e junções)",
              subtitle: "SELECT, JOIN, filtros e agregações",
            },
            {
              id: "aula-08",
              title: "Aula 8 - Dependência funcional e normalização",
              subtitle: "1FN, 2FN, 3FN e boas práticas",
            },
            {
              id: "aula-09",
              title: "Aula 9 - Procedimentos armazenados",
              subtitle: "Stored procedures e rotinas no SGBD",
            },
            {
              id: "aula-10",
              title: "Aula 10 - Asserções e gatilhos",
              subtitle: "Integridade, regras e triggers",
            },
            {
              id: "aula-11",
              title: "Aula 11 - Controle de transações",
              subtitle: "ACID, commit/rollback e concorrência",
            },
          ],
        },
        {
          id: "esw",
          name: "Engenharia de Software",
          folder: "Endegenhaia de Software",
          syllabus: {
            competencies: [
              "Aplicar princípios da engenharia de software para desenvolvimento de sistemas.",
              "Utilizar metodologias ágeis para gerenciar projetos de software.",
              "Compreender conceitos de engenharia de software, processos, modelagem, testes e qualidade.",
            ],
            skills: [
              "Conhecer os conceitos fundamentais da engenharia de software.",
              "Compreender metodologias de desenvolvimento de software.",
              "Aprender a elaboração de engenharia de requisitos.",
              "Conhecer e utilizar a linguagem de especificação UML.",
              "Utilizar uma ferramenta CASE para análise e projeto.",
              "Analisar e projetar softwares orientados a objetos.",
              "Entender e implementar principais tipos de teste de software.",
              "Aprender abordagens para planejamento e gerenciamento de projetos.",
              "Conhecer medidas de qualidade de software.",
            ],
            topics: [
              "Introdução à Engenharia de Software",
              "Processo de Desenvolvimento de Software",
              "Desenvolvimento Ágil",
              "Engenharia de Requisitos",
              "Prototipagem de Interfaces de Software",
              "Modelagem de Software",
              "Teste de Software",
              "Gerenciamento e Planejamento de Software",
              "Introdução a Qualidade de Software",
            ],
            references: [
              {
                label:
                  "Engenharia de software: projetos e processos (Wilson de Pádua Paula Filho, 4ª ed., 2019) — PDF",
                file: "Engenharia de software projetos e processos by Wilson de Pádua Paula Filho .epub.pdf",
              },
            ],
          },
          activities: [
            {
              id: "quiz-01",
              title: "Atividade - Quiz 01",
              subtitle: "Revisão geral (aulas 1–9) com feedback imediato",
              folder: "02-Atividades",
            },
          ],
          lessons: [
            {
              id: "aula-01",
              title: "Aula 1 - Introdução à Engenharia de Software",
              subtitle: "Conceitos fundamentais e visão do processo",
            },
            {
              id: "aula-02",
              title: "Aula 2 - Processo de Desenvolvimento de Software",
              subtitle: "Ciclo de vida, fases e modelos de processo",
            },
            {
              id: "aula-03",
              title: "Aula 3 - Desenvolvimento Ágil",
              subtitle: "Scrum/Kanban e práticas ágeis",
            },
            {
              id: "aula-04",
              title: "Aula 4 - Engenharia de Requisitos",
              subtitle: "Elicitação, análise, especificação e validação",
            },
            {
              id: "aula-05",
              title: "Aula 5 - Prototipagem de Interfaces de Software",
              subtitle: "Fluxos, wireframes e protótipos",
            },
            {
              id: "aula-06",
              title: "Aula 6 - Modelagem de Software (UML)",
              subtitle: "Casos de uso, classes e sequência",
            },
            {
              id: "aula-07",
              title: "Aula 7 - Teste de Software",
              subtitle: "Tipos de teste e estratégia de validação",
            },
            {
              id: "aula-08",
              title: "Aula 8 - Planejamento e Gerenciamento de Software",
              subtitle: "Estimativas, riscos e acompanhamento",
            },
            {
              id: "aula-09",
              title: "Aula 9 - Qualidade de Software",
              subtitle: "Métricas, qualidade de produto e processo",
            },
          ],
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

function ensureTopicsModal() {
  const dialog = document.querySelector("[data-topics-modal]");
  if (!dialog) return null;

  const titleEl = dialog.querySelector("[data-topics-modal-title]");
  const listEl = dialog.querySelector("[data-topics-modal-list]");
  const closeBtn = dialog.querySelector("[data-topics-modal-close]");

  if (!titleEl || !listEl || !closeBtn) return null;

  closeBtn.addEventListener("click", () => {
    dialog.close?.();
  });

  dialog.addEventListener("click", (e) => {
    if (e.target === dialog) dialog.close?.();
  });

  return { dialog, titleEl, listEl };
}

function openTopicsModal({ title, items }) {
  const modal = ensureTopicsModal();
  if (!modal) return;

  modal.titleEl.textContent = title;
  modal.listEl.innerHTML = "";

  for (const item of items) {
    const li = document.createElement("li");
    if (typeof item === "string") {
      li.textContent = item;
      modal.listEl.appendChild(li);
      continue;
    }

    if (item && typeof item === "object" && "href" in item && typeof item.href === "string") {
      const a = document.createElement("a");
      a.href = item.href;
      a.textContent = typeof item.label === "string" ? item.label : item.href;
      a.target = "_blank";
      a.rel = "noopener";
      li.appendChild(a);
      modal.listEl.appendChild(li);
      continue;
    }

    li.textContent = String(item);
    modal.listEl.appendChild(li);
  }

  modal.dialog.showModal?.();
}

function getDisciplineFilePath(disciplineFolder, ...parts) {
  return `./${encodeURIComponent(disciplineFolder)}/${parts
    .map((p) => encodeURIComponent(p))
    .join("/")}`;
}

function clearGrid() {
  const grid = document.querySelector("[data-grid]");
  if (!grid) return;
  grid.innerHTML = "";
}

function ensureSearch() {
  const input = document.querySelector("[data-search-input]");
  const clear = document.querySelector("[data-search-clear]");
  const hint = document.querySelector("[data-search-hint]");
  const wrapper = document.querySelector("[data-search]");
  if (!input || !(input instanceof HTMLInputElement) || !clear || !(clear instanceof HTMLButtonElement) || !wrapper) {
    return null;
  }
  return { input, clear, hint, wrapper };
}

function setSearchState({ visible, placeholder }) {
  const search = ensureSearch();
  if (!search) return;
  search.wrapper.hidden = !visible;
  if (typeof placeholder === "string") search.input.placeholder = placeholder;
  if (!visible) search.input.value = "";
  if (search.hint) search.hint.hidden = !visible;
}

function applyGridFilter(query) {
  const grid = document.querySelector("[data-grid]");
  if (!grid) return;
  const q = (query || "").trim().toLowerCase();
  const nodes = Array.from(grid.children);
  for (const node of nodes) {
    if (!(node instanceof HTMLElement)) continue;
    const searchable = (node.dataset.searchText || "").toLowerCase();
    const shouldShow = !q || searchable.includes(q);
    node.classList.toggle("is-hidden", !shouldShow);
  }
}

function initSearch({ placeholder }) {
  const search = ensureSearch();
  if (!search) return;

  setSearchState({ visible: true, placeholder });
  applyGridFilter(search.input.value);

  const onInput = () => applyGridFilter(search.input.value);
  if (!search.input.dataset.bound) {
    search.input.dataset.bound = "1";
    search.input.addEventListener("input", onInput);
    search.clear.addEventListener("click", () => {
      search.input.value = "";
      search.input.focus();
      applyGridFilter("");
    });

    window.addEventListener("keydown", (e) => {
      if (e.key !== "/") return;
      const target = e.target;
      if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA")) return;
      e.preventDefault();
      search.input.focus();
    });
  }
}

function createCard({ title, meta, href, kind = "folder", external = false }) {
  const tpl = document.getElementById("card-template");
  if (!tpl || !(tpl instanceof HTMLTemplateElement)) {
    const a = document.createElement("a");
    a.className = "card";
    a.href = href;
    a.dataset.kind = kind;
    if (external) {
      a.target = "_blank";
      a.rel = "noopener";
    }
    a.innerHTML = `<div class="card__icon" aria-hidden="true"></div><div class="card__body"><div class="card__title"></div><div class="card__meta"></div></div>`;
    a.querySelector(".card__title").textContent = title;
    a.querySelector(".card__meta").textContent = meta;
    a.dataset.searchText = `${title || ""} ${meta || ""}`.trim();
    return a;
  }

  const node = tpl.content.firstElementChild.cloneNode(true);
  node.href = href;
  node.dataset.kind = kind;
  if (external) {
    node.target = "_blank";
    node.rel = "noopener";
  }
  node.querySelector(".card__title").textContent = title;
  node.querySelector(".card__meta").textContent = meta;
  node.dataset.searchText = `${title || ""} ${meta || ""}`.trim();
  return node;
}

function createInfoCard({ title, meta, kind = "info" }) {
  const div = document.createElement("div");
  div.className = "card";
  div.dataset.kind = kind;
  div.setAttribute("role", "group");
  div.innerHTML =
    '<div class="card__icon" aria-hidden="true"></div><div class="card__body"><div class="card__title"></div><div class="card__meta"></div></div>';
  div.querySelector(".card__title").textContent = title;
  div.querySelector(".card__meta").textContent = meta || "";
  if (!meta) div.classList.add("is-meta-empty");
  div.dataset.searchText = `${title || ""} ${meta || ""}`.trim();
  return div;
}

function decodeHashParts(hash) {
  const normalized = normalizeHash(hash);
  return normalized
    .replace(/^#\//, "")
    .split("/")
    .filter(Boolean)
    .map((p) => {
      try {
        return decodeURIComponent(p);
      } catch {
        return p;
      }
    });
}

function getLessonHtmlPath(disciplineFolder, lessonId) {
  return `./${encodeURIComponent(disciplineFolder)}/${encodeURIComponent(
    "01-Aulas"
  )}/${encodeURIComponent(lessonId)}.html`;
}

function getActivityHtmlPath(disciplineFolder, activityFolder, activityId) {
  return `./${encodeURIComponent(disciplineFolder)}/${encodeURIComponent(
    activityFolder
  )}/${encodeURIComponent(activityId)}.html`;
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
  initSearch({ placeholder: "Buscar módulos..." });

  for (const mod of appData.modules) {
    const card = createCard({
      title: mod.name,
      meta: mod.description,
      href: `#/${mod.id}`,
      kind: "folder",
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
  initSearch({ placeholder: "Buscar disciplinas..." });

  for (const d of mod.disciplines) {
    const lessonsCount = d.lessons?.length || 0;
    const activitiesCount = d.activities?.length || 0;
    const parts = [];
    parts.push(lessonsCount ? `${lessonsCount} aulas` : "Sem aulas por enquanto");
    if (activitiesCount) parts.push(`${activitiesCount} atividade${activitiesCount > 1 ? "s" : ""}`);
    const card = createCard({
      title: d.name,
      meta: parts.join(" • "),
      href: `#/${mod.id}/${d.id}`,
      kind: "folder",
    });
    grid.appendChild(card);
  }
}

function renderDisciplineRoot(moduleId, disciplineId) {
  const mod = appData.modules.find((m) => m.id === moduleId);
  const disc = mod?.disciplines.find((d) => d.id === disciplineId);
  if (!mod || !disc) {
    renderNotFound();
    return;
  }

  setText("[data-page-title]", disc.name);
  setText("[data-page-subtitle]", "Selecione uma aula para ver o conteúdo.");
  setBreadcrumbs(`${mod.name} / ${disc.name}`);

  const grid = $("[data-grid]");
  clearGrid();
  initSearch({ placeholder: "Buscar aulas e atividades..." });

  const back = createCard({
    title: "Voltar para o Módulo",
    meta: mod.name,
    href: `#/${mod.id}`,
    kind: "back",
  });
  grid.appendChild(back);

  if (disc.syllabus?.topics?.length) {
    const topicsCard = createInfoCard({
      title: "Ementa (tópicos)",
      meta: "Abrir tópicos e livro de referência",
      kind: "info",
    });

    topicsCard.classList.add("is-clickable");
    topicsCard.setAttribute("role", "button");
    topicsCard.tabIndex = 0;
    topicsCard.setAttribute("aria-label", "Abrir ementa (tópicos)");

    const open = () => {
      const items = [];

      if (disc.syllabus?.references?.length) {
        items.push("Usaremos o livro abaixo como referência nesta disciplina:");
        for (const ref of disc.syllabus.references) {
          if (!ref || typeof ref !== "object") continue;
          if (typeof ref.file === "string") {
            items.push({
              label: typeof ref.label === "string" ? ref.label : ref.file,
              href: getDisciplineFilePath(disc.folder, "99-Materiais", ref.file),
            });
          }
        }
        items.push("Tópicos da disciplina:");
      }

      for (const t of disc.syllabus.topics) items.push(t);

      openTopicsModal({
        title: "Ementa (tópicos)",
        items,
      });
    };

    topicsCard.addEventListener("click", open);
    topicsCard.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        open();
      }
    });

    grid.appendChild(topicsCard);
  }

  if (disc.activities?.length) {
    for (const activity of disc.activities) {
      grid.appendChild(
        createCard({
          title: activity.title,
          meta: activity.subtitle || "Atividade",
          href: getActivityHtmlPath(disc.folder, activity.folder || "02-Atividades", activity.id),
          kind: "activity",
        })
      );
    }
  }

  if (!disc.lessons?.length) {
    grid.appendChild(
      createInfoCard({
        title: "Em breve",
        meta: "A lista de aulas desta disciplina ainda não foi cadastrada.",
        kind: "warning",
      })
    );
    return;
  }

  for (const lesson of disc.lessons) {
    grid.appendChild(
      createCard({
        title: lesson.title,
        meta: lesson.subtitle || "Aula",
        href: getLessonHtmlPath(disc.folder, lesson.id),
        kind: "file",
      })
    );
  }
}

function renderLesson(moduleId, disciplineId, lessonId) {
  const mod = appData.modules.find((m) => m.id === moduleId);
  const disc = mod?.disciplines.find((d) => d.id === disciplineId);
  if (!mod || !disc) {
    renderNotFound();
    return;
  }

  const lesson = disc.lessons?.find((l) => l.id === lessonId);
  if (!lesson) {
    renderNotFound();
    return;
  }

  setText("[data-page-title]", lesson.title);
  setText(
    "[data-page-subtitle]",
    lesson.subtitle || "Conteúdo da aula (adicione seus arquivos na pasta local)."
  );
  setBreadcrumbs(`${mod.name} / ${disc.name} / ${lesson.title}`);

  const grid = $("[data-grid]");
  clearGrid();
  initSearch({ placeholder: "Buscar nesta página..." });

  grid.appendChild(
    createCard({
      title: "Voltar para a disciplina",
      meta: disc.name,
      href: `#/${encodeURIComponent(mod.id)}/${encodeURIComponent(disc.id)}`,
      kind: "back",
    })
  );

  grid.appendChild(
    createInfoCard({
      title: "Conteúdo",
      meta: "Deixe os materiais desta aula na pasta local. Posso ligar os arquivos a esta aula quando você decidir o padrão de nomes/pastas.",
      kind: "info",
    })
  );
}

function renderNotFound() {
  setText("[data-page-title]", "Página não encontrada");
  setText("[data-page-subtitle]", "Use o menu inicial para navegar.");
  setBreadcrumbs("404");

  const grid = $("[data-grid]");
  clearGrid();
  setSearchState({ visible: false, placeholder: "" });

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

  const parts = decodeHashParts(hash);
  if (parts.length === 0) {
    renderModules();
    return;
  }

  if (parts.length === 1) {
    renderModule(parts[0]);
    return;
  }

  if (parts.length === 2) {
    renderDisciplineRoot(parts[0], parts[1]);
    return;
  }

  if (parts.length === 3) {
    renderLesson(parts[0], parts[1], parts[2]);
    return;
  }

  renderNotFound();
}

window.addEventListener("hashchange", render);
window.addEventListener("DOMContentLoaded", render);
