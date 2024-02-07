document.getElementById('switch-themes-dsk').addEventListener('click', function (event) {
    event.stopPropagation(); // Evitar que el clic en el botón propague al documento

    let themes = document.getElementById('theme-options');

    if (themes.style.transform === 'scale(1)') {
        themes.style.opacity = '0';
        setTimeout(function () {
            themes.style.transform = 'scale(0)';
        }, 100);
    } else {
        themes.style.opacity = '1';
        themes.style.transform = 'scale(1)';
    }
});

// Agregar un evento de clic al documento
document.addEventListener('click', function (event) {
    let themes = document.getElementById('theme-options');
    let targetElement = event.target; // Elemento en el que se hizo clic

    // Verificar si el elemento en el que se hizo clic no es el menú ni el botón de cambiar temas
    if (targetElement !== themes && targetElement.id !== 'switch-themes-dsk') {
        themes.style.opacity = '0';
        setTimeout(function () {
            themes.style.transform = 'scale(0)';
        }, 100);
    }
});
