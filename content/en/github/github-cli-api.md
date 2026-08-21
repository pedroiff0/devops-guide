---
title: "Productivity with GitHub CLI & APIs"
description: "Comprehensive guide to terminal automation and productivity with GitHub CLI (gh), GitHub REST, and GraphQL APIs."
order: 70
tags:
  - github-cli
  - api
  - rest
  - graphql
  - automation
  - terminal
---

# 💻 Productivity with GitHub CLI (`gh`) & APIs

> [!NOTE]
> The **GitHub CLI (`gh`)** brings the entire GitHub experience directly to the terminal, allowing engineers to create Pull Requests, review code, configure secrets, and manage CI/CD runs without context switching.

---

## ⚡ 1. Essential GitHub CLI (`gh`) Commands

### 1.1. Authentication & Configuration
```bash
# Secure interactive login via browser or token
gh auth login

# Check authentication status
gh auth status

# Set default editor
gh config set editor "nano"
```

---

### 1.2. Pull Request Management in Terminal
```bash
# Create a Pull Request with interactive prompts
gh pr create --title "feat(auth): add JWT middleware" --body "Implements JWT auth."

# Open PR as a Draft
gh pr create --draft --title "WIP: database refactor"

# List open PRs
gh pr list

# Checkout a PR branch locally
gh pr checkout 42

# View diff and CI status checks
gh pr diff 42
gh pr checks 42

# Review and merge via CLI
gh pr review 42 --approve -b "LGTM! Tested and verified."
gh pr merge 42 --squash --delete-branch
```

---

### 1.3. Workflow Management
```bash
# Trigger a workflow manually
gh workflow run deploy-gh-pages.yaml

# Watch execution in real-time
gh run watch
```

---

### 1.4. Managing Secrets & Variables
```bash
# Set repository secret via stdin
echo "my_api_key" | gh secret set SNYK_TOKEN

# Set environment variable
gh variable set BASE_URL --body "https://pedroiff0.github.io/guia-github"
```

---

## 🌐 2. GitHub REST & GraphQL APIs

### Querying via `gh api`:
```bash
# Fetch repository summary in JSON
gh api repos/:owner/:repo | jq '{name: .name, stars: .stargazers_count, forks: .forks_count}'
```

### GraphQL Query Example:
```bash
gh api graphql -f query='
query {
  repository(owner: "pedroiff0", name: "guia-github") {
    name
    stargazerCount
    pullRequests(states: OPEN, first: 5) {
      nodes {
        number
        title
      }
    }
  }
}
'
```

---

## 🔗 Second Brain Links

- Trigger pipelines configured in [[en/github/github-actions-cicd|GitHub Actions & CI/CD]].
- Back to the main hub in [[en/github/index|GitHub & Git Ecosystem]].
