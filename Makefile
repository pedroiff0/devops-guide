.PHONY: help install dev build lint clean

help: ## Exibe a lista de comandos disponíveis
	@echo "Comandos disponíveis em DevOps Guide:"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-18s\033[0m %s\n", $$1, $$2}'

install: ## Instala dependências do Quartz
	npm install
	npx quartz plugin install

dev: ## Inicia servidor de desenvolvimento local (live-reload)
	npx quartz build --serve

build: ## Compila o site estático para a pasta public/
	npx quartz build

lint: ## Valida estrutura e arquivos de configuração
	@test -f quartz.config.yaml && echo "Configuração Quartz OK."
	@test -d content && echo "Diretório content/ OK."

clean: ## Limpa arquivos temporários de build
	rm -rf public .quartz-cache
