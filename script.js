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
          lessons: [],
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
  div.querySelector(".card__meta").textContent = meta;
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

  for (const d of mod.disciplines) {
    const card = createCard({
      title: d.name,
      meta: d.lessons?.length ? `${d.lessons.length} aulas` : "Sem aulas por enquanto",
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

  const back = createCard({
    title: "Voltar para o Módulo",
    meta: mod.name,
    href: `#/${mod.id}`,
    kind: "back",
  });
  grid.appendChild(back);

  if (disc.syllabus?.topics?.length) {
    grid.appendChild(
      createInfoCard({
        title: "Ementa (tópicos)",
        meta: disc.syllabus.topics.join(" • "),
        kind: "info",
      })
    );
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
