document.addEventListener('DOMContentLoaded', () => {
    const counters = document.querySelectorAll('.stat-card__number');
    const statsSection = document.querySelector('.stats__grid');

    // Si no existe la sección de estadísticas, no hacemos nada.
    if (!statsSection) return;

    // Función que anima el contador
    const animateCounters = () => {
        counters.forEach(counter => {
            // Evita que la animación se ejecute de nuevo si ya lo hizo
            if (counter.dataset.animated) return;
            counter.dataset.animated = "true";

            const target = +counter.getAttribute('data-target');
            let count = 0;
            const duration = 2000; // Duración de la animación en milisegundos (2 segundos)
            
            // Calculamos el incremento para que todos terminen al mismo tiempo
            const increment = target / (duration / 16); // 16ms es aprox. un frame
            
            const updateCount = () => {
                count += increment;
                if (count < target) {
                    counter.innerText = Math.ceil(count);
                    requestAnimationFrame(updateCount);
                } else {
                    counter.innerText = target;
                }
            };
            requestAnimationFrame(updateCount);
        });
    };

    // Usamos IntersectionObserver para detectar cuándo la sección es visible
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            // Si la sección entra en la pantalla
            if (entry.isIntersecting) {
                animateCounters();
                // Dejamos de observar para que la animación solo ocurra una vez
                observer.unobserve(statsSection);
            }
        });
    }, {
        threshold: 0.5 // La animación se dispara cuando el 50% de la sección es visible
    });

    // Empezamos a observar la sección
    observer.observe(statsSection);
});