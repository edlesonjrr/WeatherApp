window.onload = () => {
    const container = document.getElementById("historicoContainer");
    const historico = JSON.parse(localStorage.getItem("historicoClima")) || [];

    if (historico.length === 0) {
        container.innerHTML = "<p>Nenhum histórico encontrado.</p>";
        return;
    }

    historico.forEach((item) => {
        const div = document.createElement("div");
        div.classList.add("registro");
        div.innerHTML = `
            <strong>${item.cidade}</strong><br>
            Temperatura: ${item.temperatura}<br>
            Clima: ${item.descricao}<br>
            Umidade: ${item.umidade}<br>
            <small>${item.data}</small>
        `;
        container.appendChild(div);
    });

    document.getElementById("btnPdf").addEventListener("click", gerarPDF);
};

function gerarPDF() {
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF();
    const historico = JSON.parse(localStorage.getItem("historicoClima")) || [];

    pdf.setFontSize(14);
    pdf.text("Histórico de Pesquisas - WeatherApp", 10, 10);

    let y = 25;
    historico.forEach((item, i) => {
        pdf.text(
            `${i + 1}. ${item.cidade} - ${item.temperatura} | ${item.descricao} | Umidade: ${item.umidade} | ${item.data}`,
            10,
            y
        );
        y += 10;
        if (y > 270) {
            pdf.addPage();
            y = 20;
        }
    });

    pdf.save("historico_clima.pdf");
}

window.onload = () => {
    const container = document.getElementById("historicoContainer");
    const historico = JSON.parse(localStorage.getItem("historicoClima")) || [];

    if (historico.length === 0) {
        container.innerHTML = "<p>Nenhum histórico encontrado.</p>";
        return;
    }

    historico.forEach((item) => {
        const div = document.createElement("div");
        div.classList.add("registro");
        div.innerHTML = `
            <strong>${item.cidade}</strong><br>
            Temperatura: ${item.temperatura}<br>
            Clima: ${item.descricao}<br>
            Umidade: ${item.umidade}<br>
            <small>${item.data}</small>
        `;
        container.appendChild(div);
    });

    document.getElementById("btnPdf").addEventListener("click", gerarPDF);
    document.getElementById("btnLimpar").addEventListener("click", limparHistorico);
};

function gerarPDF() {
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF();
    const historico = JSON.parse(localStorage.getItem("historicoClima")) || [];

    pdf.setFontSize(14);
    pdf.text("Histórico de Pesquisas - WeatherApp", 10, 10);

    let y = 25;
    historico.forEach((item, i) => {
        pdf.text(
            `${i + 1}. ${item.cidade} - ${item.temperatura} | ${item.descricao} | Umidade: ${item.umidade} | ${item.data}`,
            10,
            y
        );
        y += 10;
        if (y > 270) {
            pdf.addPage();
            y = 20;
        }
    });

    pdf.save("historico_clima.pdf");
}

function limparHistorico() {
    localStorage.removeItem("historicoClima");

    const container = document.getElementById("historicoContainer");
    container.innerHTML = "<p>Histórico limpo com sucesso!</p>";

    mostrarMensagem("Histórico limpo com sucesso!");
}

// Exibe mensagem animada de confirmação
function mostrarMensagem(texto) {
    let msg = document.querySelector(".mensagem");
    if (!msg) {
        msg = document.createElement("p");
        msg.classList.add("mensagem");
        document.querySelector(".container").appendChild(msg);
    }

    msg.textContent = texto;
    msg.classList.add("visivel");
    setTimeout(() => msg.classList.remove("visivel"), 2500);
}


