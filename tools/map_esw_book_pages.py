from __future__ import annotations

from dataclasses import dataclass
from pathlib import Path
import json


@dataclass(frozen=True)
class Topic:
    key: str
    label: str
    needles: list[str]


def normalize(s: str) -> str:
    return " ".join(s.lower().split())


def extract_pages_text(pdf_path: Path) -> list[str]:
    import pypdf  # type: ignore

    reader = pypdf.PdfReader(str(pdf_path))
    pages: list[str] = []
    for page in reader.pages:
        pages.append(page.extract_text() or "")
    return pages


def find_first_page(pages: list[str], needles: list[str]) -> int | None:
    n = [normalize(x) for x in needles]
    for i, raw in enumerate(pages):
        t = normalize(raw)
        if all(x in t for x in n):
            return i + 1
    return None


def main() -> None:
    pdf_path = Path(
        r"c:\Users\juliano.silva\OneDrive - Organização\Documentos\Meta\Módulo 1\Endegenhaia de Software\99-Materiais\Engenharia de software projetos e processos by Wilson de Pádua Paula Filho .epub.pdf"
    )
    if not pdf_path.exists():
        raise SystemExit(f"File not found: {pdf_path}")

    import pypdf  # type: ignore

    reader = pypdf.PdfReader(str(pdf_path))

    topics = [
        Topic("intro", "Fundamentos e visão geral", ["FUNDAMENTOS", "ENGENHARIA DE SOFTWARE", "PRODUÇÃO DE SOFTWARE"]),
        Topic("process", "Processo e ciclo de vida", ["PROCESSOS DE SOFTWARE", "CICLO DE VIDA", "PROCESSO"]),
        Topic("agile", "Iterativo/incremental e ágil", ["MÉTODOS", "XPRAXIS", "SPRAXIS", "ITERAC"]),
        Topic("requirements", "Engenharia de requisitos", ["REQUISITOS", "ENGENHARIA DE REQUISITOS"]),
        Topic("prototyping", "Prototipagem e validação", ["DESENHO DE INTERFACES", "INTERFACES DE USUÁRIO", "PROTÓTIPO"]),
        Topic("uml", "Modelagem/UML", ["UML", "MODELAGEM EM UML", "UML BÁSICA"]),
        Topic("testing", "Testes", ["TESTES", "TESTE DE SISTEMA", "VERIFICAÇÃO"]),
        Topic("management", "Gerência/planejamento", ["GESTÃO DE PROJETOS", "CRONOGRAMA", "RISCOS", "GESTÃO DE ALTERAÇÕES"]),
        Topic("quality", "Qualidade e métricas", ["GESTÃO DA QUALIDADE", "QUALIDADE", "MÉTRICAS"]),
    ]

    def iter_outline(items):
        for it in items:
            if isinstance(it, list):
                yield from iter_outline(it)
                continue
            title = getattr(it, "title", None) or str(it)
            try:
                page = reader.get_destination_page_number(it) + 1
            except Exception:  # noqa: BLE001
                page = None
            yield title, page

    outline = reader.outline or []
    flat = list(iter_outline(outline))

    results: dict[str, dict[str, int | None]] = {t.key: {"pageStart": None, "pageEnd": None} for t in topics}

    for t in topics:
        keywords = [k.upper() for k in t.needles]
        best = None
        for title, page in flat:
            if not page:
                continue
            u = str(title).upper()
            if any(k in u for k in keywords):
                best = page if best is None else min(best, page)
        results[t.key] = {"pageStart": best, "pageEnd": None}

    print(json.dumps(results, ensure_ascii=False))


if __name__ == "__main__":
    main()
