from __future__ import annotations

import json
import re
from pathlib import Path


def extract_first_pages(pdf_path: Path, max_pages: int) -> list[str]:
    import pypdf  # type: ignore

    reader = pypdf.PdfReader(str(pdf_path))
    pages = min(len(reader.pages), max_pages)
    out: list[str] = []
    for i in range(pages):
        out.append(reader.pages[i].extract_text() or "")
    return out


def normalize(s: str) -> str:
    return " ".join(s.split())


def find_toc_block(pages_text: list[str]) -> list[str]:
    text = "\n".join(pages_text)
    lines = [normalize(l) for l in text.splitlines() if normalize(l)]
    upper = [l.upper() for l in lines]

    start = None
    for i, l in enumerate(upper):
        if "SUM" in l and "RIO" in l:  # catches SUMÁRIO even if broken
            start = i
            break
        if "SUMARIO" in l:
            start = i
            break
        if "CONTE" in l and "UDO" in l:
            start = i
            break

    if start is None:
        return []

    return lines[start : start + 600]


def parse_toc_lines(lines: list[str]) -> list[dict[str, str | int]]:
    items: list[dict[str, str | int]] = []
    page_re = re.compile(r"^(?P<title>.*?)(?:\s+|\.{2,})?(?P<page>\d{1,4})$")

    for line in lines:
        m = page_re.match(line)
        if not m:
            continue
        title = normalize(m.group("title")).strip(". ").strip()
        if len(title) < 3:
            continue
        page = int(m.group("page"))
        if page == 0:
            continue
        items.append({"title": title, "page": page})

    return items


def main() -> None:
    pdf_path = Path(
        r"c:\Users\juliano.silva\OneDrive - Organização\Documentos\Meta\Módulo 1\Endegenhaia de Software\99-Materiais\Engenharia de software projetos e processos by Wilson de Pádua Paula Filho .epub.pdf"
    )
    if not pdf_path.exists():
        raise SystemExit(f"File not found: {pdf_path}")

    pages = extract_first_pages(pdf_path, max_pages=80)
    toc_lines = find_toc_block(pages)
    items = parse_toc_lines(toc_lines)

    print(json.dumps({"items": items[:250]}, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()

