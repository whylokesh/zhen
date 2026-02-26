'use client';

import { useEffect, useRef, useState } from 'react';

/* ─────────────────────────────────────────
   DATA
───────────────────────────────────────── */
const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Products', href: '/productListing' },
];

const AVAILABLE_PRODUCTS = [
  {
    id: 1,
    name: 'Zhen Noodle',
    subtitle: 'Wheat · Maida Blend',
    chinese: '真 · 面条',
    weight: '500g',
    mrp: '₹80',
    blend: '50/50',
    description: 'Premium noodles crafted with 50% wheat and 50% maida for the perfect texture. Ideal for Indo-Chinese preparations and authentic wok cooking.',
    specs: ['Perfect cut for all dishes', 'Cook time: 7 -9 min', 'No preservatives', 'FSSAI certified'],
    badge: 'AVAILABLE',
    badgeColor: '#B8922A',
    tags: ['Wok Ready', 'HoReCa', 'Retail'],
    stock: 'In Stock',
    variants: ['500g Pack'],
    color: '#B8922A',
  },
];

const COMING_SOON_PRODUCTS = [
  {
    id: 2,
    name: 'ZHEN Pasta',
    subtitle: 'Italian–Indian Fusion',
    chinese: '真 · 意面',
    weight: 'TBD',
    mrp: 'TBD',
    blend: 'Semolina Blend',
    description: 'A premium fusion pasta designed for the Indian palate. Perfect for both traditional Italian and spiced Indian-style pasta dishes.',
    specs: ['Multiple variants', 'Premium quality', 'No preservatives', 'FSSAI certified'],
    badge: 'COMING SOON',
    badgeColor: '#7A1A7A',
    tags: ['Fusion', 'Retail', 'Premium'],
    eta: 'Coming Soon',
    color: '#7A1A7A',
  },
  {
    id: 3,
    name: 'Indo-Chinese Sauces',
    subtitle: 'Restaurant Grade',
    chinese: '真 · 酱料',
    weight: 'TBD',
    mrp: 'TBD',
    blend: 'Premium Blend',
    description: 'A complete range of authentic Indo-Chinese sauces crafted for home cooks and professional kitchens alike.',
    specs: ['Multiple variants', 'Restaurant quality', 'No artificial colors', 'FSSAI certified'],
    badge: 'COMING SOON',
    badgeColor: '#C8360A',
    tags: ['Sauces', 'Restaurant', 'Premium'],
    eta: 'Coming Soon',
    color: '#C8360A',
  },
];

const FILTER_TAGS = ['All', 'Wok Ready', 'HoReCa', 'Retail', 'Premium', 'Fusion', 'Sauces', 'Restaurant'];

/* ─────────────────────────────────────────
   NOODLE BOWL SVG ANIMATION
───────────────────────────────────────── */
function NoodleBowlAnim({ color = '#B8922A', isComingSoon = false }) {
  return (
    <svg viewBox="0 0 220 180" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
      <defs>
        <radialGradient id={`bowlGrad-${color.replace('#', '')}`} cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor={color} stopOpacity="0.15" />
          <stop offset="100%" stopColor={color} stopOpacity="0.03" />
        </radialGradient>
        <linearGradient id={`steamGrad-${color.replace('#', '')}`} x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.4)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </linearGradient>
      </defs>

      {/* Bowl shadow */}
      <ellipse cx="110" cy="168" rx="72" ry="8" fill="rgba(0,0,0,0.12)" />

      {/* Bowl body */}
      <path d="M40,90 Q38,155 110,162 Q182,155 180,90 Z" fill={`url(#bowlGrad-${color.replace('#', '')})`} stroke={color} strokeWidth="1.5" strokeOpacity="0.3" />

      {/* Bowl rim */}
      <ellipse cx="110" cy="90" rx="70" ry="16" fill="white" stroke={color} strokeWidth="1.5" strokeOpacity="0.4" />
      <ellipse cx="110" cy="90" rx="65" ry="13" fill={`${color}18`} />

      {/* Noodle coils */}
      {[0, 1, 2, 3].map(i => (
        <ellipse
          key={i}
          cx="110"
          cy="104"
          rx={52 - i * 10}
          ry={14 - i * 3}
          fill="none"
          stroke={i % 2 === 0 ? '#E8D5A0' : '#D4B870'}
          strokeWidth={2.5 - i * 0.3}
          opacity={0.9 - i * 0.15}
          className={`noodle-coil-${i}`}
          style={{ animation: `coilBreath ${1.8 + i * 0.3}s ease-in-out infinite alternate`, animationDelay: `${i * 0.2}s` }}
        />
      ))}

      {/* Toppings */}
      <ellipse cx="88" cy="96" rx="7" ry="4" fill="#C8360A" opacity="0.8" style={{ animation: 'toppingFloat 2.2s ease-in-out infinite alternate' }} />
      <ellipse cx="130" cy="94" rx="6" ry="3" fill="#2D8A2D" opacity="0.8" style={{ animation: 'toppingFloat 2.8s ease-in-out infinite alternate', animationDelay: '0.5s' }} />
      <ellipse cx="110" cy="98" rx="5" ry="3" fill="#FFD700" opacity="0.7" style={{ animation: 'toppingFloat 2s ease-in-out infinite alternate', animationDelay: '1s' }} />

      {/* Steam lines */}
      {!isComingSoon && [
        { x: 90, delay: '0s' }, { x: 110, delay: '0.6s' }, { x: 130, delay: '1.2s' }
      ].map((s, i) => (
        <path
          key={i}
          d={`M${s.x},80 Q${s.x - 5},65 ${s.x + 3},50 Q${s.x + 8},38 ${s.x},25`}
          fill="none"
          stroke="rgba(255,255,255,0.35)"
          strokeWidth="5"
          strokeLinecap="round"
          style={{ animation: `steamUp 2.5s ease-in-out infinite`, animationDelay: s.delay }}
        />
      ))}

      {/* Coming soon overlay lock */}
      {isComingSoon && (
        <g>
          <circle cx="110" cy="52" r="22" fill="rgba(0,0,0,0.55)" />
          <rect x="100" y="50" width="20" height="16" rx="3" fill="rgba(255,255,255,0.9)" />
          <path d="M104,50 Q104,42 110,42 Q116,42 116,50" fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="110" cy="58" r="2.5" fill="rgba(0,0,0,0.6)" />
        </g>
      )}
    </svg>
  );
}

/* ─────────────────────────────────────────
   PRODUCT CARD — AVAILABLE
───────────────────────────────────────── */
function ProductCard({ product, index }: { product: typeof AVAILABLE_PRODUCTS[0]; index: number }) {
  const [hovered, setHovered] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState(0);

  return (
    <div
      className={`pcard pcard--available reveal`}
      style={{ animationDelay: `${index * 0.1}s`, '--accent': product.color } as React.CSSProperties}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Top badge */}
      <div className="pcard__badge" style={{ background: product.badgeColor }}>
        {product.badge}
      </div>

      {/* Visual area */}
      <div className="pcard__visual" style={{ background: `${product.color}0D` }}>
        <div className="pcard__image-wrap">
          <img src="/front.jpeg" alt={product.name} className="pcard__product-img" />
        </div>
        <div className="pcard__chinese">{product.chinese}</div>
        <div className="pcard__stock-dot">
          <span className="stock-pulse" />
          <span>{product.stock}</span>
        </div>
      </div>

      {/* Content */}
      <div className="pcard__body">
        <div className="pcard__meta">
          <span className="pcard__weight">{product.weight}</span>
          <span className="pcard__blend-pill">{product.blend} Blend</span>
        </div>

        <h3 className="pcard__name">{product.name}</h3>
        <p className="pcard__subtitle">{product.subtitle}</p>
        <p className="pcard__desc">{product.description}</p>

        {/* Tags */}
        <div className="pcard__tags">
          {product.tags.map((t, i) => (
            <span key={i} className="pcard__tag" style={{ borderColor: `${product.color}50`, color: product.color }}>
              {t}
            </span>
          ))}
        </div>

        {/* Specs */}
        <div className="pcard__specs">
          {product.specs.map((s, i) => (
            <div key={i} className="pcard__spec">
              <span className="pcard__spec-dot" style={{ background: product.color }} />
              {s}
            </div>
          ))}
        </div>

        {/* Variants */}
        <div className="pcard__variants">
          <div className="pcard__variants-label">Pack Size</div>
          <div className="pcard__variants-list">
            {product.variants.map((v, i) => (
              <button
                key={i}
                className={`pcard__variant-btn ${selectedVariant === i ? 'pcard__variant-btn--active' : ''}`}
                style={selectedVariant === i ? { borderColor: product.color, color: product.color, background: `${product.color}12` } : {}}
                onClick={() => setSelectedVariant(i)}
              >
                {v}
              </button>
            ))}
          </div>
        </div>

        {/* Price + CTA */}
        <div className="pcard__footer">
          <div className="pcard__price">
            <span className="pcard__mrp-label">MRP</span>
            <span className="pcard__mrp" style={{ color: product.color }}>{product.mrp}</span>
            <span className="pcard__per">/ {product.weight}</span>
          </div>
          <a
            href={`/product/${product.id}`}
            className="pcard__cta"
            style={{ background: product.color }}
          >
            View Details
          </a>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   PRODUCT CARD — COMING SOON
───────────────────────────────────────── */
function ComingSoonCard({ product, index }: { product: typeof COMING_SOON_PRODUCTS[0]; index: number }) {
  const [notifyHover, setNotifyHover] = useState(false);

  return (
    <div
      className="pcard pcard--soon reveal"
      style={{ animationDelay: `${index * 0.1}s`, '--accent': product.color } as React.CSSProperties}
    >
      {/* ETA ribbon */}
      <div className="pcard__ribbon" style={{ background: product.color }}>
        {product.eta}
      </div>

      {/* Visual */}
      <div className="pcard__visual pcard__visual--soon">
        <div className="pcard__bowl-anim pcard__bowl-anim--soon">
          <NoodleBowlAnim color={product.color} isComingSoon={true} />
        </div>
        <div className="pcard__chinese pcard__chinese--soon" style={{ color: product.color }}>{product.chinese}</div>

        {/* Countdown overlay */}
        <div className="pcard__coming-label">
          <span className="cl__bar" style={{ background: product.color }} />
          <span className="cl__text">Coming {product.eta}</span>
          <span className="cl__bar" style={{ background: product.color }} />
        </div>
      </div>

      {/* Content */}
      <div className="pcard__body pcard__body--soon">
        <div className="pcard__meta">
          <span className="pcard__weight">{product.weight}</span>
          <span className="pcard__blend-pill" style={{ opacity: 0.5 }}>{product.blend}</span>
        </div>

        <h3 className="pcard__name pcard__name--soon">{product.name}</h3>
        <p className="pcard__subtitle">{product.subtitle}</p>
        <p className="pcard__desc pcard__desc--soon">{product.description}</p>

        {/* Tags */}
        <div className="pcard__tags">
          {product.tags.map((t, i) => (
            <span key={i} className="pcard__tag pcard__tag--soon">
              {t}
            </span>
          ))}
        </div>

        {/* Specs blurred */}
        <div className="pcard__specs pcard__specs--soon">
          {product.specs.map((s, i) => (
            <div key={i} className="pcard__spec pcard__spec--soon">
              <span className="pcard__spec-dot" style={{ background: product.color }} />
              {s}
            </div>
          ))}
        </div>

        {/* Price placeholder */}
        <div className="pcard__footer">
          <div className="pcard__price">
            <span className="pcard__mrp-label">EST. MRP</span>
            <span className="pcard__mrp" style={{ color: product.color, opacity: 0.7 }}>{product.mrp}</span>
          </div>
          <a
            href="https://wa.me/919266442898?text=Hi%2C%20I%20want%20to%20be%20notified%20about%20the%20new%20ZHEN%20product."
            target="_blank"
            rel="noopener noreferrer"
            className="pcard__cta pcard__cta--soon"
            style={{ borderColor: product.color, color: product.color }}
            onMouseEnter={() => setNotifyHover(true)}
            onMouseLeave={() => setNotifyHover(false)}
          >
            {notifyHover ? '→ WhatsApp' : 'Notify Me'}
          </a>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────── */
export default function ZhenProducts() {
  const [scrollY, setScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('All');

  const WA_URL = 'https://wa.me/919999999999?text=Hi%2C%20I%20am%20interested%20in%20ZHEN%20distribution.';

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', onScroll, { passive: true });

    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('in-view'); }),
      { threshold: 0.06, rootMargin: '0px 0px -32px 0px' }
    );
    document.querySelectorAll('.reveal').forEach((el) => obs.observe(el));

    return () => {
      window.removeEventListener('scroll', onScroll);
      obs.disconnect();
    };
  }, []);

  const filteredAvailable = activeFilter === 'All'
    ? AVAILABLE_PRODUCTS
    : AVAILABLE_PRODUCTS.filter(p => p.tags.some(t => t.toLowerCase().includes(activeFilter.toLowerCase())));

  const filteredSoon = activeFilter === 'All'
    ? COMING_SOON_PRODUCTS
    : COMING_SOON_PRODUCTS.filter(p => p.tags.some(t => t.toLowerCase().includes(activeFilter.toLowerCase())));

  return (
    <div className="root">

      {/* ── FAB ── */}
      <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="fab" aria-label="WhatsApp">
        <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
        </svg>
        <span>Trade Enquiry</span>
      </a>

      {/* ── NAVBAR ── */}
      <header className={`nav ${scrollY > 60 ? 'nav--solid' : ''}`}>
        <div className="container nav__inner">
          <a href="/" className="nav__brand">
            <img src="/ZhenLogo.png" alt="ZHEN" className="nav__logo" />
          </a>
          <nav className="nav__links" aria-label="Main navigation">
            {NAV_LINKS.map((l) => (
              <a key={l.href} href={l.href} className="nav__link">{l.label}</a>
            ))}
          </nav>
          <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="nav__cta">
            Become a Distributor
          </a>
          <button className="nav__burger" aria-label="Toggle menu" onClick={() => setMobileMenuOpen(o => !o)}>
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
          PAGE HERO
      ══════════════════════════════ */}
      <section className="page-hero">
        <div className="page-hero__bg-lines" aria-hidden="true">
          {[...Array(8)].map((_, i) => <div key={i} className="page-hero__bg-line" style={{ left: `${5 + i * 12}%` }} />)}
        </div>
        <div className="container page-hero__inner">
          <div className="page-hero__left reveal">
            <div className="page-hero__label">Product Catalogue · 2024–2025</div>
            <h1 className="page-hero__h1">
              Our<br /><em>Noodle</em><br />Range
            </h1>
            <p className="page-hero__desc">
              From our signature thin cut to upcoming fusion pastas — every ZHEN product is built on the same 50/50 precision formula. Available and coming soon.
            </p>
            <div className="page-hero__counts">
              <div className="phc__item">
                <span className="phc__val">{AVAILABLE_PRODUCTS.length}</span>
                <span className="phc__lbl">Available Now</span>
              </div>
              <div className="phc__divider" />
              <div className="phc__item">
                <span className="phc__val">{COMING_SOON_PRODUCTS.length}</span>
                <span className="phc__lbl">Coming Soon</span>
              </div>
              <div className="phc__divider" />
              <div className="phc__item">
                <span className="phc__val">2025</span>
                <span className="phc__lbl">Full Range Year</span>
              </div>
            </div>
          </div>

          {/* Floating product preview tiles */}
          <div className="page-hero__tiles reveal">
            {[...AVAILABLE_PRODUCTS, ...COMING_SOON_PRODUCTS.slice(0, 2)].map((p, i) => (
              <div
                key={p.id}
                className="hero-tile"
                style={{
                  '--tile-color': p.color,
                  '--tile-delay': `${i * 0.15}s`,
                  gridColumn: i === 0 ? 'span 2' : 'span 1',
                } as React.CSSProperties}
              >
                <div className="hero-tile__top" style={{ background: p.color }}>
                  <span className="hero-tile__name">{p.name.replace('ZHEN ', '')}</span>
                  {p.badge && <span className="hero-tile__badge">{p.badge}</span>}
                </div>
                <div className="hero-tile__body">
                  <span className="hero-tile__chinese">{p.chinese}</span>
                  <span className="hero-tile__mrp">{p.mrp}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MARQUEE ── */}
      <div className="marquee" aria-hidden="true">
        <div className="marquee__track">
          {[...Array(4)].map((_, r) => (
            <span key={r} className="marquee__set">
              {['Zhen Noodle', 'Pasta Coming Soon', 'Indo-Chinese Sauces Coming Soon', 'FSSAI Certified', '50/50 Blend', 'Premium Quality', 'No Preservatives', 'Restaurant Grade'].map((t, i) => (
                <span key={i} className="marquee__item">{t}<span className="marquee__dot">·</span></span>
              ))}
            </span>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════
          FILTER BAR
      ══════════════════════════════ */}
      <div className="filter-bar reveal" id="products">
        <div className="container filter-bar__inner">
          <span className="filter-bar__label">Filter by:</span>
          <div className="filter-bar__tags">
            {FILTER_TAGS.map(tag => (
              <button
                key={tag}
                className={`filter-tag ${activeFilter === tag ? 'filter-tag--active' : ''}`}
                onClick={() => setActiveFilter(tag)}
              >
                {tag}
              </button>
            ))}
          </div>
          <span className="filter-bar__count">
            {filteredAvailable.length + filteredSoon.length} products
          </span>
        </div>
      </div>

      {/* ══════════════════════════════
          AVAILABLE NOW SECTION
      ══════════════════════════════ */}
      <section className="section">
        <div className="container">
          <div className="section__header reveal">
            <div className="section__status section__status--live">
              <span className="status-dot" />
              Available Now
            </div>
            <h2 className="section__h2">In-Stock Products</h2>
            <p className="section__sub">Ready for immediate dispatch across India. Full trade documentation on request.</p>
          </div>

          {filteredAvailable.length > 0 ? (
            <div className="products__grid products__grid--available">
              {filteredAvailable.map((product, i) => (
                <ProductCard key={product.id} product={product} index={i} />
              ))}
            </div>
          ) : (
            <div className="no-results reveal">
              <span>No available products match this filter.</span>
            </div>
          )}
        </div>
      </section>

      {/* ── DIVIDER ── */}
      <div className="section-divider">
        <div className="container section-divider__inner">
          <div className="sd__line" />
          <div className="sd__text">
            <span className="sd__icon">⏳</span>
            <span>Expanding Range</span>
            <span className="sd__icon">⏳</span>
          </div>
          <div className="sd__line" />
        </div>
      </div>

      {/* ══════════════════════════════
          COMING SOON SECTION
      ══════════════════════════════ */}
      <section className="section section--dark">
        <div className="container">
          <div className="section__header section__header--light reveal">
            <div className="section__status section__status--soon">
              <span className="status-dot status-dot--soon" />
              Coming Soon
            </div>
            <h2 className="section__h2 section__h2--light">In Development</h2>
            <p className="section__sub section__sub--light">18 months of R&D continues. Register interest via WhatsApp to be first in queue when each product launches.</p>
          </div>

          {filteredSoon.length > 0 ? (
            <div className="products__grid products__grid--soon">
              {filteredSoon.map((product, i) => (
                <ComingSoonCard key={product.id} product={product} index={i} />
              ))}
            </div>
          ) : (
            <div className="no-results no-results--dark reveal">
              <span>No upcoming products match this filter.</span>
            </div>
          )}

          {/* Timeline strip */}
          <div className="timeline reveal">
            <div className="timeline__label">Product Launch Roadmap</div>
            <div className="timeline__track">
              <div className="timeline__line" />
              {[
                { q: 'Q1 2025', label: 'Thin & Medium', color: '#B8922A', done: true },
                { q: 'Q2 2025', label: 'Thick Noodle', color: '#1A5A99', done: false },
                { q: 'Q3 2025', label: 'ZHEN Pasta', color: '#7A1A7A', done: false },
                { q: 'Q4 2025', label: 'Rice & Egg', color: '#99591A', done: false },
              ].map((t, i) => (
                <div key={i} className="timeline__point">
                  <div className="tp__dot" style={{ borderColor: t.color, background: t.done ? t.color : 'transparent' }}>
                    {t.done && <span className="tp__check">✓</span>}
                  </div>
                  <div className="tp__q" style={{ color: t.color }}>{t.q}</div>
                  <div className="tp__label">{t.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════
          COMPARISON TABLE
      ══════════════════════════════ */}
      <section className="section">
        <div className="container">
          <div className="section__header reveal">
            <div className="section__tag">Compare</div>
            <h2 className="section__h2">All Products at a Glance</h2>
          </div>
          <div className="compare-table reveal">
            <div className="ct__scroll">
              <table className="ct__table">
                <thead>
                  <tr>
                    <th className="ct__th ct__th--first">Product</th>
                    <th className="ct__th">Cut</th>
                    <th className="ct__th">Blend</th>
                    <th className="ct__th">Cook Time</th>
                    <th className="ct__th">Best For</th>
                    <th className="ct__th">MRP</th>
                    <th className="ct__th">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {[...AVAILABLE_PRODUCTS, ...COMING_SOON_PRODUCTS].map((p, i) => (
                    <tr key={p.id} className={`ct__row ${i % 2 === 0 ? 'ct__row--even' : ''}`}>
                      <td className="ct__td ct__td--name">
                        <span className="ct__name-dot" style={{ background: p.color }} />
                        <div>
                          <strong>{p.name}</strong>
                          <span>{p.subtitle}</span>
                        </div>
                      </td>
                      <td className="ct__td">{p.specs[0]?.split('·')[0]?.trim() || '—'}</td>
                      <td className="ct__td">{p.blend}</td>
                      <td className="ct__td">{p.specs[1]?.replace('Cook time: ', '') || '—'}</td>
                      <td className="ct__td">
                        <div className="ct__tags">
                          {p.tags.slice(0, 2).map((t, ti) => (
                            <span key={ti} className="ct__tag" style={{ color: p.color, borderColor: `${p.color}40` }}>{t}</span>
                          ))}
                        </div>
                      </td>
                      <td className="ct__td ct__td--price" style={{ color: p.color }}>{p.mrp}</td>
                      <td className="ct__td">
                        {'stock' in p ? (
                          <span className="ct__status ct__status--live">
                            <span className="status-dot status-dot--sm" />
                            In Stock
                          </span>
                        ) : (
                          <span className="ct__status ct__status--soon-sm">{'eta' in p ? p.eta : 'Coming Soon'}</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════
          FINAL CTA
      ══════════════════════════════ */}
      <section className="cta-section reveal">
        <div className="container cta__inner">
          <div className="cta__tag">Distributor Programme</div>
          <h2 className="cta__h2">Carry the Full<br /><em>ZHEN</em> Range</h2>
          <p className="cta__sub">Lock in your territory today and be first to launch the complete 2025 lineup — including exclusive pre-launch allocation for coming soon SKUs.</p>
          <div className="cta__actions">
            <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="btn btn--primary btn--large">WhatsApp: Start Enquiry</a>
            <a href="mailto:info@zhen.com" className="btn btn--ghost btn--large">info@zhen.com</a>
          </div>
          <div className="cta__contact-line">
            <a href="tel:+919266442898">+91 92664 42898</a>
            <span>·</span>
            <span>Mon – Sat, 9 AM – 6 PM IST</span>
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
            <h4>Quick Links</h4>
            <a href="/">Home</a>
            <a href="/productListing">Products</a>
          </div>
          <div className="footer__col">
            <h4>Contact</h4>
            <a href="mailto:info@zhen.com">info@zhen.com</a>
            <a href="tel:+919266442898">+91 92664 42898</a>
            <a href={WA_URL} target="_blank" rel="noopener noreferrer">WhatsApp</a>
          </div>
        </div>
        <div className="container footer__bottom">
          <span>© 2024 ZHEN by VN Traders. All rights reserved.</span>
        </div>
      </footer>

      {/* ══════════════════════════════
          GLOBAL STYLES
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
          --white: #FFFFFF;
          --dark: #141210;
          --dark-2: #1D1B17;
          --font-display: 'Cormorant Garamond', serif;
          --font-body: 'Instrument Sans', sans-serif;
          --font-mono: 'DM Mono', monospace;
          --max-w: 1240px;
          --r: 8px;
          --section-pad: 100px;
        }

        .root {
          font-family: var(--font-body);
          background: var(--cream);
          color: var(--ink);
          overflow-x: hidden;
          font-size: 16px;
          line-height: 1.6;
        }

        .container { max-width: var(--max-w); margin-inline: auto; padding-inline: clamp(20px, 5vw, 60px); }

        .reveal { opacity: 0; transform: translateY(28px); transition: opacity 0.75s ease, transform 0.75s ease; }
        .reveal.in-view { opacity: 1; transform: none; }

        em { font-style: italic; color: var(--gold); font-family: var(--font-display); }

        /* ── BUTTONS ── */
        .btn {
          display: inline-flex; align-items: center; justify-content: center; gap: 10px;
          font-family: var(--font-body); font-size: 14px; font-weight: 600; letter-spacing: 0.02em;
          text-decoration: none; padding: 13px 28px; border-radius: 4px; transition: all 0.18s ease;
          border: 1.5px solid transparent; cursor: pointer; white-space: nowrap;
        }
        .btn--primary { background: var(--gold); color: white; border-color: var(--gold); }
        .btn--primary:hover { background: var(--gold-dk); border-color: var(--gold-dk); transform: translateY(-1px); }
        .btn--ghost { background: transparent; color: white; border-color: rgba(255,255,255,0.4); }
        .btn--ghost:hover { border-color: white; }
        .btn--large { padding: 16px 36px; font-size: 15px; }

        /* ── FAB ── */
        .fab {
          position: fixed; bottom: 28px; right: 28px; z-index: 900;
          display: flex; align-items: center; gap: 10px;
          background: #25D366; color: white; text-decoration: none;
          padding: 13px 20px 13px 16px; border-radius: 50px;
          font-family: var(--font-body); font-size: 13px; font-weight: 600;
          box-shadow: 0 4px 24px rgba(37,211,102,0.35); transition: transform 0.2s, box-shadow 0.2s;
        }
        .fab:hover { transform: translateY(-2px); box-shadow: 0 8px 32px rgba(37,211,102,0.45); }

        /* ── NAVBAR ── */
        .nav {
          position: fixed; top: 0; left: 0; right: 0; z-index: 800;
          padding: 22px 0; transition: background 0.3s, padding 0.3s, border-color 0.3s;
          border-bottom: 1px solid transparent;
        }
        .nav--solid {
          background: rgba(247,244,238,0.97); backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px); padding: 15px 0; border-color: var(--ink-15);
        }
        .nav__inner { display: flex; align-items: center; gap: 40px; }
        .nav__brand { display: flex; align-items: center; text-decoration: none; line-height: 1; margin-right: auto; flex-shrink: 0; }
        .nav__logo { height: 45px; width: auto; display: block; }
        .nav--solid .nav__logo { height: 40px; }
        .brand-z { font-family: var(--font-display); font-size: 22px; font-weight: 700; color: var(--gold); letter-spacing: 0.1em; }
        .brand-sub { font-family: var(--font-mono); font-size: 9px; color: var(--ink-40); letter-spacing: 0.12em; margin-top: 3px; }
        .nav__links { display: flex; align-items: center; gap: 36px; }
        .nav__link { text-decoration: none; color: var(--ink-70); font-size: 14px; font-weight: 500; transition: color 0.18s; letter-spacing: 0.01em; }
        .nav__link:hover { color: var(--gold); }
        .nav__cta { flex-shrink: 0; display: inline-flex; align-items: center; background: var(--ink); color: white; text-decoration: none; font-size: 13px; font-weight: 600; padding: 10px 22px; border-radius: 4px; transition: background 0.18s; }
        .nav__cta:hover { background: var(--gold); }
        .nav__burger { display: none; flex-direction: column; gap: 5px; background: none; border: none; cursor: pointer; padding: 4px; margin-left: auto; }
        .nav__burger span { display: block; width: 24px; height: 2px; background: var(--ink); border-radius: 2px; transition: all 0.25s ease; }
        .nav__burger span.open:nth-child(1) { transform: translateY(7px) rotate(45deg); }
        .nav__burger span.open:nth-child(2) { opacity: 0; }
        .nav__burger span.open:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }
        .nav__mobile { display: flex; flex-direction: column; background: var(--cream); border-top: 1px solid var(--ink-15); padding: 16px 0; }
        .nav__mobile-link { display: block; padding: 14px clamp(20px, 5vw, 60px); color: var(--ink); text-decoration: none; font-size: 15px; font-weight: 500; border-bottom: 1px solid var(--ink-06); transition: color 0.18s; }
        .nav__mobile-link:hover { color: var(--gold); }
        .nav__mobile-cta { display: block; margin: 16px clamp(20px,5vw,60px) 8px; text-align: center; background: var(--gold); color: white; text-decoration: none; padding: 13px 20px; border-radius: 4px; font-size: 14px; font-weight: 600; }

        /* ── PAGE HERO ── */
        .page-hero {
          min-height: 80vh; background: var(--cream); padding-top: 110px;
          position: relative; overflow: hidden; display: flex; flex-direction: column; justify-content: center;
        }
        .page-hero__bg-lines { position: absolute; inset: 0; pointer-events: none; }
        .page-hero__bg-line { position: absolute; top: 0; bottom: 0; width: 1px; background: var(--ink-06); }
        .page-hero__inner {
          display: grid; grid-template-columns: 1fr 1fr;
          gap: clamp(40px, 6vw, 80px); align-items: center;
          padding-top: clamp(32px, 6vh, 60px); padding-bottom: clamp(32px, 6vh, 60px);
        }
        .page-hero__label { font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; color: var(--gold); margin-bottom: 20px; }
        .page-hero__h1 { font-family: var(--font-display); font-size: clamp(56px, 9vw, 120px); font-weight: 700; line-height: 0.92; color: var(--ink); letter-spacing: -0.02em; margin-bottom: 24px; }
        .page-hero__h1 em { display: block; }
        .page-hero__desc { font-size: 16px; line-height: 1.75; color: var(--ink-70); max-width: 440px; margin-bottom: 36px; }
        .page-hero__counts { display: flex; align-items: center; gap: 24px; flex-wrap: wrap; }
        .phc__item { display: flex; flex-direction: column; gap: 3px; }
        .phc__val { font-family: var(--font-display); font-size: 36px; font-weight: 700; color: var(--ink); line-height: 1; }
        .phc__lbl { font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.12em; text-transform: uppercase; color: var(--ink-40); }
        .phc__divider { width: 1px; height: 40px; background: var(--ink-15); }

        /* Hero tiles */
        .page-hero__tiles { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; }
        .hero-tile {
          border: 1px solid var(--ink-15); border-radius: 8px; overflow: hidden;
          animation: tileFloat var(--tile-delay, 0s) ease-in-out 0s;
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }
        .hero-tile:hover { transform: translateY(-4px); box-shadow: 0 12px 32px rgba(0,0,0,0.1); }
        .hero-tile__top { padding: 14px 16px; display: flex; align-items: center; justify-content: space-between; }
        .hero-tile__name { font-family: var(--font-body); font-size: 12px; font-weight: 700; color: white; letter-spacing: 0.02em; }
        .hero-tile__badge { font-family: var(--font-mono); font-size: 9px; letter-spacing: 0.1em; background: rgba(0,0,0,0.25); color: white; padding: 2px 7px; border-radius: 20px; }
        .hero-tile__body { padding: 12px 16px; display: flex; justify-content: space-between; align-items: center; background: white; }
        .hero-tile__chinese { font-family: var(--font-display); font-size: 13px; color: var(--ink-40); }
        .hero-tile__mrp { font-family: var(--font-mono); font-size: 12px; font-weight: 500; color: var(--ink); }

        /* ── MARQUEE ── */
        .marquee { background: var(--ink); overflow: hidden; padding: 14px 0; border-top: 1px solid rgba(255,255,255,0.06); }
        .marquee__track { display: flex; width: max-content; animation: marquee 50s linear infinite; }
        .marquee__set { display: flex; }
        .marquee__item { display: flex; align-items: center; gap: 20px; padding: 0 24px; font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.15em; text-transform: uppercase; color: rgba(255,255,255,0.45); white-space: nowrap; }
        .marquee__dot { color: var(--gold-lt); opacity: 0.6; font-size: 8px; }
        @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-25%); } }

        /* ── FILTER BAR ── */
        .filter-bar { background: white; border-bottom: 1px solid var(--ink-15); padding: 18px 0; position: sticky; top: 62px; z-index: 600; }
        .filter-bar__inner { display: flex; align-items: center; gap: 16px; flex-wrap: wrap; }
        .filter-bar__label { font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.15em; text-transform: uppercase; color: var(--ink-40); flex-shrink: 0; }
        .filter-bar__tags { display: flex; gap: 8px; flex-wrap: wrap; flex: 1; }
        .filter-tag {
          font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.06em; padding: 6px 14px;
          border: 1px solid var(--ink-15); border-radius: 20px; background: transparent; color: var(--ink-70);
          cursor: pointer; transition: all 0.18s; white-space: nowrap;
        }
        .filter-tag:hover { border-color: var(--gold); color: var(--gold); }
        .filter-tag--active { background: var(--ink); color: white; border-color: var(--ink); }
        .filter-bar__count { font-family: var(--font-mono); font-size: 11px; color: var(--ink-40); letter-spacing: 0.06em; flex-shrink: 0; margin-left: auto; }

        /* ── SECTIONS ── */
        .section { padding: var(--section-pad) 0; }
        .section--dark { background: var(--dark); }
        .section__header { text-align: center; margin-bottom: 64px; }
        .section__header--light {}
        .section__tag { display: inline-block; font-family: var(--font-mono); font-size: 10px; font-weight: 500; letter-spacing: 0.25em; text-transform: uppercase; color: var(--gold); margin-bottom: 16px; }
        .section__h2 { font-family: var(--font-display); font-size: clamp(36px, 5vw, 60px); font-weight: 700; color: var(--ink); line-height: 1.05; letter-spacing: -0.01em; margin-bottom: 16px; }
        .section__h2--light { color: white; }
        .section__sub { font-size: 16px; line-height: 1.75; color: var(--ink-70); max-width: 540px; margin-inline: auto; }
        .section__sub--light { color: rgba(255,255,255,0.55); }

        .section__status {
          display: inline-flex; align-items: center; gap: 8px;
          font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase;
          padding: 6px 14px; border-radius: 20px; margin-bottom: 16px;
        }
        .section__status--live { background: rgba(45,138,45,0.1); color: #2D6A2D; border: 1px solid rgba(45,138,45,0.2); }
        .section__status--soon { background: rgba(26,90,153,0.1); color: #1A5A99; border: 1px solid rgba(26,90,153,0.2); }

        .status-dot {
          width: 7px; height: 7px; border-radius: 50%; background: #2D8A2D; flex-shrink: 0;
          animation: statusPulse 1.8s ease-in-out infinite;
        }
        .status-dot--soon { background: #1A5A99; animation: statusPulseSoon 2.4s ease-in-out infinite; }
        .status-dot--sm { width: 6px; height: 6px; }

        @keyframes statusPulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(45,138,45,0.5); }
          50% { box-shadow: 0 0 0 5px rgba(45,138,45,0); }
        }
        @keyframes statusPulseSoon {
          0%, 100% { box-shadow: 0 0 0 0 rgba(26,90,153,0.5); }
          50% { box-shadow: 0 0 0 5px rgba(26,90,153,0); }
        }

        /* ── PRODUCT GRIDS ── */
        .products__grid--available {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(440px, 1fr));
          gap: 28px;
        }
        .products__grid--soon {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 24px;
        }

        /* ── PRODUCT CARDS ── */
        .pcard {
          border-radius: 12px; overflow: hidden; position: relative;
          transition: transform 0.28s ease, box-shadow 0.28s ease;
          display: flex; flex-direction: column;
        }
        .pcard:hover { transform: translateY(-5px); box-shadow: 0 20px 60px rgba(0,0,0,0.1); }
        .pcard--available { background: white; border: 1px solid var(--ink-15); }
        .pcard--soon { background: var(--dark-2); border: 1px solid rgba(255,255,255,0.07); }

        /* Badge */
        .pcard__badge {
          position: absolute; top: 16px; left: 16px; z-index: 10;
          font-family: var(--font-mono); font-size: 9px; letter-spacing: 0.2em; text-transform: uppercase;
          color: white; padding: 4px 10px; border-radius: 20px; font-weight: 500;
        }

        /* Ribbon */
        .pcard__ribbon {
          position: absolute; top: 20px; right: -30px; z-index: 10;
          font-family: var(--font-mono); font-size: 9px; letter-spacing: 0.15em; text-transform: uppercase;
          color: white; padding: 5px 40px; transform: rotate(45deg); font-weight: 500;
          box-shadow: 0 2px 8px rgba(0,0,0,0.2);
        }

        /* Visual area */
        .pcard__visual {
          position: relative; display: flex; flex-direction: column; align-items: center;
          justify-content: center; padding: 32px 24px 20px; min-height: 200px;
          border-bottom: 1px solid var(--ink-06);
        }
        .pcard__visual--soon {
          border-bottom: 1px solid rgba(255,255,255,0.06);
          min-height: 180px;
        }
        .pcard__bowl-anim { width: 160px; height: 130px; }
        .pcard__bowl-anim--soon { opacity: 0.65; filter: grayscale(20%); }

        .pcard__chinese {
          position: absolute; bottom: 14px; right: 18px;
          font-family: var(--font-display); font-size: 16px; color: var(--ink-40);
          letter-spacing: 0.05em;
        }
        .pcard__chinese--soon { color: rgba(255,255,255,0.2); }

        .pcard__stock-dot {
          position: absolute; top: 14px; right: 14px;
          display: flex; align-items: center; gap: 5px;
          font-family: var(--font-mono); font-size: 9px; letter-spacing: 0.1em;
          text-transform: uppercase; color: #2D8A2D;
        }

        .stock-pulse {
          display: inline-block; width: 6px; height: 6px; border-radius: 50%; background: #2D8A2D;
          animation: statusPulse 1.8s ease-in-out infinite;
        }

        .pcard__coming-label {
          position: absolute; bottom: 16px; left: 50%; transform: translateX(-50%);
          display: flex; align-items: center; gap: 10px; width: 90%;
          font-family: var(--font-mono); font-size: 9px; letter-spacing: 0.18em; text-transform: uppercase;
          color: rgba(255,255,255,0.4);
        }
        .cl__bar { flex: 1; height: 1px; background: rgba(255,255,255,0.12); }
        .cl__text { white-space: nowrap; flex-shrink: 0; }

        /* Body */
        .pcard__body { padding: 24px; display: flex; flex-direction: column; gap: 12px; flex: 1; }
        .pcard__body--soon { gap: 10px; }

        .pcard__meta { display: flex; align-items: center; gap: 10px; }
        .pcard__weight { font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.1em; color: var(--ink-40); }
        .pcard__blend-pill {
          font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.08em;
          background: var(--ink-06); border: 1px solid var(--ink-15);
          color: var(--ink-70); padding: 2px 10px; border-radius: 20px;
        }

        .pcard__name { font-family: var(--font-display); font-size: 26px; font-weight: 700; color: var(--ink); line-height: 1.1; }
        .pcard__name--soon { color: white; }
        .pcard__subtitle { font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--ink-40); margin-top: -4px; }
        .pcard--soon .pcard__subtitle { color: rgba(255,255,255,0.3); }
        .pcard__desc { font-size: 13px; line-height: 1.7; color: var(--ink-70); }
        .pcard__desc--soon { color: rgba(255,255,255,0.5); font-size: 13px; }

        /* Tags */
        .pcard__tags { display: flex; gap: 6px; flex-wrap: wrap; }
        .pcard__tag {
          font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.06em;
          padding: 3px 9px; border-radius: 20px; border: 1px solid var(--ink-15);
          color: var(--ink-70); background: transparent;
        }
        .pcard__tag--soon { border-color: rgba(255,255,255,0.1); color: rgba(255,255,255,0.3); }

        /* Specs */
        .pcard__specs { display: flex; flex-direction: column; gap: 6px; padding: 14px 0; border-top: 1px solid var(--ink-06); border-bottom: 1px solid var(--ink-06); }
        .pcard__specs--soon { border-color: rgba(255,255,255,0.06); }
        .pcard__spec { display: flex; align-items: center; gap: 8px; font-family: var(--font-mono); font-size: 11px; color: var(--ink-70); letter-spacing: 0.02em; }
        .pcard__spec--soon { color: rgba(255,255,255,0.4); }
        .pcard__spec-dot { width: 5px; height: 5px; border-radius: 50%; flex-shrink: 0; }

        /* Variants */
        .pcard__variants { display: flex; flex-direction: column; gap: 8px; }
        .pcard__variants-label { font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.12em; text-transform: uppercase; color: var(--ink-40); }
        .pcard__variants-list { display: flex; gap: 6px; flex-wrap: wrap; }
        .pcard__variant-btn {
          font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.04em;
          padding: 5px 12px; border-radius: 4px; border: 1px solid var(--ink-15);
          background: transparent; color: var(--ink-70); cursor: pointer; transition: all 0.15s;
        }
        .pcard__variant-btn:hover { border-color: var(--gold); color: var(--gold); }

        /* Footer */
        .pcard__footer { display: flex; align-items: center; justify-content: space-between; gap: 12px; margin-top: auto; padding-top: 4px; }
        .pcard__price { display: flex; align-items: baseline; gap: 5px; }
        .pcard__mrp-label { font-family: var(--font-mono); font-size: 9px; letter-spacing: 0.15em; text-transform: uppercase; color: var(--ink-40); }
        .pcard__mrp { font-family: var(--font-display); font-size: 32px; font-weight: 700; line-height: 1; }
        .pcard__per { font-family: var(--font-mono); font-size: 10px; color: var(--ink-40); }

        .pcard__cta {
          display: inline-flex; align-items: center; justify-content: center;
          font-family: var(--font-body); font-size: 13px; font-weight: 600; letter-spacing: 0.02em;
          text-decoration: none; padding: 10px 20px; border-radius: 4px;
          color: white; transition: all 0.18s ease; white-space: nowrap;
          border: 1.5px solid transparent;
        }
        .pcard__cta:hover { opacity: 0.9; transform: translateY(-1px); }
        .pcard__cta--soon {
          background: transparent !important; border-width: 1.5px; border-style: solid;
          min-width: 110px; text-align: center;
        }
        .pcard__cta--soon:hover { opacity: 1; }

        /* ── NO RESULTS ── */
        .no-results {
          text-align: center; padding: 60px 20px;
          font-family: var(--font-mono); font-size: 13px; color: var(--ink-40); letter-spacing: 0.06em;
          border: 1px dashed var(--ink-15); border-radius: 8px;
        }
        .no-results--dark { color: rgba(255,255,255,0.25); border-color: rgba(255,255,255,0.08); }

        /* ── SECTION DIVIDER ── */
        .section-divider { padding: 40px 0; background: var(--cream-dk); }
        .section-divider__inner { display: flex; align-items: center; gap: 24px; }
        .sd__line { flex: 1; height: 1px; background: var(--ink-15); }
        .sd__text { display: flex; align-items: center; gap: 12px; font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; color: var(--ink-40); white-space: nowrap; }
        .sd__icon { font-size: 14px; }

        /* ── TIMELINE ── */
        .timeline { margin-top: 80px; }
        .timeline__label { font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase; color: rgba(255,255,255,0.25); margin-bottom: 32px; text-align: center; }
        .timeline__track { position: relative; display: flex; justify-content: space-between; align-items: flex-start; padding: 0 24px; }
        .timeline__line { position: absolute; top: 14px; left: 60px; right: 60px; height: 1px; background: rgba(255,255,255,0.1); }
        .timeline__point { display: flex; flex-direction: column; align-items: center; gap: 10px; position: relative; z-index: 1; flex: 1; }
        .tp__dot { width: 28px; height: 28px; border-radius: 50%; border: 2px solid; display: flex; align-items: center; justify-content: center; background: var(--dark); transition: all 0.3s; }
        .tp__dot:hover { transform: scale(1.1); }
        .tp__check { font-size: 12px; color: white; font-weight: 700; }
        .tp__q { font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.1em; font-weight: 500; }
        .tp__label { font-family: var(--font-body); font-size: 12px; color: rgba(255,255,255,0.5); text-align: center; max-width: 80px; line-height: 1.4; }

        /* ── COMPARE TABLE ── */
        .compare-table { border: 1px solid var(--ink-15); border-radius: 8px; overflow: hidden; }
        .ct__scroll { overflow-x: auto; }
        .ct__table { width: 100%; border-collapse: collapse; min-width: 800px; }
        .ct__th {
          font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.15em; text-transform: uppercase;
          color: var(--ink-40); padding: 16px 18px; text-align: left;
          background: var(--ink-06); border-bottom: 1px solid var(--ink-15); white-space: nowrap;
        }
        .ct__th--first { width: 220px; }
        .ct__row { border-bottom: 1px solid var(--ink-06); transition: background 0.15s; }
        .ct__row:last-child { border-bottom: none; }
        .ct__row:hover { background: rgba(184,146,42,0.03); }
        .ct__row--even { background: rgba(17,16,9,0.02); }
        .ct__td {
          font-size: 13px; color: var(--ink-70); padding: 16px 18px;
          vertical-align: middle; font-family: var(--font-body);
        }
        .ct__td--name { display: flex; align-items: center; gap: 12px; }
        .ct__td--name strong { display: block; font-size: 14px; font-weight: 600; color: var(--ink); }
        .ct__td--name span { display: block; font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.05em; color: var(--ink-40); }
        .ct__td--price { font-family: var(--font-display); font-size: 18px; font-weight: 700; }
        .ct__name-dot { width: 10px; height: 10px; border-radius: 50%; flex-shrink: 0; }
        .ct__tags { display: flex; gap: 5px; flex-wrap: wrap; }
        .ct__tag { font-family: var(--font-mono); font-size: 9px; letter-spacing: 0.05em; padding: 2px 7px; border-radius: 20px; border: 1px solid; white-space: nowrap; }
        .ct__status { display: inline-flex; align-items: center; gap: 5px; font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.06em; }
        .ct__status--live { color: #2D8A2D; }
        .ct__status--soon-sm { color: #1A5A99; background: rgba(26,90,153,0.08); padding: 3px 8px; border-radius: 20px; border: 1px solid rgba(26,90,153,0.2); }

        /* ── CTA SECTION ── */
        .cta-section { background: var(--gold); padding: 100px 0; }
        .cta__inner { display: flex; flex-direction: column; align-items: center; text-align: center; gap: 24px; }
        .cta__tag { font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.25em; text-transform: uppercase; color: rgba(255,255,255,0.65); }
        .cta__h2 { font-family: var(--font-display); font-size: clamp(48px, 7vw, 90px); font-weight: 700; color: white; line-height: 1.05; letter-spacing: -0.02em; }
        .cta__h2 em { color: var(--dark); font-style: italic; }
        .cta__sub { font-size: 16px; line-height: 1.75; color: rgba(255,255,255,0.75); max-width: 520px; }
        .cta__actions { display: flex; gap: 14px; flex-wrap: wrap; justify-content: center; margin-top: 8px; }
        .cta__actions .btn--primary { background: white; color: var(--gold-dk); border-color: white; }
        .cta__actions .btn--primary:hover { background: var(--cream); }
        .cta__actions .btn--ghost { color: white; border-color: rgba(255,255,255,0.4); }
        .cta__contact-line { display: flex; align-items: center; gap: 12px; font-family: var(--font-mono); font-size: 12px; letter-spacing: 0.06em; color: rgba(255,255,255,0.6); }
        .cta__contact-line a { color: rgba(255,255,255,0.8); text-decoration: none; }

        /* ── FOOTER ── */
        .footer { background: var(--dark); padding-top: 80px; }
        .footer__inner { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 60px; padding-bottom: 60px; border-bottom: 1px solid rgba(255,255,255,0.06); }
        .footer__brand { display: flex; flex-direction: column; gap: 14px; }
        .footer__logo { display: flex; flex-direction: column; }
        .footer__brand p { font-size: 13px; color: rgba(255,255,255,0.4); line-height: 1.7; max-width: 260px; }
        .footer__col { display: flex; flex-direction: column; gap: 14px; }
        .footer__col h4 { font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase; color: rgba(255,255,255,0.3); margin-bottom: 4px; }
        .footer__col a { font-size: 14px; color: rgba(255,255,255,0.55); text-decoration: none; transition: color 0.18s; }
        .footer__col a:hover { color: var(--gold-lt); }
        .footer__bottom { display: flex; align-items: center; justify-content: space-between; padding: 24px 0; font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.04em; color: rgba(255,255,255,0.25); }
        .footer__bottom div { display: flex; gap: 24px; }
        .footer__bottom a { color: rgba(255,255,255,0.25); text-decoration: none; transition: color 0.18s; }
        .footer__bottom a:hover { color: var(--gold-lt); }

        /* ── NOODLE BOWL ANIMATIONS ── */
        @keyframes coilBreath {
          from { rx: attr(rx); transform: scaleX(1) scaleY(1); }
          to { transform: scaleX(1.03) scaleY(0.95); }
        }
        @keyframes toppingFloat {
          from { transform: translateY(0); }
          to { transform: translateY(-2px); }
        }
        @keyframes steamUp {
          0% { opacity: 0; transform: translateY(4px) scaleX(0.8); }
          30% { opacity: 0.6; }
          70% { opacity: 0.4; }
          100% { opacity: 0; transform: translateY(-12px) scaleX(1.3); }
        }

        /* ── RESPONSIVE ── */
        @media (max-width: 1100px) {
          .page-hero__inner { grid-template-columns: 1fr; }
          .page-hero__tiles { max-width: 500px; }
          .footer__inner { grid-template-columns: 1fr 1fr; }
          .footer__brand { grid-column: 1 / -1; }
        }
        @media (max-width: 900px) {
          :root { --section-pad: 72px; }
          .page-hero__tiles { grid-template-columns: repeat(2, 1fr); }
          .products__grid--available { grid-template-columns: 1fr; }
          .products__grid--soon { grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); }
          .nav__links { display: none; }
          .nav__cta { display: none; }
          .nav__burger { display: flex; }
          .timeline__track { flex-direction: column; gap: 28px; padding: 0; }
          .timeline__line { display: none; }
          .timeline__point { flex-direction: row; align-items: center; gap: 16px; justify-content: flex-start; }
          .tp__label { max-width: none; }
        }
        @media (max-width: 640px) {
          :root { --section-pad: 56px; }
          .page-hero__h1 { font-size: clamp(56px, 16vw, 90px); }
          .page-hero__tiles { grid-template-columns: 1fr; }
          .hero-tile { display: flex; }
          .hero-tile__top { flex: 1; }
          .hero-tile__body { flex: 1; }
          .products__grid--soon { grid-template-columns: 1fr; }
          .filter-bar__tags { gap: 6px; }
          .filter-tag { font-size: 10px; padding: 5px 11px; }
          .footer__inner { grid-template-columns: 1fr; }
          .footer__bottom { flex-direction: column; gap: 12px; text-align: center; }
          .fab span { display: none; }
          .fab { padding: 14px; }
          .cta__actions { flex-direction: column; align-items: stretch; }
          .page-hero__counts { gap: 16px; }
          .phc__divider { height: 30px; }
        }
      `}</style>
    </div>
  );
}