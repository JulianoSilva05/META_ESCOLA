"use strict";

(function () {
  var storageKey = "meta.aulas.theme";

  function normalizeTheme(value) {
    if (value === "light" || value === "dark") return value;
    return null;
  }

  function getStoredTheme() {
    try {
      return normalizeTheme(localStorage.getItem(storageKey));
    } catch (_unused) {
      return null;
    }
  }

  function setThemeAttribute(theme) {
    if (theme) {
      document.documentElement.setAttribute("data-theme", theme);
      return;
    }

    document.documentElement.removeAttribute("data-theme");
  }

  var storedTheme = getStoredTheme();
  if (storedTheme) setThemeAttribute(storedTheme);

  function getCurrentTheme() {
    return normalizeTheme(document.documentElement.getAttribute("data-theme")) || "dark";
  }

  function updateButton(button) {
    var theme = getCurrentTheme();
    var nextTheme = theme === "dark" ? "light" : "dark";
    button.textContent = theme === "dark" ? "Claro" : "Escuro";
    button.setAttribute("aria-label", nextTheme === "light" ? "Ativar tema claro" : "Ativar tema escuro");
  }

  function persistTheme(theme) {
    try {
      localStorage.setItem(storageKey, theme);
    } catch (_unused2) {}
  }

  function applyTheme(theme) {
    setThemeAttribute(theme);
    persistTheme(theme);
  }

  function ensureToggleButton() {
    var breadcrumbs = document.querySelector(".breadcrumbs");
    if (!breadcrumbs) return null;
    var existing = breadcrumbs.querySelector("[data-theme-toggle]");
    if (existing) return existing;
    var button = document.createElement("button");
    button.type = "button";
    button.className = "btn btn--sm theme-toggle";
    button.setAttribute("data-theme-toggle", "");
    breadcrumbs.appendChild(button);
    return button;
  }

  function init() {
    var button = ensureToggleButton();
    if (!button) return;
    updateButton(button);
    button.addEventListener("click", function () {
      var next = getCurrentTheme() === "dark" ? "light" : "dark";
      applyTheme(next);
      updateButton(button);
    });
    window.addEventListener("storage", function (e) {
      if (e.key !== storageKey) return;
      var theme = normalizeTheme(e.newValue) || "dark";
      applyTheme(theme);
      updateButton(button);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();