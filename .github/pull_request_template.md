## Resumo

<!-- Descreva de forma concisa o que mudou e a motivação técnica/negócio. -->

Closes #

## Tipo de Alteração

- [ ] Bug fix (correção de comportamento inesperado)
- [ ] Feature (nova funcionalidade)
- [ ] Refactor / Chore / Docs (sem alteração de comportamento de API)
- [ ] Testes (novos testes unitários/integração)
- [ ] Segurança (ajuste de dependências ou hardening)

## Autoverificação Obrigatória

- [ ] `npm test` executado e 100% verde (sem quebrar testes existentes)
- [ ] Validação com Zod em todas as entradas mutáveis de novos endpoints
- [ ] Nenhuma chamada inline de `<script>` ou `<style>` (conformidade estrita com CSP)
- [ ] Saídas de template sanitizadas com `<%= %>`
- [ ] Ícones visuais em SVG inline com `stroke="currentColor"` (zero emojis na UI)
- [ ] Documentação conceitual espelhada no cofre `hardcore-life/01-projetos/`
- [ ] `HANDOFF.md` atualizado se houver mudança de estado ou decisões relevantes

## Como Testar

```bash
cd app && npm test
make dev
```
