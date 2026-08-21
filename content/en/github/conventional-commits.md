---
title: "Conventional Commits & Semantic Commits"
description: "Comprehensive guide on the Conventional Commits 1.0.0 specification, type taxonomy, scopes, breaking changes, SemVer mapping, and automated validation scripts."
order: 20
tags:
  - conventional-commits
  - git
  - semver
  - automation
  - devops
---

# 📝 Conventional Commits & Semantic Commits

> [!NOTE]
> The **Conventional Commits 1.0.0** specification is a lightweight convention on top of commit messages. It provides an explicit set of rules for creating a readable Git history that can be parsed automatically by changelog generators and semantic versioning (*SemVer*) tools.

---

## 📐 1. Message Structure

A structured commit message must conform to the following schema:

```text
<type>[optional scope][!]: <description>

[optional body]

[optional footer(s)]
```

### Full Example with All Sections:
```text
feat(auth)!: migrate session cookies to JWT with refresh tokens

Replaces in-memory stateful session cookies with RSA256-signed
JWT tokens and adds the /api/v1/auth/refresh rotation endpoint.
Reduces database load and enables horizontal scaling of the API.

BREAKING CHANGE: Legacy clients sending the 'session_id' cookie will receive 401 Unauthorized.
Closes #142
Refs: #98
```

---

## 🏷️ 2. Type Taxonomy

| Type | Core Purpose | SemVer Impact |
| :--- | :--- | :--- |
| `feat` | Introduces a new feature to the codebase | **MINOR** (e.g., `1.1.0`) |
| `fix` | Patches a bug in an existing feature | **PATCH** (e.g., `1.0.1`) |
| `docs` | Documentation changes only | None / Patch |
| `style` | Formatting, whitespace, semi-colons (no logic change) | None |
| `refactor` | Code restructuring without fixing bugs or adding features | None / Patch |
| `perf` | Performance or memory optimization | **PATCH** |
| `test` | Adding or updating automated test suites | None |
| `build` | Changes affecting the build system or external dependencies | None / Patch |
| `ci` | Modifications to CI/CD workflows (GitHub Actions, etc.) | None |
| `chore` | Routine maintenance tasks, tooling bumps | None |
| `revert` | Reverts a previous commit | Variable |

---

## 💥 3. Breaking Changes & MAJOR Releases

To signal a backward-incompatible change (*Breaking Change*):

1. **Exclamation Mark in Header**: Add `!` before the colon (e.g., `feat(api)!: modify payload contract`).
2. **Footer Section**: Add a footer entry starting with `BREAKING CHANGE:` followed by a detailed description and migration instructions.

```text
refactor(db)!: rename user_email column to email_address

BREAKING CHANGE: Direct queries to the 'users' table using the old column name will fail.
Run migration '004_rename_email.sql' before deploying the new binary.
```

---

## 🎯 4. Subject Writing Best Practices

1. **Imperative and Present Tense**: Write as a command (*"add"*, *"fix"*, *"remove"*, *"implement"*).
   - ✅ `feat(cart): add dynamic shipping cost calculation`
   - ❌ `feat(cart): added dynamic shipping cost calculation`
2. **Lowercase start**: Keep the subject lowercase after the colon.
3. **No trailing period**: Do not end the header with a period.
4. **Length limit**: Keep the first line within **50-72 characters**.
5. **Atomicity**: Each commit should represent a single logical unit of change.

---

## 🤖 5. Automated Validation & Git Hooks

### 5.1. Local Git Hook (`commit-msg`)
Block invalid commits directly on developer machines by placing this script in `.git/hooks/commit-msg`:

```bash
#!/usr/bin/env bash
# .git/hooks/commit-msg
commit_msg_file=$1
commit_msg=$(cat "$commit_msg_file")

pattern='^(feat|fix|docs|style|refactor|perf|test|build|ci|chore|revert)(\([a-z0-9._-]+\))?(!)?: .{1,100}$'

if echo "$commit_msg" | grep -qiE "^Merge (branch|pull request)"; then
    exit 0
fi

first_line=$(head -n 1 "$commit_msg_file")

if ! echo "$first_line" | grep -qE "$pattern"; then
    echo ""
    echo "❌ [ERROR] Commit message does not follow Conventional Commits standard!"
    echo "Your message: '$first_line'"
    echo ""
    echo "Expected format: <type>(<scope>): <short description>"
    echo "Accepted types: feat, fix, docs, style, refactor, perf, test, build, ci, chore, revert"
    echo "Example: feat(auth): add GitHub OAuth support"
    echo ""
    exit 1
fi
```

Make it executable:
```bash
chmod +x .git/hooks/commit-msg
```

---

## 🔗 Second Brain Links

- Review underlying mechanics in [[en/github/git-essentials|Git Essentials]].
- Learn how commits integrate into Pull Requests in [[en/github/github-flow-processes|Workflows: Issues, PRs & Governance]].
- Configure automated commit verification in [[en/github/github-actions-cicd|GitHub Actions & CI/CD]].
