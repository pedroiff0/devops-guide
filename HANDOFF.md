# HANDOFF — DevOps Guide (Guia GitHub)

## 1. Contexto Rápido
- **Repositório:** `pedroiff0/devops-guide` (`~/Repositorios/pessoal/devops-guide`).
- **Função Principal:** Manual interativo e guia didático de Git, GitHub, automações de CI/CD, Docker e boas práticas de engenharia de software construído sobre Quartz v4.
- **Publicação:** GitHub Pages.

## 2. Arquitetura & Stack
- **Engine:** Quartz v4 (Node.js 22, TypeScript, Markdown).
- **Conteúdo:** `content/` com tópicos sobre Git avançado, conventional commits, GitHub Actions e infraestrutura.

## 3. Estado Atual & Diretrizes Operacionais
- **Governança:** AGENTS.md, DESIGN.md, Makefile e templates do GitHub ativos.
- **Comandos Principais:**
  - `make install`: Instala dependências do npm.
  - `make dev`: Executa servidor local com live reload (`npx quartz build --serve`).
  - `make build`: Gera site estático na pasta `public/`.
  - `make lint`: Valida mensagens de commit e arquivos do repositório.
- **Próximos Passos:**
  - Adicionar seções sobre observabilidade com Prometheus e orquestração leve via Docker Compose.
