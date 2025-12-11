// worker.js — roda em paralelo

self.onmessage = function (event) {
    const cidade = event.data;

    // Simula um processamento paralelo "pesado"
    let contador = 0;
    for (let i = 0; i < 150000000; i++) {
        contador++;
    }

    self.postMessage(`Processamento paralelo concluído para: ${cidade}`);
};
