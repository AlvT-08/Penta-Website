const container = document.querySelector('.brands-container');
const wrapper = document.querySelector('.brands-slider-wrapper');
const cards = document.querySelectorAll('.brand-wrapper');
const prev = document.getElementById('prev');
const next = document.getElementById('next');

let index = 0;
const visible = 3;
const total = cards.length;
const gap = 47;

function getCardWidth() {
    const wrapperWidth = wrapper.offsetWidth - 54;
    return (wrapperWidth - gap * (visible - 1)) / visible;
}

function updateCardSizes() {
    const cardWidth = getCardWidth();
    cards.forEach(card => {
        card.style.flex = `0 0 ${cardWidth}px`;
        card.style.maxWidth = `${cardWidth}px`;
    });
}

function updateContainerWidth() {
    const cardWidth = getCardWidth();
    container.style.width = `${(cardWidth + gap) * total}px`;
}

function updateSlider() {
    const cardWidth = getCardWidth();
    const offset = index * (cardWidth + gap);
    container.style.transform = `translateX(-${offset}px)`;
}

next.addEventListener('click', () => {
    if (index < total - visible) index++;
    updateSlider();
});

prev.addEventListener('click', () => {
    if (index > 0) index--;
    updateSlider();
});

updateCardSizes();
updateContainerWidth();
updateSlider();

window.addEventListener('resize', () => {
    updateCardSizes();
    updateContainerWidth();
    updateSlider();
});