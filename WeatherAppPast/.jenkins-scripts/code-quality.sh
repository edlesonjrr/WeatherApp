#!/bin/bash
echo "[QUALITY] Analisando HTMLs..."

# Checa se arquivos HTML têm DOCTYPE declarado (só exemplo)
for file in *.html; do
  if grep -q "<!DOCTYPE html>" "$file"; then
    echo "[QUALITY] $file OK"
  else
    echo "[QUALITY] ⚠️ $file está sem DOCTYPE"
  fi
done

echo "[QUALITY] Análise finalizada."
