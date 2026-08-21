---
name: content-planning
description: >-
  Curriculum and content planning runbook for ideating, structuring, mapping cross-references,
  and gathering authoritative external references before writing documentation modules in this repository.
---

# 🗺️ Skill: Planejamento Curricular de Conteúdo

Esta skill orienta o levantamento de escopo, mapeamento conceitual e curadoria de referências antes de iniciar a escrita de qualquer módulo técnico.

---

## 🎯 1. Matriz de Planejamento de Tópicos

Antes de criar arquivos no disco, estruture um plano contendo:

1. **Objetivo Principal**: Qual competência de engenharia o leitor dominará ao ler o módulo?
2. **Trilha Sequencial**: Qual é a progressão lógica do básico ao avançado?
3. **Casos Reais de Produção**: Quais cenários do mundo real serão exemplificados?
4. **Mapeamento de Grafo**: Com quais outras ferramentas este conteúdo se conecta?
5. **Referências Externas Autoritativas**: Documentações oficiais, RFCs, papers ou especificações.

---

## 📐 2. Template de Especificação de Módulo

Ao planejar um novo pilar, preencha mentalmente ou em notas de rascunho:

```markdown
### Módulo: [Nome da Tecnologia]
- **Slug do Diretório**: `content/pt-br/<nome>/` e `content/en/<nome>/`
- **Ordem no Explorer**: 30
- **Tópicos Planejados**:
  1. `index.md`: Visão geral e arquitetura interna.
  2. `fundamentos.md`: Comandos essenciais e ciclo de vida.
  3. `producao-e-cicd.md`: Exemplos de configuração e automação.
  4. `seguranca-e-hardening.md`: Boas práticas e mitigação de vulnerabilidades.
- **Conexões de Grafo**:
  - `[[pt-br/github/github-actions-cicd]]`
  - `[[pt-br/docker/index]]`
- **Links Externos Autoritativos**:
  - Documentação Oficial: https://...
  - Repositório de Referência: https://...
```

---

## 🔗 Próximo Passo

Após a aprovação do plano, utilize [[../re-explained-authoring/SKILL|Skill: Escrita de Guias Reexplicados]] para produzir o conteúdo.
