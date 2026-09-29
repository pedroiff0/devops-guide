# DESIGN — DevOps Guide Architecture & Design Rules

## 1. Arquitetura do Guia

```mermaid
graph TD
    Content["content/ (Capítulos em Markdown)"] --> Quartz["Quartz v4 Static Generator"]
    Config["quartz.config.yaml"] --> Quartz
    Quartz --> Public["public/ (Distribuição Estática)"]
    Public --> GH["Deploy GitHub Pages"]
```

---

## 2. Princípios de Redação e Padronização

1. **Rigor em Comandos:**
   - Todo comando Git e shell deve ser testado e acompanhado de explicação de impacto e bandeiras (flags).
2. **Conventional Commits Obrigatórios:**
   - Validação automatizada via hook ou script `validate-commit-msg.sh`.
