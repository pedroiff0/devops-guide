---
name: content-validation
description: >-
  Auditing and validation runbook for verifying wikilinks integrity, bilingual mirror symmetry,
  frontmatter compliance, Conventional Commits messages, and executing production Quartz static builds.
---

# 🧪 Skill: Validação & Auditoria de Conteúdo

Esta skill reúne todos os procedimentos de teste e verificação automatizada para garantir integridade absoluta antes de publicar alterações no repositório.

---

## 🛠️ 1. Bateria Completa de Validação

Execute a sequência completa de validação no terminal:

```bash
# 1. Verificar simetria de arquivos bilíngue (PT-BR <-> EN-US)
python3 scripts/check-i18n-mirror.py

# 2. Verificar conformidade das mensagens de commit (Conventional Commits 1.0.0)
./scripts/validate-commit-msg.sh origin/main..HEAD

# 3. Validar tipagem TypeScript
npm run check

# 4. Executar compilação estática do Quartz (verifica links quebrados e emite HTML)
npm run build
```

---

## 🔍 2. Verificação de Links no Grafo (Wikilinks)

O Quartz emite avisos (*warnings*) caso um link do tipo `[[caminho/slug]]` aponte para um destino inexistente:

- **Links Internos em PT-BR**: Devem sempre usar o prefixo `[[pt-br/...]]` ou o slug relativo correto.
- **Links Internos em EN-US**: Devem sempre usar o prefixo `[[en/...]]`.
- **Links para Skills**: Devem apontar para caminhos relativos válidos como `[[../../skills/README|Skills]]`.

---

## 🚨 3. Solução de Falhas de Validação

### Falha no `check-i18n-mirror.py`:
- O script listará exatamente quais arquivos existem em `pt-br/` mas faltam em `en/` (ou vice-versa).
- Crie o arquivo faltante com o mesmo slug relativo.

### Falha no `validate-commit-msg.sh`:
- Edite o commit com `git commit --amend` ajustando a mensagem para `<type>(<scope>): <subject>`.

### Falha no `npm run build`:
- Verifique se há sintaxe YAML inválida no frontmatter (aspas não fechadas, indentação incorreta).
- Verifique se há blocos Mermaid com caracteres não escapados.
