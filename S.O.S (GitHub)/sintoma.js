function registrarSintomas(event) {

    event.preventDefault();

    let sintomasMarcados = [];

    for (let i = 1; i <= 15; i++) {

        let checkbox = document.getElementById("doenca" + i);

        if (checkbox && checkbox.checked) {

            sintomasMarcados.push(checkbox.nextElementSibling.textContent);
        }
    }

    localStorage.setItem("sintomas", JSON.stringify(sintomasMarcados));

    window.location.href = "sintomas2.html";
}