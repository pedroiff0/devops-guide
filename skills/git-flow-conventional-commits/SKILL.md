---
name: git-flow-conventional-commits
description: >-
  Standard operating procedure for creating atomic branches, writing Conventional Commits 1.0.0
  messages, running local commit validation scripts, and submitting structured Pull Requests.
---

# 🐙 Skill: Git Flow & Conventional Commits

Esta skill estabelece o fluxo de trabalho de versionamento, regras para mensagens de commit e o ciclo de revisão de código neste repositório.

---

## 🌿 1. Criação de Branches

Sempre crie branches a partir da `main` sincronizada:

```bash
git checkout main
git pull origin main
git checkout -b <tipo>/<ticket>-<descricao-curta>
```

Prefixos aceitos:
- `feat/`: Novas funcionalidades ou páginas de documentação.
- `fix/`: Correções de bugs, links quebrados ou erros conceituais.
- `docs/`: Atualizações exclusivas em documentação/README.
- `refactor/`: Reestruturação de conteúdo ou código sem alterar funcionalidade.
- `ci/`: Alterações em workflows de GitHub Actions.
- `chore/`: Manutenções rotineiras e bumps de dependências.

---

## ✍️ 2. Regras para Mensagens de Commit

Estrutura obrigatória:
```text
<type>(<scope>): <descrição no imperativo, minúscula, sem ponto final>
```

Exemplos:
- `feat(docker): adicionar guia de multi-stage builds`
- `fix(quartz): corrigir seletor de idioma no header mobile`
- `docs(readme): atualizar badges e roadmap de modulos`
- `ci(pages): otimizar cache de build no runner`

---

## 🧪 3. Validação de Commits Antes do Push

Execute o script de validação localmente para garantir que seus commits estão em conformidade:

```bash
./scripts/validate-commit-msg.sh origin/main..HEAD
```

Se o script retornar saída sem erros, você pode realizar o push com segurança:
```bash
git push -u origin <nome-da-branch>
```

---

## 📥 4. Abertura do Pull Request

1. Abra o PR utilizando o `gh pr create` ou a interface do GitHub.
2. Preencha todos os campos do template (`PULL_REQUEST_TEMPLATE.md`).
3. Adicione o marcador `Closes #<numero-da-issue>` caso o PR resolva uma issue aberta.
4. Aguarde a validação verde de todos os status checks do CI.
