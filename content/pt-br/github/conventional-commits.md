---
title: "Conventional Commits & Commits Semânticos"
author: "Pedro Andrade & Everton"
description: "Guia completo da especificação Conventional Commits 1.0.0, taxonomia de tipos, escopos, breaking changes, integração com SemVer e scripts de validação."
order: 20
tags:
  - conventional-commits
  - git
  - semver
  - automacao
  - devops
---

# 📝 Conventional Commits & Commits Semânticos

> [!NOTE]
> A especificação **Conventional Commits 1.0.0** é uma convenção leve sobre as mensagens de commit do Git. Ela fornece um conjunto explícito de regras para criar um histórico de commits legível por humanos e facilmente processável por ferramentas automatizadas de changelog e versionamento semântico (*Semantic Versioning - SemVer*).

---

## 📐 1. Estrutura Estrutural da Mensagem

Uma mensagem de commit estruturada deve seguir o seguinte esquema:

```text
<type>[optional scope][!]: <description>

[optional body]

[optional footer(s)]
```

### Exemplo Completo com Todas as Seções:
```text
feat(auth)!: migrar sessao de cookie para JWT com refresh token

Substitui o mecanismo de sessao Stateful em memoria por tokens
JWT assinados via RSA256 com endpoint de rotacao /api/v1/auth/refresh.
Reduz a carga do banco de dados e permite escala horizontal da API.

BREAKING CHANGE: Clientes legados que enviam o cookie 'session_id' receberao 401 Unauthorized.
Closes #142
Refs: #98
```

---

## 🏷️ 2. Taxonomia de Tipos (Types)

| Tipo | Finalidade Principal | Impacto no SemVer |
| :--- | :--- | :--- |
| `feat` | Uma nova funcionalidade introduzida no código | **MINOR** (ex.: `1.1.0`) |
| `fix` | Correção de um bug em funcionalidade existente | **PATCH** (ex.: `1.0.1`) |
| `docs` | Modificações exclusivamente em documentação | Nenhum / Patch |
| `style` | Alterações de formatação, espaços, ponto e vírgula (sem alterar lógica) | Nenhum |
| `refactor` | Refatoração de código sem corrigir bugs nem adicionar features | Nenhum / Patch |
| `perf` | Otimização de código focada em melhoria de desempenho/memória | **PATCH** |
| `test` | Adição ou correção de testes automatizados | Nenhum |
| `build` | Mudanças que afetam o sistema de build ou dependências externas | Nenhum / Patch |
| `ci` | Alterações em arquivos de configuração de CI/CD (GitHub Actions, etc.) | Nenhum |
| `chore` | Tarefas rotineiras, scripts de manutenção, bump de ferramentas | Nenhum |
| `revert` | Reversão de um commit anterior | Varia |

---

## 💥 3. Breaking Changes & Versão Maior (MAJOR)

Para indicar uma mudança incompatível com versões anteriores (*Breaking Change*):

1. **Exclamação no Header**: Insira `!` antes dos dois pontos (ex.: `feat(api)!: alterar contrato de resposta`).
2. **Seção no Footer**: Adicione uma linha no rodapé começando obrigatoriamente com `BREAKING CHANGE:` seguida de uma descrição detalhada do impacto e como migrar.

```text
refactor(db)!: renomear coluna user_email para email_address

BREAKING CHANGE: Consultas diretas a tabela 'users' utilizando a coluna antiga irao falhar.
Execute a migration '004_rename_email.sql' antes de subir o novo binario.
```

---

## 🎯 4. Boas Práticas de Escrita do Subject (Cabeçalho)

1. **Imperativo e Presente**: Escreva como uma ordem (*"adicionar"*, *"corrigir"*, *"remover"*, *"implementar"* ou em inglês *"add"*, *"fix"*, *"remove"*).
   - ✅ `feat(cart): adicionar cálculo de frete dinâmico`
   - ❌ `feat(cart): adicionado cálculo de frete dinâmico`
2. **Letra minúscula inicial**: Mantenha o subject em minúsculas após os dois pontos.
3. **Sem ponto final**: Não finalize o cabeçalho com ponto.
4. **Comprimento ideal**: Limite a primeira linha a **50-72 caracteres**.
5. **Atomicidade**: Um commit deve representar uma única unidade lógica de mudança.

---

## 📋 5. Catálogo de Exemplos Práticos por Domínio

### 5.1. Backend & APIs
- `feat(auth): implementar middleware de autenticacao OAuth2`
- `fix(billing): tratar divisao por zero no rateio de faturas pendentes`
- `perf(query): adicionar indice composto na tabela de transacoes`
- `refactor(routes): modularizar endpoints de usuario em Blueprints`

### 5.2. Frontend & Interfaces
- `feat(dashboard): adicionar grafico de metricas em tempo real com Chart.js`
- `fix(modal): corrigir vazamento de clique em dispositivos móveis`
- `style(theme): padronizar variaveis de espacamento e paleta dark mode`
- `test(button): adicionar testes de acessibilidade com axe-core`

### 5.3. Infraestrutura & DevOps
- `ci(actions): adicionar matriz de testes em Python 3.10, 3.11 e 3.12`
- `build(docker): otimizar Dockerfile com cache de camadas multi-stage`
- `chore(deps): atualizar dependencia @types/node de 20.x para 22.x`

---

## 🤖 6. Automação e Validação de Commits

### 6.1. Hook Local Git (`commit-msg`)
Você pode impedir commits fora do padrão diretamente na máquina do desenvolvedor criando o arquivo `.git/hooks/commit-msg`:

```bash
#!/usr/bin/env bash
# .git/hooks/commit-msg
commit_msg_file=$1
commit_msg=$(cat "$commit_msg_file")

# Expressão regular para Conventional Commits
pattern='^(feat|fix|docs|style|refactor|perf|test|build|ci|chore|revert)(\([a-z0-9._-]+\))?(!)?: .{1,100}$'

# Permitir commits automáticos de merge
if echo "$commit_msg" | grep -qiE "^Merge (branch|pull request)"; then
    exit 0
fi

# Validar a primeira linha
first_line=$(head -n 1 "$commit_msg_file")

if ! echo "$first_line" | grep -qE "$pattern"; then
    echo ""
    echo "❌ [ERRO] Mensagem de commit fora do padrão Conventional Commits!"
    echo "Sua mensagem: '$first_line'"
    echo ""
    echo "Formato esperado: <type>(<scope>): <descrição curta>"
    echo "Tipos aceitos: feat, fix, docs, style, refactor, perf, test, build, ci, chore, revert"
    echo "Exemplo: feat(auth): adicionar suporte a login via GitHub"
    echo ""
    exit 1
fi
```

Dê permissão de execução:
```bash
chmod +x .git/hooks/commit-msg
```

---

### 6.2. Validação no GitHub Actions (CI)
Para garantir que nenhum Pull Request entre na branch principal com commits malformados, adicione o step de validação no workflow:

```yaml
name: Lint Commits
on: [pull_request]

jobs:
  commitlint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0
      - name: Validar Mensagens de Commit
        run: |
          ./scripts/validate-commit-msg.sh ${{ github.event.pull_request.base.sha }}..${{ github.event.pull_request.head.sha }}
```

---

## 🔗 Conexões do Segundo Cérebro

- Revise os conceitos fundamentais em [[pt-br/github/git-essentials|Fundamentos do Git]].
- Veja como estruturar Pull Requests alinhados aos commits em [[pt-br/github/github-flow-processes|Processos de Trabalho & Governança]].
- Configure pipelines automáticos de verificação em [[pt-br/github/github-actions-cicd|GitHub Actions & CI/CD]].
