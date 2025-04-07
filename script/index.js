document.addEventListener("DOMContentLoaded", function () {
    const mudartema = document.getElementById("mudartema");
    const temaicone = document.getElementById("temaicone");

    // Verifica se já existe um tema salvo
    const temaSalvo = localStorage.getItem("tema");
    if (temaSalvo === "dark") {
        document.body.classList.add("dark");
        temaicone.classList.replace("fa-moon", "fa-sun");
        temaicone.style.color = "yellow";
    }

    // Evento de clique para alternar tema
    mudartema.addEventListener("click", function () {
        document.body.classList.toggle("dark");

        if (document.body.classList.contains("dark")) {
            temaicone.classList.replace("fa-moon", "fa-sun");
            temaicone.style.color = "yellow";
            localStorage.setItem("tema", "dark");
        } else {
            temaicone.classList.replace("fa-sun", "fa-moon");
            temaicone.style.color = "black";
            localStorage.setItem("tema", "light");
        }
    });
});
