const milestones = [
    { year: "1985", label: "Founded", desc: "PENTA ENGINEERING AND MACHINERIES began in October 1985, a sole proprietorship, with a primary focus on the service and repair of pumps for the building trade and manufacturing industries." },
    { year: "1989", label: "Incorporation", desc: "PENTA ENGINEERING AND MACHINERIES was formally incorporated in September 1989." },
    { year: "1989", label: "PACO, FAIRBANKS, & EIM", desc: "Dealership of PACO pumps in the Metro Manila building trade market, FAIRBANKS MORSE fire pump (Currently FAIRBANKS NIJHUIS), and Dealership of EIM submersible pumps." },
    { year: "1991", label: "Exclusive Distributorship of PACO, and EVAPCO", desc: "Exclusive distributorship of PACO pumps. Exclusive distributorship of EVAPCO evaporative cooling equipment." },
    { year: "1992", label: "Exclusive Distributorship of EIM", desc: "Exclusive distributorship of EIM pumps." },
    { year: "1996", label: "AMTROL & ALLEN BRADLEY", desc: "Dealership of AMTROL tanks. Dealership of ALLEN BRADLEY controls." },
    { year: "2006", label: "IMI TA & GRUNDFOS", desc: "Exclusive distributorship of IMI TA. Dealership of GRUNDFOS pumps." },
    { year: "2011", label: "NEMA", desc: "Dealership of NEMA expansion vessel and hydropneumatic tanks." },
    { year: "2025", label: "ALFA LAVAL", desc: "Dealership of ALFA LAVAL Gasketed Plate Heat Exchanger (GPHE)." },
];

const ITEM_W = 220;
let current = 0;

const itemsEl = document.getElementById('items');
const descEl = document.getElementById('desc');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

function render() {
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
    descEl.textContent = milestones[current].desc;
    prevBtn.disabled = current === 0;
    nextBtn.disabled = current === milestones.length - 1;
}

prevBtn.addEventListener('click', () => { if (current > 0) { current--; render(); } });
nextBtn.addEventListener('click', () => { if (current < milestones.length - 1) { current++; render(); } });

window.addEventListener('resize', render);
render();