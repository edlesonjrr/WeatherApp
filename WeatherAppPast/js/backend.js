const key = "6c8c9473ba47d50600f7b080c98ddd15";

function colocarDadosNaTela(dados) {
    console.log(dados);
    document.querySelector(".cidade").innerHTML = "Tempo em " + dados.name;
    document.querySelector(".temp").innerHTML = Math.floor(dados.main.temp) + "°C";
    document.querySelector(".texto-previsao").innerHTML = dados.weather[0].description;
    document.querySelector(".umidade").innerHTML = "Umidade " + Math.floor(dados.main.humidity) + "%";
    document.querySelector(".img-previsao").src = `https://openweathermap.org/img/wn/${dados.weather[0].icon}.png`;
}

async function buscarCidade(cidade) {
    const dados = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${key}&lang=pt_br&units=metric`
    ).then((resposta) => resposta.json());

    colocarDadosNaTela(dados);
    salvarNoHistorico(dados);
}

function cliqueiNoBotao() {
    const cidade = document.querySelector(".input-cidade").value;
    if (cidade.trim() === "") return;
    buscarCidade(cidade);
}

function salvarNoHistorico(dados) {
    const historico = JSON.parse(localStorage.getItem("historicoClima")) || [];

    const registro = {
        cidade: dados.name,
        temperatura: Math.floor(dados.main.temp) + "°C",
        descricao: dados.weather[0].description,
        umidade: Math.floor(dados.main.humidity) + "%",
        data: new Date().toLocaleString("pt-BR")
    };

    historico.push(registro);
    localStorage.setItem("historicoClima", JSON.stringify(historico));
}
