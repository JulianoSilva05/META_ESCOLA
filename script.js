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
          sections: [
            "00-Admin",
            "01-Aulas",
            "02-Exercicios",
            "03-Projetos",
            "04-SQL",
            "05-Avaliacoes",
            "99-Materiais",
          ],
        },
        {
          id: "esw",
          name: "Engenharia de Software",
          folder: "Endegenhaia de Software",
          sections: [
            "00-Admin",
            "01-Aulas",
            "02-Exercicios",
            "03-Projetos",
            "04-SQL",
            "05-Avaliacoes",
            "99-Materiais",
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

function joinUrlPath(segments, { trailingSlash = false } = {}) {
  const safeSegments = segments.filter((s) => s != null && String(s).length > 0);
  const joined = safeSegments.map((s) => encodeURIComponent(s)).join("/");
  return `./${joined}${trailingSlash ? "/" : ""}`;
}

async function fetchDirectoryListing(relativePath) {
  const url = relativePath.endsWith("/") ? relativePath : `${relativePath}/`;
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error(`Falha ao acessar: ${url}`);
  const html = await res.text();
  const doc = new DOMParser().parseFromString(html, "text/html");
  const links = Array.from(doc.querySelectorAll("a"));

  const entries = [];
  for (const a of links) {
    const href = a.getAttribute("href") || "";
    const text = (a.textContent || "").trim();
    if (!href || !text) continue;
    if (text === "../" || text === "..") continue;
    if (href.startsWith("?")) continue;

    const isFolder = href.endsWith("/");
    const name = text.replace(/\/$/, "");
    if (!name || name === "." || name === "..") continue;

    entries.push({
      name,
      isFolder,
      url: new URL(href, url).pathname + new URL(href, url).search,
    });
  }

  entries.sort((a, b) => {
    if (a.isFolder !== b.isFolder) return a.isFolder ? -1 : 1;
    return a.name.localeCompare(b.name, "pt-BR", { sensitivity: "base" });
  });

  return entries;
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
      meta: `Pasta: ${d.folder}`,
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
  setText(
    "[data-page-subtitle]",
    `Pasta: ${disc.folder}. Selecione uma seção para ver os arquivos.`
  );
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

  const directFolderUrl = joinUrlPath([disc.folder], { trailingSlash: true });
  grid.appendChild(
    createCard({
      title: "Abrir pasta (listagem)",
      meta: disc.folder,
      href: directFolderUrl,
      kind: "link",
      external: true,
    })
  );

  for (const section of disc.sections || []) {
    grid.appendChild(
      createCard({
        title: section,
        meta: "Seção",
        href: `#/${encodeURIComponent(mod.id)}/${encodeURIComponent(
          disc.id
        )}/${encodeURIComponent(section)}`,
        kind: "folder",
      })
    );
  }
}

async function renderDisciplineFolder(moduleId, disciplineId, subpathParts) {
  const mod = appData.modules.find((m) => m.id === moduleId);
  const disc = mod?.disciplines.find((d) => d.id === disciplineId);
  if (!mod || !disc) {
    renderNotFound();
    return;
  }

  const folderLabel = [disc.folder, ...subpathParts].join(" / ");
  setText("[data-page-title]", disc.name);
  setText("[data-page-subtitle]", `Pasta: ${folderLabel}`);
  setBreadcrumbs(`${mod.name} / ${disc.name} / ${subpathParts.join(" / ")}`);

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

  const relativeFolderUrl = joinUrlPath([disc.folder, ...subpathParts], {
    trailingSlash: true,
  });
  grid.appendChild(
    createCard({
      title: "Abrir pasta (listagem)",
      meta: subpathParts.join(" / "),
      href: relativeFolderUrl,
      kind: "link",
      external: true,
    })
  );

  let entries;
  try {
    entries = await fetchDirectoryListing(relativeFolderUrl);
  } catch (e) {
    grid.appendChild(
      createInfoCard({
        title: "Não foi possível listar os arquivos",
        meta: "Abra pelo servidor local (http://localhost:8000/) ou habilite listagem de diretórios no servidor do site.",
        kind: "warning",
      })
    );
    return;
  }

  if (!entries.length) {
    grid.appendChild(
      createInfoCard({
        title: "Pasta vazia",
        meta: "Coloque arquivos aqui para aparecerem nesta seção.",
        kind: "info",
      })
    );
    return;
  }

  for (const entry of entries) {
    if (entry.isFolder) {
      grid.appendChild(
        createCard({
          title: entry.name,
          meta: "Pasta",
          href: `#/${encodeURIComponent(mod.id)}/${encodeURIComponent(
            disc.id
          )}/${[...subpathParts, entry.name].map(encodeURIComponent).join("/")}`,
          kind: "folder",
        })
      );
      continue;
    }

    const fileUrl = joinUrlPath([disc.folder, ...subpathParts, entry.name], {
      trailingSlash: false,
    });
    grid.appendChild(
      createCard({
        title: entry.name,
        meta: "Arquivo",
        href: fileUrl,
        kind: "file",
        external: true,
      })
    );
  }
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

  if (parts.length >= 3) {
    renderDisciplineFolder(parts[0], parts[1], parts.slice(2));
    return;
  }

  renderNotFound();
}

window.addEventListener("hashchange", render);
window.addEventListener("DOMContentLoaded", render);
