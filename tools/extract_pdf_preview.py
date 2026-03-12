from __future__ import annotations

from pathlib import Path


def extract_preview(pdf_path: Path, max_pages: int) -> tuple[str, str]:
    errors: list[str] = []

    try:
        import pypdf  # type: ignore

        reader = pypdf.PdfReader(str(pdf_path))
        pages = min(len(reader.pages), max_pages)
        parts: list[str] = []
        for i in range(pages):
            parts.append(reader.pages[i].extract_text() or "")
        return "\n".join(parts), f"pypdf pages={pages}"
    except Exception as e:  # noqa: BLE001
        errors.append(f"pypdf: {e!r}")

    try:
        import PyPDF2  # type: ignore

        reader = PyPDF2.PdfReader(str(pdf_path))
        pages = min(len(reader.pages), max_pages)
        parts = []
        for i in range(pages):
            parts.append(reader.pages[i].extract_text() or "")
        return "\n".join(parts), f"PyPDF2 pages={pages}"
    except Exception as e:  # noqa: BLE001
        errors.append(f"PyPDF2: {e!r}")

    try:
        from pdfminer.high_level import extract_text  # type: ignore

        text = extract_text(str(pdf_path), maxpages=max_pages) or ""
        return text, f"pdfminer pages<={max_pages}"
    except Exception as e:  # noqa: BLE001
        errors.append(f"pdfminer: {e!r}")

    raise RuntimeError("No PDF extractor worked:\n" + "\n".join(errors))


def main() -> None:
    pdf_path = Path(
        r"c:\Users\juliano.silva\OneDrive - Organização\Documentos\Meta\Módulo 1\Endegenhaia de Software\99-Materiais\Engenharia de software projetos e processos by Wilson de Pádua Paula Filho .epub.pdf"
    )
    if not pdf_path.exists():
        raise SystemExit(f"File not found: {pdf_path}")

    text, extractor = extract_preview(pdf_path, max_pages=30)
    compact = "\n".join(line.strip() for line in text.splitlines() if line.strip())

    print("extractor:", extractor)
    print("chars:", len(compact))
    print("--- preview (first 3000 chars) ---")
    print(compact[:3000])


if __name__ == "__main__":
    main()
