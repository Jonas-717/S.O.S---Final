let doencaPreExistente = document.getElementById("checkbox");

// Objeto do usuário
let user_cadastro = {};

function coletar() {

    user_cadastro = {

        nome_user: document.getElementById("name").value,

        email_user: document.getElementById("email").value,

        senha_user: document.getElementById("password").value,

        data_nasc_user: document.getElementById("date").value,

        sexo_user: document.getElementById("sexo").value
    };

    // Salva no navegador
    localStorage.setItem("usuario", JSON.stringify(user_cadastro));

    console.log(user_cadastro);
}

function mudarTelas(event) {

    event.preventDefault();

    coletar();

    if (doencaPreExistente.checked) {

        window.location.href = "registro(pre).html";

    } else {

        window.location.href = "aviso.html";
    }
}