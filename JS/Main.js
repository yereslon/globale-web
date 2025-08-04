document.addEventListener("DOMContentLoaded", function() {
    const loader = document.getElementById('loader');
    const loaderLogo = document.querySelector('.loader__logo');
    const body = document.body;
    const header = document.querySelector('.header');

    // Si no encontramos los elementos, no hacemos nada.
    if (!loader || !header) {
        console.error("No se encontró el loader o el header en la página.");
        return;
    }

    // Bloqueamos el scroll al inicio
    body.classList.add('loading');

    const hideLoader = () => {
        // Si ya se ocultó, no hacemos nada más
        if (loader.classList.contains('hidden')) return;

        loaderLogo.classList.add('fade-out');
        loader.classList.add('hidden');
        body.classList.remove('loading');
        header.classList.add('visible'); // Hacemos visible el header
    };

    // La animación se dispara con el primer scroll
    window.addEventListener('scroll', hideLoader, { once: true });

    // O se dispara sola después de 5 segundos
    setTimeout(hideLoader, 5000);
});