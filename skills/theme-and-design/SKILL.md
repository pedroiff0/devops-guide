---
name: theme-and-design
description: >-
  UI and styling runbook for Quartz v4 in this repository, covering SCSS architecture,
  color tokens, light/dark mode adjustments, responsive layouts, custom callouts,
  and explorer language flattening rules.
---

# 🎨 Skill: Design de Interface & Estilização no Quartz

Esta skill estabelece os padrões de identidade visual, folhas de estilo SCSS e componentes de layout para o **DevOps Guide**.

---

## 🎨 1. Sistema de Tokens e Cores

O tema é definido em `quartz.config.yaml` e consumido via variáveis CSS nativas:

```scss
// quartz/styles/variables.scss
:root {
  --light: #ffffff;
  --lightgray: #f0f0f0;
  --gray: #cccccc;
  --darkgray: #333333;
  --dark: #111111;
  --secondary: #2c3e50;
  --tertiary: #34495e;
}

:root[saved-theme="dark"] {
  --light: #1a1a1a;
  --lightgray: #2d2d2d;
  --gray: #666666;
  --darkgray: #e0e0e0;
  --dark: #ffffff;
  --secondary: #5c8a8a;
  --tertiary: #7f8c8d;
}
```

---

## 📂 2. Arquitetura de Estilos

- `quartz/styles/custom.scss`: Todas as regras personalizadas do repositório (layout, language flattening, responsividade).
- `quartz/styles/base.scss`: Reset básico, espaçamentos e estilos do corpo da página.
- `quartz/styles/callouts.scss`: Estilos dos blocos de notas, avisos e alertas.

---

## 📱 3. Responsividade Mobile & Language Flattening

Em `custom.scss`, as seguintes regras mantêm a barra lateral organizada:

1. **Language Flattening**: Oculta pastas de idiomas inativos (`en` quando em página `pt-br` e vice-versa) e desaninha itens para exibição limpa em primeiro nível.
2. **Mobile Nav Stacking**: Em telas menores (`$mobile`), o cabeçalho e os botões de idioma quebram para linhas dedicadas, evitando sobreposição de ícones.

---

## 🔍 Checklist de Design

- [ ] A alteração visual foi testada tanto no modo Claro quanto no modo Escuro?
- [ ] A interface foi testada em larguras de desktop (>1200px) e mobile (<768px)?
- [ ] Os callouts (`[!NOTE]`, `[!TIP]`, `[!WARNING]`) mantêm alto contraste e legibilidade?
