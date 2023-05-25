let label = document.getElementById('onoff-nav');
let nav = document.getElementById('ul-navigation');
let body = document.body;

const togglenav = () => {
  if (label.checked) { // Corregido: Utilizar label.checked en lugar de label.click()
    nav.style.clipPath = 'polygon(0 0, 100% 0, 100% 100%, 0 100%)';
    body.style.backgroundColor = 'black';
  } else {
    nav.style.clipPath = 'polygon(0 0, 100% 0, 100% 0, 0 0)';
    body.style.backgroundColor = '';
  }
}

label.addEventListener("click", togglenav); // Corregido: Usar label.addEventListener en lugar de checkbox.addEventListener
