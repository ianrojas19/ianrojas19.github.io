$(document).ready(function () {
    // Animaciones para el cambio de temas en desktop
    $('#switch-themes-dsk').click(function (event) {
        event.stopPropagation();
        let themes = $('#theme-options');

        if (themes.css('transform') === 'scale(1)') {
            themes.css('opacity', '0');
            setTimeout(function () {
                themes.css('transform', 'scale(0)');
            }, 100);
        } else {
            themes.css('opacity', '1');
            themes.css('transform', 'scale(1)');
        }
    });

    $(document).click(function () {
        let themes = $('#theme-options');
        themes.css('opacity', '0');
        setTimeout(function () {
            themes.css('transform', 'scale(0)');
        }, 100);
    });

    // Animacion para estilo del header al scrollear
    const header = $('header');

    $(document).scroll(function () {
        // Obtener la cantidad de desplazamiento vertical
        let scrollTop = $(window).scrollTop();

        if (scrollTop > 100) {
            header.addClass('sexo');
        } else {
            header.removeClass('sexo');
        }
    });
});
