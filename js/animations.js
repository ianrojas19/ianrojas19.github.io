document.getElementById('switch-themes-dsk').addEventListener('click', function () {
    let themes = document.getElementById('theme-options');

    if (themes.style.transform === 'scale(1)') {
        themes.style.opacity = '0';
        setTimeout(function () {
            themes.style.transform = 'scale(0)';
        },100)
    }
    else {
        themes.style.opacity = '1';
        themes.style.transform = 'scale(1)';
    }
});
