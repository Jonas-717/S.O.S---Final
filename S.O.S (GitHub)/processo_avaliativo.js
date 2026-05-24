// ─────────────────────────────────────────────
//  S.O.S — Lógica de Avaliação
// ─────────────────────────────────────────────

// ── Classificação base dos sintomas ──────────

const SINTOMAS_URGENTE = [
    "Dificuldade Respiratória",
    "Dor Torácica",
    "Alteração de Consciência",
    "Convulsão",
    "Rigidez na Nuca"
];

const SINTOMAS_OBSERVACAO = [
    "Febre",
    "Dor de Cabeça",
    "Tontura",
    "Vômitos",
    "Reação Alérgica",
    "Dor Abdominal"
];

const SINTOMAS_LEVE = [
    "Coriza e Espirros",
    "Dores Musculares",
    "Dor de Garganta",
    "Fadiga"
];

// ── Regras de escalada para "Busque um médico"
//    dentro dos sintomas de Observação ─────────

function sintomaObservacaoEscalaUrgente(sintoma, intensidade, duracao, sintomasMarcados) {

    if (sintoma === "Febre") {
        return intensidade === "Intensa" && (duracao === "Horas" || duracao === "Dias" || duracao === "Semanas");
    }

    if (sintoma === "Dor de Cabeça") {
        return intensidade === "Intensa";
    }

    if (sintoma === "Vômitos") {
        return duracao === "Dias" || duracao === "Semanas";
    }

    if (sintoma === "Reação Alérgica") {
        return sintomasMarcados.includes("Dificuldade Respiratória");
    }

    if (sintoma === "Dor Abdominal") {
        return intensidade === "Intensa" || sintomasMarcados.includes("Febre");
    }

    return false;
}

// ── Regras de escalada para portadores crônicos ──

const REGRAS_CRONICO = {

    "Doença cardíaca": [
        { sintoma: "Dificuldade Respiratória", intensidade: null,       duracao: null      },
        { sintoma: "Dor Torácica",             intensidade: null,       duracao: null      },
        { sintoma: "Fadiga",                   intensidade: "Moderado", duracao: "Horas"   },
        { sintoma: "Tontura",                  intensidade: "Moderado", duracao: "Minutos" },
        { sintoma: "Vômitos",                  intensidade: "Moderado", duracao: "Horas"   }
    ],

    "Diabetes": [
        { sintoma: "Febre",                    intensidade: "Leve",     duracao: "Horas"   },
        { sintoma: "Vômitos",                  intensidade: "Leve",     duracao: "Horas"   },
        { sintoma: "Alteração de Consciência", intensidade: null,       duracao: null      },
        { sintoma: "Fadiga",                   intensidade: "Intensa",  duracao: "Horas"   },
        { sintoma: "Tontura",                  intensidade: "Moderado", duracao: "Horas"   },
        { sintoma: "Dor Abdominal",            intensidade: "Moderado", duracao: "Horas"   }
    ],

    "Asma": [
        { sintoma: "Dificuldade Respiratória", intensidade: null,       duracao: null      },
        { sintoma: "Coriza e Espirros",        intensidade: "Moderado", duracao: "Dias"    },
        { sintoma: "Fadiga",                   intensidade: "Moderado", duracao: "Horas"   }
    ],

    "Imunosupressão": [
        { sintoma: "Febre",                    intensidade: "Leve",     duracao: "Minutos" },
        { sintoma: "Dor Abdominal",            intensidade: "Leve",     duracao: "Minutos" },
        { sintoma: "Vômitos",                  intensidade: "Leve",     duracao: "Minutos" },
        { sintoma: "Tontura",                  intensidade: "Leve",     duracao: "Minutos" },
        { sintoma: "Fadiga",                   intensidade: "Moderado", duracao: "Horas"   },
        { sintoma: "Reação Alérgica",          intensidade: null,       duracao: null      }
    ],

    "Doença renal": [
        { sintoma: "Vômitos",                  intensidade: "Moderado", duracao: "Horas"   },
        { sintoma: "Fadiga",                   intensidade: "Intensa",  duracao: "Dias"    },
        { sintoma: "Dor Abdominal",            intensidade: "Moderado", duracao: "Horas"   },
        { sintoma: "Tontura",                  intensidade: "Moderado", duracao: "Horas"   },
        { sintoma: "Alteração de Consciência", intensidade: null,       duracao: null      }
    ]
};

// ── Hierarquia de intensidade e duração ──────

const NIVEL_INTENSIDADE = { "Leve": 1, "Moderado": 2, "Intensa": 3 };
const NIVEL_DURACAO     = { "Minutos": 1, "Horas": 2, "Dias": 3, "Semanas": 4 };

function atingeLimiar(intensidadeUsuario, duracaoUsuario, limiarIntensidade, limiarDuracao) {
    const intensidadeOk = limiarIntensidade === null ||
        (NIVEL_INTENSIDADE[intensidadeUsuario] || 0) >= (NIVEL_INTENSIDADE[limiarIntensidade] || 0);

    const duracaoOk = limiarDuracao === null ||
        (NIVEL_DURACAO[duracaoUsuario] || 0) >= (NIVEL_DURACAO[limiarDuracao] || 0);

    return intensidadeOk && duracaoOk;
}

function sintomaEscalaPorCronico(sintoma, intensidade, duracao, doenca) {
    if (!doenca || doenca === "Não listada") return false;

    const regras = REGRAS_CRONICO[doenca];
    if (!regras) return false;

    for (const regra of regras) {
        if (regra.sintoma === sintoma) {
            return atingeLimiar(intensidade, duracao, regra.intensidade, regra.duracao);
        }
    }

    return false;
}

// ── Função principal de classificação ────────

function classificarUsuario(sintomas, intensidade, duracao, doenca) {

    let resultado           = "Cuidados em Casa";
    let sintomasUrgentes    = [];
    let sintomasObservacao  = [];
    let sintomasLeves       = [];

    for (const sintoma of sintomas) {

        if (SINTOMAS_URGENTE.includes(sintoma)) {
            sintomasUrgentes.push(sintoma);
            resultado = "Busque um Médico";
            continue;
        }

        if (SINTOMAS_OBSERVACAO.includes(sintoma)) {
            const escalaPorLogica  = sintomaObservacaoEscalaUrgente(sintoma, intensidade, duracao, sintomas);
            const escalaPorCronico = sintomaEscalaPorCronico(sintoma, intensidade, duracao, doenca);

            if (escalaPorLogica || escalaPorCronico) {
                sintomasUrgentes.push(sintoma);
                resultado = "Busque um Médico";
            } else {
                sintomasObservacao.push(sintoma);
                if (resultado !== "Busque um Médico") resultado = "Observação";
            }
            continue;
        }

        if (SINTOMAS_LEVE.includes(sintoma)) {
            const escalaPorCronico = sintomaEscalaPorCronico(sintoma, intensidade, duracao, doenca);

            if (escalaPorCronico) {
                sintomasUrgentes.push(sintoma);
                resultado = "Busque um Médico";
            } else {
                sintomasLeves.push(sintoma);
            }
            continue;
        }
    }

    return { resultado, sintomasUrgentes, sintomasObservacao, sintomasLeves };
}

// ── Textos de descrição e indicação por status ──

function obterTextos(resultado) {

    if (resultado === "Busque um Médico") {
        return {
            status:    "Busque um Médico",
            descricao: "Seus sintomas indicam uma condição que requer avaliação médica imediata. Não ignore esses sinais.",
            indicacao: "Dirija-se ao pronto-socorro ou ligue para o SAMU (192) o mais rápido possível."
        };
    }

    if (resultado === "Observação") {
        return {
            status:    "Observação",
            descricao: "Seus sintomas requerem atenção. Monitore a evolução e esteja atento a pioras.",
            indicacao: "Procure uma UBS ou médico de confiança em breve. Se os sintomas piorarem, busque atendimento de urgência."
        };
    }

    return {
        status:    "Cuidados em Casa",
        descricao: "Seus sintomas são leves e podem ser monitorados em casa.",
        indicacao: "Mantenha repouso, hidratação e alimentação adequada. Se os sintomas persistirem por mais de 3 dias ou piorarem, procure um médico."
    };
}

// ── Salva o registro no histórico ────────────

function salvarNoHistorico(sintomas, intensidade, duracao, doenca, resultado) {

    const historico = JSON.parse(localStorage.getItem("historico")) || [];

    const novoRegistro = {
        id:         Date.now(),
        data:       new Date().toLocaleDateString("pt-BR"),
        hora:       new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }),
        sintomas,
        intensidade,
        duracao,
        doenca,
        resultado
    };

    historico.push(novoRegistro);
    localStorage.setItem("historico", JSON.stringify(historico));
}

// ── Renderiza o resultado no HTML ─────────────

function renderizarAvaliacao() {

    // ── Verifica se veio do histórico (visualização) ou de uma nova avaliação ──
    const registroVisualizado = JSON.parse(localStorage.getItem("visualizandoRegistro"));
    const modoVisualizacao    = registroVisualizado !== null;

    let sintomas, intensidade, duracao, doenca;

    if (modoVisualizacao) {
        // Modo visualização: lê da chave separada, não toca na sessão atual
        sintomas    = registroVisualizado.sintomas    || [];
        intensidade = registroVisualizado.intensidade || "Leve";
        duracao     = registroVisualizado.duracao     || "Minutos";
        doenca      = registroVisualizado.doenca      || "Não listada";
    } else {
        // Modo avaliação normal: lê da sessão atual
        sintomas    = JSON.parse(localStorage.getItem("sintomas")) || [];
        intensidade = localStorage.getItem("intensidade")           || "Leve";
        duracao     = localStorage.getItem("duracao")               || "Minutos";
        const usuario = JSON.parse(localStorage.getItem("usuario")) || {};
        doenca      = usuario.doenca_user                           || "Não listada";
    }

    const { resultado, sintomasUrgentes, sintomasObservacao, sintomasLeves } =
        classificarUsuario(sintomas, intensidade, duracao, doenca);

    const textos = obterTextos(resultado);

    const elStatus    = document.getElementById("status");
    const elDescricao = document.getElementById("desc");
    const elIndicacao = document.getElementById("indicacao");

    if (elStatus)    elStatus.textContent    = textos.status;
    if (elDescricao) elDescricao.textContent = textos.descricao;
    if (elIndicacao) elIndicacao.textContent = textos.indicacao;

    // Salva no histórico apenas se for avaliação nova (não visualização)
    if (!modoVisualizacao) {
        const jaRegistrado = localStorage.getItem("avaliacaoRegistrada");
        if (!jaRegistrado) {
            salvarNoHistorico(sintomas, intensidade, duracao, doenca, resultado);
            localStorage.setItem("avaliacaoRegistrada", "true");
        }
    }

    // Ao clicar em "Entendi", limpa os dados temporários da sessão
    const btnEntendi = document.querySelector(".input-button");
    if (btnEntendi) {
        btnEntendi.addEventListener("click", () => {
            localStorage.removeItem("avaliacaoRegistrada");
            localStorage.removeItem("sintomas");
            localStorage.removeItem("intensidade");
            localStorage.removeItem("duracao");
            localStorage.removeItem("visualizandoRegistro"); // limpa visualização também
        });
    }

    console.log("Modo:", modoVisualizacao ? "Visualização de histórico" : "Nova avaliação");
    console.log("Sintomas:", sintomas);
    console.log("Intensidade:", intensidade);
    console.log("Duração:", duracao);
    console.log("Doença:", doenca);
    console.log("Resultado:", resultado);
}

document.addEventListener("DOMContentLoaded", renderizarAvaliacao);