document.addEventListener('DOMContentLoaded', function () {
    const navItems = document.querySelectorAll('.nav-item');
    const sections = [
        { id: 'cima', element: document.getElementById('cima') },
        { id: 'intro', element: document.getElementById('intro') },
        { id: 'cidades', element: document.getElementById('cidades') },
        { id: 'planeamento', element: document.getElementById('planeamento') }
    ];
    const topoBtn = document.getElementById('btn-topo');

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