#!/bin/bash

# Exit em caso de erro
set -e

echo "[DEPLOY] Iniciando publicação da tag no GitHub..."

# Configura credenciais do Git
git config user.name "edlesonjrr"
git config user.email "edlesonnew@gmail.com"

# Verifica se GH_TOKEN e GH_USER estão definidos
if [ -z "$GH_USER" ] || [ -z "$GH_TOKEN" ]; then
  echo "[ERROR] Variáveis GH_USER ou GH_TOKEN não definidas."
  exit 1
fi

# Define BUILD_NUMBER caso não esteja definido (usa timestamp como fallback)
if [ -z "$BUILD_NUMBER" ]; then
  BUILD_NUMBER=$(date +%s)
  echo "[DEPLOY] BUILD_NUMBER não definido. Usando timestamp: $BUILD_NUMBER"
fi

# Cria e publica a tag
TAG="v1.0.$BUILD_NUMBER"
echo "[DEPLOY] Criando tag $TAG..."
git tag -a "$TAG" -m "Deploy automático da WeatherApp - Build $BUILD_NUMBER"

echo "[DEPLOY] Publicando tag $TAG..."
git push https://"$GH_USER":"$GH_TOKEN"@github.com/edlesonjrr/WeatherApp.git --tags

echo "[DEPLOY] Tag $TAG publicada com sucesso."