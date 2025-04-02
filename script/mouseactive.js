const moonIcon = document.querySelector(".toggle-dark-mode i"); // Ícone da lua
const header = document.querySelector("header"); // O header
const body = document.body; // Para verificar o modo escuro

document.addEventListener("mousemove", (e) => {
    // Verifica se está no modo claro (ou seja, se a classe "dark" NÃO está no body)
    if (!body.classList.contains("dark")) {
        const moonRect = moonIcon.getBoundingClientRect(); // Posição da lua
        const headerRect = header.getBoundingClientRect(); // Posição do header

        // Verifica se a lua está sobre o header
        const isOverHeader = 
            moonRect.bottom > headerRect.top &&
            moonRect.top < headerRect.bottom &&
            moonRect.right > headerRect.left &&
            moonRect.left < headerRect.right;

        if (isOverHeader) {
            header.style.backgroundColor = "#ddd"; // Cor mais clara no modo claro
        } else {
            header.style.backgroundColor = ""; // Volta ao normal
        }
    } else {
        header.style.backgroundColor = ""; // Mantém o normal no modo escuro
    }
});
