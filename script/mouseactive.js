console.clear();

const moonIcon = document.querySelector("#temaicone"); // Ícone da lua
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
            moonIcon.style.color = isOverHeader ? "#bbb" : ""; 
        } else {
            moonIcon.style.color = ""; // Mantém a cor normal no modo escuro
        }
    } else {
        moonIcon.style.color = ""; // Mantém a cor normal no modo escuro
    }
});
