const milestones = [
    { year: "1985", label: "Founded", desc: "PENTA ENGINEERING AND MACHINERIES INC. began in October 1985, a sole proprietorship, with a primary focus on the service and repair of pumps for the building trade and manufacturing industries." },
    { year: "1989", label: "Incorporation", desc: "PENTA ENGINEERING AND MACHINERIES INC. was formally incorporated in September 1989." },
    { year: "1989", label: "PACO, FAIRBANKS, & EIM", desc: "Dealership of PACO pumps in the Metro Manila building trade market, Dealership of FAIRBANKS MORSE fire pump (Currently FAIRBANKS NIJHUIS), <br>Dealership of EIM submersible pumps." },
    { year: "1991", label: "Exclusive Distributorship of PACO, and EVAPCO", desc: "Exclusive distributorship of PACO pumps. <br>Exclusive distributorship of EVAPCO evaporative cooling equipment." },
    { year: "1992", label: "Exclusive Distributorship of EIM", desc: "Exclusive distributorship of EIM pumps." },
    { year: "1996", label: "AMTROL & ALLEN BRADLEY", desc: "Dealership of AMTROL tanks. <br>Dealership of ALLEN BRADLEY controls." },
    { year: "2006", label: "IMI TA & GRUNDFOS", desc: "Exclusive distributorship of TOUR & ANDERSSON \"TA\" balancing valves (now IMI TA). <br>Dealership of GRUNDFOS pumps" },
    { year: "2011", label: "NEMA", desc: "Dealership of NEMA expansion vessel and hydropneumatic tanks." },
    { year: "2025", label: "ALFA LAVAL", desc: "Dealership of ALFA LAVAL Gasketed Plate Heat Exchanger (GPHE)." },
];

const ITEM_W = 220;
const MOBILE_BREAKPOINT = 767;
let current = 0;

const itemsEl = document.getElementById('items');
const descEl = document.getElementById('desc');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

const boldTerms = [
    'PENTA ENGINEERING AND MACHINERIES INC.',
    'PACO',
    'FAIRBANKS MORSE',
    'FAIRBANKS NIJHUIS',
    'EIM',
    'EVAPCO',
    'AMTROL',
    'ALLEN BRADLEY',
    'IMI TA',
    'GRUNDFOS',
    'NEMA',
    'ALFA LAVAL',
    'TOUR & ANDERSSON',
    '"TA"',
];

function boldify(text) {
    const escaped = boldTerms.map(t => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
    const pattern = new RegExp(`(${escaped.join('|')})`, 'g');
    return text.replace(pattern, '<strong>$1</strong>');
}

function isMobile() {
    return window.innerWidth <= MOBILE_BREAKPOINT;
}

/* Desktop / tablet: horizontal ticker, one milestone highlighted at a time,
   shared description panel below, paged with the prev/next arrows. */
function renderDesktop() {
    itemsEl.innerHTML = '';
    milestones.forEach((m, i) => {
        const isActive = i === current;
        const div = document.createElement('div');
        div.className = 'tl-item';
        div.innerHTML = `
            <div class="tl-tick ${isActive ? 'active' : ''}"></div>
            <div class="tl-year ${isActive ? 'active' : ''}">${m.year}</div>
            <div class="tl-label ${isActive ? 'active' : ''}">${m.label}</div>
        `;
        itemsEl.appendChild(div);
    });

    const offset = (itemsEl.parentElement.offsetWidth / 2) - (current * ITEM_W) - (ITEM_W / 2);
    itemsEl.style.transform = `translateX(${offset}px)`;
    descEl.style.display = '';
    descEl.innerHTML = boldify(milestones[current].desc);
    prevBtn.disabled = current === 0;
    nextBtn.disabled = current === milestones.length - 1;
}

/* Mobile: every milestone shown at once, in a vertical zigzag timeline
   alternating left/right of a central line - each row carries its own
   year/label/description instead of relying on the shared #desc panel. */
function renderMobileTimeline() {
    itemsEl.style.transform = 'none';
    itemsEl.innerHTML = '';
    descEl.style.display = 'none';

    milestones.forEach((m, i) => {
        const side = i % 2 === 0 ? 'tl-row-left' : 'tl-row-right';
        const row = document.createElement('div');
        row.className = `tl-row ${side}`;
        row.innerHTML = `
            <div class="tl-node"></div>
            <div class="tl-content">
                <div class="tl-mobile-year">${m.year}</div>
                <div class="tl-mobile-label">${m.label}</div>
                <div class="tl-mobile-desc">${boldify(m.desc)}</div>
            </div>
        `;
        itemsEl.appendChild(row);
    });
}

function render() {
    if (isMobile()) {
        renderMobileTimeline();
    } else {
        renderDesktop();
    }
}

prevBtn.addEventListener('click', () => { if (current > 0) { current--; render(); } });
nextBtn.addEventListener('click', () => { if (current < milestones.length - 1) { current++; render(); } });

window.addEventListener('resize', render);
render();