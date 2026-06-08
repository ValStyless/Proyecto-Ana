// Lógica de Scroll, Lazy Load y ScrollReveal (AOS)
document.addEventListener('DOMContentLoaded', () => {
    // 1. Inicialización de Efectos AOS
    if (typeof AOS !== 'undefined') {
        AOS.init({ duration: 750, easing: 'ease', once: true, offset: 90 });
    }

    // 2. Control Visual del Botón Volver Arriba
    const btt = document.getElementById('backToTop');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 450) btt.classList.add('show');
        else btt.classList.remove('show');
    });
    btt.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

    // 3. Lazy Loading a través de Intersection Observer
    const lazyImgs = document.querySelectorAll('img.lazy');
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    obs.unobserve(img);
                }
            });
        });
        lazyImgs.forEach(img => observer.observe(img));
    } else {
        lazyImgs.forEach(img => img.src = img.dataset.src);
    }
});