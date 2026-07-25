const ctaSlider = document.getElementById('ctaSlider');

if (ctaSlider) {
    const slides = ctaSlider.querySelectorAll('.cta-slide');
    const SLIDE_INTERVAL_MS = 3000; 
    let current = 0;

    if (slides.length > 1) {
        setInterval(() => {
            slides[current].classList.remove('active');
            current = (current + 1) % slides.length;
            slides[current].classList.add('active');
        }, SLIDE_INTERVAL_MS);
    }
}