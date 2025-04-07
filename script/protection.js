document.addEventListener("contextmenu", function (e) {
  e.preventDefault();
});

// Bloqueia algumas teclas de atalho comuns para abrir o dev tools
document.addEventListener("keydown", function (e) {
  if (
    e.key === "F12" || 
    (e.ctrlKey && e.shiftKey && e.key === "I") || 
    (e.ctrlKey && e.key === "U") || 
    (e.ctrlKey && e.shiftKey && e.key === "J")
  ) {
    e.preventDefault();
  }
});