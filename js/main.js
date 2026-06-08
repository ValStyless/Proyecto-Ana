// Controlador de Datos Asíncronos (Fetch API) y Galería Lightbox
document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Inyección de Bitácora y Actividades desde data.json
    const container = document.getElementById('news-container');

            // Re-vincular Observador de Lazy Loading para elementos dinámicos
            const cardsImgs = container.querySelectorAll('img.lazy');
            if ('IntersectionObserver' in window) {
                const cardObs = new IntersectionObserver((entries, obs) => {
                    entries.forEach(e => {
                        if (e.isIntersecting) {
                            const i = e.target; i.src = i.dataset.src; obs.unobserve(i);
                        }
                    });
                });
                cardsImgs.forEach(img => cardObs.observe(img));
            }
        })
        .catch(err => {
            console.error(err);
            container.innerHTML = `<p>Ocurrió un inconveniente al cargar las actividades recientes. Por favor, refresque la página.</p>`;
        });

    // 2. Comportamiento Integrado del Visor Lightbox
    const lb = document.getElementById('lightbox');
    const lbImg = lb.querySelector('.lightbox-img');
    const triggers = document.querySelectorAll('.gallery-trigger');
    let activeIdx = 0;
    const srcList = [];

    triggers.forEach((el, index) => {
        srcList.push(el.dataset.src || el.src);
        el.addEventListener('click', () => {
            activeIdx = index;
            showImg(srcList[activeIdx], el.alt);
        });
    });

    function showImg(src, alt) {
        lbImg.src = src; lbImg.alt = alt;
        lb.style.display = 'flex'; lb.setAttribute('aria-hidden', 'false');
    }

    lb.querySelector('.lightbox-close').addEventListener('click', () => {
        lb.style.display = 'none'; lb.setAttribute('aria-hidden', 'true');
    });

    lb.querySelector('.lightbox-next').addEventListener('click', () => {
        activeIdx = (activeIdx + 1) % srcList.length;
        lbImg.src = triggers[activeIdx].dataset.src || triggers[activeIdx].src;
    });

    lb.querySelector('.lightbox-prev').addEventListener('click', () => {
        activeIdx = (activeIdx - 1 + srcList.length) % srcList.length;
        lbImg.src = triggers[activeIdx].dataset.src || triggers[activeIdx].src;
    });
