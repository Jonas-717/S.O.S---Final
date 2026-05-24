
// ── Nome do usuário ───────────────────────────

const usuario = JSON.parse(localStorage.getItem("usuario")) || {};
const elNome  = document.getElementById("user_name");

if (elNome) elNome.textContent = usuario.nome_user || "Usuário";

// ── Última avaliação ──────────────────────────

const historico = JSON.parse(localStorage.getItem("historico")) || [];

const elStatus   = document.getElementById("ultima-status");
const elDescricao = document.getElementById("ultima-descricao");
const elIndicacao = document.getElementById("ultima-indicacao");
const elDetalhes  = document.getElementById("ultima-detalhes");

if (historico.length === 0) {

    // Sem registros ainda
    if (elStatus)    elStatus.textContent   = "Nenhuma avaliação ainda";
    if (elDescricao) elDescricao.textContent = "Faça seu primeiro registro para ver os resultados aqui.";
    if (elIndicacao) elIndicacao.textContent = "";
    if (elDetalhes)  elDetalhes.style.display = "none";

} else {

    // Pega o registro mais recente (último do array)
    const ultimo = historico[historico.length - 1];

    // ── Define cor pelo status ──
    let cor   = "#3b6d11";

    if (ultimo.resultado === "Busque um Médico") {
        cor   = "#b03030";
    } else if (ultimo.resultado === "Observação") {
        cor   = "#854f0b";
    }

    // ── Textos de descrição e indicação ──
    const textos = {
        "Busque um Médico": {
            descricao: "Seus sintomas indicam uma condição que requer avaliação médica imediata. Não ignore esses sinais.",
            indicacao: "Dirija-se ao pronto-socorro ou ligue para o SAMU (192) o mais rápido possível."
        },
        "Observação": {
            descricao: "Seus sintomas requerem atenção. Monitore a evolução e esteja atento a pioras.",
            indicacao: "Procure uma UBS ou médico de confiança em breve. Se os sintomas piorarem, busque atendimento de urgência."
        },
        "Cuidados em Casa": {
            descricao: "Seus sintomas são leves e podem ser monitorados em casa.",
            indicacao: "Mantenha repouso, hidratação e alimentação adequada. Se os sintomas persistirem por mais de 3 dias ou piorarem, procure um médico."
        }
    };

    const texto = textos[ultimo.resultado] || textos["Cuidados em Casa"];

    // ── Preenche os elementos ──
    if (elStatus) {
        elStatus.textContent = `${ultimo.resultado}`;
        elStatus.style.color = cor;
    }

    if (elDescricao) elDescricao.textContent = texto.descricao;
    if (elIndicacao) elIndicacao.textContent = `${texto.indicacao}`;

    // ── Botão Detalhes — abre avaliação.html com os dados do último registro ──
    if (elDetalhes) {
        elDetalhes.addEventListener("click", () => {
            localStorage.setItem("visualizandoRegistro", JSON.stringify(ultimo));
            window.location.href = "avaliação.html";
        });
    }
}