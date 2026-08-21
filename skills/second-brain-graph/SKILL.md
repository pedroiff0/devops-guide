---
name: second-brain-graph
description: >-
  Guidelines and techniques for curating bidirectional wikilinks, taxonomies, tags,
  and cluster topology in this repository to maintain a dense, richly interconnected
  Second Brain knowledge graph in Quartz v4.
---

# 🕸️ Skill: Curadoria do Grafo do Segundo Cérebro

Esta skill fornece diretrizes e boas práticas para manter a integridade, densidade e navegabilidade do **Grafo de Conhecimento** no Quartz.

---

## 🎯 Por que a Topologia do Grafo Importa?

O grafo não é apenas um adereço estético; ele funciona como um **sistema de recuperação associativa** de conhecimento. Quando um desenvolvedor ou agente navega por uma nota sobre CI/CD, ele descobre organicamente relações com *Snyk (Segurança)*, *Conventional Commits (Gatilhos de release)* e *Cloudflare (Hospedagem de borda)*.

---

## 📐 Regras de Curadoria de Conexões

### 1. Eliminação de Nós Órfãos (Orphan Nodes)
Toda nota criada no repositório DEVE possuir:
- Pelo menos um link de entrada (backlink) a partir do `index.md` do seu módulo ou do hub central.
- Pelo menos 2 a 3 links de saída para conceitos relacionados no rodapé (seção *Conexões do Segundo Cérebro*).

---

### 2. Sintaxe de Links Bidirecionais
O Quartz suporta wikilinks com alias:
```markdown
[[caminho/do/arquivo|Texto Visível do Link]]
```
Exemplos:
- ✅ `[[pt-br/github/git-essentials|Fundamentos do Git]]`
- ✅ `[[en/github/conventional-commits|Conventional Commits Standard]]`

---

### 3. Estruturação de Hubs (Nós Centrais de Agrupamento)
Os arquivos `index.md` de cada módulo atuam como grandes nós de agrupamento (*cluster hubs*). Eles devem conter:
1. Um diagrama Mermaid representando o relacionamento entre os tópicos filhos.
2. Uma lista estruturada de links para cada submódulo.
3. Tags semânticas que os conectam com os hubs de outras tecnologias.

---

### 4. Gestão e Padronização de Tags
Mantenha as tags em kebab-case minúsculo no frontmatter:
```yaml
tags:
  - git
  - devops
  - cicd
  - seguranca
  - automacao
```
As tags formam nós satélites no grafo do Quartz que conectam notas de diferentes pastas temáticas.

---

## 🔍 Checklist de Curadoria do Grafo

Antes de finalizar qualquer alteração na base de conhecimento:
- [ ] A nova nota possui links para outras notas conceituais?
- [ ] O `index.md` do módulo pai lista a nova nota?
- [ ] As tags foram preenchidas no frontmatter?
- [ ] O grafo local e global renderizam sem erros após `npx quartz build`?
