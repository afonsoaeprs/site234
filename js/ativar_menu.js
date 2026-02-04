document.addEventListener('DOMContentLoaded', function () {
    const navItems = document.querySelectorAll('.nav-item');
    const sections = [
        { id: 'cima', element: document.getElementById('cima') },
        { id: 'intro', element: document.getElementById('intro') },
        { id: 'cidades', element: document.getElementById('cidades') },
        { id: 'planeamento', element: document.getElementById('planeamento') },
        { id: 'experiencias', element: document.getElementById('experiencias') }
    ];
    const topoBtn = document.getElementById('btn-topo');
    const overlay = document.getElementById('intro-overlay');
    const entrarBtn = document.getElementById('btn-entrar');
    const ytContainer = document.getElementById('yt-player-container');

    // clique no menu mantém-se
    navItems.forEach(item => {
        item.addEventListener('click', function () {
            navItems.forEach(navItem => navItem.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // botão voltar ao topo
    if (topoBtn) {
        topoBtn.addEventListener('click', function () {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ecrã inicial com música calma (YouTube embed)
    if (entrarBtn && overlay) {
        entrarBtn.addEventListener('click', () => {
            overlay.classList.add('oculto');
            if (ytContainer && !ytContainer.querySelector('iframe')) {
                const iframe = document.createElement('iframe');
                const videoId = 'DWcJFNfaw9c'; // podes trocar por outro ID de vídeo calmo
                iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&loop=1&playlist=${videoId}&controls=0&modestbranding=1&rel=0`;
                iframe.width = '0';
                iframe.height = '0';
                iframe.allow = 'autoplay';
                iframe.style.border = '0';
                iframe.style.position = 'absolute';
                iframe.style.opacity = '0';
                ytContainer.appendChild(iframe);
            }
        });
    }

    // observar secções para ativar menu e mostrar botão topo
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const id = entry.target.getAttribute('id');
            if (!id) return;

            if (entry.isIntersecting) {
                // ativa o item de menu correspondente
                navItems.forEach(navItem => {
                    const link = navItem.querySelector('a');
                    const href = link ? link.getAttribute('href') : '';
                    if (href === `#${id}`) {
                        navItem.classList.add('active');
                    } else {
                        navItem.classList.remove('active');
                    }
                });
            }
        });
    }, {
        root: null,
        threshold: 0.4
    });

    sections.forEach(sec => {
        if (sec.element) {
            sectionObserver.observe(sec.element);
        }
    });

    // revelar secções e cartões ao entrar no viewport
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visivel');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        threshold: 0.25
    });

    document.querySelectorAll('.secao-reveal, .reveal').forEach(el => {
        revealObserver.observe(el);
    });

    // mostrar/ocultar botão de topo com base no scroll
    window.addEventListener('scroll', () => {
        if (!topoBtn) return;
        const scrollY = window.scrollY || window.pageYOffset;
        if (scrollY > 250) {
            topoBtn.classList.add('visivel');
        } else {
            topoBtn.classList.remove('visivel');
        }
    });
});