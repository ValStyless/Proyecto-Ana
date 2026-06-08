// Manejo interactivo del Menú Móvil
document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    menuToggle.addEventListener('click', () => {
        const isOpen = navMenu.classList.contains('open');
        toggleMenu(!isOpen);
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => toggleMenu(false));
    });

    function toggleMenu(open) {
        if (open) {
            navMenu.classList.add('open');
            menuToggle.classList.add('open');
            menuToggle.setAttribute('aria-expanded', 'true');
        } else {
            navMenu.classList.remove('open');
            menuToggle.classList.remove('open');
            menuToggle.setAttribute('aria-expanded', 'false');
        }
    }
});