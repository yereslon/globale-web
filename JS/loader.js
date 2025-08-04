document.addEventListener('DOMContentLoaded', function() {
    const loader = document.getElementById('loader');
    const loaderLogo = document.querySelector('.loader__logo');
    const body = document.body;

    // Si no hay loader, no hacemos nada.
    if (!loader) return;

    body.classList.add('loading');

    // Función para mostrar el header suavemente
    const showHeader = () => {
        const header = document.querySelector('.header');
        if (header) {
            header.classList.add('visible');
        }
    };

    // Función para ocultar el loader
    const hideLoader = () => {
        if (loader.classList.contains('hidden')) return;

        loaderLogo.classList.add('fade-out');
        loader.classList.add('hidden');
        body.classList.remove('loading');
        
        // Mostramos el header 300ms después de que la cortina empieza a subir
        setTimeout(showHeader, 300);
    };

    // Escuchamos el evento de scroll. Se ejecutará UNA SOLA VEZ.
    window.addEventListener('scroll', hideLoader, { once: true });

    // Si el usuario no hace scroll en 3 segundos, la animación se dispara sola.
    setTimeout(hideLoader, 1000);
});