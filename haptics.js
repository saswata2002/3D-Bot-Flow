/* ══ Haptics — iOS-style feedback (engine from the Product Upscale prototype) ══
   Same channels and pacing as noon-home/app.js; only the bot uses it here, so the
   page-wide tap listener is left out, and two kinds are added for Orbi.
   Kinds (named after the iOS generators they map to):
     tick    UISelectionFeedbackGenerator — Orbi turning past a 30° detent
     snap    medium impact @0.8 — Orbi springing back face-on
     edge    rigid impact @0.6 — a vertical drag hitting the tilt limit; Error state
     tap     light impact — pressing the bot; Idle / Working / Dizzy / Sleepy states
     success notification — the entry greeting; Greeting state
     pop     medium impact @0.7 — the entry: Orbi reaching full size        (new)
     land    soft impact @intensity — a hop touching down, by impact speed  (new)
   Channels, best first (only one plays):
   · a native host — window.webkit.messageHandlers.haptic (Vercel Sim and any
     WKWebView shell) → real UIFeedbackGenerators, during drags and animations too
   · Android / Chrome — the Vibration API (after the first user gesture)
   · iPhone Safari (WebKit 18+, no Vibration API) — toggling a hidden native
     <input type="checkbox" switch> plays the system haptic, but only inside a
     user activation — and a touch's activation lands on its RELEASE (pointerup /
     touchend), not its press. So on iOS a pulse fired outside one (a press, a
     beat after a tap) is held and played on the finger's release, if that comes
     within IOS_HOLD_MS; older ones are dropped, so an animation's landing never
     borrows a later, unrelated tap. Animation-only kinds still can't play there. */
window.Haptics = (() => {
  const iOS = /iP(hone|ad|od)/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  const NATIVE = { tick: 'selection', snap: { type: 'medium', intensity: 0.8 }, edge: { type: 'rigid', intensity: 0.6 }, tap: 'light', success: 'success',
    pop: { type: 'medium', intensity: 0.7 } };
  const VIBE = { tick: 4, snap: 12, edge: 10, tap: 8, success: [10, 40, 16], pop: 12 };
  let label = null;
  const sw = () => {
    if (label && label.isConnected) return label;
    label = document.createElement('label');
    label.setAttribute('aria-hidden', 'true');
    label.style.cssText = 'position:fixed;left:-100px;top:0;width:1px;height:1px;opacity:0;overflow:hidden;pointer-events:none';
    const input = document.createElement('input');
    input.type = 'checkbox'; input.setAttribute('switch', ''); input.tabIndex = -1;
    label.appendChild(input); document.body.appendChild(label);
    return label;
  };
  // two pulses inside ~40ms read as one blurred bump (and native hosts merge them): a tick is dropped,
  // anything stronger waits until the gap has passed (≤40ms — still reads as the same moment)
  const GAP = 40;
  const IOS_HOLD_MS = 700;
  let iosHeld = null;
  const iosActive = () => !navigator.userActivation || navigator.userActivation.isActive;
  const iosPlay = (kind) => { sw().click(); if (kind === 'success') setTimeout(() => sw().click(), 90); };
  ['pointerup', 'touchend', 'click'].forEach((ev) => addEventListener(ev, () => {
    const h = iosHeld; iosHeld = null;
    if (h && performance.now() - h.t < IOS_HOLD_MS) try { iosPlay(h.kind); } catch (_) {}
  }, { capture: true, passive: true }));
  let lastAt = -1e9, held = 0;
  function fire(kind, native = NATIVE[kind], vibe = VIBE[kind]) {
    const now = performance.now(), since = now - lastAt;
    if (since < GAP) {
      if (kind === 'tick') return;
      clearTimeout(held); held = setTimeout(() => fire(kind, native, vibe), GAP - since + 1); return;
    }
    lastAt = now;
    try {
      const h = window.webkit && window.webkit.messageHandlers;
      if (h && h.haptic) { h.haptic.postMessage(native || 'light'); return; }
      if (navigator.vibrate) {
        if (!navigator.userActivation || navigator.userActivation.hasBeenActive) navigator.vibrate(vibe || 8);
        return;
      }
      if (iOS) { if (iosActive()) iosPlay(kind); else iosHeld = { kind, t: performance.now() }; }
    } catch (_) {}
  }
  // land: 0..1 — a soft impact whose strength follows the touchdown speed
  const land = (i) => {
    const k = Math.max(0.3, Math.min(1, i));
    fire('land', { type: 'soft', intensity: +k.toFixed(2) }, Math.round(5 + 9 * k));
  };
  return { tick: () => fire('tick'), snap: () => fire('snap'), edge: () => fire('edge'), tap: () => fire('tap'),
    success: () => fire('success'), pop: () => fire('pop'), land };
})();

/* ── Page taps (the Product Upscale engine's tap listener, adapted to Home) ──
   Controls play on touch-down, like iOS buttons. Anything inside a scroller
   (the header tiles, rails, cards, tabs) plays on a clean release instead
   (moved < 8px, < 600ms), so starting a swipe or a scroll on it never buzzes.
     tick     a selection change: a Recommended tab, a bottom-nav item
              (nothing when tapping the one already selected)
     success  add to cart (+)
     tap      everything else that's tappable
   The bot, the Orbi sheet and its scrim play their own (orbi/main.js). */
(() => {
  const H = window.Haptics;
  const KINDS = [
    ['.sku__add', 'success'],
    ['.tab, .bnav__it', 'tick'],
    ['.sku__wish, .addr__wish, .addr__loc, .search, .vid, .summer__mute, .lc__btn', 'tap'],
    ['.tile, .hw, .cat, .sku, .cp, .kc, .lc', 'tap'],
  ];
  const ANY = KINDS.map((k) => k[0]).join(', ');
  const kindOf = (el) => KINDS.find(([q]) => el.matches(q))[1];
  let pending = null;
  addEventListener('pointerdown', (e) => {
    pending = null;
    const t = e.target.closest && e.target.closest(ANY);
    if (!t || e.target.closest('#orbiHit, .sheet, .sheet-scrim')) return;
    const kind = kindOf(t);
    if (kind === 'tick' && t.classList.contains('is-on')) return;          // already selected
    if (t.closest('.scroll, .hscroll')) { pending = { kind, x: e.clientX, y: e.clientY, t: performance.now() }; return; }
    H[kind]();
  }, { capture: true, passive: true });
  addEventListener('pointerup', (e) => {
    const p = pending; pending = null;
    if (p && Math.hypot(e.clientX - p.x, e.clientY - p.y) < 8 && performance.now() - p.t < 600) H[p.kind]();
  }, { capture: true, passive: true });
  addEventListener('pointercancel', () => { pending = null; }, { capture: true, passive: true });
})();
