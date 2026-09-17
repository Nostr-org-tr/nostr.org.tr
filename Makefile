SHELL := /bin/bash

.PHONY: all install dev build check preview fetch-blog cf-dev deploy clean

# Load nvm and run commands
NVM_EXEC = source ~/.nvm/nvm.sh 2>/dev/null || true; nvm use >/dev/null 2>&1 || true

all: install build

install:
	@$(NVM_EXEC) && npm install

dev:
	@$(NVM_EXEC) && npm run dev

build:
	@$(NVM_EXEC) && npm run build

check:
	@$(NVM_EXEC) && npm run check

fetch-blog:
	@$(NVM_EXEC) && npm run fetch:blog

preview:
	@$(NVM_EXEC) && npm run preview

cf-dev:
	@$(NVM_EXEC) && npm run cf:dev

deploy: fetch-blog build
	@$(NVM_EXEC) && npm run cf:deploy

clean:
	rm -rf dist .astro node_modules
