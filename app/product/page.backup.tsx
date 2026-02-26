'use client';

import { useState, useEffect, useRef } from 'react';

/* ─────────────────────────────────────────
   NOODLE PACK SVG ILLUSTRATION
───────────────────────────────────────── */
function PackIllustration({ activeTab }: { activeTab: string }) {
  return (
    <div className="pack-3d">
      <svg viewBox="0 0 420 520" xmlns="http://www.w3.org/2000/svg" className="pack-svg">
        <defs>
          <linearGradient id="packGold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#D4AD52" />
            <stop offset="50%" stopColor="#B8922A" />
            <stop offset="100%" stopColor="#8A6C18" />
          </linearGradient>
          <linearGradient id="packSide" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#6A4E10" />
            <stop offset="100%" stopColor="#8A6C18" />
          </linearGradient>
          <linearGradient id="packSheen" x1="0%" y1="0%" x2="60%" y2="100%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.18)" />
            <stop offset="40%" stopColor="rgba(255,255,255,0.04)" />
            <stop offset="100%" stopColor="rgba(0,0,0,0.1)" />
          </linearGradient>
          <linearGradient id="shadowGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(0,0,0,0.35)" />
            <stop offset="100%" stopColor="rgba(0,0,0,0)" />
          </linearGradient>
          <filter id="softShadow" x="-20%" y="-10%" width="140%" height="140%">
            <feDropShadow dx="0" dy="12" stdDeviation="20" floodColor="rgba(0,0,0,0.3)" />
          </filter>
          <clipPath id="frontClip">
            <rect x="80" y="60" width="240" height="380" rx="6" />
          </clipPath>
          <linearGradient id="noodleGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#E8D5A0" />
            <stop offset="50%" stopColor="#D4B870" />
            <stop offset="100%" stopColor="#C9A85C" />
          </linearGradient>
        </defs>

        {/* Drop shadow ellipse */}
        <ellipse cx="210" cy="488" rx="130" ry="18" fill="rgba(0,0,0,0.18)" className="pack-shadow" />

        {/* ── PACK SIDE (right) ── */}
        <path d="M320,70 L380,95 L380,435 L320,440 Z" fill="url(#packSide)" />
        <path d="M320,70 L380,95 L380,435 L320,440 Z" fill="url(#packSheen)" opacity="0.5" />
        {/* Side text */}
        <text transform="translate(360,380) rotate(-90)" fontFamily="'DM Mono',monospace" fontSize="9" fill="rgba(255,255,255,0.35)" letterSpacing="3">ZHEN · WHEAT NOODLES · 400g</text>

        {/* ── PACK FRONT ── */}
        <rect x="80" y="60" width="240" height="380" rx="6" fill="url(#packGold)" filter="url(#softShadow)" />

        {/* Top dark band */}
        <rect x="80" y="60" width="240" height="52" rx="6" fill="#6A4E10" clipPath="url(#frontClip)" />
        <rect x="80" y="60" width="240" height="52" fill="#6A4E10" clipPath="url(#frontClip)" />

        {/* Top band content */}
        <text x="200" y="80" fontFamily="'DM Mono',monospace" fontSize="8" fill="rgba(255,255,255,0.45)" textAnchor="middle" letterSpacing="4">PREMIUM INDO-CHINESE</text>
        <text x="200" y="100" fontFamily="'Cormorant Garamond',serif" fontSize="22" fontWeight="700" fill="rgba(255,220,140,0.9)" textAnchor="middle" letterSpacing="2">真 · AUTHENTIC</text>

        {/* Main gold body */}
        <rect x="80" y="112" width="240" height="240" fill="url(#packGold)" clipPath="url(#frontClip)" />

        {/* Decorative border frame */}
        <rect x="92" y="118" width="216" height="228" rx="3" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
        <rect x="96" y="122" width="208" height="220" rx="2" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />

        {/* ZHEN brand name - large */}
        <text x="200" y="188" fontFamily="'Cormorant Garamond',serif" fontSize="72" fontWeight="700" fill="white" textAnchor="middle" opacity="0.95" letterSpacing="4">ZHEN</text>

        {/* Decorative noodle swirl illustration */}
        <g clipPath="url(#frontClip)" opacity="0.22">
          {[0,1,2,3,4,5].map(i => (
            <ellipse key={i} cx="200" cy="235" rx={85-i*10} ry={28-i*3} fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth="2" />
          ))}
        </g>

        {/* 50/50 badge */}
        <rect x="152" y="210" width="96" height="46" rx="4" fill="rgba(0,0,0,0.2)" />
        <rect x="153" y="211" width="94" height="44" rx="3" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="0.8" />
        <text x="178" y="230" fontFamily="'Cormorant Garamond',serif" fontSize="20" fontWeight="700" fill="white" textAnchor="middle">50</text>
        <text x="200" y="230" fontFamily="'Cormorant Garamond',serif" fontSize="14" fill="rgba(255,255,255,0.5)" textAnchor="middle">/</text>
        <text x="222" y="230" fontFamily="'Cormorant Garamond',serif" fontSize="20" fontWeight="700" fill="white" textAnchor="middle">50</text>
        <text x="200" y="248" fontFamily="'DM Mono',monospace" fontSize="7.5" fill="rgba(255,255,255,0.55)" textAnchor="middle" letterSpacing="2">WHEAT · MAIDA</text>

        {/* Tagline */}
        <text x="200" y="280" fontFamily="'Cormorant Garamond',serif" fontSize="13" fontStyle="italic" fill="rgba(255,255,255,0.75)" textAnchor="middle">Superior Bite · Perfect Texture</text>

        {/* Bottom info band */}
        <rect x="80" y="352" width="240" height="88" rx="0" fill="#6A4E10" clipPath="url(#frontClip)" />
        {/* Divider */}
        <line x1="80" y1="352" x2="320" y2="352" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />

        {/* Bottom content */}
        <text x="200" y="374" fontFamily="'DM Mono',monospace" fontSize="8" fill="rgba(255,255,255,0.45)" textAnchor="middle" letterSpacing="3">NET WEIGHT</text>
        <text x="200" y="396" fontFamily="'Cormorant Garamond',serif" fontSize="30" fontWeight="700" fill="rgba(255,220,140,0.95)" textAnchor="middle">400g</text>
        <text x="200" y="416" fontFamily="'DM Mono',monospace" fontSize="7.5" fill="rgba(255,255,255,0.3)" textAnchor="middle" letterSpacing="3">NO PRESERVATIVES · FSSAI LICENSED</text>
        <text x="200" y="432" fontFamily="'DM Mono',monospace" fontSize="7" fill="rgba(255,255,255,0.2)" textAnchor="middle" letterSpacing="2">MFG BY VN TRADERS · INDIA</text>

        {/* Sheen overlay */}
        <rect x="80" y="60" width="240" height="380" rx="6" fill="url(#packSheen)" clipPath="url(#frontClip)" />

        {/* Top tab/seal */}
        <path d="M140,60 L260,60 L268,42 L132,42 Z" fill="#5A3E0C" />
        <path d="M140,60 L260,60 L268,42 L132,42 Z" fill="url(#packSheen)" opacity="0.3" />
        <line x1="132" y1="42" x2="268" y2="42" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
        <text x="200" y="55" fontFamily="'DM Mono',monospace" fontSize="7" fill="rgba(255,255,255,0.3)" textAnchor="middle" letterSpacing="3">TEAR HERE TO OPEN</text>

        {/* Bottom tab */}
        <path d="M140,440 L260,440 L268,458 L132,458 Z" fill="#5A3E0C" />
        <path d="M140,440 L260,440 L268,458 L132,458 Z" fill="url(#packSheen)" opacity="0.2" />
      </svg>
    </div>
  );
}

/* ─────────────────────────────────────────
   NUTRITION RING
───────────────────────────────────────── */
function NutritionRing({ value, label, color, max = 100 }: { value: number; label: string; color: string; max?: number }) {
  const r = 28;
  const circ = 2 * Math.PI * r;
  const pct = Math.min(value / max, 1);
  return (
    <div className="nut-ring">
      <svg viewBox="0 0 72 72" width="72" height="72">
        <circle cx="36" cy="36" r={r} fill="none" stroke="rgba(17,16,9,0.08)" strokeWidth="5" />
        <circle
          cx="36" cy="36" r={r} fill="none"
          stroke={color} strokeWidth="5"
          strokeDasharray={`${pct * circ} ${circ}`}
          strokeLinecap="round"
          transform="rotate(-90 36 36)"
          className="nut-arc"
        />
        <text x="36" y="40" fontFamily="'Cormorant Garamond',serif" fontSize="14" fontWeight="700" fill="var(--ink)" textAnchor="middle">{value}</text>
      </svg>
      <span className="nut-label">{label}</span>
    </div>
  );
}

/* ─────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────── */
export default function ZhenProduct() {
  const [scrollY, setScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [qty, setQty] = useState(1);
  const [toastVisible, setToastVisible] = useState(false);

  const NAV_LINKS = [
    { label: 'Product', href: '#' },
    { label: 'Why ZHEN', href: '#why' },
    { label: 'Distribution', href: '#dist' },
    { label: 'About', href: '#about' },
  ];

  const WA_URL = 'https://wa.me/919999999999?text=Hi%2C%20I%20am%20interested%20in%20ZHEN%20Wheat%20Noodles.';

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', onScroll, { passive: true });

    const obs = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in-view'); }),
      { threshold: 0.08 }
    );
    document.querySelectorAll('.reveal').forEach(el => obs.observe(el));

    return () => { window.removeEventListener('scroll', onScroll); obs.disconnect(); };
  }, []);

  const handleEnquiry = () => {
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 3000);
  };

  const tabs = ['overview', 'specs', 'nutrition'];

  return (
    <div className="root">

      {/* ── TOAST ── */}
      <div className={`toast ${toastVisible ? 'toast--show' : ''}`}>
        ✓ Redirecting to WhatsApp trade enquiry
      </div>

      {/* ── FAB ── */}
      <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="fab" aria-label="WhatsApp Trade Enquiry">
        <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
        </svg>
        <span>Trade Enquiry</span>
      </a>

      {/* ── NAVBAR ── */}
      <header className={`nav ${scrollY > 60 ? 'nav--solid' : ''}`}>
        <div className="container nav__inner">
          <a href="/" className="nav__brand">
            <span className="brand-z">ZHEN</span>
            <span className="brand-sub">真 · by VN Traders</span>
          </a>
          <nav className="nav__links">
            {NAV_LINKS.map(l => (
              <a key={l.href} href={l.href} className="nav__link">{l.label}</a>
            ))}
          </nav>
          <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="nav__cta">
            Become a Distributor
          </a>
          <button className="nav__burger" onClick={() => setMobileMenuOpen(o => !o)} aria-label="Toggle menu">
            <span className={mobileMenuOpen ? 'open' : ''} />
            <span className={mobileMenuOpen ? 'open' : ''} />
            <span className={mobileMenuOpen ? 'open' : ''} />
          </button>
        </div>
        {mobileMenuOpen && (
          <div className="nav__mobile">
            {NAV_LINKS.map(l => (
              <a key={l.href} href={l.href} className="nav__mobile-link" onClick={() => setMobileMenuOpen(false)}>{l.label}</a>
            ))}
            <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="nav__mobile-cta" onClick={() => setMobileMenuOpen(false)}>Become a Distributor</a>
          </div>
        )}
      </header>

      {/* ══════════════════════════════
          BREADCRUMB
      ══════════════════════════════ */}
      <div className="breadcrumb-bar">
        <div className="container breadcrumb-inner">
          <a href="/">Home</a>
          <span>→</span>
          <a href="/products">Products</a>
          <span>→</span>
          <span className="bc-current">ZHEN Wheat Noodles</span>
        </div>
      </div>

      {/* ══════════════════════════════
          PRODUCT HERO
      ══════════════════════════════ */}
      <section className="product-hero">
        <div className="container product-hero__inner">

          {/* Left: pack illustration */}
          <div className="product-hero__visual reveal">
            <div className="pack-bg-circle" />
            <PackIllustration activeTab={activeTab} />
            <div className="pack-badges">
              <span className="badge badge--fssai">FSSAI Certified</span>
              <span className="badge badge--fresh">No Preservatives</span>
            </div>
          </div>

          {/* Right: product info */}
          <div className="product-hero__info reveal">
            <div className="product-label">India's First 50/50 Blend</div>
            <h1 className="product-name">ZHEN Wheat<br /><em>Noodles</em></h1>
            <p className="product-sub">
              A proprietary 50% wheat, 50% maida formulation — engineered for superior bite, sauce adhesion, and wok performance.
            </p>

            {/* Price */}
            <div className="price-row">
              <div className="price-block">
                <span className="price-tag">MRP</span>
                <span className="price-val">₹120</span>
                <span className="price-per">/ 400g pack</span>
              </div>
              <div className="price-incl">Incl. all taxes · Free shipping above ₹500</div>
            </div>

            {/* Key attributes */}
            <div className="attr-row">
              {[
                { icon: '⚖️', label: '400g', sub: 'Net Weight' },
                { icon: '⏱', label: '7 -9 min', sub: 'Cook Time' },
                { icon: '📅', label: '12 mo.', sub: 'Shelf Life' },
              ].map((a, i) => (
                <div key={i} className="attr-chip">
                  <span className="attr-icon">{a.icon}</span>
                  <span className="attr-val">{a.label}</span>
                  <span className="attr-sub">{a.sub}</span>
                </div>
              ))}
            </div>

            {/* Qty + CTA */}
            <div className="purchase-row">
              <div className="qty-ctrl">
                <button className="qty-btn" onClick={() => setQty(q => Math.max(1, q - 1))}>−</button>
                <span className="qty-val">{qty}</span>
                <button className="qty-btn" onClick={() => setQty(q => q + 1)}>+</button>
              </div>
              <a
                href={WA_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--primary btn--grow"
                onClick={handleEnquiry}
              >
                Enquire on WhatsApp
              </a>
            </div>

            <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="btn btn--ghost btn--full">
              Request Trade Price Sheet
            </a>

            {/* Trust row */}
            <div className="trust-row">
              {['FSSAI Licensed', 'Batch Traceable', 'HoReCa Ready', 'Distributor MOQ: 50 Ctn'].map((t, i) => (
                <span key={i} className="trust-chip">✓ {t}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════
          TAB SECTION
      ══════════════════════════════ */}
      <section className="tab-section">
        <div className="container">
          <div className="tab-bar reveal">
            {tabs.map(t => (
              <button
                key={t}
                className={`tab-btn ${activeTab === t ? 'tab-btn--active' : ''}`}
                onClick={() => setActiveTab(t)}
              >
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            ))}
          </div>

          {/* OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="tab-content reveal">
              <div className="overview-grid">
                <div className="ov-card ov-card--highlight">
                  <div className="ov-tag">Proprietary Formula</div>
                  <h3>The 50/50 Advantage</h3>
                  <p>No other noodle in the Indian market uses an exact 50/50 wheat-to-maida ratio. The result is a noodle with natural bran depth from wheat, combined with the silky stretch of maida — producing superior sauce cling and wok char.</p>
                </div>
                <div className="ov-card">
                  <div className="ov-tag">Formats</div>
                  <h3>Thin & Medium</h3>
                  <p>Currently available in Thin and Medium. Thick variant launching Q2 2025 for HoReCa bulk accounts.</p>
                </div>
                <div className="ov-card">
                  <div className="ov-tag">Packaging</div>
                  <h3>Retail · HoReCa · Bulk</h3>
                  <p>400g retail packs, 5kg and 20kg bulk formats for commercial kitchens. All FSSAI compliant with full ingredient transparency.</p>
                </div>
              </div>
            </div>
          )}

          {/* SPECS */}
          {activeTab === 'specs' && (
            <div className="tab-content reveal">
              <div className="specs-wrap">
                {[
                  { label: 'Composition', value: '50% Wheat Flour · 50% Refined Maida' },
                  { label: 'Pack Weight', value: '400g' },
                  { label: 'Shelf Life', value: '12 Months from manufacture date' },
                  { label: 'Available Variants', value: 'Thin, Medium (Thick — Q2 2025)' },
                  { label: 'Cook Time', value: '7 -9 minutes in boiling water' },
                  { label: 'Preservatives', value: 'None — clean label' },
                  { label: 'FSSAI Status', value: 'Licensed · Certificate available on request' },
                  { label: 'Storage', value: 'Cool, dry place below 30°C' },
                  { label: 'MOQ (Distributor)', value: '50 Cartons (12 packs × 400g)' },
                  { label: 'Lead Time', value: '4–7 Working Days' },
                ].map((r, i) => (
                  <div key={i} className="spec-row">
                    <span className="spec-key">{r.label}</span>
                    <span className="spec-val">{r.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* NUTRITION */}
          {activeTab === 'nutrition' && (
            <div className="tab-content reveal">
              <div className="nutrition-wrap">
                <div className="nut-header">
                  <h3>Nutrition Facts</h3>
                  <span className="nut-serving">Per 100g serving (approx. ¼ pack)</span>
                </div>
                <div className="nut-rings">
                  <NutritionRing value={348} label="Calories (kcal)" color="#B8922A" max={600} />
                  <NutritionRing value={72} label="Carbs (g)" color="#D4AD52" max={100} />
                  <NutritionRing value={11} label="Protein (g)" color="#8A6C18" max={30} />
                  <NutritionRing value={1.4} label="Fat (g)" color="#C9A85C" max={10} />
                </div>
                <div className="nut-table">
                  {[
                    { name: 'Energy', val: '348 kcal' },
                    { name: 'Total Carbohydrates', val: '72g' },
                    { name: 'Dietary Fibre', val: '2.4g' },
                    { name: 'Total Protein', val: '11g' },
                    { name: 'Total Fat', val: '1.4g' },
                    { name: 'Saturated Fat', val: '0.3g' },
                    { name: 'Sodium', val: '18mg' },
                    { name: 'Iron', val: '1.8mg' },
                  ].map((n, i) => (
                    <div key={i} className="nut-row">
                      <span>{n.name}</span>
                      <span className="nut-val">{n.val}</span>
                    </div>
                  ))}
                </div>
                <p className="nut-disclaimer">* Typical values. Actual nutritional content may vary slightly by batch. Based on FSSAI-compliant laboratory analysis.</p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ══════════════════════════════
          BLEND BANNER
      ══════════════════════════════ */}
      <section className="blend-banner reveal">
        <div className="container blend-inner">
          <div className="blend-half blend-half--wheat">
            <span className="blend-pct">50%</span>
            <span className="blend-name">Wheat Flour</span>
            <p>Whole grain depth, natural fibre, earthy flavour foundation</p>
          </div>
          <div className="blend-divider">
            <div className="blend-divider-line" />
            <span className="blend-plus">+</span>
            <div className="blend-divider-line" />
          </div>
          <div className="blend-half blend-half--maida">
            <span className="blend-pct">50%</span>
            <span className="blend-name">Refined Maida</span>
            <p>Silky elasticity, smooth texture, superior sauce adhesion</p>
          </div>
          <div className="blend-result">
            <span className="blend-eq">=</span>
            <span className="blend-result-text">Perfect Noodle</span>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════
          FINAL CTA STRIP
      ══════════════════════════════ */}
      <section className="cta-strip reveal">
        <div className="container cta-strip-inner">
          <div className="cta-strip-text">
            <div className="cta-strip-tag">Trade Partners Welcome</div>
            <h2>Ready to stock <em>ZHEN</em>?</h2>
            <p>Available nationwide. Full trade documentation and FSSAI certificate on request.</p>
          </div>
          <div className="cta-strip-actions">
            <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="btn btn--primary btn--large">WhatsApp: Start Enquiry</a>
            <a href="mailto:trade@zhen.in" className="btn btn--ghost btn--large">trade@zhen.in</a>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════
          FOOTER
      ══════════════════════════════ */}
      <footer className="footer">
        <div className="container footer__inner">
          <div className="footer__brand">
            <div className="footer__logo">
              <span className="brand-z">ZHEN</span>
              <span className="brand-sub">真 · by VN Traders</span>
            </div>
            <p>Premium Indo-Chinese noodles. Manufactured in India. Distributed nationally.</p>
          </div>
          <div className="footer__col">
            <h4>Product</h4>
            <a href="#">ZHEN Wheat Noodles</a>
            <a href="#">Specifications</a>
            <a href="#">Coming Soon</a>
          </div>
          <div className="footer__col">
            <h4>Trade</h4>
            <a href="#">Become a Distributor</a>
            <a href="#">HoReCa Supply</a>
            <a href="#">Modern Trade</a>
          </div>
          <div className="footer__col">
            <h4>Contact</h4>
            <a href="mailto:trade@zhen.in">trade@zhen.in</a>
            <a href="tel:+919999999999">+91 99999 99999</a>
            <a href={WA_URL} target="_blank" rel="noopener noreferrer">WhatsApp</a>
          </div>
        </div>
        <div className="container footer__bottom">
          <span>© 2024 ZHEN by VN Traders. All rights reserved.</span>
          <div>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Use</a>
          </div>
        </div>
      </footer>

      {/* ══════════════════════════════
          STYLES
      ══════════════════════════════ */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,700&family=DM+Mono:wght@300;400;500&family=Instrument+Sans:wght@400;500;600&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; -webkit-font-smoothing: antialiased; }

        :root {
          --gold: #B8922A;
          --gold-lt: #D4AD52;
          --gold-dk: #8A6C18;
          --ink: #111009;
          --ink-70: rgba(17,16,9,0.7);
          --ink-40: rgba(17,16,9,0.4);
          --ink-15: rgba(17,16,9,0.15);
          --ink-06: rgba(17,16,9,0.06);
          --cream: #F7F4EE;
          --cream-dk: #EDE8DC;
          --dark: #141210;
          --dark-2: #1D1B17;
          --font-display: 'Cormorant Garamond', serif;
          --font-body: 'Instrument Sans', sans-serif;
          --font-mono: 'DM Mono', monospace;
          --max-w: 1240px;
        }

        .root {
          font-family: var(--font-body);
          background: var(--cream);
          color: var(--ink);
          overflow-x: hidden;
          font-size: 16px;
          line-height: 1.6;
        }

        .container {
          max-width: var(--max-w);
          margin-inline: auto;
          padding-inline: clamp(20px, 5vw, 60px);
        }

        .reveal {
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .reveal.in-view { opacity: 1; transform: none; }

        em { font-style: italic; color: var(--gold); font-family: var(--font-display); }

        /* ── TOAST ── */
        .toast {
          position: fixed; top: 80px; left: 50%; transform: translateX(-50%) translateY(-20px);
          background: var(--ink); color: white; padding: 12px 24px; border-radius: 50px;
          font-family: var(--font-mono); font-size: 12px; letter-spacing: 0.06em;
          z-index: 1000; opacity: 0; transition: all 0.3s ease; pointer-events: none;
        }
        .toast--show { opacity: 1; transform: translateX(-50%) translateY(0); }

        /* ── FAB ── */
        .fab {
          position: fixed; bottom: 28px; right: 28px; z-index: 900;
          display: flex; align-items: center; gap: 10px;
          background: #25D366; color: white; text-decoration: none;
          padding: 13px 20px 13px 16px; border-radius: 50px;
          font-family: var(--font-body); font-size: 13px; font-weight: 600;
          box-shadow: 0 4px 24px rgba(37,211,102,0.35);
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .fab:hover { transform: translateY(-2px); box-shadow: 0 8px 32px rgba(37,211,102,0.45); }

        /* ── BUTTONS ── */
        .btn {
          display: inline-flex; align-items: center; justify-content: center;
          gap: 8px; font-family: var(--font-body); font-size: 14px; font-weight: 600;
          letter-spacing: 0.02em; text-decoration: none; padding: 13px 28px;
          border-radius: 4px; transition: all 0.18s ease; border: 1.5px solid transparent;
          cursor: pointer; white-space: nowrap;
        }
        .btn--primary { background: var(--gold); color: white; border-color: var(--gold); }
        .btn--primary:hover { background: var(--gold-dk); border-color: var(--gold-dk); transform: translateY(-1px); }
        .btn--ghost { background: transparent; color: var(--ink); border-color: var(--ink-40); }
        .btn--ghost:hover { border-color: var(--gold); color: var(--gold); }
        .btn--large { padding: 16px 36px; font-size: 15px; }
        .btn--full { width: 100%; margin-top: 10px; }
        .btn--grow { flex: 1; }

        /* ── NAVBAR ── */
        .nav {
          position: fixed; top: 0; left: 0; right: 0; z-index: 800;
          padding: 22px 0; transition: background 0.3s, padding 0.3s, border-color 0.3s;
          border-bottom: 1px solid transparent;
        }
        .nav--solid {
          background: rgba(247,244,238,0.97); backdrop-filter: blur(16px);
          padding: 15px 0; border-color: var(--ink-15);
        }
        .nav__inner { display: flex; align-items: center; gap: 40px; }
        .nav__brand { display: flex; flex-direction: column; text-decoration: none; line-height: 1; margin-right: auto; }
        .brand-z { font-family: var(--font-display); font-size: 22px; font-weight: 700; color: var(--gold); letter-spacing: 0.1em; }
        .brand-sub { font-family: var(--font-mono); font-size: 9px; color: var(--ink-40); letter-spacing: 0.12em; margin-top: 3px; }
        .nav__links { display: flex; align-items: center; gap: 36px; }
        .nav__link { text-decoration: none; color: var(--ink-70); font-size: 14px; font-weight: 500; transition: color 0.18s; }
        .nav__link:hover { color: var(--gold); }
        .nav__cta { display: inline-flex; align-items: center; background: var(--ink); color: white; text-decoration: none; font-size: 13px; font-weight: 600; padding: 10px 22px; border-radius: 4px; transition: background 0.18s; flex-shrink: 0; }
        .nav__cta:hover { background: var(--gold); }
        .nav__burger { display: none; flex-direction: column; gap: 5px; background: none; border: none; cursor: pointer; padding: 4px; margin-left: auto; }
        .nav__burger span { display: block; width: 24px; height: 2px; background: var(--ink); border-radius: 2px; transition: all 0.25s ease; }
        .nav__burger span.open:nth-child(1) { transform: translateY(7px) rotate(45deg); }
        .nav__burger span.open:nth-child(2) { opacity: 0; }
        .nav__burger span.open:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }
        .nav__mobile { background: var(--cream); border-top: 1px solid var(--ink-15); padding: 12px 0; display: flex; flex-direction: column; }
        .nav__mobile-link { display: block; padding: 14px clamp(20px,5vw,60px); color: var(--ink); text-decoration: none; font-size: 15px; font-weight: 500; border-bottom: 1px solid var(--ink-06); }
        .nav__mobile-link:hover { color: var(--gold); }
        .nav__mobile-cta { display: block; margin: 14px clamp(20px,5vw,60px) 8px; text-align: center; background: var(--gold); color: white; text-decoration: none; padding: 12px; border-radius: 4px; font-size: 14px; font-weight: 600; }

        /* ── BREADCRUMB ── */
        .breadcrumb-bar {
          margin-top: 73px;
          background: white;
          border-bottom: 1px solid var(--ink-06);
          padding: 12px 0;
        }
        .breadcrumb-inner {
          display: flex; align-items: center; gap: 10px;
          font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.06em;
          color: var(--ink-40);
        }
        .breadcrumb-inner a { color: var(--ink-40); text-decoration: none; transition: color 0.18s; }
        .breadcrumb-inner a:hover { color: var(--gold); }
        .bc-current { color: var(--ink-70); font-weight: 500; }

        /* ── PRODUCT HERO ── */
        .product-hero {
          padding: 64px 0 80px;
          background: var(--cream);
        }
        .product-hero__inner {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(40px, 6vw, 80px);
          align-items: center;
        }

        /* Pack illustration */
        .product-hero__visual {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 20px;
        }
        .pack-bg-circle {
          position: absolute;
          width: 380px; height: 380px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(184,146,42,0.08) 0%, transparent 70%);
          top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          pointer-events: none;
        }
        .pack-3d {
          position: relative;
          width: 100%;
          max-width: 400px;
          animation: packFloat 4s ease-in-out infinite;
        }
        .pack-svg { width: 100%; height: auto; display: block; }
        .pack-shadow { animation: shadowPulse 4s ease-in-out infinite; }

        @keyframes packFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }
        @keyframes shadowPulse {
          0%, 100% { rx: 130; opacity: 0.18; }
          50% { rx: 110; opacity: 0.1; }
        }

        .nut-arc { transition: stroke-dasharray 1s ease; animation: arcIn 1s ease forwards; }
        @keyframes arcIn {
          from { stroke-dasharray: 0 200; }
        }

        .pack-badges { display: flex; gap: 10px; flex-wrap: wrap; justify-content: center; }
        .badge {
          font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.12em;
          text-transform: uppercase; padding: 6px 14px; border-radius: 50px;
        }
        .badge--fssai { background: rgba(184,146,42,0.12); color: var(--gold-dk); border: 1px solid rgba(184,146,42,0.25); }
        .badge--fresh { background: rgba(45,138,45,0.1); color: #2D7A2D; border: 1px solid rgba(45,138,45,0.2); }

        /* Product info */
        .product-hero__info { display: flex; flex-direction: column; gap: 24px; }
        .product-label { font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; color: var(--gold); }
        .product-name { font-family: var(--font-display); font-size: clamp(48px, 5.5vw, 76px); font-weight: 700; line-height: 1; letter-spacing: -0.02em; color: var(--ink); }
        .product-sub { font-size: 16px; line-height: 1.75; color: var(--ink-70); max-width: 420px; }

        /* Price */
        .price-row { display: flex; flex-direction: column; gap: 6px; padding: 20px; background: white; border: 1px solid var(--ink-15); border-radius: 6px; }
        .price-block { display: flex; align-items: baseline; gap: 10px; }
        .price-tag { font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.15em; text-transform: uppercase; color: var(--ink-40); }
        .price-val { font-family: var(--font-display); font-size: 48px; font-weight: 700; color: var(--gold); line-height: 1; }
        .price-per { font-size: 14px; color: var(--ink-40); }
        .price-incl { font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.04em; color: var(--ink-40); }

        /* Attributes */
        .attr-row { display: flex; gap: 12px; }
        .attr-chip { display: flex; flex-direction: column; align-items: center; padding: 14px 20px; background: white; border: 1px solid var(--ink-06); border-radius: 6px; gap: 3px; flex: 1; text-align: center; }
        .attr-icon { font-size: 18px; }
        .attr-val { font-family: var(--font-display); font-size: 18px; font-weight: 700; color: var(--ink); line-height: 1; }
        .attr-sub { font-family: var(--font-mono); font-size: 9px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--ink-40); }

        /* Purchase */
        .purchase-row { display: flex; gap: 14px; align-items: stretch; }
        .qty-ctrl { display: flex; align-items: center; gap: 0; background: white; border: 1px solid var(--ink-15); border-radius: 4px; overflow: hidden; }
        .qty-btn { width: 40px; height: 100%; background: none; border: none; font-size: 18px; cursor: pointer; color: var(--ink-70); transition: background 0.15s; padding: 0; display: flex; align-items: center; justify-content: center; }
        .qty-btn:hover { background: var(--ink-06); }
        .qty-val { font-family: var(--font-display); font-size: 18px; font-weight: 700; color: var(--ink); padding: 0 16px; min-width: 48px; text-align: center; }

        /* Trust */
        .trust-row { display: flex; flex-wrap: wrap; gap: 8px; }
        .trust-chip { font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.06em; color: var(--ink-40); }

        /* ── TAB SECTION ── */
        .tab-section { padding: 0 0 80px; background: var(--cream); }
        .tab-bar {
          display: flex; gap: 0; border-bottom: 1px solid var(--ink-15);
          margin-bottom: 48px;
        }
        .tab-btn {
          padding: 16px 32px; background: none; border: none; border-bottom: 2px solid transparent;
          font-family: var(--font-body); font-size: 14px; font-weight: 600; letter-spacing: 0.04em;
          color: var(--ink-40); cursor: pointer; transition: all 0.2s; text-transform: capitalize;
          margin-bottom: -1px;
        }
        .tab-btn:hover { color: var(--ink); }
        .tab-btn--active { color: var(--gold); border-bottom-color: var(--gold); }

        .tab-content { animation: fadeUp 0.4s ease; }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: none; }
        }

        /* Overview */
        .overview-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
        .ov-card--highlight { grid-column: 1 / -1; }
        .ov-card {
          background: white; border: 1px solid var(--ink-15); border-radius: 8px;
          padding: 36px; display: flex; flex-direction: column; gap: 12px;
          transition: box-shadow 0.2s;
        }
        .ov-card:hover { box-shadow: 0 6px 28px rgba(0,0,0,0.06); }
        .ov-card--highlight { background: var(--gold); border-color: var(--gold); }
        .ov-card--highlight .ov-tag { color: rgba(255,255,255,0.65); }
        .ov-card--highlight h3 { color: white; }
        .ov-card--highlight p { color: rgba(255,255,255,0.8); }
        .ov-tag { font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase; color: var(--gold); }
        .ov-card h3 { font-family: var(--font-display); font-size: 24px; font-weight: 700; color: var(--ink); line-height: 1.2; }
        .ov-card p { font-size: 15px; line-height: 1.75; color: var(--ink-70); }

        /* Specs */
        .specs-wrap { background: white; border: 1px solid var(--ink-15); border-radius: 8px; overflow: hidden; }
        .spec-row {
          display: grid; grid-template-columns: 220px 1fr; gap: 20px;
          padding: 18px 28px; border-bottom: 1px solid var(--ink-06);
          align-items: start;
        }
        .spec-row:last-child { border-bottom: none; }
        .spec-row:nth-child(even) { background: var(--cream); }
        .spec-key { font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.05em; color: var(--ink-40); padding-top: 2px; }
        .spec-val { font-size: 15px; font-weight: 500; color: var(--ink); }

        /* Nutrition */
        .nutrition-wrap { display: flex; flex-direction: column; gap: 32px; }
        .nut-header { display: flex; align-items: baseline; gap: 16px; }
        .nut-header h3 { font-family: var(--font-display); font-size: 28px; font-weight: 700; color: var(--ink); }
        .nut-serving { font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.06em; color: var(--ink-40); }
        .nut-rings { display: flex; gap: 24px; flex-wrap: wrap; }
        .nut-ring { display: flex; flex-direction: column; align-items: center; gap: 8px; }
        .nut-label { font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.08em; color: var(--ink-40); text-align: center; max-width: 80px; }
        .nut-table { background: white; border: 1px solid var(--ink-15); border-radius: 8px; overflow: hidden; }
        .nut-row { display: flex; justify-content: space-between; padding: 14px 24px; border-bottom: 1px solid var(--ink-06); font-size: 14px; color: var(--ink-70); }
        .nut-row:last-child { border-bottom: none; }
        .nut-val { font-weight: 600; color: var(--ink); font-family: var(--font-mono); font-size: 13px; }
        .nut-disclaimer { font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.04em; color: var(--ink-40); line-height: 1.6; }

        /* ── BLEND BANNER ── */
        .blend-banner { background: var(--dark); padding: 72px 0; }
        .blend-inner {
          display: flex; align-items: center; justify-content: center;
          gap: clamp(24px, 5vw, 60px); flex-wrap: wrap;
        }
        .blend-half { display: flex; flex-direction: column; gap: 8px; max-width: 220px; }
        .blend-half--wheat { text-align: right; }
        .blend-half--maida { text-align: left; }
        .blend-pct { font-family: var(--font-display); font-size: clamp(48px, 7vw, 80px); font-weight: 700; color: var(--gold-lt); line-height: 1; }
        .blend-name { font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; color: rgba(255,255,255,0.55); }
        .blend-half p { font-size: 13px; color: rgba(255,255,255,0.35); line-height: 1.6; }
        .blend-divider { display: flex; flex-direction: column; align-items: center; gap: 12px; }
        .blend-divider-line { width: 1px; height: 48px; background: rgba(255,255,255,0.12); }
        .blend-plus { font-family: var(--font-display); font-size: 32px; color: var(--gold-lt); opacity: 0.6; }
        .blend-result { display: flex; flex-direction: column; align-items: center; gap: 6px; padding-left: clamp(16px, 4vw, 48px); border-left: 1px solid rgba(255,255,255,0.1); }
        .blend-eq { font-family: var(--font-display); font-size: 48px; color: var(--gold-lt); opacity: 0.4; line-height: 1; }
        .blend-result-text { font-family: var(--font-display); font-size: clamp(20px, 3vw, 28px); font-style: italic; color: white; }

        /* ── CTA STRIP ── */
        .cta-strip { background: var(--gold); padding: 72px 0; }
        .cta-strip-inner {
          display: flex; align-items: center; justify-content: space-between;
          gap: 40px; flex-wrap: wrap;
        }
        .cta-strip-text { display: flex; flex-direction: column; gap: 10px; }
        .cta-strip-tag { font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.25em; text-transform: uppercase; color: rgba(255,255,255,0.65); }
        .cta-strip h2 { font-family: var(--font-display); font-size: clamp(36px, 5vw, 56px); font-weight: 700; color: white; line-height: 1.05; }
        .cta-strip h2 em { color: var(--dark); }
        .cta-strip p { font-size: 15px; color: rgba(255,255,255,0.75); max-width: 400px; }
        .cta-strip-actions { display: flex; gap: 14px; flex-wrap: wrap; }
        .cta-strip .btn--primary { background: white; color: var(--gold-dk); border-color: white; }
        .cta-strip .btn--primary:hover { background: var(--cream); }
        .cta-strip .btn--ghost { color: white; border-color: rgba(255,255,255,0.4); }
        .cta-strip .btn--ghost:hover { border-color: white; }

        /* ── FOOTER ── */
        .footer { background: var(--dark); padding-top: 72px; }
        .footer__inner { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 60px; padding-bottom: 56px; border-bottom: 1px solid rgba(255,255,255,0.06); }
        .footer__brand { display: flex; flex-direction: column; gap: 14px; }
        .footer__logo { display: flex; flex-direction: column; }
        .footer__brand p { font-size: 13px; color: rgba(255,255,255,0.4); line-height: 1.7; max-width: 240px; }
        .footer__col { display: flex; flex-direction: column; gap: 14px; }
        .footer__col h4 { font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase; color: rgba(255,255,255,0.3); margin-bottom: 4px; }
        .footer__col a { font-size: 14px; color: rgba(255,255,255,0.5); text-decoration: none; transition: color 0.18s; }
        .footer__col a:hover { color: var(--gold-lt); }
        .footer__bottom { display: flex; align-items: center; justify-content: space-between; padding: 24px 0; font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.04em; color: rgba(255,255,255,0.25); }
        .footer__bottom div { display: flex; gap: 24px; }
        .footer__bottom a { color: rgba(255,255,255,0.25); text-decoration: none; transition: color 0.18s; }
        .footer__bottom a:hover { color: var(--gold-lt); }

        /* ── RESPONSIVE ── */
        @media (max-width: 1000px) {
          .product-hero__inner { grid-template-columns: 1fr; }
          .product-hero__visual { order: -1; }
          .pack-3d { max-width: 320px; }
          .footer__inner { grid-template-columns: 1fr 1fr; }
          .footer__brand { grid-column: 1 / -1; }
        }
        @media (max-width: 768px) {
          .nav__links { display: none; }
          .nav__cta { display: none; }
          .nav__burger { display: flex; }
          .overview-grid { grid-template-columns: 1fr; }
          .ov-card--highlight { grid-column: 1; }
          .attr-row { gap: 8px; }
          .attr-chip { padding: 10px 12px; }
          .blend-half--wheat { text-align: center; }
          .blend-half--maida { text-align: center; }
          .blend-result { border-left: none; border-top: 1px solid rgba(255,255,255,0.1); padding-left: 0; padding-top: 24px; flex-direction: row; gap: 12px; align-items: center; }
          .cta-strip-inner { flex-direction: column; align-items: flex-start; }
          .footer__inner { grid-template-columns: 1fr 1fr; }
          .spec-row { grid-template-columns: 1fr; gap: 4px; }
          .spec-key { font-size: 10px; }
        }
        @media (max-width: 520px) {
          .product-hero { padding: 40px 0 60px; }
          .purchase-row { flex-wrap: wrap; }
          .btn--grow { width: 100%; flex: none; }
          .nut-rings { gap: 16px; }
          .footer__inner { grid-template-columns: 1fr; }
          .footer__bottom { flex-direction: column; gap: 12px; text-align: center; }
          .tab-btn { padding: 14px 20px; font-size: 13px; }
          .fab span { display: none; }
          .fab { padding: 14px; }
        }
      `}</style>
    </div>
  );
}