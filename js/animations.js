// Funcionalidades de UI: Animaciones al scroll, Lazy Load de imágenes y Back to Top
document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Inicialización de AOS (Animate on Scroll)
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
            offset: 100
        });
    }

    // 2. Elemento Back to Top
    const backToTopBtn = document.getElementById('backToTop');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // 3. Lazy Loading nativo optimizado con Intersection Observer
    const lazyImages = document.querySelectorAll('img.lazy');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const image = entry.target;
                    image.src = image.dataset.src;
                    image.classList.remove('lazy');
                    observer.unobserve(image);
                }
            });
        });
        lazyImages.forEach(image => imageObserver.observe(image));
    } else {
        // Fallback para navegadores antiguos
        lazyImages.forEach(image => image.src = image.dataset.src);
    }
});