---
title: "Produtividade com GitHub CLI & APIs"
author: "Pedro Andrade & Everton"
publish: true
description: "Guia completo de automação e produtividade com GitHub CLI (gh), consultas com GitHub REST e GraphQL APIs, e scripts utilitários para desenvolvedores."
order: 70
tags:
  - github-cli
  - api
  - rest
  - graphql
  - automacao
  - terminal
---

# 💻 Produtividade com GitHub CLI (`gh`) & APIs

> [!NOTE]
> O **GitHub CLI (`gh`)** traz toda a interface do GitHub para dentro do terminal, permitindo que engenheiros criem PRs, revisem código, gerenciem segredos e executem workflows de CI/CD sem trocar de janela de contexto.

---

## ⚡ 1. Comandos Essenciais do GitHub CLI (`gh`)

### 1.1. Autenticação e Configuração
```bash
# Login interativo seguro via navegador ou token
gh auth login

# Verificar status da autenticação atual
gh auth status

# Definir editor padrão (ex.: nano, vim, code)
gh config set editor "nano"
```

---

### 1.2. Gestão de Pull Requests no Terminal
```bash
# Criar um Pull Request a partir da branch atual (com preenchimento interativo)
gh pr create --title "feat(auth): adicionar middleware JWT" --body "Implementa autenticação JWT."

# Abrir PR como Draft
gh pr create --draft --title "WIP: refatorar banco de dados"

# Listar PRs abertos no repositório
gh pr list

# Fazer checkout local direto da branch de um PR
gh pr checkout 42

# Visualizar o diff e status das verificações de CI
gh pr diff 42
gh pr checks 42

# Aprovar e mesclar um PR via terminal
gh pr review 42 --approve -b "LGTM! Testado e aprovado."
gh pr merge 42 --squash --delete-branch
```

---

### 1.3. Gestão de Issues
```bash
# Criar uma nova issue rapidamente
gh issue create --title "bug: erro 500 no endpoint de checkout" --label "bug,priority:high"

# Listar issues atribuídas a você
gh issue list --assignee "@me"

# Fechar uma issue com comentário
gh issue close 15 --comment "Resolvido via PR #42."
```

---

### 1.4. Disparo e Monitoramento de Workflows (Actions)
```bash
# Listar workflows configurados no repositório
gh workflow list

# Disparar um workflow manual (workflow_dispatch) passando parâmetros
gh workflow run deploy-gh-pages.yaml

# Acompanhar a execução em tempo real no terminal
gh run watch
```

---

### 1.5. Gestão de Secrets e Variáveis
```bash
# Definir um secret no repositório (lido com segurança via stdin)
echo "super_secret_token_123" | gh secret set SNYK_TOKEN

# Definir uma variável de ambiente não-sensível
gh variable set BASE_URL --body "https://pedroiff0.github.io/guia-github"
```

---

## 🌐 2. Consumo da GitHub REST API

Para automações personalizadas em scripts Bash, Python ou Node.js, a REST API do GitHub v3 oferece controle total:

### Exemplo com `curl`:
```bash
# Listar os 10 últimos commits da branch principal
curl -s -H "Accept: application/vnd.github+json" \
     -H "Authorization: Bearer $GITHUB_TOKEN" \
     "https://api.github.com/repos/pedroiff0/guia-github/commits?per_page=10"
```

### Exemplo via `gh api` (autenticado automaticamente):
```bash
# Buscar informações do repositório atual em JSON
gh api repos/:owner/:repo | jq '{name: .name, stars: .stargazers_count, forks: .forks_count}'
```

---

## 🧬 3. Consultas Otimizadas com GraphQL API

Quando você precisa de dados profundos e estruturados sem múltiplas requisições REST:

```bash
gh api graphql -f query='
query {
  repository(owner: "pedroiff0", name: "guia-github") {
    name
    description
    stargazerCount
    pullRequests(states: OPEN, first: 5) {
      nodes {
        number
        title
        author {
          login
        }
      }
    }
  }
}
'
```

---

## 📚 Documentação Original & Fontes de Referência

- 🌐 [Git SCM Official Documentation](https://git-scm.com/doc) — Documentação e livro Pro Git oficial.
- 🐙 [GitHub Docs](https://docs.github.com/) — Guias oficiais do GitHub sobre Actions, PRs, Security e API.
- 📦 [Conventional Commits 1.0.0 Specification](https://www.conventionalcommits.org/pt-br/v1.0.0/) — Especificação oficial em português.
- 🛡️ [SonarCloud Documentation](https://docs.sonarcloud.io/) & [Snyk Docs](https://docs.snyk.io/) — Guias oficiais de SAST e segurança.

---

## 🔗 Conexões do Segundo Cérebro

- Dispare pipelines criados em [[pt-br/github/github-actions-cicd|GitHub Actions & CI/CD]].
- Aplique fluxos de revisão e aprovação definidos em [[pt-br/github/github-flow-processes|Processos de Trabalho & Governança]].
- Retorne ao índice geral em [[pt-br/github/index|Ecossistema GitHub & Git]].
