pdfjsLib.GlobalWorkerOptions.workerSrc =
  "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";

let pdfDoc = null;
let currentPage = 1;
let currentRenderTask = null;

const overlay = document.getElementById('pdfOverlay');
const canvas = document.getElementById('pdfCanvas');
const ctx = canvas.getContext('2d');
const pageNumEl = document.getElementById('pdfPageNum');
const prevBtn = document.getElementById('pdfPrev');
const nextBtn = document.getElementById('pdfNext');
const closeBtn = document.getElementById('closePdf');

const pdfDocCache = new Map();
function getPdfDoc(url) {
    if (!pdfDocCache.has(url)) {
        pdfDocCache.set(url, pdfjsLib.getDocument(encodeURI(url)).promise);
    }
    return pdfDocCache.get(url);
}

function renderPage(num) {
    pdfDoc.getPage(num).then(page => {
        const baseViewport = page.getViewport({ scale: 1 });
        const availWidth = window.innerWidth * 0.9 - 40;
        const availHeight = window.innerHeight * 0.9 - 100;
        const scale = Math.min(availWidth / baseViewport.width, availHeight / baseViewport.height);
        const viewport = page.getViewport({ scale });

        canvas.width = viewport.width;
        canvas.height = viewport.height;

        if (currentRenderTask) {
            currentRenderTask.cancel();
        }
        currentRenderTask = page.render({ canvasContext: ctx, viewport });
        currentRenderTask.promise
            .then(() => { currentRenderTask = null; })
            .catch(() => {});

        pageNumEl.textContent = `Page ${num} of ${pdfDoc.numPages}`;
        prevBtn.disabled = num <= 1;
        nextBtn.disabled = num >= pdfDoc.numPages;
    });
}

function openPdf(url) {
    getPdfDoc(url).then(doc => {
        pdfDoc = doc;
        currentPage = 1;
        renderPage(currentPage);
        overlay.classList.add('open');
    }).catch(err => console.error('Error loading PDF:', err));
}

prevBtn.addEventListener('click', () => { if (currentPage > 1) { currentPage--; renderPage(currentPage); } });
nextBtn.addEventListener('click', () => { if (currentPage < pdfDoc.numPages) { currentPage++; renderPage(currentPage); } });
closeBtn.addEventListener('click', () => overlay.classList.remove('open'));
overlay.addEventListener('click', (e) => { if (e.target === overlay) overlay.classList.remove('open'); });

let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        if (overlay.classList.contains('open') && pdfDoc) renderPage(currentPage);
    }, 150);
});

function showSkeleton(card) {
    const skeleton = document.createElement('div');
    skeleton.className = 'thumb-skeleton';
    card.appendChild(skeleton);
    return skeleton;
}

function renderThumbnail(card, url) {
    const skeleton = showSkeleton(card);
    getPdfDoc(url)
        .then(doc => doc.getPage(1))
        .then(page => {
            const baseViewport = page.getViewport({ scale: 1 });
            const scale = 500 / baseViewport.width;
            const viewport = page.getViewport({ scale });

            const thumbCanvas = document.createElement('canvas');
            thumbCanvas.width = viewport.width;
            thumbCanvas.height = viewport.height;
            thumbCanvas.className = 'product-card-thumb';

            const thumbCtx = thumbCanvas.getContext('2d');
            return page.render({ canvasContext: thumbCtx, viewport }).promise
                .then(() => {
                    skeleton.remove();
                    card.appendChild(thumbCanvas);
                });
        })
        .catch(err => {
            skeleton.remove();
            console.error('Thumbnail failed for', url, err);
        });
}

function setupLinkCard(card) {
    const skeleton = showSkeleton(card);

    const img = document.createElement('img');
    img.src = card.dataset.img;
    img.className = 'product-card-thumb';
    img.alt = '';
    img.loading = 'lazy';
    img.addEventListener('load', () => skeleton.remove());
    img.addEventListener('error', () => skeleton.remove());
    card.appendChild(img);

    card.addEventListener('click', () => {
        window.open(card.dataset.link, '_blank', 'noopener,noreferrer');
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const pdfCards = document.querySelectorAll('.product-card[data-pdf]');
    const linkCards = document.querySelectorAll('.product-card[data-link]');

    linkCards.forEach(card => {
        card.style.cursor = 'pointer';
        setupLinkCard(card);
    });

    pdfCards.forEach(card => { card.style.cursor = 'pointer'; });

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const card = entry.target;
                    renderThumbnail(card, card.dataset.pdf);
                    card.addEventListener('click', () => openPdf(card.dataset.pdf));
                    obs.unobserve(card);
                }
            });
        }, { rootMargin: '300px 0px' });

        pdfCards.forEach(card => observer.observe(card));
    } else {
        pdfCards.forEach(card => {
            renderThumbnail(card, card.dataset.pdf);
            card.addEventListener('click', () => openPdf(card.dataset.pdf));
        });
    }
});