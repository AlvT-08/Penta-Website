const milestones = [
    { year: "1985", label: "Founded", desc: "PENTA ENGINEERING AND MACHINERIES INC. began as a sole proprietorship in October 1985, focusing primarily on pump servicing and repairs for the building and manufacturing industries." },
    { year: "1989", label: "Incorporation", desc: "PENTA ENGINEERING AND MACHINERIES INC. was formally incorporated in September 1989." },
    { year: "1989", label: "PACO, FAIRBANKS, & EIM", desc: "Penta secured dealerships for PACO pumps in the Metro Manila building trade, FAIRBANKS MORSE fire pumps (now FAIRBANKS NIJHUIS), and EIM submersible pumps." },
    { year: "1991", label: "Exclusive Distributorship of PACO and EVAPCO", desc: "Penta became the exclusive distributor of PACO pumps and EVAPCO evaporative cooling equipment." },
    { year: "1992", label: "Exclusive Distributorship of EIM", desc: "Penta became the exclusive distributor of EIM pumps." },
    { year: "1996", label: "AMTROL & ALLEN BRADLEY", desc: "Penta added AMTROL tanks and ALLEN BRADLEY controls to its product range." },
    { year: "2006", label: "IMI TA & GRUNDFOS", desc: "Penta became the exclusive distributor of TOUR & ANDERSSON \"TA\" balancing valves (now IMI TA) and a dealer for GRUNDFOS pumps." },
    { year: "2011", label: "NEMA", desc: "Penta became a dealer for NEMA expansion vessels and hydropneumatic tanks." },
    { year: "2025", label: "ALFA LAVAL", desc: "Penta became a dealer for ALFA LAVAL gasketed plate heat exchangers (GPHEs)." },
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