---
name: quartz-management
description: >-
  Operational runbook for managing the Quartz v4 static site generator engine in this
  repository, including dependency installation, plugin management, local live reload preview,
  custom styling, and build verification.
---

# ⚡ Skill: Operação & Manutenção do Quartz v4

Esta skill define as tarefas rotineiras de manutenção, configuração e compilação do motor **Quartz v4** neste repositório.

---

## 🛠️ Comandos de Linha de Comando

```bash
# 1. Instalar dependências do projeto
npm install

# 2. Instalar / atualizar plugins da comunidade declarados em quartz.config.yaml
npx quartz plugin install

# 3. Iniciar servidor de desenvolvimento com recarregamento a quente
npm run serve
# ou
npx quartz build --serve

# 4. Executar compilação estática completa de produção
npm run build

# 5. Validar tipagem TypeScript e integridade dos componentes
npm run check
```

---

## 📁 Estrutura do Motor do Quartz

- `quartz.config.yaml`: Arquivo mestre de configuração (plugins ativados, ordem de execução, opções de grafo, explorer e tema).
- `quartz/`: Código-fonte do motor do Quartz, incluindo componentes Preact (`Head.tsx`, `LanguageToggle.tsx`, `CustomFooter.tsx`, `renderPage.tsx`).
- `quartz/styles/custom.scss`: Estilização SCSS personalizada, regras de *language flattening* no Explorer, layout responsivo e tipografia.
- `local-plugins/`: Plugins locais sob medida (ex.: `page-title-i18n`).
- `content/`: O vault Markdown contendo as páginas do site.
- `public/`: Diretório de saída gerado pelo build (ignorado pelo git).

---

## ⚙️ Procedimento de Adição de Plugins

1. Abra `quartz.config.yaml`.
2. Adicione a declaração sob a chave `plugins:`:
   ```yaml
   - source: github:quartz-community/<nome-do-plugin>
     enabled: true
     options: {}
     order: 50
     layout:
       position: right
       priority: 20
   ```
3. Baixe o código do plugin:
   ```bash
   npx quartz plugin install
   ```
4. Execute o build para testar a integração:
   ```bash
   npx quartz build
   ```
