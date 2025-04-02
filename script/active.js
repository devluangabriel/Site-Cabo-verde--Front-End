document.addEventListener("DOMContentLoaded", function () {
  const toggleElements = document.querySelectorAll(".toggle-info");

  toggleElements.forEach(element => {
      element.addEventListener("click", function () {
          const topico = this.closest(".topico");
          topico.classList.toggle("active");
      });
  });
});