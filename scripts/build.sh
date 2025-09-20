#!/bin/bash
echo "[BUILD] Montando versão do site... e construindo"

# Cria pasta de build e copia arquivos essenciais
mkdir -p dist
cp -r *.html css js images dist/ 2>/dev/null || true

echo "[BUILD] Arquivos copiados para dist/ com sucesso."