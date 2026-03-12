from __future__ import annotations

from pathlib import Path


def extract_text_pages(pdf_path: Path, max_pages: int) -> str:
    try:
        import pypdf  # type: ignore

        reader = pypdf.PdfReader(str(pdf_path))
        pages = min(len(reader.pages), max_pages)
        parts: list[str] = []
        for i in range(pages):
            parts.append(reader.pages[i].extract_text() or "")
        return "\n".join(parts)
    except Exception:  # noqa: BLE001
        pass

    try:
        import PyPDF2  # type: ignore

        reader = PyPDF2.PdfReader(str(pdf_path))
        pages = min(len(reader.pages), max_pages)
        parts = []
        for i in range(pages):
            parts.append(reader.pages[i].extract_text() or "")
        return "\n".join(parts)
    except Exception:  # noqa: BLE001
        pass

    try:
        from pdfminer.high_level import extract_text  # type: ignore

        return extract_text(str(pdf_path), maxpages=max_pages) or ""
    except Exception as e:  # noqa: BLE001
        raise RuntimeError(f"Unable to extract text: {e!r}") from e


def main() -> None:
    pdf_path = Path(
        r"c:\Users\juliano.silva\OneDrive - Organização\Documentos\Meta\Módulo 1\Endegenhaia de Software\99-Materiais\Engenharia de software projetos e processos by Wilson de Pádua Paula Filho .epub.pdf"
    )
    if not pdf_path.exists():
        raise SystemExit(f"File not found: {pdf_path}")

    needles = ["SUMÁRIO", "SUMARIO", "CONTEÚDO", "CONTEUDO", "ÍNDICE", "INDICE"]
    max_pages = 160

    raw = extract_text_pages(pdf_path, max_pages=max_pages)
    lines = [line.strip() for line in raw.splitlines() if line.strip()]
    upper_lines = [line.upper() for line in lines]

    matches = [i for i, line in enumerate(upper_lines) if any(n in line for n in needles)]
    if not matches:
        print(f"no toc marker found within first {max_pages} pages:", ", ".join(needles))
        return

    for idx in matches[:3]:
        start = max(0, idx - 20)
        end = min(len(lines), idx + 140)
        print(f"--- match at line {idx+1} (showing {start+1}-{end}) ---")
        for i in range(start, end):
            print(lines[i])


if __name__ == "__main__":
    main()
