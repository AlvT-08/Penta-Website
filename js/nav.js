const navbar = document.getElementById('navbar') || document.getElementById('prod-nav');

document.querySelectorAll('.dropdown-toggle').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const targetId = btn.getAttribute('data-target');
        const menu = document.getElementById(targetId);
        const isOpen = menu.classList.contains('open');

        // close all
        document.querySelectorAll('.mega-menu').forEach(m => m.classList.remove('open'));
        document.querySelectorAll('.dropdown-toggle svg').forEach(s => s.style.transform = '');
        navbar.classList.remove('expanded');

        if (!isOpen) {
            menu.classList.add('open');
            btn.querySelector('svg').style.transform = 'rotate(180deg)';
            navbar.classList.add('expanded');
        }
    });
});

document.addEventListener('click', (e) => {
    if (!navbar.contains(e.target)) {
        document.querySelectorAll('.mega-menu').forEach(m => m.classList.remove('open'));
        document.querySelectorAll('.dropdown-toggle svg').forEach(s => s.style.transform = '');
        navbar.classList.remove('expanded');
    }
});

const contactOverlay = document.getElementById('contactOverlay');
const closeContact = document.getElementById('closeContact');
const contactBtn = document.getElementById('contactBtn');

contactBtn.addEventListener('click', () => {
    contactOverlay.classList.add('open');
});
closeContact.addEventListener('click', () => {
    contactOverlay.classList.remove('open');
});

contactOverlay.addEventListener('click', (e) => {
    if (e.target === contactOverlay) {
        contactOverlay.classList.remove('open');
    }
});