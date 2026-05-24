function autenticar(event) {

    event.preventDefault();

    // Pega os dados do localStorage
    let usuarioSalvo = JSON.parse(localStorage.getItem("usuario"));

    // Dados digitados pelo usuário
    let user_login = {

        email_login: document.getElementById("email").value,

        senha_login: document.getElementById("password").value
    };

    // Verifica se existe cadastro
    if (usuarioSalvo == null) {

        alert("Nenhum usuário cadastrado!");

        return;
    }

    // Verificação do login
    if (
        user_login.email_login == usuarioSalvo.email_user &&
        user_login.senha_login == usuarioSalvo.senha_user
    ) {

        window.location.href = "inicial.html";

    } else {

        alert("Informações de login erradas!");
    }
}