// Arquitectura del Slider / Hero Section
// Preparado para expandir múltiples diapositivas dinámicamente si se requiere
class HeroSlider {
    constructor(containerSelector) {
        this.container = document.querySelector(containerSelector);
        this.slides = this.container.querySelectorAll('.slide');
        this.currentIndex = 0;
    }
    
    init() {
        if(this.slides.length > 1) {
            setInterval(() => this.nextSlide(), 6000); // Cambio automático de 6 segundos
        }
    }
    
    nextSlide() {
        this.slides[this.currentIndex].classList.remove('active');
        this.currentIndex = (this.currentIndex + 1) % this.slides.length;
        this.slides[this.currentIndex].classList.add('active');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const slider = new HeroSlider('.hero-slider');
    slider.init();
});