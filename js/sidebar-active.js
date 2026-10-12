document.addEventListener('DOMContentLoaded', () => {
    const sidebar = document.querySelector('.products-sidebar');
    if (!sidebar) return;

    const sections = [...sidebar.querySelectorAll('a[href^="#"]')]
        .map(link => ({
            link,
            target: document.getElementById(link.getAttribute('href').slice(1))
        }))
        .filter(section => section.target);

    if (!sections.length) return;

    let activeLink = null;

    function updateActiveSection() {
        const activationLine = window.scrollY + Math.min(180, window.innerHeight * 0.25);
        let activeSection = sections[0];

        for (const section of sections) {
            if (section.target.getBoundingClientRect().top + window.scrollY <= activationLine) {
                activeSection = section;
            }
        }

        if (activeSection.link === activeLink) return;
        activeLink = activeSection.link;

        sections.forEach(({ link }) => link.removeAttribute('aria-current'));
        activeSection.link.setAttribute('aria-current', 'location');

        sidebar.querySelectorAll('.section-contains-active').forEach(item => {
            item.classList.remove('section-contains-active');
        });

        const parentItem = activeSection.link.closest('.sidebar-sub')?.closest('.sidebar-item');
        if (parentItem) parentItem.classList.add('section-contains-active');
        else activeSection.link.closest('.sidebar-item')?.classList.add('section-contains-active');
    }

    let ticking = false;
    window.addEventListener('scroll', () => {
        if (ticking) return;
        ticking = true;
        window.requestAnimationFrame(() => {
            updateActiveSection();
            ticking = false;
        });
    }, { passive: true });

    window.addEventListener('resize', updateActiveSection);
    window.addEventListener('hashchange', updateActiveSection);
    updateActiveSection();
});
