
// ── Helpers visuais ──────────────────────────

function obterVisualStatus(resultado) {
    if (resultado === "Busque um Médico") return { cor: "#e98080" };
    if (resultado === "Observação")       return { cor: "#ffdda2" };
    return                                       { cor: "#7affa2" };
}

// ── Renderiza a lista de registros no HTML ────

function renderizarHistorico() {

    const historico = JSON.parse(localStorage.getItem("historico")) || [];
    const container = document.querySelector(".conteudo") || document.body;

    // Remove os cards placeholder estáticos do HTML
    document.querySelectorAll(".bicho-retangular").forEach(card => card.remove());

    // ── Sem registros ──
    if (historico.length === 0) {
        const vazio         = document.createElement("p");
        vazio.textContent   = "Nenhum registro encontrado.";
        vazio.style.cssText = "text-align:center; margin-top:40px; font-size:20px; color:#666;";
        container.appendChild(vazio);
        return;
    }

    // ── Cabeçalho da lista ──
    const cabecalho         = document.createElement("p");
    cabecalho.textContent   = `${historico.length} registro(s) no total`;
    cabecalho.style.cssText = "text-align:center; font-size:15px; color:#888; margin:0 0 16px;";
    container.appendChild(cabecalho);

    // ── Renderiza do mais recente para o mais antigo ──
    const historicoOrdenado = [...historico].reverse();

    historicoOrdenado.forEach((registro, index) => {

        const { cor }  = obterVisualStatus(registro.resultado);
        const numero          = historicoOrdenado.length - index; // número cronológico real
        const sintomasTexto   = registro.sintomas.length > 0
            ? registro.sintomas.join(" · ")
            : "Nenhum sintoma registrado";
        const doencaTexto     = registro.doenca && registro.doenca !== "Não listada"
            ? `${registro.doenca}`
            : "Sem doença pré-existente";

        const card            = document.createElement("div");
        card.className        = "bicho-retangular";

        // Sobrescreve altura fixa para o card crescer com o conteúdo
        card.style.cssText = "height: auto; padding: 24px 30px; box-sizing: border-box;";

        card.innerHTML = `
            <p style="
                font-size: 18px;
                color: #d4e0cc;
                margin: 0 0 6px 0;
                text-align: left;
                letter-spacing: 1px;
            ">
                Registro #${numero} &nbsp;·&nbsp; ${registro.data} às ${registro.hora}
            </p>

            <p style="
                font-size: 42px;
                color: ${cor};
                margin: 0 0 10px 0;
                text-align: left;
                letter-spacing: 2px;
            ">
                ${registro.resultado}
            </p>

            <p style="
                font-size: 22px;
                color: #d4e0cc;
                margin: 0 0 4px 0;
                text-align: left;
            ">
                ${doencaTexto}
            </p>

            <p style="
                font-size: 20px;
                color: #d4e0cc;
                margin: 0 0 12px 0;
                text-align: left;
            ">
                Intensidade: ${registro.intensidade} &nbsp;·&nbsp; Duração: ${registro.duracao}
            </p>

            <p style="
                font-size: 26px;
                color: #F3EFE3;
                margin: 0 0 20px 0;
                text-align: left;
                line-height: 36px;
                letter-spacing: 1px;
            ">
                ${sintomasTexto}
            </p>

            <button onclick="verDetalhes(${registro.id})" style="
                padding: 14px 30px;
                background-color: #5a6e52;
                color: white;
                border: 1px solid #F3EFE3;
                border-radius: 8px;
                font-size: 22px;
                cursor: pointer;
                display: block;
                margin-left: auto;
            ">
                Ver detalhes >
            </button>
        `;

        container.appendChild(card);
    });
}

// ── Ver detalhes — SEM sobrescrever a sessão atual ──
//    Salva o registro numa chave separada "visualizandoRegistro"
//    O avaliacao.js lê essa chave e sabe que é modo visualização,
//    não salva novamente no histórico e não apaga dados da sessão

function verDetalhes(id) {

    const historico = JSON.parse(localStorage.getItem("historico")) || [];
    const registro  = historico.find(r => r.id === id);

    if (!registro) return;

    // Chave isolada — não interfere em sintomas, intensidade, duracao ou usuario
    localStorage.setItem("visualizandoRegistro", JSON.stringify(registro));

    window.location.href = "avaliação.html";
}

document.addEventListener("DOMContentLoaded", renderizarHistorico);
