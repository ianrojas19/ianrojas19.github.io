//JS DE LOADER PARA CARGAR EL CONTENIDO DE LA PAGINA

document.onreadystatechange = function () {
    if (document.readyState === "complete") {
        // Cuando la página está completamente cargada, oculta el loader
        setTimeout(function () {
            document.querySelector(".loader-wrapper").style.display = "none";
            document.querySelector(".load-container").style.opacity = "1";
        },100);
    }
};