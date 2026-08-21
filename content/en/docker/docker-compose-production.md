---
title: "Production Orchestration with Docker Compose"
author: "Pedro Andrade & Everton"
description: "Architectural patterns for Docker Compose: isolated networks, persistent volumes, healthchecks, resource constraints, and graceful shutdowns."
order: 30
tags:
  - docker
  - docker-compose
  - devops
  - architecture
  - infrastructure
---

# 🐙 Production Orchestration with Docker Compose

> [!NOTE]
> **Docker Compose** is the standard tool for defining and running multi-container applications. In modern environments, `compose.yaml` specifies not just images, but **network topologies, persistent storage, health probes, and resource governance** for an entire stack.

---

## 🏗️ 1. Tiered Network Isolation Architecture

```mermaid
graph TD
    User["🌐 Public Client / Internet"] -->|Port 443 / 80| Proxy["🛡️ Reverse Proxy (Nginx / Caddy)"]
    
    subgraph "Public Frontend Network (frontend-net)"
        Proxy
        App["🚀 Backend API (Node.js)"]
    end
    
    subgraph "Isolated Private Backend Network (backend-net)"
        App
        DB[("🗄️ PostgreSQL Database")]
        Redis[("⚡ Redis Cache")]
    end
    
    Proxy -->|HTTP| App
    App -->|TCP 5432| DB
    App -->|TCP 6379| Redis
```

---

## 💻 2. Production `compose.yaml` Specification

```yaml
version: "3.8"

networks:
  frontend-net:
    driver: bridge
  backend-net:
    driver: bridge
    internal: true # Disables external outbound routing

volumes:
  postgres_data:
    driver: local
  redis_data:
    driver: local

services:
  # ========================================================
  # Reverse Proxy & SSL Termination
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
  # Core Backend API
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
  # Relational Database
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
  # Caching & Sessions
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

## ⚡ 3. Essential Management Commands

```bash
# Start stack in background with image build
docker compose up -d --build

# Follow logs for specific service
docker compose logs -f api

# Monitor real-time memory and CPU utilization
docker compose stats

# Stop stack gracefully
docker compose stop

# Teardown stack preserving data volumes
docker compose down
```

---

## 🔗 Second Brain Connections

- [[en/docker/docker-architecture-engine|Docker Engine Architecture & Internals]]
- [[en/docker/dockerfile-multistage-best-practices|Advanced Multi-Stage Dockerfile Best Practices]]
- [[en/github/github-actions-cicd|Automated Stack Deployment with GitHub Actions]]
