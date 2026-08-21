---
title: "Orquestração de Produção com Docker Compose"
author: "Pedro Andrade & Everton"
publish: true
description: "Padrões arquiteturais para Docker Compose: redes isoladas, volumes persistentes, healthchecks, limites de recursos e graceful shutdown."
order: 30
tags:
  - docker
  - docker-compose
  - devops
  - arquitetura
  - infraestrutura
---

# 🐙 Orquestração de Produção com Docker Compose

> [!NOTE]
> O **Docker Compose** é a ferramenta padrão para definir e executar aplicações multi-container. Em ambientes modernos, o arquivo `compose.yaml` define não apenas imagens, mas a **topologia completa de rede, persistência de dados, healthchecks e governança de recursos** de uma stack.

---

## 🏗️ 1. Topologia de Rede Isolada em Camadas

```mermaid
graph TD
    User["🌐 Cliente / Internet"] -->|Porta 443 / 80| Proxy["🛡️ Reverse Proxy (Nginx / Caddy)"]
    
    subgraph "Rede Pública (frontend-net)"
        Proxy
        App["🚀 Backend API (Node.js)"]
    end
    
    subgraph "Rede Privada Isolada (backend-net)"
        App
        DB[("🗄️ PostgreSQL Database")]
        Redis[("⚡ Redis Cache")]
    end
    
    Proxy -->|HTTP| App
    App -->|TCP 5432| DB
    App -->|TCP 6379| Redis
```

---

## 💻 2. Exemplo Completo de `compose.yaml` para Produção

```yaml
version: "3.8"

networks:
  frontend-net:
    driver: bridge
  backend-net:
    driver: bridge
    internal: true # Bloqueia acesso externo e saída direta para a internet

volumes:
  postgres_data:
    driver: local
  redis_data:
    driver: local

services:
  # ========================================================
  # Proxy Reverso & Terminação SSL
  # ========================================================
  gateway:
    image: nginx:alpine
    restart: always
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf:ro
    networks:
      - frontend-net
    depends_on:
      api:
        condition: service_healthy

  # ========================================================
  # API Principal
  # ========================================================
  api:
    build:
      context: .
      dockerfile: Dockerfile
    restart: always
    environment:
      NODE_ENV: production
      DATABASE_URL: postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@postgres:5432/${POSTGRES_DB}
      REDIS_URL: redis://redis:6379
    networks:
      - frontend-net
      - backend-net
    deploy:
      resources:
        limits:
          cpus: "2.0"
          memory: 1024M
        reservations:
          cpus: "0.5"
          memory: 256M
    healthcheck:
      test: ["CMD", "wget", "-qO-", "http://localhost:3000/health"]
      interval: 15s
      timeout: 5s
      retries: 3
      start_period: 10s
    depends_on:
      postgres:
        condition: service_healthy
      redis:
        condition: service_healthy

  # ========================================================
  # Banco de Dados Relacional
  # ========================================================
  postgres:
    image: postgres:16-alpine
    restart: always
    environment:
      POSTGRES_DB: app_db
      POSTGRES_USER: ${POSTGRES_USER}
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}
    volumes:
      - postgres_data:/var/lib/postgresql/data
    networks:
      - backend-net
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U ${POSTGRES_USER} -d app_db"]
      interval: 10s
      timeout: 5s
      retries: 5

  # ========================================================
  # Cache & Sessões
  # ========================================================
  redis:
    image: redis:7-alpine
    restart: always
    command: redis-server --appendonly yes --requirepass ${REDIS_PASSWORD}
    volumes:
      - redis_data:/data
    networks:
      - backend-net
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 10s
      timeout: 3s
      retries: 3
```

---

## ⚡ 3. Comandos Essenciais para Gerenciamento

```bash
# Iniciar a stack em background com build das imagens
docker compose up -d --build

# Acompanhar logs de um serviço específico em tempo real
docker compose logs -f api

# Inspecionar o consumo de memória e CPU dos containers
docker compose stats

# Parar a stack respeitando o Graceful Shutdown
docker compose stop

# Destruir a stack mantendo os volumes de dados
docker compose down
```

---

## 📚 Documentação Original & Fontes de Referência

- 🌐 [Docker Engine Official Documentation](https://docs.docker.com/engine/) — Arquitetura oficial, CLI e storage drivers.
- 📦 [Open Container Initiative (OCI) Runtime Spec](https://github.com/opencontainers/runtime-spec) — Especificação técnica do runc e containerd.
- 🐙 [Docker Compose Specification](https://docs.docker.com/compose/compose-file/) — Especificação oficial do compose.yaml.
- 🐧 [Kernel Linux: Cgroups v2 & Namespaces](https://www.kernel.org/doc/Documentation/cgroup-v2.txt) — Documentação oficial do kernel.

---

## 🔗 Conexões do Segundo Cérebro

- [[pt-br/docker/docker-architecture-engine|Mecânica Interna & Arquitetura do Docker Engine]]
- [[pt-br/docker/dockerfile-multistage-best-practices|Práticas Avançadas de Dockerfile Multi-Stage]]
- [[pt-br/github/github-actions-cicd|Deploy Automatizado de Stacks com GitHub Actions]]
