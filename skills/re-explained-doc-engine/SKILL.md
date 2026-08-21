---
name: re-explained-doc-engine
description: >-
  Blueprint and architectural methodology for expanding new technology pillars in this
  Second Brain repository (Docker, Cloudflare, Claude, Hermes, Lovable, OceanGate, etc.),
  ensuring structure, depth, visual diagrams, and bilingual symmetry.
---

# 🏛️ Skill: Metodologia de Expansão de Pilares Tecnológicos

Esta skill fornece o passo a passo metodológico para transformar um pilar inicial (*stub*) em um módulo completo de documentação reexplicada.

---

## 🎯 A Filosofia da "Documentação Reexplicada"

Diferente de documentações convencionais de referência:
1. **Foco no "Porquê" e na "Mecânica Interna"**: Explicamos como as peças se encaixam por baixo dos panos antes de mostrar o comando.
2. **Diagramas Visuais em Primeiro Lugar**: Cada módulo deve conter diagramas conceituais em Mermaid.
3. **Casos de Produção Reais**: Excluímos exemplos simplistas do tipo "Hello World" em favor de configurações reais de produção.
4. **Armadilhas & Anti-patterns**: Apontamos os erros mais comuns e como preveni-los.

---

## 📐 Estrutura Padrão de um Módulo Completo

Ao desenvolver um novo pilar (ex.: `docker`, `cloudflare`, `claude`):

```text
content/
├── pt-br/<modulo>/
│   ├── index.md               # Hub do módulo, visão geral e grafo de subtópicos
│   ├── fundamentos.md         # Mecânica interna, conceitos fundamentais
│   ├── arquitetura-pratica.md # Exemplos de produção, arquivos de configuração
│   └── seguranca-e-avancado.md# Otimizações, hardening e troubleshooting
└── en/<modulo>/
    ├── index.md               # Mirrored English Hub
    ├── fundamentos.md         # Mirrored English Fundamentals
    ├── arquitetura-pratica.md # Mirrored English Practical Architecture
    └── seguranca-e-avancado.md# Mirrored English Advanced & Security
```

---

## 🚀 Roteiro de Implementação Passo a Passo

1. **Abra a Issue Completa & Vincule no Campo `Development`**:
   - Siga [[../git-flow-conventional-commits/SKILL|Skill: Fluxo Ágil Completo]] para preencher Assignee, Labels, Milestone e vincular a branch de trabalho à Issue.
   ```bash
   gh issue develop <issue-id> --name feat/<issue-id>-<slug> --checkout
   ```
2. **Crie a Estrutura de Pastas e Notas Bilíngues**:
   - Crie os arquivos simultaneamente em `content/pt-br/<modulo>/` e `content/en/<modulo>/`.
   - Adicione `author: "Pedro Andrade & Everton"`, `title`, `order` e `tags` no frontmatter.
3. **Desenvolva o `index.md` do Módulo**:
   - Forneça uma visão panorâmica com diagrama conceitual Mermaid.
   - Liste os tópicos com ordem definida (`order: 10, 20, 30...`).
4. **Escreva as Notas Especializadas**:
   - Siga as diretrizes de [[../re-explained-authoring/SKILL|Skill: Escrita de Guias Reexplicados]].
5. **Execute a Validação Local**:
   ```bash
   python3 scripts/check-i18n-mirror.py
   npm run build
   ```
6. **Submeta o Pull Request**:
   - Abra o PR vinculando à Issue (`Closes #<issue-id>`), execute o Code Review e realize o Squash & Merge.
