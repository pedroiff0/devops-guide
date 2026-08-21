# CLAUDE.md — Claude Code Guidelines

> Guidance for Claude Code (claude.ai/code) when working in **devops-guide** (published at https://octa.phrandrade.com).

---

## Commands

```bash
# Install dependencies & community plugins
npm install
npx quartz plugin install

# Local development server with hot-reload (http://localhost:8080)
npm run serve
# or
npx quartz build --serve

# Production build
npm run build

# Validate multilingual symmetry
python3 scripts/check-i18n-mirror.py

# Validate commit messages
./scripts/validate-commit-msg.sh

# Typecheck TypeScript
npm run check
```

---

## Architectural Rules

1. **Bilingual 1:1 Mirroring**: `content/pt-br/` and `content/en/` must always be identical in directory and file structure.
2. **Quartz Engine**: Built on Preact, TypeScript, esbuild, and lightningcss. Custom styles live in `quartz/styles/custom.scss`.
3. **Graph Links**: Use wikilinks `[[pt-br/path/file|Title]]` and `[[en/path/file|Title]]` to connect concepts in the interactive graph.
4. **Git Commits**: Always use Conventional Commits (`feat:`, `fix:`, `docs:`, `chore:`).
