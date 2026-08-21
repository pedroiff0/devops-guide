#!/usr/bin/env python3
"""
Validates that content/pt-br and content/en have mirrored file structures.
"""
from pathlib import Path
import sys

def get_relative_md_files(base_dir: Path) -> set[str]:
    if not base_dir.exists():
        return set()
    return {
        str(p.relative_to(base_dir))
        for p in base_dir.rglob("*.md")
    }

def main():
    root = Path(__file__).parent.parent
    pt_dir = root / "content" / "pt-br"
    en_dir = root / "content" / "en"

    pt_files = get_relative_md_files(pt_dir)
    en_files = get_relative_md_files(en_dir)

    missing_in_en = pt_files - en_files
    missing_in_pt = en_files - pt_files

    has_error = False

    print("=" * 60)
    print("🔍 Verificando Espelhamento Multilíngue (PT-BR <-> EN-US)")
    print("=" * 60)
    print(f"Total de arquivos PT-BR: {len(pt_files)}")
    print(f"Total de arquivos EN-US: {len(en_files)}")

    if missing_in_en:
        print("\n❌ Arquivos presentes em PT-BR mas ausentes em EN-US:")
        for f in sorted(missing_in_en):
            print(f"  - content/en/{f}")
        has_error = True

    if missing_in_pt:
        print("\n❌ Arquivos presentes em EN-US mas ausentes em PT-BR:")
        for f in sorted(missing_in_pt):
            print(f"  - content/pt-br/{f}")
        has_error = True

    if not has_error:
        print("\n✅ Perfeito! Todos os arquivos Markdown estão 100% espelhados!")
        sys.exit(0)
    else:
        print("\n⚠️ Por favor, crie as versões traduzidas correspondentes.")
        sys.exit(1)

if __name__ == "__main__":
    main()
