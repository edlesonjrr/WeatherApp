#!/bin/bash
echo "[VALIDATION] Verificando arquivos esperados..."

# Verifica se os arquivos essenciais estão na build
if [ -f "dist/index.html" ] && [ -d "dist/css" ]; then
  echo "[VALIDATION] Estrutura básica encontrada."
else
  echo "[VALIDATION] ❌ Arquivos esperados não encontrados!"
  exit 1
fi

echo "[VALIDATION] Tudo certo!"
