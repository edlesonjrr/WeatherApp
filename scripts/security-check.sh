#!/bin/bash
echo "[SECURITY] Verificando arquivos sensíveis..."

# Verifica se arquivos .env ou credenciais estão expostos
if find . -name "*.env" | grep -q .; then
  echo "[SECURITY] ⚠️ Arquivo .env encontrado!"
  exit 1
else
  echo "[SECURITY] Nenhum arquivo sensível detectado."
fi