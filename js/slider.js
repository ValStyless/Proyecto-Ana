// Estructura limpia para transiciones y control del Slider Principal
class BrandSlider {
    constructor(selector) {
        this.container = document.querySelector(selector);
        this.slides = this.container ? this.container.querySelectorAll('.slide') : [];
        this.index = 0;
    }
    init() {
        if (this.slides.length > 1) {
            setInterval(() => this.rotate(), 7000);
        }
    }
    rotate() {
        this.slides[this.index].classList.remove('active');
        this.index = (this.index + 1) % this.slides.length;
        this.slides[this.index].classList.add('active');
    }
}
document.addEventListener('DOMContentLoaded', () => {
    new BrandSlider('.hero-slider').init();
});