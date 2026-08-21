#!/usr/bin/env bash
# ==============================================================================
# Conventional Commits 1.0.0 Validator
# Usage:
#   ./scripts/validate-commit-msg.sh             # Validates HEAD
#   ./scripts/validate-commit-msg.sh <commit-sha># Validates single commit
#   ./scripts/validate-commit-msg.sh main..HEAD  # Validates range
# ==============================================================================

set -euo pipefail

PATTERN='^(feat|fix|docs|style|refactor|perf|test|build|ci|chore|revert)(\([a-zA-Z0-9._\/-]+\))?(!)?: .{1,150}$'

commits=()

if [ $# -eq 0 ]; then
  commits=("HEAD")
else
  for arg in "$@"; do
    if [[ "$arg" == *".."* ]]; then
      while IFS= read -r sha; do
        [ -n "$sha" ] && commits+=("$sha")
      done < <(git rev-list "$arg")
    else
      commits+=("$arg")
    fi
  done
fi

if [ ${#commits[@]} -eq 0 ]; then
  echo "ℹ️ Nenhum commit encontrado para validação."
  exit 0
fi

invalid=0

for sha in "${commits[@]}"; do
  subject=$(git log -1 --format=%s "$sha" 2>/dev/null || echo "")
  
  if [ -z "$subject" ]; then
    echo "⚠️ AVISO: Não foi possível obter o commit '$sha'."
    continue
  fi

  # Skip merge commits and branch joins
  if echo "$subject" | grep -qiE "^merge (branch|pull request)"; then
    echo "⏩ Pulando commit de merge: $subject"
    continue
  fi

  echo "🔍 Verificando commit ${sha:0:7}: '$subject'"

  if ! echo "$subject" | grep -Eq "$PATTERN"; then
    echo "❌ INVÁLIDO: '$subject'"
    echo "   Formato esperado: <type>(<scope>): <descrição curta>"
    echo "   Tipos aceitos: feat, fix, docs, style, refactor, perf, test, build, ci, chore, revert"
    invalid=1
  else
    echo "   ✅ Válido"
  fi
done

if [ "$invalid" -ne 0 ]; then
  echo ""
  echo "❌ Erro: Um ou mais commits violam o padrão Conventional Commits 1.0.0."
  exit 1
fi

echo ""
echo "🎉 Todos os commits verificados estão em conformidade com Conventional Commits!"
exit 0