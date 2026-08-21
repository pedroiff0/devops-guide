---
name: ci-cd-github-pages
description: >-
  Procedure for maintaining and debugging GitHub Actions workflows, managing GitHub Pages
  deployments, permissions, caching, and CI status checks.
---

# 🚀 Skill: CI/CD & Deploy no GitHub Pages

Esta skill orienta a manutenção e solução de problemas nos pipelines de integração e entrega contínua do repositório.

---

## 🏗️ Estrutura dos Workflows

1. `.github/workflows/deploy-gh-pages.yaml`:
   - Dispara em cada `push` na branch `main` ou via `workflow_dispatch`.
   - Executa `npm ci` -> `npx quartz plugin install` -> `npx quartz build`.
   - Publica os artefatos estáticos de `public/` diretamente no GitHub Pages.
2. `.github/workflows/ci.yml`:
   - Dispara em `pull_request` contra a `main`.
   - Executa testes, linting de commit messages e build de verificação.

---

## 🔒 Permissões Mínimas Mandatórias

Para que o deploy no GitHub Pages funcione sem erros de autorização, o workflow DEVE declarar:

```yaml
permissions:
  contents: read
  pages: write
  id-token: write
```

E no painel do repositório em *Settings > Pages > Build and deployment*, a fonte (*Source*) deve estar configurada para **GitHub Actions**.

---

## 🔧 Solução de Problemas Comuns (Troubleshooting)

### 1. Falha no passo `npm ci`
- **Causa**: O arquivo `package-lock.json` está dessincronizado do `package.json`.
- **Solução**: Execute `npm install` localmente e commite o `package-lock.json` atualizado.

### 2. Erro de Plugin não Encontrado no Build
- **Causa**: O passo `npx quartz plugin install` foi pulado antes do build.
- **Solução**: Assegure-se de que `npx quartz plugin install` roda antes de `npx quartz build` em todos os ambientes.

### 3. Falha de Permissão no Deploy Pages
- **Causa**: Faltando `pages: write` ou `id-token: write` no bloco `permissions:`.
