/* noon Home — rails are data; everything else is static markup. */
(() => {
  const A = 'assets/';

  /* ── SKU cards (912:11004 et al.) ─────────────────────────────────── */
  const P = {
    airpods:  { img: '00ff6.png', size: 122, title: 'Apple Airpods Pro 2 Wireless Earbuds' },
    washer:   { img: '1a4eb.png', size: 142, title: 'Whirlpool 7 kg Magic Clean ' },
    maynos:   { img: '6648e.png', size: 122, title: 'MAYNOS Suction Phone Case Mount', spacer: true },
  };
  // badge: [svg, right inset %] — Group 1686556680/1 ("express" / "express Today")
  const rails = {
    reco: [
      { id: '912:11004', p: P.airpods, heart: 'b4444.svg', add: [94, 8], best: true, badge: ['818b4.svg', 2.06] },
      { id: '912:11085', p: P.washer,  heart: 'b4444.svg', add: [96, 8], ad: true,   badge: ['9b14c.svg', 3.29] },
      { id: '912:11153', p: P.maynos,  heart: '6478e.svg', add: [96, 6],             badge: ['818b4.svg', 2.06] },
    ],
    best: [
      { id: '912:11323', p: P.airpods, heart: '7209f.svg', add: [94, 8], best: true, badge: ['45c98.svg', 2.06] },
      { id: '912:11404', p: P.washer,  heart: '7209f.svg', add: [96, 8], ad: true,   badge: ['9e712.svg', 3.29] },
      { id: '912:11472', p: P.maynos,  heart: '6478e.svg', add: [96, 6],             badge: ['45c98.svg', 2.06] },
    ],
    summer: [
      { id: '912:11867', p: P.airpods, heart: '6478e.svg', add: [96, 8], flat: true, badge: ['9f1a6.svg', 2.06] },
      { id: '912:11947', p: P.washer,  heart: '6478e.svg', add: [96, 6], flat: true, badge: ['86b82.svg', 3.29] },
      { id: '912:12014', p: P.maynos,  heart: '6478e.svg', add: [96, 6], ad: true,   badge: ['9f1a6.svg', 2.06] },
    ],
    selling: [
      { id: '912:12100', p: P.airpods, heart: '7209f.svg', add: [94, 8], best: true, badge: ['9bd07.svg', 2.06] },
      { id: '912:12181', p: P.washer,  heart: '7209f.svg', add: [96, 8], ad: true,   badge: ['9e712.svg', 3.29] },
      { id: '912:12249', p: P.maynos,  heart: '6478e.svg', add: [96, 6],             badge: ['9bd07.svg', 2.06] },
    ],
  };

  const sku = (c) => `
    <article class="sku${c.flat ? ' sku--flat' : ''}" data-node-id="${c.id}">
      <div class="sku__img">
        <div class="sku__photo" style="width:${c.p.size}px;height:${c.p.size}px"><img src="${A}${c.p.img}" alt="${c.p.title.trim()}" /></div>
        <button class="sku__wish" aria-label="Add to wishlist"><img src="${A}${c.heart}" alt="" /></button>
        <button class="sku__add sk" style="left:${c.add[0]}px;border-radius:${c.add[1]}px" aria-label="Add to cart"><img src="${A}e4d22.svg" alt="" /></button>
        ${c.best ? '<span class="sku__best"><span>Best Seller</span></span>' : ''}
        ${c.ad ? '<span class="ad">Ad</span>' : ''}
      </div>
      <div class="sku__info">
        <div class="sku__top">
          <p class="sku__title">${c.p.title}</p>
          <div class="sku__rate"><span class="chip-r"><span class="star"><img src="${A}98426.svg" alt="" /></span><span>4.3</span></span>${c.p.spacer ? '<i></i>' : ''}</div>
        </div>
        <div class="sku__price">
          <p class="sku__prow"><b>&#xE001;899</b><s>1399</s><em>33%</em></p>
          <p class="sku__del"><img src="${A}be986.svg" alt="" /><span>Free Delivery</span></p>
        </div>
        <div class="sku__badge"><img style="width:${100 - c.badge[1]}%" src="${A}${c.badge[0]}" alt="express" /></div>
      </div>
    </article>`;

  /* ── Keep shopping for (912:11555) ───────────────────────────────── */
  const IMG1234 = '<span class="ly clip" style="left:50%;top:calc(50% + 7.5px);width:86px;height:75px;transform:translate(-50%,-50%)"><img class="ab" style="left:-27.91%;top:-333.33%;width:393.02%;height:977.02%;object-fit:fill" src="' + A + 'e67d6.png" alt="" /></span>';
  const big = { w: 114, h: 130, bg: '#f9f9fb', sc: '#f1f7fd' };
  const sm  = { w: 100, h: 114, bg: '#ebedff', sc: 'rgba(26,26,26,.09)' };
  const chipViewed  = { bg: '#f1f7fd', pad: '2px 2px 2px 4px', color: '#0076ff', icon: 'ef851.svg' };
  const chipSmBlue  = { bg: '#eef5fd', pad: '2px 4px', color: '#0076ff', icon: 'e3e04.svg', w: 69 };
  const chipSmPlain = { bg: 'transparent', pad: '0', color: '#0076ff', icon: 'e3e04.svg', w: 96 };
  const keep = [
    { id: '912:11556', box: big, search: true, name: 'Playstation 5', chip: [chipViewed, '2 Viewed'],
      photo: `<span class="ly" style="left:calc(50% - 2.5px);top:calc(50% + 7.1px);width:129px;height:67px;transform:translate(-50%,-50%)"><img src="${A}5c6a4.png" alt="" /></span>` },
    { id: '912:11581', box: big, search: true, name: 'Adidas Rivalry', chip: [chipViewed, '5 Viewed'],
      photo: `<span class="ly" style="left:9px;top:16.6px;width:100px;height:100px"><img src="${A}89c98.png" alt="" /></span>` },
    { id: '912:11606', box: big, search: true, name: 'Body serum', chip: [chipViewed, '1 Viewed'],
      photo: `<span class="ly" style="left:calc(50% - 2.78px);top:calc(50% + 3.53px);width:80px;height:82px;transform:translate(-50%,-50%)"><img src="${A}b27a1.png" alt="" /></span>` },
    { id: '912:11631', box: { w: 107, h: 122, bg: '#f9f9fb', sc: 'rgba(14,14,14,.04)' }, name: 'Evo Sl', tag: '#fff',
      chip: [{ bg: '#fff', pad: '2px 4px', color: '#af33d9', icon: '40a61.svg' }, '10 Products'],
      photo: `<span class="ly" style="left:-1px;top:11.5px;width:100px;height:100px"><img src="${A}6b4ee.png" alt="" /></span>` },
    { id: '912:11656', box: sm, small: true, name: 'Playstation 5', tag: 'rgba(255,255,255,.55)', chip: [chipSmBlue, '2 Products'], photo: IMG1234 },
    { id: '912:11681', box: sm, small: true, name: 'Playstation 5', tag: 'rgba(255,255,255,.55)', chip: [chipSmBlue, '2 Products'], photo: IMG1234 },
    { id: '912:11706', box: sm, small: true, name: 'Playstation 5', tag: 'rgba(255,255,255,.55)', chip: [chipSmPlain, '2 Products'], photo: IMG1234 },
    { id: '912:11731', box: sm, small: true, name: 'Playstation 5', tag: 'rgba(255,255,255,.55)', chip: [chipSmPlain, '2 Products'], photo: IMG1234 },
    { id: '912:11756', box: sm, small: true, name: 'Playstation 5', tag: 'rgba(255,255,255,.55)', chip: [chipSmPlain, '2 Products'], photo: IMG1234 },
    { id: '912:11781', box: sm, small: true, name: 'Playstation 5', chip: [chipSmPlain, '4 Products'], photo: IMG1234 },
    { id: '912:11804', box: sm, small: true, name: 'Playstation 5', chip: [chipSmPlain, '4 Products'], photo: IMG1234 },
    { id: '912:11827', box: sm, small: true, name: 'Playstation 5', chip: [chipSmPlain, '4 Products'], photo: IMG1234 },
  ];
  const kc = (k) => {
    const [ch, label] = k.chip;
    return `
    <a class="kc${k.small ? ' kc--sm' : ''}" style="width:${k.box.w}px" data-node-id="${k.id}">
      <div class="kc__box stroke" style="width:${k.box.w}px;height:${k.box.h}px;background:${k.box.bg};--sc:${k.box.sc}">
        ${k.photo}
        ${k.tag ? `<span class="kc__tag" style="background:${k.tag}">2 days ago</span>` : ''}
      </div>
      <div class="kc__txt" style="padding:0 ${k.small ? 0 : 2}px">
        <div class="kc__name">${k.search ? `<img src="${A}61845.svg" alt="" />` : ''}<p>${k.name}</p></div>
        <span class="kc__chip" style="background:${ch.bg};padding:${ch.pad};color:${ch.color}${ch.w ? `;width:${ch.w}px` : ''}"><span>${label}</span><i><img src="${A}${ch.icon}" alt="" /></i></span>
      </div>
    </a>`;
  };

  for (const [name, cards] of Object.entries(rails)) {
    const el = document.querySelector(`[data-rail="${name}"]`);
    if (el) el.innerHTML = cards.map(sku).join('');
  }
  const keepEl = document.querySelector('[data-rail="keep"]');
  if (keepEl) keepEl.innerHTML = keep.map(kc).join('');

  /* ── Recommended tabs ────────────────────────────────────────────── */
  const tabs = document.getElementById('tabs');
  tabs.addEventListener('click', (e) => {
    const t = e.target.closest('.tab');
    if (!t) return;
    for (const b of tabs.children) {
      const on = b === t;
      b.classList.toggle('is-on', on);
      b.setAttribute('aria-selected', on);
    }
  });
})();



/* ══ Home interactions — measured from the noon app recording ("home Page.mov",
   60fps, 402pt wide; every number below was read off its frames) ══════════════ */
(() => {
  const home = document.getElementById('home');
  const scroll = document.getElementById('scroll');
  const clamp01 = (x) => Math.min(1, Math.max(0, x));
  const ramp = (ms, a, b) => clamp01((ms - a) / (b - a));
  const reduce = matchMedia('(prefers-reduced-motion: reduce)');

  /* ── Header collapse / expand ─────────────────────────────────────────────
     Collapses on the first frame the page scrolls down; expands only once the
     content is back at the very top (the body stays attached under the header,
     so it rides up 103px with the collapse and is pushed back down on expand).
     Both ways: 300ms, ease-out 1 − (1 − t)^1.8 (tile height fits to ±0.03).
     Logos cross-fade on their own timings:
       collapse  big out 0–100ms · pills in 130–240ms
       expand    pills out 0–90ms · big in 120–260ms                            */
  const HDR_MS = 300;
  const easeHdr = (t) => 1 - Math.pow(1 - t, 1.8);
  let p = 0, big = 1, mini = 0, collapsed = false, anim = null;
  const paint = () => {
    home.style.setProperty('--p', p.toFixed(4));
    home.style.setProperty('--big', big.toFixed(3));
    home.style.setProperty('--mini', mini.toFixed(3));
  };
  function setCollapsed(on) {
    if (on === collapsed) return;
    collapsed = on;
    if (reduce.matches) { p = on ? 1 : 0; big = on ? 0 : 1; mini = on ? 1 : 0; anim = null; paint(); return; }
    const start = !anim;
    anim = { t0: performance.now(), p0: p, b0: big, m0: mini, to: on ? 1 : 0 };
    if (start) requestAnimationFrame(stepHdr);
  }
  function stepHdr(now) {
    if (!anim) return;
    const ms = Math.min(HDR_MS, now - anim.t0), t = ms / HDR_MS;
    p = anim.p0 + (anim.to - anim.p0) * easeHdr(t);
    if (anim.to === 1) { big = anim.b0 * (1 - ramp(ms, 0, 100)); mini = anim.m0 + (1 - anim.m0) * ramp(ms, 130, 240); }
    else               { mini = anim.m0 * (1 - ramp(ms, 0, 90)); big = anim.b0 + (1 - anim.b0) * ramp(ms, 120, 260); }
    paint();
    if (ms >= HDR_MS) { anim = null; return; }
    requestAnimationFrame(stepHdr);
  }
  scroll.addEventListener('scroll', () => {
    const y = scroll.scrollTop;
    if (!collapsed && y > 2) setCollapsed(true);
    else if (collapsed && y <= 0) setCollapsed(false);
  }, { passive: true });
  // a reload can restore a scrolled position: start in the matching state, no animation
  if (scroll.scrollTop > 2) { collapsed = true; p = 1; big = 0; mini = 1; }
  paint();

  /* ── Search term ticker ───────────────────────────────────────────────────
     "Search for" stays; the quoted term rises out (0–60ms) and the next one
     rises in from below (50–140ms), clipped to the field — every 3s.         */
  const tk = document.getElementById('searchTk');
  const TERMS = ['“Maybelline”', '“Fresh Fruits”', '“Sunscreen”', '“AirPods”'];
  let ti = 0;
  setInterval(() => {
    if (document.hidden || !tk) return;
    ti = (ti + 1) % TERMS.length;
    const old = tk.firstElementChild;
    const next = document.createElement('span');
    next.textContent = TERMS[ti];
    tk.appendChild(next);
    if (reduce.matches) { old.remove(); return; }
    old.animate([{ transform: 'translateY(0)', opacity: 1 }, { transform: 'translateY(-14px)', opacity: 0 }],
      { duration: 60, easing: 'cubic-bezier(.4,0,1,1)', fill: 'forwards' }).finished.then(() => old.remove());
    next.animate([{ transform: 'translateY(14px)', opacity: 0 }, { transform: 'translateY(0)', opacity: 1 }],
      { duration: 90, delay: 50, easing: 'cubic-bezier(0,0,.2,1)', fill: 'backwards' });
  }, 3000);

  /* ── Banner carousel auto-advance ─────────────────────────────────────────
     One card at a time (204 + gap 12), 300ms on the app's curve (sampled every
     frame of the recording: a symmetric ease-in-out), every 3s; after the last
     card it glides back to the first. A touch, drag or wheel on the row hands
     it to the user and pauses the timer for 4s; it only runs while visible.   */
  const row = document.querySelector('.banners');
  const SLIDE = [0, .013, .042, .084, .139, .207, .278, .363, .447, .536, .62, .705, .78, .848, .903, .949, .979, .996, 1];
  const slideEase = (t) => { const x = clamp01(t) * (SLIDE.length - 1), i = Math.min(SLIDE.length - 2, Math.floor(x)); return SLIDE[i] + (SLIDE[i + 1] - SLIDE[i]) * (x - i); };
  const SLIDE_MS = 300, EVERY = 3000, PAUSE = 4000;
  let pausedUntil = 0, visible = true, gliding = null;
  if (row) {
    const cards = [...row.children];
    const stops = () => cards.map((c) => c.offsetLeft - cards[0].offsetLeft);
    const glide = (to) => {
      const from = row.scrollLeft, t0 = performance.now();
      const tick = (now) => {
        if (gliding !== tick) return;
        const t = (now - t0) / SLIDE_MS;
        row.scrollLeft = from + (to - from) * slideEase(t);
        if (t < 1) requestAnimationFrame(tick); else gliding = null;
      };
      gliding = tick; requestAnimationFrame(tick);
    };
    const hold = () => { gliding = null; pausedUntil = performance.now() + PAUSE; };
    ['pointerdown', 'wheel', 'touchstart'].forEach((ev) => row.addEventListener(ev, hold, { passive: true }));
    new IntersectionObserver(([e]) => { visible = e.isIntersecting; }, { root: scroll }).observe(row);
    setInterval(() => {
      if (document.hidden || !visible || reduce.matches || gliding || performance.now() < pausedUntil) return;
      const s = stops(), max = row.scrollWidth - row.clientWidth;
      const at = s.findIndex((x) => x > row.scrollLeft + 2);
      const to = at < 0 || row.scrollLeft >= max - 2 ? 0 : Math.min(s[at], max);
      glide(to);
    }, EVERY);
  }
})();
