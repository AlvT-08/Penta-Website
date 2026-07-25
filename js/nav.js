const navbar = document.getElementById('navbar') || document.getElementById('prod-nav');

document.querySelectorAll('.dropdown-toggle').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const targetId = btn.getAttribute('data-target');
        const menu = document.getElementById(targetId);
        const isOpen = menu.classList.contains('open');

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


const hamburgerBtn = document.getElementById('hamburgerBtn');

if (hamburgerBtn) {
    const navTop = navbar.querySelector('.nav-top');
    const mainNav = navbar.querySelector('.main-nav');
    const contactBtnRef = navbar.querySelector('#contactBtn');
    const MOBILE_BREAKPOINT = 1180; 

    function layoutNavForViewport() {
        const isCompact = window.innerWidth <= MOBILE_BREAKPOINT;
        if (isCompact && mainNav.parentElement === navTop) {
            navTop.insertAdjacentElement('afterend', mainNav);
        } else if (!isCompact && mainNav.parentElement !== navTop) {
            navTop.insertBefore(mainNav, contactBtnRef);
        }
    }

    layoutNavForViewport();
    window.addEventListener('resize', layoutNavForViewport);

    const backdrop = document.createElement('div');
    backdrop.className = 'nav-backdrop';
    document.body.appendChild(backdrop);

    function closeMobileMenu() {
        navbar.classList.remove('mobile-open');
        hamburgerBtn.classList.remove('open');
        hamburgerBtn.setAttribute('aria-expanded', 'false');
        backdrop.classList.remove('open');
        document.querySelectorAll('.mega-menu').forEach(m => m.classList.remove('open'));
    }

    function toggleMobileMenu() {
        const isOpen = navbar.classList.toggle('mobile-open');
        hamburgerBtn.classList.toggle('open', isOpen);
        hamburgerBtn.setAttribute('aria-expanded', String(isOpen));
        backdrop.classList.toggle('open', isOpen);
    }

    hamburgerBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleMobileMenu();
    });

    backdrop.addEventListener('click', closeMobileMenu);

    navbar.querySelectorAll('.nav-item > a, .mega-menu a').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= MOBILE_BREAKPOINT) closeMobileMenu();
        });
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth > MOBILE_BREAKPOINT) closeMobileMenu();
    });
}