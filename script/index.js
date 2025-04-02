document.addEventListener("DOMContentLoaded", function () {
    const mudartema = document.getElementById("mudartema");
    const temaicone = document.getElementById("temaicone");

    mudartema.addEventListener("click", function () {
        document.body.classList.toggle("dark");

        if (document.body.classList.contains("dark")) {
            temaicone.classList.replace("fa-moon", "fa-sun"); // Lua → Sol
            temaicone.style.color = "yellow"; // Sol amarelo
        } else {
            temaicone.classList.replace("fa-sun", "fa-moon"); // Sol → Lua
            temaicone.style.color = "black"; // Lua preta
        }
    });
})