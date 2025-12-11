const key = "6c8c9473ba47d50600f7b080c98ddd15";

/* ============================
   Troca de fundo (corrigida)
   ============================ */
function atualizarFundo(clima) {
    const fundo = {
        Rain: "rain.jpg",
        Drizzle: "rain.jpg",
        Thunderstorm: "tempestade.jpg",
        Clear: "sol.jpg",
        Snow: "neve.jpg",
        Clouds: "nuvens.jpg"
    };

    const imagem = fundo[clima] || "nuvens.jpg";
    // Usar caminho relativo ao HTML (supondo que HTML está na raiz e images/ também)
    document.body.style.backgroundImage = `url("images/${imagem}")`;
}

/* ============================
   Atualizar UI principal
   ============================ */
function colocarDadosNaTela(dados) {
    document.querySelector(".cidade").innerHTML = "Tempo em " + dados.name;
    document.querySelector(".temp").innerHTML = Math.round(dados.main.temp) + "°C";
    document.querySelector(".texto-previsao").innerHTML = dados.weather[0].description;

    // GOTA ESTÁTICA
    document.querySelector(".umidade").innerHTML =
        `💧 Umidade: ${Math.round(dados.main.humidity)}%`;

    document.querySelector(".img-previsao").src =
        `https://openweathermap.org/img/wn/${dados.weather[0].icon}.png`;

    // atualiza fundo pelo clima "main" que vem da API (Clear, Rain, Clouds...)
    atualizarFundo(dados.weather[0].main);

    // atualiza gráfico com nova temperatura
    atualizarGrafico(Math.round(dados.main.temp));
}

/* ============================
   Buscar cidade
   ============================ */
async function buscarCidade(cidade) {
    try {
        const res = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(cidade)}&appid=${key}&lang=pt_br&units=metric`
        );
        if (!res.ok) {
            // tratamento simples de erro
            console.error("Erro na requisição:", res.status);
            return;
        }
        const dados = await res.json();
        colocarDadosNaTela(dados);
        salvarNoHistorico(dados);
    } catch (err) {
        console.error("Erro ao buscar cidade:", err);
    }
}

function cliqueiNoBotao() {
    const cidade = document.querySelector(".input-cidade").value;
    if (cidade.trim() === "") return;
    buscarCidade(cidade);
}

/* ============================
   Histórico
   ============================ */
function salvarNoHistorico(dados) {
    const historico = JSON.parse(localStorage.getItem("historicoClima")) || [];

    historico.push({
        cidade: dados.name,
        temperatura: Math.round(dados.main.temp) + "°C",
        descricao: dados.weather[0].description,
        umidade: Math.round(dados.main.humidity) + "%",
        data: new Date().toLocaleString("pt-BR")
    });

    localStorage.setItem("historicoClima", JSON.stringify(historico));
}

/* ============================
   Paralelismo (mantido)
   ============================ */
function processarParalelo(cidade) {
    const status = document.getElementById("status-paralelo");
    const box = document.getElementById("resultado-paralelo-box");
    const resultado = document.getElementById("resultado-paralelo");

    status.style.display = "block";
    box.style.display = "none";

    const inicio = performance.now();

    const worker = new Worker("js/worker.js");
    worker.postMessage(cidade);

    worker.onmessage = function (event) {
        const fim = performance.now();
        const tempo = ((fim - inicio) / 1000).toFixed(2);

        status.style.display = "none";
        box.style.display = "block";

        resultado.innerHTML = `
            <strong style="color: yellow;">${event.data}</strong><br>
            <span style="color: #ccc;">⏱️ Tempo: ${tempo}s</span>
        `;

        worker.terminate();
    };
}

function testarParalelismo() {
    const status = document.getElementById("status-paralelo");
    const box = document.getElementById("resultado-paralelo-box");

    if (status.style.display === "block" || box.style.display === "block") {
        status.style.display = "none";
        box.style.display = "none";
        return;
    }

    processarParalelo("Teste manual");
}

/* ============================
   GRÁFICO SIMPLES (canvas) - sem libs
   ============================ */
let historicoTemp = [];

function toggleGrafico() {
    const caixa = document.getElementById("caixa-grafico");
    // alterna entre 'flex' e 'none'
    caixa.style.display = caixa.style.display === "flex" ? "none" : "flex";
    // se estiver aparecendo, redesenha imediatamente
    if (caixa.style.display === "flex") desenharGrafico();
}

function atualizarGrafico(tempAtual) {
    // guarda valores numéricos
    historicoTemp.push(Number(tempAtual));
    if (historicoTemp.length > 12) historicoTemp.shift();
    desenharGrafico();
}

function desenharGrafico() {
    const canvas = document.getElementById("graficoCanvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    // dimensões
    const W = canvas.width = 330; // ajustei para caber na caixa
    const H = canvas.height = 220;
    const padding = 30;

    // fundo limpo
    ctx.clearRect(0, 0, W, H);

    // se não houver dados, desenha texto
    if (!historicoTemp.length) {
        ctx.fillStyle = "#ccc";
        ctx.font = "14px Manrope, sans-serif";
        ctx.fillText("Sem dados ainda — pesquise uma cidade", padding, H / 2);
        return;
    }

    // calcula min/max para escalar
    const minT = Math.min(...historicoTemp);
    const maxT = Math.max(...historicoTemp);
    const range = Math.max(1, maxT - minT);

    // eixos / grid
    ctx.strokeStyle = "rgba(255,255,255,0.12)";
    ctx.lineWidth = 1;

    // desenha linhas horizontais (grid) 4 linhas
    ctx.beginPath();
    for (let i = 0; i <= 4; i++) {
        const y = padding + (i * (H - padding * 2) / 4);
        ctx.moveTo(padding, y);
        ctx.lineTo(W - padding, y);
    }
    ctx.stroke();

    // labels de temperatura no eixo esquerdo
    ctx.fillStyle = "#ddd";
    ctx.font = "12px Manrope, sans-serif";
    for (let i = 0; i <= 4; i++) {
        const y = padding + (i * (H - padding * 2) / 4);
        const labelTemp = Math.round(maxT - (i * range / 4));
        ctx.fillText(`${labelTemp}°C`, 6, y + 4);
    }

    // desenha a linha do gráfico
    ctx.beginPath();
    ctx.lineWidth = 3;
    ctx.strokeStyle = "yellow";
    ctx.lineJoin = "round";
    ctx.lineCap = "round";

    const n = historicoTemp.length;
    const stepX = (W - padding * 2) / Math.max(1, n - 1);

    historicoTemp.forEach((t, i) => {
        const x = padding + i * stepX;
        // mapeia t em y: maxT -> padding, minT -> H - padding
        const y = padding + ((maxT - t) / range) * (H - padding * 2);

        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
    });
    ctx.stroke();

    // desenha pontos e rótulos
    historicoTemp.forEach((t, i) => {
        const x = padding + i * stepX;
        const y = padding + ((maxT - t) / range) * (H - padding * 2);

        // ponto
        ctx.beginPath();
        ctx.fillStyle = "yellow";
        ctx.arc(x, y, 4, 0, Math.PI * 2);
        ctx.fill();

        // valor acima do ponto
        ctx.fillStyle = "#fff";
        ctx.font = "12px Manrope, sans-serif";
        ctx.fillText(`${t}°`, x - 10, y - 10);
    });

    // eixo X labels (índices simples)
    ctx.fillStyle = "#bbb";
    ctx.font = "11px Manrope, sans-serif";
    historicoTemp.forEach((_, i) => {
        const x = padding + i * stepX;
        const label = `#${i + 1}`;
        ctx.fillText(label, x - 10, H - padding + 18);
    });
}
