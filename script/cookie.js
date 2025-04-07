function setCookie(name, value, days) {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = name + '=' + encodeURIComponent(value) + '; expires=' + expires + '; path=/';
}

function getCookie(name) {
  return document.cookie.split('; ').find(row => row.startsWith(name + '='))?.split('=')[1];
}

window.addEventListener('load', () => {
  const consent = getCookie('popup_cookie');
  const popup = document.getElementById('cookie-popup');

  if (!consent) {
    // Agora sim: só exibe se o cookie não existir
    popup.style.display = 'flex';

    const btn = document.getElementById('accept-btn');
    const box = document.querySelector('.popup-box');
    const check = document.querySelector('.popup-check');

    btn.addEventListener('click', () => {
      box.classList.add('hidden');
      check.classList.remove('hidden');
      setCookie('popup_cookie', 'accepted', 36500);

      setTimeout(() => {
        popup.style.display = 'none';
      }, 3000); // tempo para ler o "Obrigado"
    });
  } else {
    popup.style.display = 'none'; // Garante que nunca apareça se já aceitou
  }
});
