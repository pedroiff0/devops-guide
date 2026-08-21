# 🤝 Guia de Contribuição / Contributing Guide

Obrigado pelo interesse em contribuir com o **Guia GitHub & Hub de Documentações Reexplicadas**! Este projeto é mantido pela comunidade para tornar documentações técnicas mais acessíveis, visuais e práticas.

---

## 🧭 Como Você Pode Contribuir

- **Adicionar Novos Guias**: Escrever explicações aprofundadas para tecnologias existentes ou novos tópicos nos pilares (Docker, Cloudflare, Claude, etc.).
- **Melhorar Guias Existentes**: Adicionar mais exemplos de produção, comandos úteis ou corrigir explicações.
- **Tradução & Simetria Bilíngue**: Garantir que as versões em Português (`content/pt-br/`) e Inglês (`content/en/`) estejam sincronizadas.
- **Correção de Bugs & Links**: Ajustar links quebrados, erros de digitação ou inconsistências de formatação.

---

## 🌿 Fluxo de Trabalho (Step-by-Step)

### 1. Fork & Clonagem
```bash
git clone https://github.com/<seu-usuario>/guia-github.git
cd guia-github
```

### 2. Instalação do Ambiente
```bash
npm install
npx quartz plugin install
```

### 3. Criação de Branch
Crie uma branch com nome descritivo:
```bash
git checkout -b feat/nome-da-sua-contribuicao
```

### 4. Escrita & Padrões
- Siga a skill [`skills/doc-authoring/SKILL.md`](./skills/doc-authoring/SKILL.md) para formatação de notas, frontmatter e callouts.
- Toda nova página em `content/pt-br/` deve ter sua versão correspondente em `content/en/`.
- Use wikilinks `[[...]]` para conectar suas notas ao grafo.

### 5. Validação Local
Antes de commitar, certifique-se de que a compilação passa sem erros:
```bash
npm run build
```
Inicie o preview local para testar a renderização visual e os links:
```bash
npm run serve
```

### 6. Commits Semânticos
Utilize o padrão **Conventional Commits 1.0.0**:
```bash
git commit -m "feat(docker): adicionar secao de redes overlay"
```
Você pode validar seus commits com:
```bash
./scripts/validate-commit-msg.sh origin/main..HEAD
```

### 7. Submissão do Pull Request
- Envie sua branch para o seu fork: `git push -u origin feat/nome-da-sua-contribuicao`.
- Abra o PR no GitHub preenchendo todos os campos do template (`PULL_REQUEST_TEMPLATE.md`).
- Acompanhe as verificações automáticas do CI.

---

## 📜 Código de Conduta
Todos os contribuidores devem aderir ao nosso [`CODE_OF_CONDUCT.md`](./CODE_OF_CONDUCT.md).