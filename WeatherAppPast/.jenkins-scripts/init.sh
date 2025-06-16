#!/bin/bash
echo "[INIT] Preparando ambiente..."

# Cria pasta de log e inicializa info
mkdir -p logs
echo "Iniciado em $(date)" > logs/init.log

echo "[INIT] Ambiente pronto."
