#!/bin/bash
echo "[PACKAGE] Compactando build..."

# Cria um ZIP com o site gerado
zip -r site-build.zip dist/ > /dev/null

echo "[PACKAGE] Arquivo site-build.zip gerado!"
