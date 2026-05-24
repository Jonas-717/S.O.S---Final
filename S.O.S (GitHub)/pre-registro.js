function coletar(event) {
    event.preventDefault()

    let doencaPreExistente

    let doencaPreExistenteLista = {
        doencaPre1: document.getElementById("1"),
        doencaPre2: document.getElementById("2"),
        doencaPre3: document.getElementById("3"),
        doencaPre4: document.getElementById("4"),
        doencaPre5: document.getElementById("5"),
        doencaPre6: document.getElementById("6")
    }

    if (doencaPreExistenteLista.doencaPre1.checked) {
        doencaPreExistente = "Diabetes"
    } else if (doencaPreExistenteLista.doencaPre2.checked) {
        doencaPreExistente = "Doença cardíaca"
    } else if (doencaPreExistenteLista.doencaPre3.checked) {
        doencaPreExistente = "Asma"
    } else if (doencaPreExistenteLista.doencaPre4.checked) {
        doencaPreExistente = "Doença renal"
    } else if (doencaPreExistenteLista.doencaPre5.checked) {
        doencaPreExistente = "Imunosupressão"
    } else if (doencaPreExistenteLista.doencaPre6.checked) {
        doencaPreExistente = "Não listada"
    }

    // Recupera o objeto já salvo no localStorage
    let usuarioSalvo = JSON.parse(localStorage.getItem("usuario"))

    // Adiciona a nova informação ao objeto existente
    usuarioSalvo.doenca_user = doencaPreExistente

    // Salva o objeto atualizado de volta no localStorage
    localStorage.setItem("usuario", JSON.stringify(usuarioSalvo))

    console.log("Usuário atualizado: ", usuarioSalvo)

    window.location = "aviso.html"
}