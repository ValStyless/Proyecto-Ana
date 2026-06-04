// Lógica para control del Menú Hamburguesa Responsivo
document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Cambiar estado del menú al dar click en el botón
    menuToggle.addEventListener('click', () => {
        const isOpen = navMenu.classList.contains('open');
        toggleMenu(!isOpen);
    });

    // Cerrar el menú si se hace click en algún link de navegación
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