function registrarDetalhes(event) {

    event.preventDefault();

    // Intensidade
    let intensidade = "";

    if (document.getElementById("intensidade1").checked) intensidade = "Leve";
    else if (document.getElementById("intensidade2").checked) intensidade = "Moderado";
    else if (document.getElementById("intensidade3").checked) intensidade = "Intensa";

    // Duração
    let duracao = "";

    if (document.getElementById("duracao1").checked) duracao = "Minutos";
    else if (document.getElementById("duracao2").checked) duracao = "Horas";
    else if (document.getElementById("duracao3").checked) duracao = "Dias";
    else if (document.getElementById("duracao4").checked) duracao = "Semanas";

    localStorage.setItem("intensidade", intensidade);
    localStorage.setItem("duracao", duracao);

    window.location.href = "avaliação.html";
}