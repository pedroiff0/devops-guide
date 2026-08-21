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

## 🚀 Roteiro de Implementação

1. **Crie a Estrutura de Pastas**:
   ```bash
   mkdir -p content/pt-br/<modulo> content/en/<modulo>
   ```
2. **Desenvolva o `index.md` do Módulo**:
   - Forneça uma visão panorâmica com diagrama Mermaid.
   - Liste os tópicos com ordem definida (`order: 1, 2, 3...`).
3. **Escreva as Notas Especializadas**:
   - Siga o guia em [[../doc-authoring/SKILL|Doc Authoring Skill]].
4. **Espelhe em Inglês**:
   - Garanta simetria 1:1 de slugs e links.
5. **Atualize o Hub Central**:
   - Adicione os novos links no [[pt-br/index|Hub Central PT-BR]] e no [[en/index|Central Hub EN]].
6. **Compile e Valide o Grafo**:
   ```bash
   npx quartz build
   ```
