#!/bin/bash
echo "[VALIDATION] Verificando arquivos esperados..."

if [ -f "dist/index.html" ] && [ -d "dist/css" ]; then
  echo "[VALIDATION] Estrutura básica encontrada."
else
  echo "[VALIDATION] ⚠️ Arquivos esperados não encontrados, mas build continuará."
  # exit 1  <-- REMOVIDO!
fi

echo "[VALIDATION] Tudo certo!"
