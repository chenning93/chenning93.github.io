// Travel map: lights up visited countries on a self-hosted SVG world map.
// The list of countries lives in pages/service.html (window.VISITED_COUNTRIES).
(function () {
    const container = document.getElementById('travel-map');
    if (!container) return;

    const VISITED = window.VISITED_COUNTRIES || [];

    // Regions lit together with a country (not labelled separately)
    const GROUPS = { CN: ['HK', 'MO'] };

    // Common alternative names -> ISO code
    const ALIASES = {
        'usa': 'US', 'us': 'US', 'united states of america': 'US', 'america': 'US',
        'uk': 'GB', 'britain': 'GB', 'great britain': 'GB', 'england': 'GB', 'scotland': 'GB', 'wales': 'GB',
        'korea': 'KR', 'republic of korea': 'KR', 'holland': 'NL', 'the netherlands': 'NL',
        'czech republic': 'CZ', 'czechia': 'CZ', 'russia': 'RU', 'russian federation': 'RU',
        'macau': 'MO', 'uae': 'AE', 'viet nam': 'VN', 'türkiye': 'TR', 'turkiye': 'TR', 'ivory coast': 'CI'
    };

    fetch(container.dataset.src)
        .then(r => { if (!r.ok) throw new Error(r.status); return r.text(); })
        .then(svgText => {
            container.innerHTML = svgText;
            const svg = container.querySelector('svg');
            const paths = Array.from(svg.querySelectorAll('.countries path'));
            const byIso = {}, byName = {};
            paths.forEach(p => {
                if (p.dataset.iso) (byIso[p.dataset.iso] = byIso[p.dataset.iso] || []).push(p);
                byName[p.dataset.name.toLowerCase()] = p.dataset.iso || p.dataset.name;
            });

            const visited = [];
            VISITED.forEach(entry => {
                const item = typeof entry === 'string' ? { country: entry } : entry;
                const key = String(item.country || '').trim();
                const lower = key.toLowerCase();
                let iso = /^[A-Z]{2}$/.test(key) ? key : (ALIASES[lower] || byName[lower]);
                const main = iso && byIso[iso] ? byIso[iso] : null;
                if (!main) { console.warn('Travel map: unknown country "' + key + '"'); return; }
                visited.push({ iso: iso, note: item.note || '', paths: main });
            });

            // highlight
            visited.forEach(v => {
                v.paths.forEach(p => { p.classList.add('visited'); p.dataset.note = v.note; });
                (GROUPS[v.iso] || []).forEach(code => (byIso[code] || []).forEach(p => {
                    p.classList.add('visited');
                    p.dataset.note = p.dataset.note || v.note;
                }));
            });

            placeLabels(svg, visited);
            buildList(visited);
            setupTooltip(svg);
        })
        .catch(err => {
            container.innerHTML = '<p class="travel-map-error">The map could not be loaded.</p>';
            console.warn('Travel map:', err);
        });

    function placeLabels(svg, visited) {
        const NS = 'http://www.w3.org/2000/svg';
        const layer = svg.querySelector('.labels');
        const vb = svg.viewBox.baseVal;
        const BIG = 1500;          // countries at least this large get their name inside the shape
        const placed = [];
        const hit = (b, o) => b.x < o.x + o.width && b.x + b.width > o.x && b.y < o.y + o.height && b.y + b.height > o.y;
        const overlaps = b => placed.some(o => hit(b, o));
        const inside = b => b.x >= 2 && b.y >= 2 && b.x + b.width <= vb.width - 2 && b.y + b.height <= vb.height - 2;

        // candidate offsets: outward rings, left/right preferred (labels are wide)
        const OFFSETS = [];
        const ANGLES = [0, 180, 90, 270, 30, 150, 210, 330, 60, 120, 240, 300];
        [8, 14, 22, 32, 44, 58, 74, 92, 112, 134].forEach(r => ANGLES.forEach(deg => {
            const t = deg * Math.PI / 180;
            OFFSETS.push([Math.round(r * Math.cos(t)), Math.round(r * Math.sin(t) * 0.7)]);
        }));

        const anchors = visited
            .map(v => v.paths.reduce((a, b) => (+b.dataset.area > +a.dataset.area ? b : a)))
            .sort((a, b) => +b.dataset.area - +a.dataset.area);

        // keep the highlighted shapes of smaller countries uncovered by any label
        anchors.forEach(p => {
            if (+p.dataset.area < BIG && p.dataset.bb) {
                const [bx, by, bw, bh] = p.dataset.bb.split(',').map(Number);
                placed.push({ x: bx - 1, y: by - 1, width: bw + 2, height: bh + 2 });
            }
        });

        anchors.forEach(p => {
            const x = +p.dataset.lx, y = +p.dataset.ly;
            const area = +p.dataset.area;
            if (area < 25) {                            // tiny country: add a dot so it is visible
                const dot = document.createElementNS(NS, 'circle');
                dot.setAttribute('cx', x); dot.setAttribute('cy', y); dot.setAttribute('r', 3);
                dot.setAttribute('class', 'map-dot');
                layer.appendChild(dot);
            }
            const text = document.createElementNS(NS, 'text');
            text.setAttribute('class', 'map-label');
            text.textContent = p.dataset.name;
            layer.appendChild(text);

            const tryAt = (dx, dy) => {
                const anchor = dx > 4 ? 'start' : dx < -4 ? 'end' : 'middle';
                text.setAttribute('text-anchor', anchor);
                text.setAttribute('x', x + dx); text.setAttribute('y', y + dy + 4);
                const b = text.getBBox();
                return { dx, dy, box: { x: b.x - 2, y: b.y - 1, width: b.width + 4, height: b.height + 2 } };
            };

            let chosen = null;
            const candidates = area >= BIG ? [[0, 0]].concat(OFFSETS) : OFFSETS;
            for (const [dx, dy] of candidates) {
                const c = tryAt(dx, dy);
                if (inside(c.box) && !overlaps(c.box)) { chosen = c; break; }
            }
            if (!chosen) chosen = tryAt(0, -14);        // nowhere free: just above the country
            placed.push(chosen.box);

            if (area < BIG) {                           // leader line from the country to the label's nearest edge
                const bx = Math.max(chosen.box.x, Math.min(x, chosen.box.x + chosen.box.width));
                const by = Math.max(chosen.box.y, Math.min(y, chosen.box.y + chosen.box.height));
                const line = document.createElementNS(NS, 'line');
                line.setAttribute('x1', x); line.setAttribute('y1', y);
                line.setAttribute('x2', bx); line.setAttribute('y2', by);
                line.setAttribute('class', 'map-leader');
                layer.insertBefore(line, layer.firstChild);
            }
        });
    }

    function buildList(visited) {
        const list = document.getElementById('travel-list');
        const count = document.getElementById('travel-count');
        if (count) count.textContent = visited.length;
        if (!list) return;
        list.innerHTML = '';
        visited
            .map(v => ({ name: v.paths[0].dataset.name, note: v.note }))
            .sort((a, b) => a.name.localeCompare(b.name))
            .forEach(v => {
                const li = document.createElement('li');
                li.textContent = v.name;
                if (v.note) li.title = v.note;
                list.appendChild(li);
            });
    }

    function setupTooltip(svg) {
        const tip = document.createElement('div');
        tip.className = 'map-tooltip';
        tip.hidden = true;
        container.appendChild(tip);
        const show = (e, p) => {
            tip.innerHTML = '';
            const strong = document.createElement('strong');
            strong.textContent = p.dataset.name;
            tip.appendChild(strong);
            if (p.classList.contains('visited') && p.dataset.note) {
                const span = document.createElement('span');
                span.textContent = p.dataset.note;
                tip.appendChild(span);
            }
            const r = container.getBoundingClientRect();
            tip.style.left = (e.clientX - r.left + container.scrollLeft + 12) + 'px';
            tip.style.top = (e.clientY - r.top + container.scrollTop + 12) + 'px';
            tip.hidden = false;
        };
        svg.addEventListener('mousemove', e => {
            const p = e.target.closest('.countries path');
            if (p) show(e, p); else tip.hidden = true;
        });
        svg.addEventListener('mouseleave', () => { tip.hidden = true; });
        svg.addEventListener('click', e => {
            const p = e.target.closest('.countries path');
            if (p) show(e, p); else tip.hidden = true;
        });
    }
})();
