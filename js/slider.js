const container = document.querySelector('.brands-container');
const wrapper = document.querySelector('.brands-slider-wrapper');
const cards = document.querySelectorAll('.brand-wrapper');
const prev = document.getElementById('prev');
const next = document.getElementById('next');

let index = 0;
const total = cards.length;
const gap = 47;
const GRID_BREAKPOINT = 767;

function getVisibleCount() {
    const w = window.innerWidth;
    if (w <= 1180) return 2;
    return 3;
}

function isGridMode() {
    return window.innerWidth <= GRID_BREAKPOINT;
}

function getCardWidth() {
    const visible = getVisibleCount();
    const wrapperWidth = wrapper.offsetWidth - 54;
    return (wrapperWidth - gap * (visible - 1)) / visible;
}

function clampIndex() {
    const visible = getVisibleCount();
    const maxIndex = Math.max(0, total - visible);
    if (index > maxIndex) index = maxIndex;
}

function updateCardSizes() {
    if (isGridMode()) {
        cards.forEach(card => {
            card.style.flex = '';
            card.style.maxWidth = '';
        });
        return;
    }
    const cardWidth = getCardWidth();
    cards.forEach(card => {
        card.style.flex = `0 0 ${cardWidth}px`;
        card.style.maxWidth = `${cardWidth}px`;
    });
}

function updateContainerWidth() {
    if (isGridMode()) {
        container.style.width = '';
        return;
    }
    const cardWidth = getCardWidth();
    container.style.width = `${(cardWidth + gap) * total}px`;
}

function updateSlider() {
    if (isGridMode()) {
        container.style.transform = '';
        return;
    }
    const cardWidth = getCardWidth();
    const offset = index * (cardWidth + gap);
    container.style.transform = `translateX(-${offset}px)`;
}

function goNext() {
    if (isGridMode()) return;
    const visible = getVisibleCount();
    if (index < total - visible) index++;
    updateSlider();
}

function goPrev() {
    if (isGridMode()) return;
    if (index > 0) index--;
    updateSlider();
}

next.addEventListener('click', goNext);
prev.addEventListener('click', goPrev);

updateCardSizes();
updateContainerWidth();
updateSlider();

window.addEventListener('resize', () => {
    clampIndex();
    updateCardSizes();
    updateContainerWidth();
    updateSlider();
});

let touchStartX = 0;
let touchDeltaX = 0;
const SWIPE_THRESHOLD = 40; // px

wrapper.addEventListener('touchstart', (e) => {
    if (isGridMode()) return;
    touchStartX = e.touches[0].clientX;
    touchDeltaX = 0;
}, { passive: true });

wrapper.addEventListener('touchmove', (e) => {
    if (isGridMode()) return;
    touchDeltaX = e.touches[0].clientX - touchStartX;
}, { passive: true });

wrapper.addEventListener('touchend', () => {
    if (isGridMode()) return;
    if (touchDeltaX <= -SWIPE_THRESHOLD) {
        goNext();
    } else if (touchDeltaX >= SWIPE_THRESHOLD) {
        goPrev();
    }
    touchStartX = 0;
    touchDeltaX = 0;
});