from __future__ import annotations

import json
from pathlib import Path


def main() -> None:
    pdf_path = Path(
        r"c:\Users\juliano.silva\OneDrive - Organização\Documentos\Meta\Módulo 1\Endegenhaia de Software\99-Materiais\Engenharia de software projetos e processos by Wilson de Pádua Paula Filho .epub.pdf"
    )
    if not pdf_path.exists():
        raise SystemExit(f"File not found: {pdf_path}")

    import pypdf  # type: ignore

    reader = pypdf.PdfReader(str(pdf_path))

    targets = {
        "uml": ["UML BÁSICA", "MODELAGEM EM UML", "DIAGRAMA DE CLASSES", "DIAGRAMA DE SEQUÊNCIA"],
        "prototyping": ["DESENHO DE INTERFACES DE USUÁRIO", "DESENHO DE INTERFACES", "PROTOTIPAGEM"],
    }

    found: dict[str, int | None] = {k: None for k in targets}

    start_page = 25
    for i, page in enumerate(reader.pages, start=1):
        if i < start_page:
            continue
        if i % 50 == 0:
            remaining = [k for k, v in found.items() if v is None]
            print("page", i, "remaining", remaining)
        text = (page.extract_text() or "").upper()
        for key, needles in targets.items():
            if found[key] is not None:
                continue
            if any(n in text for n in needles):
                found[key] = i
        if all(v is not None for v in found.values()):
            break

    print(json.dumps(found, ensure_ascii=False))


if __name__ == "__main__":
    main()
