# 🧠 Guia DevOps & Hub de Documentações Reexplicadas
### *The Ultimate DevOps Second Brain & Re-explained Documentation Hub*

<p align="center">
  <a href="https://github.com/pedroiff0/devops-guide/blob/main/LICENSE"><img src="https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge" alt="License: MIT"></a>
  <a href="https://quartz.jzhao.xyz/"><img src="https://img.shields.io/badge/Engine-Quartz%20v4-black?style=for-the-badge&logo=quartz" alt="Quartz v4"></a>
  <a href="https://nodejs.org/"><img src="https://img.shields.io/badge/Node.js-%3E%3D22-339933?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js 22+"></a>
  <a href="https://devops.phrandrade.com"><img src="https://img.shields.io/badge/Domain-devops.phrandrade.com-blueviolet?style=for-the-badge&logo=cloudflare&logoColor=white" alt="Custom Domain"></a>
  <a href="https://www.conventionalcommits.org/"><img src="https://img.shields.io/badge/Commits-Conventional%201.0.0-FE5196?style=for-the-badge&logo=git" alt="Conventional Commits"></a>
  <img src="https://img.shields.io/badge/Languages-PT--BR%20%7C%20EN--US-informational?style=for-the-badge" alt="Bilingual">
</p>

<p align="center">
  <strong>🌐 <a href="https://devops.phrandrade.com">Acesse a Documentação Online / Access Live Digital Garden: devops.phrandrade.com</a></strong>
</p>

---

## 🌟 Sobre o Projeto / About The Project

Documentações técnicas oficiais costumam ser densas, dispersas ou puramente descritivas. O **Guia DevOps & Hub de Documentações Reexplicadas** é um **Segundo Cérebro aberto (Digital Garden)** concebido para ser o "guia de todos os outros guias": estruturado em tópicos, subtópicos e subsubtópicos aprofundados, ricamente exemplificados com casos reais de engenharia, referências cruzadas no grafo, links externos e suporte bilíngue nativo.

### 🎯 Principais Destaques:
- 🇧🇷 / 🇺🇸 **100% Bilíngue**: Navegação completa espelhada em **Português (PT-BR)** e **Inglês (EN-US)** com alternância instantânea de idioma sem quebra de rota.
- 🕸️ **Grafo de Conhecimento Interativo**: Visualização em rede D3 mapeando interconexões conceituais entre ferramentas, protocolos e padrões.
- 🐙 **Módulo GitHub Completo**: De comandos atômicos do Git a pipelines de CI/CD, governança de PRs, SonarCloud, Snyk e GitHub Pages.
- 🚀 **Ecossistemas em Expansão**: Hubs dedicados na barra lateral para Docker, Cloudflare, Claude (Anthropic), Hermes Agent, Lovable e OceanGate / OpenGate.
- 🤖 **Agentic Skills Nativas**: Diretório de skills padronizadas para agentes autônomos (Antigravity, Claude Code, Hermes).

---

## 🧭 Pilares do Conhecimento / Knowledge Pillars

```mermaid
graph TD
    Hub["🧠 DevOps Docs Hub (devops.phrandrade.com)"]
    Hub --> GitHub["🐙 GitHub & Git Guide (Completo)"]
    Hub --> Docker["🐳 Docker & Containers"]
    Hub --> Cloudflare["⚡ Cloudflare Ecosystem"]
    Hub --> Claude["🤖 Claude & AI Engineering"]
    Hub --> Hermes["🦅 Hermes Agent & Skills"]
    Hub --> Lovable["💖 Lovable Full-Stack"]
    Hub --> OceanGate["🌊 OceanGate / OpenGate"]

    GitHub --> G1["Git Essentials & Internals"]
    GitHub --> G2["Conventional Commits 1.0.0"]
    GitHub --> G3["GitHub Flow & Governance"]
    GitHub --> G4["GitHub Actions & CI/CD"]
    GitHub --> G5["Security: Snyk & SonarCloud"]
    GitHub --> G6["Quartz v4 & Pages"]
    GitHub --> G7["GitHub CLI & APIs"]
```

| Pilar | Descrição & Escopo | Status |
| :--- | :--- | :--- |
| **🐙 GitHub & Git** | Commits semânticos, fluxos de PR, CI/CD Actions, Snyk, SonarCloud, CLI e Quartz. | 🟢 **Completo** |
| **🐳 Docker** | Virtualização de processos, Dockerfile multi-stage, Docker Compose, redes e volumes. | 🟡 *Em Expansão* |
| **⚡ Cloudflare** | Workers V8 Isolates, Pages, Zero Trust, Tunnels (`cloudflared`), R2 Storage e DNS. | 🟡 *Em Expansão* |
| **🤖 Claude & IA** | Prompt Engineering estruturado, context windows de 200k+ tokens, Claude Code e MCP. | 🟡 *Em Expansão* |
| **🦅 Hermes Agent** | Criação de skills modulares, automação de repositórios e integração de ferramentas. | 🟡 *Em Expansão* |
| **💖 Lovable** | Prototipagem full-stack acelerada, arquitetura React + Supabase e sincronização Git. | 🟡 *Em Expansão* |
| **🌊 OceanGate** | API Gateways de alta vazão, roteamento de borda, rate limiting e resiliência. | 🟡 *Em Expansão* |

---

## ⚡ Início Rápido / Quick Start

### Pré-requisitos
- **Node.js**: Versão `>= 22`
- **npm**: Versão `>= 10`

### 1. Clonar o Repositório
```bash
git clone https://github.com/pedroiff0/devops-guide.git
cd devops-guide
```

### 2. Instalar Dependências & Plugins
```bash
npm install
npx quartz plugin install
```

### 3. Iniciar Servidor de Desenvolvimento Local
```bash
npm run serve
```
Abra `http://localhost:8080` no navegador para explorar o jardim digital com recarregamento em tempo real (*live reload*).

### 4. Compilar para Produção
```bash
npm run build
```
Os arquivos estáticos otimizados serão gerados na pasta `public/`, incluindo o arquivo `CNAME` para `devops.phrandrade.com`.

---

## 📂 Estrutura do Repositório / Directory Tree

```text
devops-guide/
├── .github/
│   ├── workflows/
│   │   ├── deploy-gh-pages.yaml # Deploy contínuo no GitHub Pages / Custom Domain
│   │   └── ci.yml               # Verificação de build e linter
│   ├── ISSUE_TEMPLATE/          # Templates padronizados de Issues
│   └── PULL_REQUEST_TEMPLATE.md # Template para Pull Requests
├── content/                     # Vault de Conteúdo Markdown
│   ├── index.md                 # Portal / Landing Page raiz
│   ├── pt-br/                   # Documentações em Português do Brasil
│   │   ├── index.md             # Hub central PT-BR
│   │   ├── github/              # Módulo completo do Guia GitHub
│   │   ├── docker/              # Hub Docker & Containers
│   │   ├── cloudflare/          # Hub Cloudflare
│   │   ├── claude/              # Hub Claude & IA
│   │   ├── hermes/              # Hub Hermes Agent
│   │   ├── lovable/             # Hub Lovable
│   │   └── oceangate/           # Hub OceanGate
│   └── en/                      # 100% Mirrored English Content
├── local-plugins/               # Plugins locais personalizados do Quartz
│   └── page-title-i18n/         # Título com relógio UTC-3 em tempo real
├── quartz/                      # Código do motor Quartz v4 (Preact/TS/SCSS)
├── skills/                      # Skills do repositório para devs e agentes IA
│   ├── doc-authoring/           # Padrões de escrita e frontmatter
│   ├── second-brain-graph/      # Curadoria de topologia e wikilinks
│   ├── quartz-management/       # Operação do Quartz v4
│   ├── git-flow-conventional-commits/ # Fluxos Git e validação
│   ├── ci-cd-github-pages/      # Manutenção de CI/CD
│   └── re-explained-doc-engine/ # Expansão de novos pilares
├── scripts/
│   ├── validate-commit-msg.sh   # Validador local de Conventional Commits
│   └── check-i18n-mirror.py     # Verificador de simetria de slugs bilíngue
├── static/
│   └── CNAME                    # Apontamento para devops.phrandrade.com
├── quartz.config.yaml           # Configuração de plugins, tema e grafo
├── package.json
└── README.md
```

---

## 🛠️ Repository Skills para Agentes & Contribuidores

Este repositório adota a especificação de **Skills** autocontidas para guiar agentes de IA e desenvolvedores:

- [`skills/doc-authoring/SKILL.md`](./skills/doc-authoring/SKILL.md): Guia de autoria de notas, diagramas Mermaid e alertas.
- [`skills/second-brain-graph/SKILL.md`](./skills/second-brain-graph/SKILL.md): Regras de interconexão e curadoria do grafo.
- [`skills/quartz-management/SKILL.md`](./skills/quartz-management/SKILL.md): Manutenção do motor Quartz v4.
- [`skills/git-flow-conventional-commits/SKILL.md`](./skills/git-flow-conventional-commits/SKILL.md): Padrões de commits e branches.
- [`skills/ci-cd-github-pages/SKILL.md`](./skills/ci-cd-github-pages/SKILL.md): Manutenção de CI/CD e Pages.
- [`skills/re-explained-doc-engine/SKILL.md`](./skills/re-explained-doc-engine/SKILL.md): Criação e expansão de novos módulos.

---

## 🤝 Como Contribuir / Contributing

Contribuições são muito bem-vindas! Seja corrigindo um erro de digitação, adicionando novos exemplos ou expandindo um pilar:

1. Faça um Fork do repositório.
2. Crie uma branch para sua modificação: `git checkout -b feat/meu-novo-guia`.
3. Siga o padrão [[skills/git-flow-conventional-commits/SKILL|Conventional Commits]]: `feat(docker): adicionar exemplo de volume`.
4. Valide a compilação localmente com `npm run build`.
5. Envie um Pull Request detalhado.

Consulte [`CONTRIBUTING.md`](./CONTRIBUTING.md) e [`CODE_OF_CONDUCT.md`](./CODE_OF_CONDUCT.md) para mais detalhes.

---

## 👤 Autor / Author

**Pedro Henrique Rocha de Andrade**
- 🐙 GitHub: [@pedroiff0](https://github.com/pedroiff0)
- 🌐 Website: [phrandrade.com](https://www.phrandrade.com)
- ✉️ Email: pedroiff0@gmail.com

---

## 📄 Licença / License

Distribuído sob a licença **MIT**. Consulte [`LICENSE`](./LICENSE) para mais informações.