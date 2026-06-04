// Lógica de Integración Principal, Fetch API de Noticias y Lightbox
document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Consumo Dinámico de Noticias vía Fetch API desde data.json
    const newsContainer = document.getElementById('news-container');

    fetch('data.json')
        .then(response => {
            if (!response.ok) throw new Error('Error de red al cargar el recurso JSON.');
            return response.json();
        })
        .then(data => {
            newsContainer.innerHTML = ''; // Limpiar el estado de carga (loading)
            
            data.forEach(item => {
                const newsCard = document.createElement('article');
                newsCard.className = 'news-card';
                newsCard.setAttribute('data-aos', 'fade-up');
                
                newsCard.innerHTML = `
                    <div class="news-img">
                        <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 9'%3E%3C/svg%3E" data-src="${item.image}" class="lazy" alt="${item.title}">
                    </div>
                    <div class="news-content">
                        <span class="news-date">${item.date}</span>
                        <h3>${item.title}</h3>
                        <p>${item.excerpt}</p>
                        <a href="#" class="btn-text mt-2" style="display:inline-block;">Leer más <i class="fa-solid fa-chevron-right" style="font-size:0.75rem;"></i></a>
                    </div>
                `;
                newsContainer.appendChild(newsCard);
            });

            // Re-ejecutar el lazy loading para las nuevas imágenes inyectadas
            const newLazyImages = newsContainer.querySelectorAll('img.lazy');
            if ('IntersectionObserver' in window) {
                const imgObserver = new IntersectionObserver((entries, obs) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            const img = entry.target;
                            img.src = img.dataset.src;
                            obs.unobserve(img);
                        }
                    });
                });
                newLazyImages.forEach(img => imgObserver.observe(img));
            }
        })
        .catch(error => {
            console.error('Error:', error);
            newsContainer.innerHTML = `<p class="error">Por el momento no se pudieron cargar las noticias. Intente más tarde.</p>`;
        });

    // 2. Funcionalidad del Lightbox de la Galería
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = lightbox.querySelector('.lightbox-img');
    const closeBtn = lightbox.querySelector('.lightbox-close');
    const prevBtn = lightbox.querySelector('.lightbox-prev');
    const nextBtn = lightbox.querySelector('.lightbox-next');
    const triggers = document.querySelectorAll('.gallery-trigger');
    
    let currentGalleryIndex = 0;
    const imagesArray = [];

    triggers.forEach((trigger, idx) => {
        imagesArray.push(trigger.dataset.src || trigger.src);
        trigger.addEventListener('click', () => {
            currentGalleryIndex = idx;
            openLightbox(imagesArray[currentGalleryIndex], trigger.alt);
        });
    });

    function openLightbox(src, alt) {
        lightboxImg.src = src;
        lightboxImg.alt = alt;
        lightbox.style.display = 'flex';
        lightbox.setAttribute('aria-hidden', 'false');
    }

    function closeLightbox() {
        lightbox.style.display = 'none';
        lightbox.setAttribute('aria-hidden', 'true');
    }

    function navigateLightbox(direction) {
        currentGalleryIndex = (currentGalleryIndex + direction + imagesArray.length) % imagesArray.length;
        const targetTrigger = triggers[currentGalleryIndex];
        lightboxImg.src = targetTrigger.dataset.src || targetTrigger.src;
        lightboxImg.alt = targetTrigger.alt;
    }

    closeBtn.addEventListener('click', closeLightbox);
    nextBtn.addEventListener('click', () => navigateLightbox(1));
    prevBtn.addEventListener('click', () => navigateLightbox(-1));
    
    // Cerrar al hacer click fuera de la imagen
    lightbox.addEventListener('click', (e) => {
        if(e.target === lightbox) closeLightbox();
    });
});