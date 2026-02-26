'use client';

import { useEffect, useRef, useState } from 'react';

/* ─────────────────────────────────────────
   ANIMATED COUNTER HOOK
───────────────────────────────────────── */
function useCountUp(end: number, duration: number = 2000, start: number = 0) {
  const [count, setCount] = useState(start);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    if (!hasStarted) return;
    
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * (end - start) + start));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [hasStarted, end, duration, start]);

  return { count, startCounting: () => setHasStarted(true) };
}

/* ─────────────────────────────────────────
   DATA
───────────────────────────────────────── */
const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Products', href: '/productListing' },
];

const STATS = [
  { value: 1200, label: 'Retail Customers', suffix: '+' },
  { value: 65, label: 'Active Distributors', suffix: '+' },
  { value: 500, label: 'Standard Pack', suffix: 'g' },
  { value: 2024, label: 'Est. India', suffix: '' },
];

const PRODUCT_SPECS = [
  { label: 'Composition', value: '50% Wheat Flour · 50% Refined Maida' },
  { label: 'Pack Weight', value: '500g' },
  { label: 'Shelf Life', value: '12 Months' },
  { label: 'Variants', value: 'Thin, Medium (Thick coming Q2 2025)' },
  { label: 'Cook Time', value: '7 -9 minutes' },
  { label: 'Preservatives', value: 'None' },
  { label: 'MOQ (Distributor)', value: '50 Cartons' },
  { label: 'Packaging', value: 'Retail · HoReCa · Bulk' },
];

const WHY_POINTS = [
  {
    title: 'Proprietary 50/50 Blend',
    body: 'The only noodle in the Indian market formulated at an exact 50% wheat and 50% maida ratio. This produces a noodle with superior bite, sauce absorption, and wok performance compared to pure-maida or pure-wheat competitors.',
  },
  {
    title: 'HoReCa & Retail Ready',
    body: 'Available in both retail 500g packs and catering bulk formats. Our packaging meets FSSAI labelling standards with full ingredient transparency — clean-label by design.',
  },
  {
    title: 'Supply Chain Reliability',
    body: 'Backed by VN Traders, a commodity-grade supply chain operator with decades of agri-food sourcing experience. Consistent quality, consistent availability, competitive lead times.',
  },
  {
    title: 'Margin & Marketing Support',
    body: 'Distributors receive category-competitive margins, co-branded POS materials, and direct WhatsApp support from our trade team. No minimum advertising spend required.',
  },
];

const PROCESS_STEPS = [
  { n: '01', title: 'Ingredient Sourcing', desc: 'Wheat and maida are sourced from FSSAI-certified mills with batch traceability.' },
  { n: '02', title: 'Precision Blending', desc: 'Both flours are combined at exact 50/50 ratios under controlled humidity conditions.' },
  { n: '03', title: 'Forming & Drying', desc: 'Noodles are formed and slow-dried at low temperatures to preserve texture integrity.' },
  { n: '04', title: 'QC & Packaging', desc: 'Each batch is tested for moisture, break strength, and cook quality before sealing.' },
];

const TESTIMONIALS = [
  {
    quote: 'We switched our entire noodle menu to ZHEN six months ago. The texture holds through our 8-hour service window without going soft.',
    name: 'Rajesh Kumar',
    role: 'F&B Manager, Cloud Kitchen Group · Mumbai',
  },
  {
    quote: 'Stock turns quickly in our modern trade outlet. Customers come back specifically asking for ZHEN — that is unusual for a category this new.',
    name: 'Priya Agarwal',
    role: 'Category Buyer · Retail Chain, Delhi NCR',
  },
  {
    quote: 'Onboarding was seamless. The trade team responded to our distributor enquiry within the hour and our first order landed in four days.',
    name: 'Vikram Nair',
    role: 'Regional Distributor · Kerala & TN',
  },
];

const FAQS = [
  { q: 'What is the Minimum Order Quantity for distributors?', a: 'The standard MOQ for new distributors is 50 cartons (12 packs × 500g per carton). Trial orders of 20 cartons are available for first-time partners with a signed distribution agreement.' },
  { q: 'Is ZHEN FSSAI certified?', a: 'Yes. All ZHEN products are manufactured under FSSAI licence and comply with Food Safety and Standards Regulations 2011. Certificate copies are available on request.' },
  { q: 'Do you offer exclusive territorial rights?', a: 'We offer exclusive distribution agreements for Tier-2 and Tier-3 cities. Metro territories are typically non-exclusive. Contact our trade team to discuss availability in your region.' },
  { q: 'What packaging formats are available for HoReCa?', a: 'In addition to the standard 500g retail pack, we supply 5kg and 20kg bulk formats for cloud kitchens, restaurants, and institutional buyers. Lead time for bulk is 5–7 working days.' },
  { q: 'How are margins structured?', a: 'Distributor margins are structured at the primary level with secondary trade margins built in. Exact terms are shared under NDA. Reach out via WhatsApp or email to receive our trade sheet.' },
];

const ABOUT_VALUES = [
  { icon: '⚖️', title: 'Integrity', desc: 'Honest business practices from sourcing to shelf.' },
  { icon: '💡', title: 'Innovation', desc: 'Continuously evolving our product range and processes.' },
  { icon: '🌿', title: 'Health Focus', desc: 'Nutritious choices without compromising on taste.' },
  { icon: '🤝', title: 'Customer First', desc: 'Every decision is made with our partners and end consumers in mind.' },
];

/* ─────────────────────────────────────────
   ANIMATED STAT COMPONENT
───────────────────────────────────────── */
function AnimatedStat({ target, label, suffix }: { target: number; label: string; suffix: string }) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current || hasAnimated) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const duration = 2000;
          const startTime = performance.now();
          
          const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeOut = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(easeOut * target));
            
            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };
          
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, hasAnimated]);

  const formatNumber = (num: number) => {
    return num.toLocaleString('en-IN');
  };

  return (
    <div ref={ref} className="hero__stat">
      <span className="hero__stat-val">{formatNumber(count)}{suffix}</span>
      <span className="hero__stat-lbl">{label}</span>
    </div>
  );
}

/* ─────────────────────────────────────────
   CHEF ANIMATION COMPONENT
───────────────────────────────────────── */
function ChefAnimation() {
  return (
    <div className="chef-scene">
      <svg viewBox="0 0 600 520" xmlns="http://www.w3.org/2000/svg" className="chef-svg">
        <defs>
          <radialGradient id="steamGrad" cx="50%" cy="100%" r="50%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.6)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </radialGradient>
          <radialGradient id="flameOuter" cx="50%" cy="80%" r="60%">
            <stop offset="0%" stopColor="#FF6B00" />
            <stop offset="60%" stopColor="#FF3D00" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
          <radialGradient id="flameInner" cx="50%" cy="80%" r="50%">
            <stop offset="0%" stopColor="#FFD700" />
            <stop offset="70%" stopColor="#FF8C00" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
          <linearGradient id="wokGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#555" />
            <stop offset="50%" stopColor="#222" />
            <stop offset="100%" stopColor="#111" />
          </linearGradient>
          <linearGradient id="wokRim" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#888" />
            <stop offset="100%" stopColor="#444" />
          </linearGradient>
          <linearGradient id="skinGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#C68642" />
            <stop offset="100%" stopColor="#A0692D" />
          </linearGradient>
          <linearGradient id="coatGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#F5F5F0" />
            <stop offset="100%" stopColor="#E0DDD6" />
          </linearGradient>
          <linearGradient id="boilerGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#7A7A7A" />
            <stop offset="100%" stopColor="#3A3A3A" />
          </linearGradient>
          <linearGradient id="waterGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#4A90D9" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#1A5A99" stopOpacity="0.9" />
          </linearGradient>
          <clipPath id="wokClip">
            <ellipse cx="185" cy="358" rx="72" ry="24" />
          </clipPath>
          <clipPath id="boilerClip">
            <rect x="380" y="330" width="100" height="60" />
          </clipPath>
        </defs>

        <rect x="0" y="400" width="600" height="120" fill="#2A2018" rx="4"/>
        <rect x="0" y="396" width="600" height="8" fill="#3A2E20"/>
        {[0,1,2,3,4].map(i => (
          <rect key={i} x={i*120} y={400} width={119} height={120} fill={i%2===0 ? "#2A2018" : "#251D15"} />
        ))}
        <rect x="0" y="398" width="600" height="4" fill="#4A3828"/>
        <rect x="0" y="400" width="600" height="12" fill="#4A3828"/>

        <rect x="130" y="390" width="110" height="14" fill="#1A1A1A" rx="2"/>
        <rect x="140" y="385" width="90" height="8" fill="#222" rx="2"/>
        {[150,165,180,195,210].map((x,i) => (
          <rect key={i} x={x} y="380" width="4" height="24" fill="#333" rx="1"/>
        ))}

        <g className="flames">
          {[0,45,90,135,180,225,270,315].map((angle, i) => {
            const rad = (angle * Math.PI) / 180;
            const fx = 185 + Math.cos(rad) * 28;
            const fy = 388 + Math.sin(rad) * 8;
            return (
              <g key={i} className={`flame-unit flame-delay-${i%4}`} transform={`translate(${fx}, ${fy})`}>
                <ellipse rx="7" ry="14" fill="url(#flameOuter)" className="flame-outer" />
                <ellipse rx="4" ry="9" fill="url(#flameInner)" className="flame-inner" />
              </g>
            );
          })}
          <ellipse cx="185" cy="385" rx="10" ry="8" fill="#1E90FF" opacity="0.7" className="flame-center"/>
        </g>

        <path d="M113,360 Q130,410 185,415 Q240,410 257,360" fill="url(#wokGrad)" stroke="url(#wokRim)" strokeWidth="2.5"/>
        <ellipse cx="185" cy="358" rx="72" ry="16" fill="#444" stroke="#777" strokeWidth="2"/>
        <ellipse cx="185" cy="355" rx="68" ry="13" fill="#1A1A1A"/>
        <rect x="257" y="350" width="45" height="10" fill="#555" rx="5" className="wok-handle"/>
        <rect x="258" y="352" width="42" height="6" fill="#888" rx="3"/>

        <g className="noodles-wok" clipPath="url(#wokClip)">
          {[0,1,2,3,4,5,6,7].map(i => (
            <path key={i} d={`M${130 + i*12},${365 + (i%3)*4} Q${145+i*10},${355+i*2} ${160+i*8},${370+i%2*6} Q${175+i*6},${380-i%3*3} ${190+i*5},${368}`} fill="none" stroke={i%3===0 ? "#E8D5A0" : i%3===1 ? "#D4B870" : "#C9A85C"} strokeWidth={i%2===0 ? "2.5" : "2"} strokeLinecap="round" className={`noodle-strand noodle-delay-${i%5}`}/>
          ))}
          <ellipse cx="182" cy="370" rx="45" ry="10" fill="rgba(180,100,20,0.3)"/>
        </g>

        <g className="wok-steam">
          <path d="M165,345 Q160,325 168,305 Q176,285 170,265" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="8" strokeLinecap="round" className="steam-1"/>
          <path d="M185,340 Q180,318 188,298 Q196,278 190,258" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="10" strokeLinecap="round" className="steam-2"/>
          <path d="M205,345 Q200,325 208,305 Q216,285 210,265" fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="7" strokeLinecap="round" className="steam-3"/>
        </g>

        <rect x="375" y="388" width="110" height="14" fill="#1A1A1A" rx="2"/>
        {[385,400,415,430,445,460].map((x,i) => (
          <rect key={i} x={x} y="382" width="3" height="18" fill="#333" rx="1"/>
        ))}
        <g className="flames-boiler">
          {[430,390,410,450].map((x, i) => (
            <g key={i} className={`flame-unit flame-delay-${i%3}`} transform={`translate(${x}, 382)`}>
              <ellipse rx="6" ry="12" fill="url(#flameOuter)" className="flame-outer"/>
              <ellipse rx="3.5" ry="7" fill="url(#flameInner)" className="flame-inner"/>
            </g>
          ))}
          <ellipse cx="430" cy="383" rx="14" ry="6" fill="#1E90FF" opacity="0.5" className="flame-center"/>
        </g>

        <rect x="382" y="310" width="96" height="80" fill="url(#boilerGrad)" rx="4"/>
        <rect x="382" y="310" width="96" height="6" fill="#888" rx="2"/>
        <rect x="365" y="326" width="20" height="10" fill="#666" rx="5"/>
        <rect x="475" y="326" width="20" height="10" fill="#666" rx="5"/>
        <rect x="378" y="308" width="104" height="8" fill="#999" rx="3"/>
        <ellipse cx="430" cy="314" rx="48" ry="10" fill="url(#waterGrad)"/>
        <g className="pot-lid" style={{transformOrigin: '480px 308px'}}>
          <ellipse cx="430" cy="308" rx="52" ry="10" fill="#888" stroke="#AAA" strokeWidth="1.5"/>
          <rect x="415" y="296" width="30" height="12" fill="#777" rx="6"/>
          <rect x="421" y="292" width="18" height="6" fill="#999" rx="3"/>
        </g>
        <g className="boiler-steam">
          <path d="M410,300 Q405,278 413,258 Q421,238 415,218" fill="none" stroke="rgba(255,255,255,0.22)" strokeWidth="9" strokeLinecap="round" className="steam-1"/>
          <path d="M430,295 Q425,273 433,253 Q441,233 435,213" fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="11" strokeLinecap="round" className="steam-2"/>
          <path d="M450,300 Q445,278 453,258 Q461,238 455,218" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="8" strokeLinecap="round" className="steam-3"/>
        </g>
        <g className="boiler-bubbles">
          <circle cx="405" cy="312" r="4" fill="rgba(255,255,255,0.5)" className="bubble-1"/>
          <circle cx="430" cy="310" r="5" fill="rgba(255,255,255,0.45)" className="bubble-2"/>
          <circle cx="455" cy="313" r="3.5" fill="rgba(255,255,255,0.4)" className="bubble-3"/>
          <circle cx="418" cy="315" r="3" fill="rgba(255,255,255,0.35)" className="bubble-4"/>
          <circle cx="443" cy="311" r="4" fill="rgba(255,255,255,0.4)" className="bubble-5"/>
        </g>

        <g className="noodles-falling">
          {[0,1,2,3].map(i => (
            <path key={i} d={`M${415+i*8},200 Q${412+i*6},230 ${418+i*7},260 Q${422+i*5},288 ${420+i*6},310`} fill="none" stroke={i%2===0 ? "#E8D5A0" : "#D4B870"} strokeWidth="2" strokeLinecap="round" className={`noodle-falling noodle-fall-delay-${i}`}/>
          ))}
        </g>

        <g className="chef-hat">
          <rect x="288" y="60" width="64" height="8" fill="#E8E8E0" rx="3"/>
          <rect x="292" y="18" width="56" height="46" fill="#F2F2ED" rx="4"/>
          <rect x="294" y="16" width="52" height="6" fill="#F8F8F5" rx="2"/>
          {[300,310,320,330].map((x,i) => (
            <rect key={i} x={x} y="16" width="1.5" height="50" fill="rgba(0,0,0,0.06)" />
          ))}
        </g>

        <ellipse cx="320" cy="100" rx="28" ry="32" fill="url(#skinGrad)"/>
        <ellipse cx="309" cy="94" rx="4" ry="5" fill="#2A1A0A"/>
        <ellipse cx="331" cy="94" rx="4" ry="5" fill="#2A1A0A"/>
        <ellipse cx="310" cy="93" rx="1.5" ry="2" fill="white" opacity="0.6"/>
        <ellipse cx="332" cy="93" rx="1.5" ry="2" fill="white" opacity="0.6"/>
        <path d="M305,88 Q309,85 314,87" fill="none" stroke="#3A2010" strokeWidth="2" strokeLinecap="round"/>
        <path d="M327,87 Q331,85 336,88" fill="none" stroke="#3A2010" strokeWidth="2" strokeLinecap="round"/>
        <ellipse cx="320" cy="103" rx="4" ry="3" fill="#B8722A" opacity="0.5"/>
        <path d="M311,114 Q320,118 329,114" fill="none" stroke="#8A4820" strokeWidth="2" strokeLinecap="round"/>
        <ellipse cx="292" cy="100" rx="5" ry="7" fill="#B8722A"/>
        <ellipse cx="348" cy="100" rx="5" ry="7" fill="#B8722A"/>
        <rect x="308" y="128" width="24" height="20" fill="#B8722A" rx="2"/>

        <path d="M270,148 Q280,145 308,142 L332,142 Q360,145 370,148 L375,300 Q370,310 320,312 Q270,310 265,300 Z" fill="url(#coatGrad)"/>
        <circle cx="308" cy="175" r="5" fill="#DDD" stroke="#CCC" strokeWidth="1"/>
        <circle cx="332" cy="175" r="5" fill="#DDD" stroke="#CCC" strokeWidth="1"/>
        <circle cx="308" cy="200" r="5" fill="#DDD" stroke="#CCC" strokeWidth="1"/>
        <circle cx="332" cy="200" r="5" fill="#DDD" stroke="#CCC" strokeWidth="1"/>
        <circle cx="308" cy="225" r="5" fill="#DDD" stroke="#CCC" strokeWidth="1"/>
        <circle cx="332" cy="225" r="5" fill="#DDD" stroke="#CCC" strokeWidth="1"/>
        <path d="M308,142 L295,160 L308,170" fill="#E8E8E0" stroke="#CCC" strokeWidth="1"/>
        <path d="M332,142 L345,160 L332,170" fill="#E8E8E0" stroke="#CCC" strokeWidth="1"/>
        <line x1="320" y1="148" x2="320" y2="310" stroke="#DDD" strokeWidth="1.5"/>
        <path d="M285,170 L285,300 Q320,310 355,300 L355,170 Z" fill="rgba(200,190,160,0.35)"/>
        <rect x="305" y="162" width="30" height="14" fill="rgba(200,190,160,0.4)" rx="2"/>

        <g className="chef-arm-left">
          <path d="M270,158 Q248,185 238,220 Q232,240 238,260" fill="url(#coatGrad)" stroke="#DDD" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M238,260 Q235,285 255,308 Q268,320 285,320" fill="url(#coatGrad)" stroke="#DDD" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M250,295 Q255,310 270,318 Q280,322 290,318" fill="#E0DDD6" stroke="#CCC" strokeWidth="1"/>
          <ellipse cx="290" cy="348" rx="16" ry="12" fill="#B8722A" transform="rotate(-20, 290, 348)"/>
          <rect x="278" y="344" width="24" height="10" fill="#A06828" rx="5" transform="rotate(-10, 290, 348)"/>
          {[0,1,2,3].map(i => (
            <rect key={i} x={284+i*5} y={348} width="4" height="8" fill="#9A6020" rx="2" transform={`rotate(-10, ${284+i*5}, 348)`}/>
          ))}
        </g>

        <g className="chef-arm-right">
          <path d="M370,158 Q392,180 398,215 Q402,235 395,255" fill="url(#coatGrad)" stroke="#DDD" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M395,255 Q392,275 375,295 Q365,310 350,315" fill="url(#coatGrad)" stroke="#DDD" strokeWidth="1.5" strokeLinecap="round"/>
          <ellipse cx="345" cy="318" rx="15" ry="11" fill="#B8722A"/>
          <rect x="340" y="310" width="3" height="55" fill="#5A3A1A" rx="1.5" transform="rotate(15, 340, 340)"/>
          <rect x="346" y="310" width="3" height="55" fill="#5A3A1A" rx="1.5" transform="rotate(10, 346, 340)"/>
        </g>

        <rect x="290" y="305" width="60" height="80" fill="#222" rx="2"/>
        <line x1="320" y1="305" x2="320" y2="385" stroke="#333" strokeWidth="2"/>
        <rect x="290" y="378" width="28" height="16" fill="#1A1A1A" rx="3"/>
        <rect x="322" y="378" width="28" height="16" fill="#1A1A1A" rx="3"/>

        <g className="noodle-toss">
          <path d="M185,340 Q220,280 260,295 Q280,300 300,320" fill="none" stroke="#E8D5A0" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="4,3" className="noodle-arc-1"/>
          <path d="M185,345 Q215,275 255,292 Q275,298 298,318" fill="none" stroke="#D4B870" strokeWidth="2" strokeLinecap="round" strokeDasharray="3,4" className="noodle-arc-2"/>
          <path d="M188,338 Q225,285 262,298 Q282,304 302,322" fill="none" stroke="#C9A85C" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="3,5" className="noodle-arc-3"/>
        </g>

        <rect x="510" y="348" width="18" height="48" fill="#2A1A08" rx="4"/>
        <rect x="514" y="344" width="10" height="8" fill="#1A0E04" rx="2"/>
        <rect x="508" y="346" width="22" height="4" fill="#3A2A10" rx="1"/>
        <rect x="512" y="358" width="14" height="22" fill="#C8A830" rx="1" opacity="0.7"/>
        <rect x="536" y="352" width="16" height="44" fill="#D4A820" rx="4" opacity="0.8"/>
        <rect x="539" y="347" width="10" height="8" fill="#B8921C" rx="2"/>
        <ellipse cx="544" cy="350" rx="6" ry="3" fill="#C8A020"/>
        <ellipse cx="568" cy="390" rx="16" ry="8" fill="#8B4513"/>
        <rect x="552" y="370" width="32" height="22" fill="#8B4513" rx="2"/>
        <ellipse cx="568" cy="370" rx="16" ry="6" fill="#A0522D"/>
        {[560,568,576].map((x,i) => (
          <g key={i}>
            <line x1={x} y1="370" x2={x-4+i*4} y2="350" stroke="#2D6A2D" strokeWidth="1.5"/>
            <ellipse cx={x-4+i*4} cy="346" rx="5" ry="3" fill="#2D8A2D" transform={`rotate(${-20+i*20}, ${x-4+i*4}, 346)`}/>
          </g>
        ))}

        <ellipse cx="80" cy="398" rx="42" ry="16" fill="#D4A870" opacity="0.8"/>
        <path d="M38,390 Q38,430 80,435 Q122,430 122,390" fill="#C89A60" opacity="0.7"/>
        <ellipse cx="80" cy="390" rx="42" ry="15" fill="#E0B880"/>
        {[0,1,2,3].map(i => (
          <ellipse key={i} cx="80" cy="390" rx={32-i*6} ry={10-i*2} fill="none" stroke={i%2===0?"#E8D5A0":"#C9A85C"} strokeWidth="2.5" opacity={0.8-i*0.15}/>
        ))}
        <ellipse cx="80" cy="388" rx="8" ry="4" fill="#D4B870" opacity="0.9"/>

        <rect x="0" y="402" width="600" height="6" fill="rgba(0,0,0,0.3)"/>
        <g className="spice-particles">
          {[{x:155,y:310,r:2},{x:215,y:298,r:1.5},{x:198,y:320,r:2.5},{x:172,y:302,r:1.8},{x:230,y:310,r:1.5}].map((p,i)=>(
            <circle key={i} cx={p.x} cy={p.y} r={p.r} fill="#C8A830" opacity="0.6" className={`spice-${i}`}/>
          ))}
        </g>

        <text x="320" y="490" fontFamily="serif" fontSize="12" fill="#C8A830" opacity="0.5" textAnchor="middle" letterSpacing="4">
          HANDCRAFTED PERFECTION
        </text>
      </svg>

      <div className="fire-glow fire-glow-left"/>
      <div className="fire-glow fire-glow-right"/>
    </div>
  );
}

/* ─────────────────────────────────────────
   COOKING PROCESS ANIMATION COMPONENT
───────────────────────────────────────── */
function CookingStepAnimation({ step }: { step: number }) {
  const animations: React.ReactElement[] = [
    <BoilWaterAnim />,
    <AddNoodlesAnim />,
    <CookAnim />,
    <DrainTossAnim />,
  ];
  return (
    <div className="cook-anim-wrap">
      {animations[step] || animations[0]}
    </div>
  );
}

function BoilWaterAnim() {
  return (
    <svg viewBox="0 0 200 200" className="cook-anim-svg">
      <defs>
        <linearGradient id="potG" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#888"/>
          <stop offset="100%" stopColor="#333"/>
        </linearGradient>
        <linearGradient id="waterG" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#5BA8E0" stopOpacity="0.85"/>
          <stop offset="100%" stopColor="#2060A0" stopOpacity="0.95"/>
        </linearGradient>
      </defs>
      <ellipse cx="100" cy="175" rx="55" ry="8" fill="#222"/>
      {[70,82,94,106,118,130].map((x,i) => (
        <rect key={i} x={x} y="168" width="3" height="10" fill="#333" rx="1"/>
      ))}
      {[80,95,100,115,120].map((x,i) => (
        <g key={i} className={`cook-flame cook-flame-${i%3}`}>
          <ellipse cx={x} cy="167" rx="5" ry="10" fill="#FF6B00" opacity="0.9"/>
          <ellipse cx={x} cy="167" rx="3" ry="6" fill="#FFD700" opacity="0.9"/>
        </g>
      ))}
      <ellipse cx="100" cy="168" rx="12" ry="5" fill="#4169E1" opacity="0.6" className="cook-flame-center"/>
      <rect x="48" y="108" width="104" height="62" fill="url(#potG)" rx="3"/>
      <rect x="30" y="120" width="20" height="8" fill="#666" rx="4"/>
      <rect x="150" y="120" width="20" height="8" fill="#666" rx="4"/>
      <rect x="50" y="112" width="100" height="56" fill="url(#waterG)" rx="2" className="water-level"/>
      <ellipse cx="100" cy="114" rx="50" ry="7" fill="#6BBDE8" opacity="0.8" className="water-ripple"/>
      {[{x:75,y:130,r:4},{x:100,y:118,r:5},{x:125,y:128,r:4},{x:88,y:125,r:3},{x:112,y:122,r:3.5}].map((b,i)=>(
        <circle key={i} cx={b.x} cy={b.y} r={b.r} fill="rgba(255,255,255,0.5)" className={`big-bubble big-bubble-${i}`}/>
      ))}
      <rect x="44" y="106" width="112" height="8" fill="#AAA" rx="3"/>
      <g className="lid-dance">
        <ellipse cx="100" cy="106" rx="56" ry="9" fill="#999" stroke="#BBB" strokeWidth="1.5"/>
        <rect x="82" y="94" width="36" height="13" fill="#888" rx="6"/>
        <rect x="88" y="90" width="24" height="6" fill="#AAA" rx="3"/>
      </g>
      <path d="M78,95 Q74,75 80,58 Q86,40 80,22" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="8" strokeLinecap="round" className="big-steam-1"/>
      <path d="M100,90 Q96,70 102,53 Q108,35 102,17" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="10" strokeLinecap="round" className="big-steam-2"/>
      <path d="M122,95 Q118,75 124,58 Q130,40 124,22" fill="none" stroke="rgba(255,255,255,0.22)" strokeWidth="7" strokeLinecap="round" className="big-steam-3"/>
    </svg>
  );
}

function AddNoodlesAnim() {
  return (
    <svg viewBox="0 0 200 200" className="cook-anim-svg">
      <defs>
        <linearGradient id="potG2" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#888"/>
          <stop offset="100%" stopColor="#333"/>
        </linearGradient>
        <linearGradient id="waterG2" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#5BA8E0" stopOpacity="0.85"/>
          <stop offset="100%" stopColor="#2060A0" stopOpacity="0.95"/>
        </linearGradient>
      </defs>
      <ellipse cx="100" cy="172" rx="52" ry="8" fill="#333"/>
      {[72,84,96,108,120].map((x,i) => (
        <rect key={i} x={x} y="165" width="3" height="10" fill="#444" rx="1"/>
      ))}
      {[80,100,120].map((x,i)=>(
        <g key={i} className={`cook-flame cook-flame-${i%3}`}>
          <ellipse cx={x} cy="164" rx="5" ry="9" fill="#FF6B00" opacity="0.9"/>
          <ellipse cx={x} cy="164" rx="3" ry="5" fill="#FFD700"/>
        </g>
      ))}
      <rect x="48" y="108" width="104" height="62" fill="url(#potG2)" rx="3"/>
      <rect x="30" y="118" width="20" height="8" fill="#666" rx="4"/>
      <rect x="150" y="118" width="20" height="8" fill="#666" rx="4"/>
      <rect x="50" y="112" width="100" height="56" fill="url(#waterG2)" rx="2"/>
      <ellipse cx="100" cy="113" rx="50" ry="6" fill="#6BBDE8" opacity="0.7" className="water-ripple"/>
      <rect x="44" y="106" width="112" height="7" fill="#AAA" rx="3"/>
      <g className="hand-dropping">
        <rect x="82" y="15" width="10" height="30" fill="#C68642" rx="5"/>
        <rect x="95" y="12" width="10" height="33" fill="#C68642" rx="5"/>
        <rect x="108" y="13" width="10" height="32" fill="#C68642" rx="5"/>
        <rect x="121" y="16" width="10" height="28" fill="#C68642" rx="5"/>
        <rect x="80" y="38" width="56" height="22" fill="#B8722A" rx="6"/>
        <rect x="82" y="36" width="52" height="8" fill="#C68642" rx="4"/>
        {[-3,-1,0,1,3].map((offset,i) => (
          <path key={i} d={`M${100+offset*3},60 Q${96+offset*4},80 ${100+offset*2},100 Q${104+offset*3},115 ${100+offset*2},130`} fill="none" stroke={i%2===0 ? "#E8D5A0" : "#D4B870"} strokeWidth="2.5" strokeLinecap="round" className={`falling-noodle falling-noodle-${i}`}/>
        ))}
      </g>
      <g className="splash">
        {[{x:78,y:108,r:2},{x:90,y:104,r:3},{x:108,y:104,r:2.5},{x:120,y:108,r:2}].map((s,i)=>(
          <ellipse key={i} cx={s.x} cy={s.y} rx={s.r*2} ry={s.r} fill="#6BBDE8" opacity="0.6" className={`splash-drop splash-${i}`}/>
        ))}
      </g>
    </svg>
  );
}

function CookAnim() {
  return (
    <svg viewBox="0 0 200 200" className="cook-anim-svg">
      <defs>
        <linearGradient id="potG3" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#888"/>
          <stop offset="100%" stopColor="#333"/>
        </linearGradient>
        <linearGradient id="waterG3" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#7BB8E0" stopOpacity="0.9"/>
          <stop offset="100%" stopColor="#2060A0" stopOpacity="0.95"/>
        </linearGradient>
      </defs>
      <ellipse cx="100" cy="172" rx="52" ry="8" fill="#333"/>
      {[78,92,100,108,122].map((x,i) => (
        <rect key={i} x={x} y="165" width="3" height="9" fill="#444" rx="1"/>
      ))}
      {[80,100,120].map((x,i)=>(
        <g key={i} className={`cook-flame cook-flame-${i%3}`}>
          <ellipse cx={x} cy="164" rx="6" ry="11" fill="#FF6B00" opacity="0.9"/>
          <ellipse cx={x} cy="164" rx="3.5" ry="6.5" fill="#FFD700"/>
        </g>
      ))}
      <rect x="48" y="108" width="104" height="62" fill="url(#potG3)" rx="3"/>
      <rect x="30" y="118" width="20" height="8" fill="#666" rx="4"/>
      <rect x="150" y="118" width="20" height="8" fill="#666" rx="4"/>
      <rect x="50" y="112" width="100" height="56" fill="url(#waterG3)" rx="2"/>
      {[0,1,2,3,4].map(i=>(
        <path key={i} d={`M${58+i*10},${130+i%2*8} Q${68+i*9},${115+i%3*5} ${78+i*10},${128+i%2*6} Q${88+i*8},${140+i%3*4} ${98+i*8},${125}`} fill="none" stroke={i%2===0 ? "rgba(232,213,160,0.7)" : "rgba(212,184,112,0.7)"} strokeWidth="2.5" strokeLinecap="round" className={`cooking-noodle cooking-noodle-${i}`}/>
      ))}
      <ellipse cx="100" cy="113" rx="50" ry="6" fill="#82C8EC" opacity="0.75" className="water-ripple"/>
      {[{x:68,y:122,r:5},{x:82,y:116,r:6},{x:100,y:114,r:7},{x:118,y:116,r:5.5},{x:132,y:122,r:5}].map((b,i)=>(
        <circle key={i} cx={b.x} cy={b.y} r={b.r} fill="rgba(255,255,255,0.55)" className={`big-bubble big-bubble-${i}`}/>
      ))}
      <rect x="44" y="106" width="112" height="7" fill="#AAA" rx="3"/>
      <g className="stirring">
        <rect x="98" y="50" width="3" height="80" fill="#5A3A1A" rx="1.5" transform="rotate(10,98,80)"/>
        <rect x="106" y="45" width="3" height="80" fill="#5A3A1A" rx="1.5" transform="rotate(6,106,75)"/>
      </g>
      <path d="M75,104 Q71,84 77,67 Q83,50 77,33" fill="none" stroke="rgba(255,255,255,0.28)" strokeWidth="8" strokeLinecap="round" className="big-steam-1"/>
      <path d="M100,100 Q96,80 102,63 Q108,46 102,29" fill="none" stroke="rgba(255,255,255,0.22)" strokeWidth="10" strokeLinecap="round" className="big-steam-2"/>
      <path d="M125,104 Q121,84 127,67 Q133,50 127,33" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="7" strokeLinecap="round" className="big-steam-3"/>
      <rect x="150" y="20" width="45" height="28" fill="#1A1A1A" rx="4"/>
      <text x="172" y="38" fontFamily="monospace" fontSize="13" fill="#00FF88" textAnchor="middle">2:30</text>
      <rect x="154" y="22" width="37" height="3" fill="#333" rx="1"/>
    </svg>
  );
}

function DrainTossAnim() {
  return (
    <svg viewBox="0 0 200 200" className="cook-anim-svg">
      <defs>
        <linearGradient id="wokG2" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#555"/>
          <stop offset="100%" stopColor="#111"/>
        </linearGradient>
      </defs>
      <path d="M48,80 Q48,120 100,125 Q152,120 152,80 Z" fill="#888" stroke="#AAA" strokeWidth="1.5"/>
      <ellipse cx="100" cy="80" rx="52" ry="12" fill="#999" stroke="#BBB" strokeWidth="1.5"/>
      <ellipse cx="100" cy="79" rx="48" ry="9" fill="#777"/>
      {[70,84,98,112,126].map(x => [88,102,115].map(y => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r="2" fill="#555"/>
      )))}
      <rect x="18" y="86" width="32" height="8" fill="#888" rx="4"/>
      <rect x="150" y="86" width="32" height="8" fill="#888" rx="4"/>
      {[80,95,100,105,118].map((x,i)=>(
        <line key={i} x1={x} y1="125" x2={x+(-2+i)} y2="165" stroke="rgba(91,168,224,0.5)" strokeWidth="1.5" strokeLinecap="round" className={`drain-drop drain-drop-${i}`}/>
      ))}
      {[0,1,2,3].map(i=>(
        <path key={i} d={`M${62+i*14},85 Q${70+i*12},95 ${80+i*11},90 Q${90+i*10},85 ${100+i*9},92`} fill="none" stroke={i%2===0 ? "#E8D5A0" : "#D4B870"} strokeWidth="3" strokeLinecap="round" className={`drained-noodle drained-noodle-${i}`}/>
      ))}
      <path d="M30,165 Q36,190 80,193 Q100,194 105,165 Z" fill="url(#wokG2)" stroke="#555" strokeWidth="1.5"/>
      <ellipse cx="68" cy="165" rx="38" ry="8" fill="#444" stroke="#777" strokeWidth="1.5"/>
      <path d="M55,160 Q52,148 56,136" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="6" strokeLinecap="round" className="small-steam-1"/>
      <path d="M70,158 Q67,144 71,132" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="7" strokeLinecap="round" className="small-steam-2"/>
      <path d="M155,30 Q148,55 140,80 Q138,90 142,100" fill="none" stroke="rgba(210,180,100,0.5)" strokeWidth="4" strokeLinecap="round" className="oil-pour"/>
      <rect x="148" y="10" width="18" height="28" fill="#D4A820" rx="3" opacity="0.8"/>
      <rect x="152" y="6" width="10" height="7" fill="#B8921C" rx="2"/>
      <g className="toss-arc">
        {[0,1,2].map(i=>(
          <path key={i} d={`M${95+i*5},165 Q${118+i*3},140 ${132+i*4},120 Q${148+i*2},100 ${155+i*3},82`} fill="none" stroke={i%2===0?"#E8D5A0":"#C9A85C"} strokeWidth="2" strokeLinecap="round" className={`toss-noodle toss-noodle-${i}`}/>
        ))}
      </g>
    </svg>
  );
}

/* ─────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────── */
export default function ZhenWebsite() {
  const [scrollY, setScrollY] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activeStep, setActiveStep] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeCookStep, setActiveCookStep] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', onScroll, { passive: true });

    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('in-view'); }),
      { threshold: 0.08, rootMargin: '0px 0px -32px 0px' }
    );
    document.querySelectorAll('.reveal').forEach((el) => obs.observe(el));

    const stepTimer = setInterval(() => setActiveStep((p) => (p + 1) % 4), 3000);
    const cookTimer = setInterval(() => setActiveCookStep((p) => (p + 1) % 4), 4000);

    return () => {
      window.removeEventListener('scroll', onScroll);
      obs.disconnect();
      clearInterval(stepTimer);
      clearInterval(cookTimer);
    };
  }, []);

  const WA_URL = 'https://wa.me/919266442898?text=Hi%2C%20I%20am%20interested%20in%20ZHEN%20distribution.';

  const cookSteps = [
    { step: '01', title: 'Boil Water', detail: 'Bring 4 cups (1 litre) of water to a full rolling boil over high heat. Do not add noodles to simmering water — a full boil is essential.' },
    { step: '02', title: 'Add Noodles', detail: 'Gently fan the noodle portion before adding to water. This prevents clumping and ensures even cooking throughout the strands.' },
    { step: '03', title: 'Cook 7 -9 min', detail: 'Stir once at the 60-second mark. Taste-test at 2 minutes. ZHEN noodles are optimal at al dente — slightly firm at the core.' },
    { step: '04', title: 'Drain & Toss', detail: 'Drain immediately and rinse with cold water to stop cooking. Toss in a hot wok with oil within 2 minutes for best wok char.' },
  ];

  return (
    <div className="root">

      {/* ── FLOATING CONTACT ── */}
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
          <button className="nav__burger" aria-label="Toggle menu" onClick={() => setMobileMenuOpen((o) => !o)}>
            <span className={mobileMenuOpen ? 'open' : ''} />
            <span className={mobileMenuOpen ? 'open' : ''} />
            <span className={mobileMenuOpen ? 'open' : ''} />
          </button>
        </div>
        {mobileMenuOpen && (
          <div className="nav__mobile">
            {NAV_LINKS.map((l) => (
              <a key={l.href} href={l.href} className="nav__mobile-link" onClick={() => setMobileMenuOpen(false)}>{l.label}</a>
            ))}
            <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="nav__mobile-cta" onClick={() => setMobileMenuOpen(false)}>Become a Distributor</a>
          </div>
        )}
      </header>

      {/* ══════════════════════════════
          HERO with Chef Animation
      ══════════════════════════════ */}
      <section className="hero">
        <div className="hero__bg-lines" aria-hidden="true">
          {[...Array(6)].map((_, i) => <div key={i} className="hero__bg-line" style={{ left: `${10 + i * 16}%` }} />)}
        </div>

        <div className="container hero__inner">
          <div className="hero__left">
            <div className="hero__label reveal">India's First 50/50 Blend Noodle</div>
            <h1 className="hero__h1 reveal">
              Premium<br />Indo-Chinese<br /><em>Noodles</em>
            </h1>
            <div className="hero__meta reveal">
              <div className="hero__blend">
                <div className="blend__half blend__half--wheat">
                  <span className="blend__pct">50%</span>
                  <span className="blend__name">Wheat</span>
                </div>
                <div className="blend__divider" />
                <div className="blend__half blend__half--maida">
                  <span className="blend__pct">50%</span>
                  <span className="blend__name">Maida</span>
                </div>
              </div>
              <p className="hero__desc">
                A proprietary 50/50 wheat–maida formulation engineered for restaurants, cloud kitchens, and modern trade. Superior texture, consistent quality, distributor-ready supply chain.
              </p>
              <div className="hero__actions">
                <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="btn btn--primary">Distributor Enquiry</a>
                <a href="#product" className="btn btn--ghost">View Product Specs</a>
              </div>
              <div className="hero__trust">
                <span>FSSAI Certified</span>
                <span className="trust__sep" />
                <span>No Preservatives</span>
                <span className="trust__sep" />
                <span>HoReCa & Retail Ready</span>
              </div>
            </div>
          </div>

          <div className="hero__anim-col reveal">
            <div className="hero__anim-label">Master Chef · ZHEN Kitchen</div>
            <ChefAnimation />
            <div className="hero__anim-caption">Handcrafted with 18 months of R&D precision</div>
          </div>
        </div>

        <div className="hero__stats reveal">
          {STATS.map((s, i) => (
            <AnimatedStat key={i} target={s.value} label={s.label} suffix={s.suffix} />
          ))}
        </div>
      </section>

      {/* ── MARQUEE ── */}
      <div className="marquee" aria-hidden="true">
        <div className="marquee__track">
          {[...Array(4)].map((_, r) => (
            <span key={r} className="marquee__set">
              {['Premium 50/50 Blend', 'No Artificial Preservatives', 'HoReCa Ready', 'Distributor Network India', 'FSSAI Certified', 'Wheat & Maida', 'Restaurant Grade', 'VN Traders'].map((t, i) => (
                <span key={i} className="marquee__item">{t}<span className="marquee__dot">·</span></span>
              ))}
            </span>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════
          ABOUT — 2nd SECTION (moved up & expanded)
      ══════════════════════════════ */}
      <section id="about" className="section about-full">
        <div className="container">
          {/* Top strip */}
          <div className="about-full__top reveal">
            <div className="about-full__label">
              <div className="section__tag">About V.N Traders</div>
              <h2 className="section__h2">Born in India,<br /><em>Inspired by Asia</em></h2>
            </div>
            <div className="about-full__founder-card">
              <div className="founder__avatar">SG</div>
              <div className="founder__info">
                <strong>Shubham Goyal</strong>
                <span>Founder & Director, V.N Traders</span>
                <div className="founder__year">Est. 2018 · Expanded 2024</div>
              </div>
            </div>
          </div>

          {/* Intro paragraph — full width */}
          <div className="about-full__intro reveal">
            <p>
              At V.N Traders, food is not just a business — it is a journey built on <strong>trust, evolution, and a deep commitment to quality</strong>. We are a growing Indian packaged food company dedicated to delivering premium, healthy, and great-tasting food products that suit modern lifestyles.
            </p>
          </div>

          {/* Timeline / story cards */}
          <div className="about-full__timeline reveal">
            <div className="timeline__item">
              <div className="timeline__year">2018</div>
              <div className="timeline__content">
                <h4>The Beginning</h4>
                <p>Founded by Shubham Goyal, V.N Traders began its journey as a cold drinks supply business, serving local markets with dedication and reliability.</p>
              </div>
            </div>
            <div className="timeline__connector" aria-hidden="true">→</div>
            <div className="timeline__item">
              <div className="timeline__year">2020–23</div>
              <div className="timeline__content">
                <h4>Into Food Service</h4>
                <p>As consumer preferences evolved, the company expanded into the restaurant and food service sector, gaining hands-on experience in taste development, quality standards, and customer satisfaction.</p>
              </div>
            </div>
            <div className="timeline__connector" aria-hidden="true">→</div>
            <div className="timeline__item">
              <div className="timeline__year">2024</div>
              <div className="timeline__content">
                <h4>ZHEN Is Born</h4>
                <p>After 18 months of formulation trials, we proudly launched ZHEN Premium Noodles — a health-conscious option crafted for families who seek both great taste and better choices.</p>
              </div>
            </div>
          </div>

          {/* Main story + stats grid */}
          <div className="about-full__body reveal">
            <div className="about-full__story">
              <p>
                Today, we manufacture and supply <strong>ZHEN Premium Noodles</strong>, made using wheat and refined flour blends along with carefully selected ingredients. Our noodles are designed to be a health-conscious option without compromising on flavour — every pack delivers an authentic real wok taste, while meeting high standards of hygiene, safety, and consistency.
              </p>
              <p>
                At V.N Traders, we understand that food is deeply emotional. It connects families, creates memories, and supports everyday living. That is why we focus on quality ingredients, responsible sourcing, and honest business practices. <strong>From grain to pack, every step reflects our promise to deliver food that people can trust.</strong>
              </p>
              <p>
                With a steadily growing distribution network, we aim to become a trusted name in the Indian wheat noodles and packaged food market. While our business has evolved over the years, our core values remain unchanged.
              </p>

              {/* Values grid */}
              <div className="about-full__values">
                {ABOUT_VALUES.map((v, i) => (
                  <div key={i} className="value__card">
                    <span className="value__icon">{v.icon}</span>
                    <strong>{v.title}</strong>
                    <p>{v.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="about-full__stats-col">
              <div className="about-full__stat-block">
                <span className="asb__val">2018</span>
                <span className="asb__lbl">Year Founded</span>
              </div>
              <div className="about-full__stat-block">
                <span className="asb__val">18 mo.</span>
                <span className="asb__lbl">R&D Before Launch</span>
              </div>
              <div className="about-full__stat-block">
                <span className="asb__val">100%</span>
                <span className="asb__lbl">India Manufactured</span>
              </div>
              <div className="about-full__stat-block about-full__stat-block--gold">
                <span className="asb__val">真</span>
                <span className="asb__lbl">Means Authentic</span>
              </div>
              <div className="about-full__mission">
                <div className="mission__label">Our Mission</div>
                <p>To become the default premium noodle for every Indo-Chinese restaurant and every modern trade shelf in India.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════
          PRODUCT SECTION
      ══════════════════════════════ */}
      <section id="product" className="section section--cream">
        <div className="container">
          <div className="section__header reveal">
            <div className="section__tag">Product</div>
            <h2 className="section__h2">ZHEN Wheat Noodles</h2>
            <p className="section__sub">Complete specifications for trade buyers and distributor partners.</p>
          </div>
          <div className="product__layout reveal">
            <div className="product__visual">
              <div className="pack__card">
                <div className="pack__top-bar" />
                <div className="pack__body">
                  <div className="pack__brand">ZHEN</div>
                  <div className="pack__tagline">真 · Premium Wheat Noodles</div>
                  <div className="pack__blend-badge">
                    <span>50</span><em>/</em><span>50</span>
                    <small>Wheat · Maida</small>
                  </div>
                  <div className="pack__weight">500g</div>
                </div>
                <div className="pack__bottom">
                  <span>No Preservatives</span>
                  <span>·</span>
                  <span>FSSAI Licensed</span>
                </div>
              </div>
              <div className="product__price-tag">
                <span className="price__label">MRP</span>
                <span className="price__val">₹80</span>
                <span className="price__pack">per 500g pack</span>
              </div>
              <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="btn btn--primary btn--full">
                Request Trade Price Sheet
              </a>
            </div>
            <div className="product__specs">
              <div className="specs__title">Technical Specifications</div>
              <table className="specs__table">
                <tbody>
                  {PRODUCT_SPECS.map((row, i) => (
                    <tr key={i} className="specs__row">
                      <td className="specs__key">{row.label}</td>
                      <td className="specs__val">{row.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="coming-soon__block">
                <div className="cs__label">Coming Soon</div>
                <div className="cs__items">
                  <div className="cs__item">ZHEN Pasta · Italian–Indian Fusion</div>
                  <div className="cs__item">Indo-Chinese Sauces · Multiple Variants</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════
          PROCESS
      ══════════════════════════════ */}
      <section className="section section--dark">
        <div className="container">
          <div className="section__header section__header--light reveal">
            <div className="section__tag section__tag--light">Manufacturing</div>
            <h2 className="section__h2 section__h2--light">From Grain to Pack</h2>
            <p className="section__sub section__sub--light">A controlled, four-stage production process ensures consistent quality across every batch.</p>
          </div>
          <div className="process__layout reveal">
            <div className="process__steps">
              {PROCESS_STEPS.map((s, i) => (
                <button
                  key={i}
                  className={`process__step ${activeStep === i ? 'process__step--active' : ''}`}
                  onClick={() => setActiveStep(i)}
                >
                  <span className="ps__num">{s.n}</span>
                  <div className="ps__content">
                    <strong>{s.title}</strong>
                    <p>{s.desc}</p>
                  </div>
                  <span className="ps__arrow">→</span>
                </button>
              ))}
            </div>
            <div className="process__detail">
              <div className="pd__num">{PROCESS_STEPS[activeStep].n}</div>
              <h3 className="pd__title">{PROCESS_STEPS[activeStep].title}</h3>
              <p className="pd__desc">{PROCESS_STEPS[activeStep].desc}</p>
              <div className="pd__progress">
                {PROCESS_STEPS.map((_, i) => (
                  <div
                    key={i}
                    className={`pd__pip ${i === activeStep ? 'pd__pip--active' : i < activeStep ? 'pd__pip--done' : ''}`}
                    onClick={() => setActiveStep(i)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════
          WHY ZHEN
      ══════════════════════════════ */}
      <section id="why" className="section">
        <div className="container">
          <div className="section__header reveal">
            <div className="section__tag">Why ZHEN</div>
            <h2 className="section__h2">Built for Trade</h2>
            <p className="section__sub">Every decision in the ZHEN formula is designed with distributor and buyer economics in mind.</p>
          </div>
          <div className="why__grid reveal">
            {WHY_POINTS.map((w, i) => (
              <div key={i} className="why__card">
                <div className="why__num">0{i + 1}</div>
                <h3 className="why__title">{w.title}</h3>
                <p className="why__body">{w.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════
          COOKING GUIDE with Animations
      ══════════════════════════════ */}
      <section className="section section--dark">
        <div className="container">
          <div className="section__header section__header--light reveal">
            <div className="section__tag section__tag--light">Preparation Guide</div>
            <h2 className="section__h2 section__h2--light">Perfect Results, Every Time</h2>
            <p className="section__sub section__sub--light">Share with your HoReCa clients — or use in your own kitchen.</p>
          </div>

          <div className="cook__animated reveal">
            <div className="cook__tabs">
              {cookSteps.map((c, i) => (
                <button
                  key={i}
                  className={`cook__tab ${activeCookStep === i ? 'cook__tab--active' : ''}`}
                  onClick={() => setActiveCookStep(i)}
                >
                  <span className="cook__tab-num">{c.step}</span>
                  <span className="cook__tab-label">{c.title}</span>
                </button>
              ))}
            </div>

            <div className="cook__stage">
              <div className="cook__stage-anim">
                <CookingStepAnimation step={activeCookStep} />
              </div>
              <div className="cook__stage-info">
                <div className="cook__stage-step">{cookSteps[activeCookStep].step}</div>
                <h3 className="cook__stage-title">{cookSteps[activeCookStep].title}</h3>
                <p className="cook__stage-detail">{cookSteps[activeCookStep].detail}</p>
                <div className="cook__progress-bar">
                  <div className="cook__progress-fill" style={{width: `${((activeCookStep + 1) / 4) * 100}%`}}/>
                </div>
                <div className="cook__nav">
                  <button className="cook__nav-btn" onClick={() => setActiveCookStep(p => Math.max(0, p-1))} disabled={activeCookStep === 0}>← Prev</button>
                  <span className="cook__nav-count">{activeCookStep + 1} / 4</span>
                  <button className="cook__nav-btn" onClick={() => setActiveCookStep(p => Math.min(3, p+1))} disabled={activeCookStep === 3}>Next →</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════
          DISTRIBUTION
      ══════════════════════════════ */}
      <section id="distribution" className="section">
        <div className="container">
          <div className="section__header reveal">
            <div className="section__tag">Distribution</div>
            <h2 className="section__h2">Partner With Us</h2>
            <p className="section__sub">We are actively expanding our distributor network across India. Enquiries welcome from all Tier-1, 2, and 3 cities.</p>
          </div>
          <div className="dist__layout reveal">
            <div className="dist__info">
              <div className="dist__table">
                {[
                  { label: 'Territory Types', value: 'Exclusive (Tier-2/3) · Non-exclusive (Metro)' },
                  { label: 'Distributor MOQ', value: '50 Cartons (negotiable for Tier-3)' },
                  { label: 'Payment Terms', value: 'Advance / 7-Day Credit (post qualification)' },
                  { label: 'Lead Time', value: '4–7 Working Days' },
                  { label: 'Trade Support', value: 'POS Materials · Sampling · WhatsApp Desk' },
                  { label: 'Margin Structure', value: 'Shared under NDA — competitive with category' },
                ].map((row, i) => (
                  <div key={i} className="dist__row">
                    <span className="dist__key">{row.label}</span>
                    <span className="dist__val">{row.value}</span>
                  </div>
                ))}
              </div>
              <div className="dist__actions">
                <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="btn btn--primary">WhatsApp: Distributor Enquiry</a>
                <a href="mailto:trade@zhen.in" className="btn btn--outline" style={{color: 'var(--ink)', borderColor: 'var(--ink-40)'}}>Email: info@zhen.com</a>
              </div>
            </div>
            <div className="dist__cta-card">
              <div className="dist__cta-tag">Available Now</div>
              <h3>ZHEN Wheat Noodles<br />500g Retail Pack</h3>
              <p>Stocked and ready for dispatch across India. Full trade documentation, FSSAI certificate, and product data sheet provided on request.</p>
              <div className="dist__cta-grid">
                <div><strong>₹120</strong><span>Consumer MRP</span></div>
                <div><strong>50 Ctn</strong><span>Min. Order (Dist.)</span></div>
                <div><strong>4–7 Days</strong><span>Lead Time</span></div>
              </div>
              <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="btn btn--primary btn--full">Get Pricing</a>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════
          TESTIMONIALS
      ══════════════════════════════ */}
      <section className="section section--cream">
        <div className="container">
          <div className="section__header reveal">
            <div className="section__tag">Testimonials</div>
            <h2 className="section__h2">From Our Trade Partners</h2>
          </div>
          <div className="testi__grid reveal">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="testi__card">
                <div className="testi__stars">★★★★★</div>
                <blockquote className="testi__quote">"{t.quote}"</blockquote>
                <div className="testi__author">
                  <div className="testi__avatar">{t.name.split(' ').map(n => n[0]).join('')}</div>
                  <div>
                    <strong>{t.name}</strong>
                    <span>{t.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════
          FAQ
      ══════════════════════════════ */}
      <section className="section">
        <div className="container faq__container">
          <div className="section__header reveal">
            <div className="section__tag">FAQ</div>
            <h2 className="section__h2">Trade & Distributor FAQs</h2>
          </div>
          <div className="faq__list reveal">
            {FAQS.map((f, i) => (
              <div key={i} className={`faq__item ${openFaq === i ? 'faq__item--open' : ''}`}>
                <button className="faq__q" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  <span>{f.q}</span>
                  <span className="faq__chevron">{openFaq === i ? '−' : '+'}</span>
                </button>
                {openFaq === i && <div className="faq__a">{f.a}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════
          FINAL CTA
      ══════════════════════════════ */}
      <section className="cta-section reveal">
        <div className="container cta__inner">
          <div className="cta__tag">Let's Talk Business</div>
          <h2 className="cta__h2">Ready to Carry<br /><em>ZHEN</em>?</h2>
          <p className="cta__sub">Whether you are a regional distributor, a modern trade buyer, or a restaurant owner looking for a better noodle — our trade team is ready.</p>
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

        .container {
          max-width: var(--max-w);
          margin-inline: auto;
          padding-inline: clamp(20px, 5vw, 60px);
        }

        .reveal {
          opacity: 0;
          transform: translateY(28px);
          transition: opacity 0.75s ease, transform 0.75s ease;
        }
        .reveal.in-view { opacity: 1; transform: none; }

        em { font-style: italic; color: var(--gold); font-family: var(--font-display); }

        /* ── BUTTONS ── */
        .btn {
          display: inline-flex; align-items: center; justify-content: center;
          gap: 10px; font-family: var(--font-body); font-size: 14px; font-weight: 600;
          letter-spacing: 0.02em; text-decoration: none; padding: 13px 28px;
          border-radius: 4px; transition: all 0.18s ease; border: 1.5px solid transparent;
          cursor: pointer; white-space: nowrap;
        }
        .btn--primary { background: var(--gold); color: white; border-color: var(--gold); }
        .btn--primary:hover { background: var(--gold-dk); border-color: var(--gold-dk); transform: translateY(-1px); }
        .btn--ghost { background: transparent; color: var(--ink); border-color: var(--ink-40); }
        .btn--ghost:hover { border-color: var(--gold); color: var(--gold); }
        .btn--outline { background: transparent; color: white; border-color: rgba(255,255,255,0.4); }
        .btn--outline:hover { border-color: var(--gold-lt); color: var(--gold-lt); }
        .btn--large { padding: 16px 36px; font-size: 15px; }
        .btn--full { width: 100%; }

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

        /* ── HERO ── */
        .hero {
          min-height: 100vh; background: var(--cream); display: flex;
          flex-direction: column; justify-content: center;
          padding-top: 100px; position: relative; overflow: hidden;
        }
        .hero__bg-lines { position: absolute; inset: 0; pointer-events: none; }
        .hero__bg-line { position: absolute; top: 0; bottom: 0; width: 1px; background: var(--ink-06); }
        .hero__inner {
          display: grid;
          grid-template-columns: 1fr 520px;
          gap: clamp(40px, 6vw, 80px);
          align-items: center;
          padding-top: clamp(40px, 8vh, 80px);
          padding-bottom: clamp(40px, 8vh, 80px);
        }
        .hero__left { display: flex; flex-direction: column; }
        .hero__label { font-family: var(--font-mono); font-size: 11px; font-weight: 400; letter-spacing: 0.2em; text-transform: uppercase; color: var(--gold); margin-bottom: 28px; }
        .hero__h1 { font-family: var(--font-display); font-size: clamp(56px, 8vw, 110px); font-weight: 700; line-height: 0.95; color: var(--ink); margin-bottom: 32px; letter-spacing: -0.02em; }
        .hero__h1 em { display: block; }
        .hero__meta { display: flex; flex-direction: column; gap: 28px; }
        .hero__blend { display: inline-flex; align-items: center; background: white; border: 1px solid var(--ink-15); border-radius: 6px; overflow: hidden; align-self: flex-start; }
        .blend__half { display: flex; flex-direction: column; align-items: center; padding: 16px 28px; gap: 2px; }
        .blend__half--wheat { background: rgba(184,146,42,0.06); }
        .blend__half--maida { background: rgba(17,16,9,0.02); }
        .blend__divider { width: 1px; align-self: stretch; background: var(--ink-15); }
        .blend__pct { font-family: var(--font-display); font-size: 32px; font-weight: 700; line-height: 1; color: var(--ink); }
        .blend__name { font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.15em; color: var(--ink-40); text-transform: uppercase; }
        .hero__desc { font-size: 16px; line-height: 1.75; color: var(--ink-70); max-width: 460px; }
        .hero__actions { display: flex; gap: 14px; flex-wrap: wrap; }
        .hero__trust { display: flex; align-items: center; gap: 14px; flex-wrap: wrap; font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.08em; color: var(--ink-40); text-transform: uppercase; }
        .trust__sep { display: block; width: 4px; height: 4px; border-radius: 50%; background: var(--gold); opacity: 0.5; }

        .hero__anim-col { position: relative; display: flex; flex-direction: column; align-items: center; gap: 12px; }
        .hero__anim-label { font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase; color: var(--gold); opacity: 0.7; }
        .hero__anim-caption { font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.1em; color: var(--ink-40); text-align: center; }

        .chef-scene { position: relative; width: 100%; border-radius: 12px; background: linear-gradient(160deg, #1A1408 0%, #0E0C08 60%, #160F05 100%); overflow: hidden; box-shadow: 0 24px 80px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.05); }
        .chef-svg { width: 100%; height: auto; display: block; }

        .fire-glow { position: absolute; bottom: 80px; width: 120px; height: 60px; border-radius: 50%; filter: blur(30px); animation: glowPulse 1.8s ease-in-out infinite alternate; pointer-events: none; }
        .fire-glow-left { left: 120px; background: rgba(255,100,0,0.35); }
        .fire-glow-right { right: 140px; background: rgba(255,100,0,0.28); animation-delay: 0.4s; }

        @keyframes glowPulse {
          from { opacity: 0.6; transform: scaleX(0.9) scaleY(0.8); }
          to { opacity: 1; transform: scaleX(1.15) scaleY(1.1); }
        }

        .flame-outer { animation: flameFlicker 0.25s ease-in-out infinite alternate; transform-origin: bottom center; }
        .flame-inner { animation: flameFlicker2 0.18s ease-in-out infinite alternate; transform-origin: bottom center; }
        .flame-center { animation: flickerCenter 0.3s ease-in-out infinite alternate; }
        .flame-delay-0 .flame-outer { animation-delay: 0s; }
        .flame-delay-1 .flame-outer { animation-delay: 0.07s; }
        .flame-delay-2 .flame-outer { animation-delay: 0.13s; }
        .flame-delay-3 .flame-outer { animation-delay: 0.19s; }

        @keyframes flameFlicker { from { transform: scaleY(1) scaleX(1) translateY(0); opacity: 0.9; } to { transform: scaleY(1.2) scaleX(0.85) translateY(-3px); opacity: 1; } }
        @keyframes flameFlicker2 { from { transform: scaleY(1) scaleX(1); opacity: 0.85; } to { transform: scaleY(1.3) scaleX(0.8) translateY(-4px); opacity: 1; } }
        @keyframes flickerCenter { from { opacity: 0.5; } to { opacity: 0.8; } }

        .steam-1 { animation: steamRise 2.8s ease-in-out infinite; opacity: 0.7; }
        .steam-2 { animation: steamRise 3.2s ease-in-out infinite 0.6s; opacity: 0.6; }
        .steam-3 { animation: steamRise 2.5s ease-in-out infinite 1.1s; opacity: 0.5; }
        .big-steam-1 { animation: steamRise 3s ease-in-out infinite; }
        .big-steam-2 { animation: steamRise 3.5s ease-in-out infinite 0.7s; }
        .big-steam-3 { animation: steamRise 2.8s ease-in-out infinite 1.3s; }
        .small-steam-1 { animation: steamRise 2.2s ease-in-out infinite; }
        .small-steam-2 { animation: steamRise 2.6s ease-in-out infinite 0.5s; }

        @keyframes steamRise {
          0% { opacity: 0; transform: translateY(8px) scaleX(0.8); }
          30% { opacity: 0.7; }
          70% { opacity: 0.5; }
          100% { opacity: 0; transform: translateY(-20px) scaleX(1.4); }
        }

        .noodle-strand { animation: noodleWiggle 1.6s ease-in-out infinite alternate; transform-origin: left center; }
        .noodle-delay-0 { animation-delay: 0s; }
        .noodle-delay-1 { animation-delay: 0.18s; }
        .noodle-delay-2 { animation-delay: 0.32s; }
        .noodle-delay-3 { animation-delay: 0.45s; }
        .noodle-delay-4 { animation-delay: 0.55s; }
        @keyframes noodleWiggle { from { transform: translateY(0) scaleY(1); } to { transform: translateY(-4px) scaleY(0.96); } }

        .noodle-arc-1 { animation: arcAppear 2.4s ease-in-out infinite; }
        .noodle-arc-2 { animation: arcAppear 2.4s ease-in-out infinite 0.3s; }
        .noodle-arc-3 { animation: arcAppear 2.4s ease-in-out infinite 0.6s; }
        @keyframes arcAppear { 0%, 100% { opacity: 0; stroke-dashoffset: 100; } 20%, 80% { opacity: 1; stroke-dashoffset: 0; } }

        .noodle-falling { animation: noodleFall 2.2s linear infinite; transform-origin: top center; }
        .noodle-fall-delay-0 { animation-delay: 0s; }
        .noodle-fall-delay-1 { animation-delay: 0.4s; }
        .noodle-fall-delay-2 { animation-delay: 0.8s; }
        .noodle-fall-delay-3 { animation-delay: 1.2s; }
        @keyframes noodleFall { from { opacity: 0; transform: translateY(-30px); } 20% { opacity: 1; } 80% { opacity: 1; } to { opacity: 0; transform: translateY(10px); } }

        .chef-arm-left { animation: wokToss 1.8s ease-in-out infinite; transform-origin: 270px 158px; }
        @keyframes wokToss { 0%, 100% { transform: rotate(0deg); } 30% { transform: rotate(-8deg) translateY(-6px); } 60% { transform: rotate(5deg) translateY(2px); } }
        .chef-arm-right { animation: armStir 2.2s ease-in-out infinite; transform-origin: 370px 158px; }
        @keyframes armStir { 0%, 100% { transform: rotate(0deg); } 40% { transform: rotate(8deg); } 70% { transform: rotate(-4deg); } }

        .bubble-1 { animation: bubbleRise 1.4s ease-in-out infinite; }
        .bubble-2 { animation: bubbleRise 1.8s ease-in-out infinite 0.3s; }
        .bubble-3 { animation: bubbleRise 1.2s ease-in-out infinite 0.6s; }
        .bubble-4 { animation: bubbleRise 1.6s ease-in-out infinite 0.9s; }
        .bubble-5 { animation: bubbleRise 1.5s ease-in-out infinite 0.15s; }
        @keyframes bubbleRise { 0% { transform: translateY(0) scale(1); opacity: 0.5; } 50% { opacity: 0.8; } 100% { transform: translateY(-15px) scale(0.4); opacity: 0; } }

        .spice-0 { animation: spiceDrift 3.5s ease-in-out infinite; }
        .spice-1 { animation: spiceDrift 2.8s ease-in-out infinite 0.5s; }
        .spice-2 { animation: spiceDrift 3.8s ease-in-out infinite 1s; }
        .spice-3 { animation: spiceDrift 3.2s ease-in-out infinite 1.5s; }
        .spice-4 { animation: spiceDrift 4s ease-in-out infinite 0.3s; }
        @keyframes spiceDrift { 0% { transform: translate(0, 0) scale(1); opacity: 0; } 20% { opacity: 0.8; } 100% { transform: translate(-20px, -30px) scale(0.3) rotate(180deg); opacity: 0; } }

        .lid-dance { animation: lidDance 1.6s ease-in-out infinite; transform-origin: center; }
        @keyframes lidDance { 0%, 100% { transform: translateY(0) rotate(0deg); } 30% { transform: translateY(-5px) rotate(-2deg); } 60% { transform: translateY(-3px) rotate(1.5deg); } }

        /* ── ABOUT FULL SECTION ── */
        .about-full { background: var(--cream); border-bottom: 1px solid var(--ink-15); }

        .about-full__top {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 40px;
          margin-bottom: 48px;
          flex-wrap: wrap;
        }
        .about-full__label { flex: 1; min-width: 280px; }
        .about-full__label .section__tag { margin-bottom: 12px; }
        .about-full__label .section__h2 { margin-bottom: 0; text-align: left; }

        .about-full__founder-card {
          display: flex;
          align-items: center;
          gap: 18px;
          background: white;
          border: 1px solid var(--ink-15);
          border-radius: 10px;
          padding: 24px 32px;
          flex-shrink: 0;
        }
        .founder__avatar {
          width: 52px; height: 52px;
          background: var(--gold); border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          color: white; font-weight: 700; font-size: 15px;
          font-family: var(--font-body); flex-shrink: 0;
        }
        .founder__info { display: flex; flex-direction: column; gap: 3px; }
        .founder__info strong { font-size: 16px; font-weight: 600; color: var(--ink); }
        .founder__info span { font-size: 13px; color: var(--ink-70); }
        .founder__year { font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.1em; color: var(--gold); margin-top: 4px; }

        .about-full__intro {
          background: var(--gold);
          border-radius: 10px;
          padding: 32px 40px;
          margin-bottom: 56px;
        }
        .about-full__intro p {
          font-family: var(--font-display);
          font-size: clamp(18px, 2.5vw, 24px);
          line-height: 1.65;
          color: white;
          font-style: italic;
        }
        .about-full__intro p strong { font-style: normal; color: rgba(255,255,255,0.9); }

        /* Timeline */
        .about-full__timeline {
          display: flex;
          align-items: stretch;
          gap: 0;
          margin-bottom: 64px;
          background: white;
          border: 1px solid var(--ink-15);
          border-radius: 10px;
          overflow: hidden;
        }
        .timeline__item {
          flex: 1;
          padding: 32px 28px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          border-right: 1px solid var(--ink-06);
        }
        .timeline__item:last-child { border-right: none; }
        .timeline__connector {
          display: flex;
          align-items: center;
          padding: 0 4px;
          color: var(--gold);
          font-size: 20px;
          font-weight: 300;
          opacity: 0.5;
          flex-shrink: 0;
          align-self: center;
        }
        .timeline__year {
          font-family: var(--font-display);
          font-size: 32px;
          font-weight: 700;
          color: var(--gold);
          line-height: 1;
        }
        .timeline__content h4 {
          font-size: 15px;
          font-weight: 700;
          color: var(--ink);
          margin-bottom: 6px;
        }
        .timeline__content p {
          font-size: 14px;
          line-height: 1.65;
          color: var(--ink-70);
        }

        /* Body layout */
        .about-full__body {
          display: grid;
          grid-template-columns: 1fr 320px;
          gap: 56px;
          align-items: start;
        }

        .about-full__story {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .about-full__story p {
          font-size: 16px;
          line-height: 1.85;
          color: var(--ink-70);
        }
        .about-full__story p strong { color: var(--ink); font-weight: 600; }

        /* Values grid */
        .about-full__values {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
          margin-top: 12px;
        }
        .value__card {
          background: var(--cream-dk);
          border: 1px solid var(--ink-06);
          border-radius: 8px;
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 6px;
          transition: border-color 0.18s, box-shadow 0.18s;
        }
        .value__card:hover { border-color: var(--gold); box-shadow: 0 4px 16px rgba(184,146,42,0.08); }
        .value__icon { font-size: 22px; }
        .value__card strong { font-size: 14px; font-weight: 700; color: var(--ink); }
        .value__card p { font-size: 13px; line-height: 1.6; color: var(--ink-70); }

        /* Stats column */
        .about-full__stats-col {
          display: flex;
          flex-direction: column;
          gap: 16px;
          position: sticky;
          top: 100px;
        }
        .about-full__stat-block {
          background: white;
          border: 1px solid var(--ink-15);
          border-radius: 8px;
          padding: 24px 28px;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .about-full__stat-block--gold {
          background: var(--gold);
          border-color: var(--gold);
        }
        .about-full__stat-block--gold .asb__val { color: white; }
        .about-full__stat-block--gold .asb__lbl { color: rgba(255,255,255,0.65); }
        .asb__val {
          font-family: var(--font-display);
          font-size: 40px;
          font-weight: 700;
          color: var(--gold);
          line-height: 1;
        }
        .asb__lbl {
          font-family: var(--font-mono);
          font-size: 10px;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--ink-40);
        }
        .about-full__mission {
          background: var(--ink);
          border-radius: 8px;
          padding: 24px 28px;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .mission__label {
          font-family: var(--font-mono);
          font-size: 10px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--gold-lt);
        }
        .about-full__mission p {
          font-size: 14px;
          line-height: 1.7;
          color: rgba(255,255,255,0.6);
        }

        /* ── HERO STATS ── */
        .hero__stats { display: grid; grid-template-columns: repeat(4, 1fr); border-top: 1px solid var(--ink-15); background: white; }
        .hero__stat { display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 32px 20px; gap: 6px; border-right: 1px solid var(--ink-06); text-align: center; }
        .hero__stat:last-child { border-right: none; }
        .hero__stat-val { font-family: var(--font-display); font-size: 32px; font-weight: 700; color: var(--ink); line-height: 1; }
        .hero__stat-lbl { font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.12em; text-transform: uppercase; color: var(--ink-40); }

        /* ── MARQUEE ── */
        .marquee { background: var(--ink); overflow: hidden; padding: 14px 0; border-top: 1px solid rgba(255,255,255,0.06); }
        .marquee__track { display: flex; width: max-content; animation: marquee 40s linear infinite; }
        .marquee__set { display: flex; }
        .marquee__item { display: flex; align-items: center; gap: 20px; padding: 0 24px; font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.15em; text-transform: uppercase; color: rgba(255,255,255,0.45); white-space: nowrap; }
        .marquee__dot { color: var(--gold-lt); opacity: 0.6; font-size: 8px; }
        @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-25%); } }

        /* ── SECTIONS ── */
        .section { padding: var(--section-pad) 0; }
        .section--dark { background: var(--dark); }
        .section--cream { background: var(--cream-dk); }
        .section__header { text-align: center; margin-bottom: 64px; }
        .section__tag { display: inline-block; font-family: var(--font-mono); font-size: 10px; font-weight: 500; letter-spacing: 0.25em; text-transform: uppercase; color: var(--gold); margin-bottom: 16px; }
        .section__tag--light { color: var(--gold-lt); }
        .section__h2 { font-family: var(--font-display); font-size: clamp(36px, 5vw, 60px); font-weight: 700; color: var(--ink); line-height: 1.05; letter-spacing: -0.01em; margin-bottom: 16px; }
        .section__h2--light { color: white; }
        .section__sub { font-size: 16px; line-height: 1.75; color: var(--ink-70); max-width: 540px; margin-inline: auto; }
        .section__sub--light { color: rgba(255,255,255,0.55); }
        .section__body { font-size: 16px; line-height: 1.8; color: var(--ink-70); margin-bottom: 20px; }
        .section__body--light { color: rgba(255,255,255,0.6); }

        /* ── PRODUCT ── */
        .product__layout { display: grid; grid-template-columns: 380px 1fr; gap: 48px; align-items: start; }
        .product__visual { display: flex; flex-direction: column; gap: 20px; position: sticky; top: 100px; }
        .pack__card { background: var(--gold); border-radius: 12px; overflow: hidden; display: flex; flex-direction: column; }
        .pack__top-bar { height: 32px; background: var(--gold-dk); }
        .pack__body { padding: 36px 32px; display: flex; flex-direction: column; align-items: center; gap: 16px; text-align: center; }
        .pack__brand { font-family: var(--font-display); font-size: 64px; font-weight: 700; color: white; line-height: 1; letter-spacing: 0.05em; }
        .pack__tagline { font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.2em; color: rgba(255,255,255,0.6); text-transform: uppercase; }
        .pack__blend-badge { background: rgba(255,255,255,0.15); border: 1px solid rgba(255,255,255,0.25); border-radius: 8px; padding: 16px 32px; display: flex; flex-direction: column; align-items: center; gap: 4px; }
        .pack__blend-badge span { font-family: var(--font-display); font-size: 40px; font-weight: 700; color: white; line-height: 1; }
        .pack__blend-badge em { font-size: 28px; color: rgba(255,255,255,0.5); font-style: normal; }
        .pack__blend-badge small { font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.15em; color: rgba(255,255,255,0.6); text-transform: uppercase; margin-top: 4px; }
        .pack__weight { font-family: var(--font-display); font-size: 24px; font-weight: 600; color: rgba(255,255,255,0.85); }
        .pack__bottom { background: var(--gold-dk); padding: 12px 20px; display: flex; justify-content: center; gap: 12px; font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.12em; color: rgba(255,255,255,0.6); text-transform: uppercase; }
        .product__price-tag { background: white; border: 1px solid var(--ink-15); border-radius: 8px; padding: 20px 24px; display: flex; align-items: center; gap: 12px; }
        .price__label { font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.15em; text-transform: uppercase; color: var(--ink-40); }
        .price__val { font-family: var(--font-display); font-size: 36px; font-weight: 700; color: var(--gold); line-height: 1; }
        .price__pack { font-size: 13px; color: var(--ink-40); margin-left: auto; }
        .product__specs { display: flex; flex-direction: column; gap: 32px; }
        .specs__title { font-family: var(--font-mono); font-size: 11px; font-weight: 500; letter-spacing: 0.2em; text-transform: uppercase; color: var(--ink-40); padding-bottom: 16px; border-bottom: 1px solid var(--ink-15); }
        .specs__table { width: 100%; border-collapse: collapse; }
        .specs__row { border-bottom: 1px solid var(--ink-06); }
        .specs__row:last-child { border-bottom: none; }
        .specs__key { font-family: var(--font-mono); font-size: 12px; color: var(--ink-40); padding: 16px 20px 16px 0; width: 200px; vertical-align: top; letter-spacing: 0.02em; }
        .specs__val { font-size: 15px; color: var(--ink); font-weight: 500; padding: 16px 0; vertical-align: top; }
        .coming-soon__block { background: var(--ink-06); border-left: 3px solid var(--gold); border-radius: 0 6px 6px 0; padding: 20px 24px; display: flex; flex-direction: column; gap: 12px; }
        .cs__label { font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase; color: var(--gold); }
        .cs__items { display: flex; flex-direction: column; gap: 8px; }
        .cs__item { font-size: 14px; color: var(--ink-70); padding-left: 12px; position: relative; }
        .cs__item::before { content: '—'; position: absolute; left: 0; color: var(--ink-40); }

        /* ── PROCESS ── */
        .process__layout { display: grid; grid-template-columns: 1fr 1fr; gap: 48px; align-items: start; }
        .process__steps { display: flex; flex-direction: column; gap: 2px; }
        .process__step { display: flex; align-items: flex-start; gap: 20px; padding: 20px 24px; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06); border-radius: 4px; cursor: pointer; text-align: left; transition: all 0.2s; color: rgba(255,255,255,0.55); font-family: var(--font-body); width: 100%; }
        .process__step:hover { background: rgba(255,255,255,0.05); color: rgba(255,255,255,0.8); }
        .process__step--active { background: rgba(184,146,42,0.1) !important; border-color: rgba(184,146,42,0.4) !important; color: white !important; }
        .ps__num { font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.1em; color: var(--gold); margin-top: 3px; flex-shrink: 0; }
        .ps__content { flex: 1; }
        .ps__content strong { display: block; font-size: 15px; font-weight: 600; margin-bottom: 4px; }
        .ps__content p { font-size: 13px; line-height: 1.6; opacity: 0.7; }
        .ps__arrow { color: var(--gold); opacity: 0; transition: opacity 0.2s; font-size: 16px; align-self: center; }
        .process__step--active .ps__arrow { opacity: 1; }
        .process__detail { background: var(--dark-2); border: 1px solid rgba(255,255,255,0.06); border-radius: 8px; padding: 48px; position: sticky; top: 100px; display: flex; flex-direction: column; gap: 16px; }
        .pd__num { font-family: var(--font-display); font-size: 80px; font-weight: 700; color: var(--gold); opacity: 0.15; line-height: 1; }
        .pd__title { font-family: var(--font-display); font-size: 32px; font-weight: 700; color: white; line-height: 1.1; margin-top: -20px; }
        .pd__desc { font-size: 16px; color: rgba(255,255,255,0.6); line-height: 1.75; }
        .pd__progress { display: flex; gap: 8px; margin-top: 16px; }
        .pd__pip { height: 3px; flex: 1; background: rgba(255,255,255,0.1); border-radius: 2px; cursor: pointer; transition: background 0.2s; }
        .pd__pip--active { background: var(--gold); }
        .pd__pip--done { background: rgba(184,146,42,0.4); }

        /* ── WHY ── */
        .why__grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1px; background: var(--ink-15); border: 1px solid var(--ink-15); border-radius: 8px; overflow: hidden; }
        .why__card { background: white; padding: 40px; display: flex; flex-direction: column; gap: 14px; transition: background 0.2s; }
        .why__card:hover { background: #FDFAF5; }
        .why__num { font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.15em; color: var(--gold); }
        .why__title { font-family: var(--font-display); font-size: 22px; font-weight: 700; color: var(--ink); line-height: 1.2; }
        .why__body { font-size: 15px; line-height: 1.75; color: var(--ink-70); }

        /* ── COOKING ANIMATION ── */
        .cook__animated { display: flex; flex-direction: column; gap: 32px; }
        .cook__tabs { display: flex; gap: 4px; background: rgba(255,255,255,0.05); padding: 6px; border-radius: 8px; }
        .cook__tab { flex: 1; display: flex; flex-direction: column; align-items: center; gap: 4px; padding: 12px 8px; background: transparent; border: none; cursor: pointer; border-radius: 6px; transition: all 0.2s; color: rgba(255,255,255,0.45); font-family: var(--font-body); }
        .cook__tab:hover { background: rgba(255,255,255,0.07); color: rgba(255,255,255,0.7); }
        .cook__tab--active { background: var(--gold) !important; color: white !important; }
        .cook__tab-num { font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.15em; }
        .cook__tab-label { font-size: 12px; font-weight: 600; letter-spacing: 0.02em; }
        .cook__stage { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; align-items: center; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.07); border-radius: 12px; padding: 40px; }
        .cook__stage-anim { display: flex; align-items: center; justify-content: center; }
        .cook-anim-wrap { width: 100%; max-width: 240px; border-radius: 12px; background: #0E0C08; padding: 12px; box-shadow: 0 8px 40px rgba(0,0,0,0.4); }
        .cook-anim-svg { width: 100%; height: auto; }
        .cook__stage-info { display: flex; flex-direction: column; gap: 16px; }
        .cook__stage-step { font-family: var(--font-mono); font-size: 48px; font-weight: 300; color: var(--gold); opacity: 0.25; line-height: 1; }
        .cook__stage-title { font-family: var(--font-display); font-size: 36px; font-weight: 700; color: white; line-height: 1.1; margin-top: -12px; }
        .cook__stage-detail { font-size: 15px; line-height: 1.75; color: rgba(255,255,255,0.6); }
        .cook__progress-bar { height: 3px; background: rgba(255,255,255,0.1); border-radius: 2px; overflow: hidden; }
        .cook__progress-fill { height: 100%; background: var(--gold); border-radius: 2px; transition: width 0.5s ease; }
        .cook__nav { display: flex; align-items: center; gap: 16px; margin-top: 4px; }
        .cook__nav-btn { background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.12); color: rgba(255,255,255,0.6); padding: 8px 16px; border-radius: 4px; cursor: pointer; font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.05em; transition: all 0.18s; }
        .cook__nav-btn:hover:not(:disabled) { background: rgba(255,255,255,0.14); color: white; }
        .cook__nav-btn:disabled { opacity: 0.3; cursor: not-allowed; }
        .cook__nav-count { font-family: var(--font-mono); font-size: 11px; color: rgba(255,255,255,0.3); }

        .cook-flame { animation: cookFlame 0.22s ease-in-out infinite alternate; transform-origin: bottom; }
        .cook-flame-0 { animation-delay: 0s; }
        .cook-flame-1 { animation-delay: 0.08s; }
        .cook-flame-2 { animation-delay: 0.15s; }
        .cook-flame-center { animation: flickerBlue 0.4s ease-in-out infinite alternate; }
        @keyframes cookFlame { from { transform: scaleY(1); opacity: 0.9; } to { transform: scaleY(1.25) scaleX(0.85); opacity: 1; } }
        @keyframes flickerBlue { from { opacity: 0.4; } to { opacity: 0.8; } }
        .water-ripple { animation: ripple 1.2s ease-in-out infinite; }
        @keyframes ripple { 0%, 100% { ry: 6; opacity: 0.7; } 50% { ry: 9; opacity: 0.5; } }
        .water-level { animation: waterBubble 0.8s ease-in-out infinite alternate; }
        @keyframes waterBubble { from { transform: translateY(0); } to { transform: translateY(-3px); } }
        .big-bubble-0 { animation: bigBubble 1.1s ease-out infinite; }
        .big-bubble-1 { animation: bigBubble 1.4s ease-out infinite 0.25s; }
        .big-bubble-2 { animation: bigBubble 1.2s ease-out infinite 0.5s; }
        .big-bubble-3 { animation: bigBubble 1.6s ease-out infinite 0.15s; }
        .big-bubble-4 { animation: bigBubble 1.3s ease-out infinite 0.4s; }
        @keyframes bigBubble { 0% { transform: translateY(0) scale(1); opacity: 0.55; } 80% { opacity: 0.7; } 100% { transform: translateY(-18px) scale(0.2); opacity: 0; } }
        .stirring { animation: stir 1.4s ease-in-out infinite; transform-origin: 102px 120px; }
        @keyframes stir { 0%,100%{ transform: rotate(0deg); } 50%{ transform: rotate(25deg); } }
        .hand-dropping { animation: handDrop 2.8s ease-in-out infinite; }
        @keyframes handDrop { 0%, 100% { transform: translateY(0); } 40% { transform: translateY(8px); } 70% { transform: translateY(4px); } }
        .falling-noodle { animation: noodleFallSingle 2.8s ease-in-out infinite; }
        .falling-noodle-0 { animation-delay: 0s; }
        .falling-noodle-1 { animation-delay: 0.2s; }
        .falling-noodle-2 { animation-delay: 0.4s; }
        .falling-noodle-3 { animation-delay: 0.6s; }
        .falling-noodle-4 { animation-delay: 0.8s; }
        @keyframes noodleFallSingle { 0% { transform: translateY(-5px); opacity: 0.9; } 50% { transform: translateY(3px); } 100% { transform: translateY(-5px); opacity: 0.9; } }
        .splash-drop { animation: splashAnim 2.8s ease-out infinite; }
        .splash-0 { animation-delay: 0.2s; }
        .splash-1 { animation-delay: 0.5s; }
        .splash-2 { animation-delay: 0.8s; }
        .splash-3 { animation-delay: 1.1s; }
        @keyframes splashAnim { 0%, 100% { opacity: 0; transform: scale(0) translateY(0); } 20% { opacity: 0.7; transform: scale(1.5) translateY(-6px); } 50% { opacity: 0.3; transform: scale(2.5) translateY(-12px); } 70% { opacity: 0; } }
        .cooking-noodle { animation: noodleFloat 1.8s ease-in-out infinite alternate; }
        .cooking-noodle-0 { animation-delay: 0s; }
        .cooking-noodle-1 { animation-delay: 0.25s; }
        .cooking-noodle-2 { animation-delay: 0.5s; }
        .cooking-noodle-3 { animation-delay: 0.75s; }
        .cooking-noodle-4 { animation-delay: 1s; }
        @keyframes noodleFloat { from { transform: translateY(0) rotate(0deg); } to { transform: translateY(-6px) rotate(2deg); } }
        .drain-drop { animation: drainFall 1.5s ease-in linear infinite; }
        .drain-drop-0 { animation-delay: 0s; }
        .drain-drop-1 { animation-delay: 0.2s; }
        .drain-drop-2 { animation-delay: 0.4s; }
        .drain-drop-3 { animation-delay: 0.6s; }
        .drain-drop-4 { animation-delay: 0.8s; }
        @keyframes drainFall { 0% { opacity: 0; transform: translateY(-20px); } 20% { opacity: 0.6; } 80% { opacity: 0.4; } 100% { opacity: 0; transform: translateY(20px); } }
        .drained-noodle { animation: noodleWiggle2 1.4s ease-in-out infinite alternate; }
        .drained-noodle-0 { animation-delay: 0s; }
        .drained-noodle-1 { animation-delay: 0.2s; }
        .drained-noodle-2 { animation-delay: 0.4s; }
        .drained-noodle-3 { animation-delay: 0.6s; }
        @keyframes noodleWiggle2 { from { transform: translateY(0); } to { transform: translateY(-3px); } }
        .oil-pour { animation: oilDrip 2s ease-in-out infinite; }
        @keyframes oilDrip { 0%, 100% { opacity: 0.3; } 50% { opacity: 0.6; } }
        .toss-noodle { animation: noodleTossAnim 2s ease-in-out infinite; stroke-dasharray: 30 10; }
        .toss-noodle-0 { animation-delay: 0s; }
        .toss-noodle-1 { animation-delay: 0.4s; }
        .toss-noodle-2 { animation-delay: 0.8s; }
        @keyframes noodleTossAnim { 0% { stroke-dashoffset: 60; opacity: 0; } 30% { opacity: 1; } 80% { opacity: 0.7; } 100% { stroke-dashoffset: -60; opacity: 0; } }

        /* ── DISTRIBUTION ── */
        .dist__layout { display: grid; grid-template-columns: 1fr 360px; gap: 48px; align-items: start; }
        .dist__table { display: flex; flex-direction: column; margin-bottom: 32px; }
        .dist__row { display: grid; grid-template-columns: 200px 1fr; gap: 20px; padding: 18px 0; border-bottom: 1px solid var(--ink-06); }
        .dist__row:first-child { border-top: 1px solid var(--ink-15); }
        .dist__key { font-family: var(--font-mono); font-size: 12px; letter-spacing: 0.06em; color: var(--ink-40); padding-top: 2px; }
        .dist__val { font-size: 15px; font-weight: 500; color: var(--ink); line-height: 1.5; }
        .dist__actions { display: flex; gap: 14px; flex-wrap: wrap; }
        .dist__cta-card { background: var(--ink); border-radius: 8px; padding: 36px; color: white; display: flex; flex-direction: column; gap: 20px; position: sticky; top: 100px; }
        .dist__cta-tag { font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase; color: var(--gold-lt); }
        .dist__cta-card h3 { font-family: var(--font-display); font-size: 26px; font-weight: 700; line-height: 1.2; color: white; }
        .dist__cta-card p { font-size: 14px; line-height: 1.7; color: rgba(255,255,255,0.55); }
        .dist__cta-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; padding: 20px 0; border-top: 1px solid rgba(255,255,255,0.08); border-bottom: 1px solid rgba(255,255,255,0.08); }
        .dist__cta-grid > div { display: flex; flex-direction: column; gap: 4px; }
        .dist__cta-grid strong { font-family: var(--font-display); font-size: 22px; font-weight: 700; color: var(--gold-lt); }
        .dist__cta-grid span { font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.1em; text-transform: uppercase; color: rgba(255,255,255,0.4); }

        /* ── TESTIMONIALS ── */
        .testi__grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
        .testi__card { background: white; border: 1px solid var(--ink-15); border-radius: 8px; padding: 36px; display: flex; flex-direction: column; gap: 20px; transition: box-shadow 0.2s; }
        .testi__card:hover { box-shadow: 0 8px 32px rgba(0,0,0,0.06); }
        .testi__stars { color: var(--gold); font-size: 14px; letter-spacing: 2px; }
        .testi__quote { font-family: var(--font-display); font-size: 17px; font-style: italic; line-height: 1.65; color: var(--ink); flex: 1; }
        .testi__author { display: flex; align-items: center; gap: 14px; }
        .testi__avatar { width: 40px; height: 40px; background: var(--gold); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 12px; font-weight: 700; font-family: var(--font-body); flex-shrink: 0; }
        .testi__author strong { display: block; font-size: 14px; font-weight: 600; color: var(--ink); }
        .testi__author span { font-size: 12px; color: var(--ink-40); font-family: var(--font-mono); letter-spacing: 0.02em; }

        /* ── FAQ ── */
        .faq__container { max-width: 800px; }
        .faq__list { display: flex; flex-direction: column; border-top: 1px solid var(--ink-15); }
        .faq__item { border-bottom: 1px solid var(--ink-15); }
        .faq__q { width: 100%; display: flex; align-items: center; justify-content: space-between; gap: 20px; padding: 24px 0; background: none; border: none; cursor: pointer; text-align: left; font-family: var(--font-body); font-size: 16px; font-weight: 600; color: var(--ink); transition: color 0.18s; }
        .faq__q:hover { color: var(--gold); }
        .faq__chevron { font-size: 22px; font-weight: 300; color: var(--gold); flex-shrink: 0; width: 24px; text-align: center; }
        .faq__a { font-size: 15px; line-height: 1.75; color: var(--ink-70); padding-bottom: 24px; max-width: 640px; }

        /* ── FINAL CTA ── */
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
        .cta__actions .btn--ghost:hover { border-color: white; color: white; }
        .cta__contact-line { display: flex; align-items: center; gap: 12px; font-family: var(--font-mono); font-size: 12px; letter-spacing: 0.06em; color: rgba(255,255,255,0.6); }
        .cta__contact-line a { color: rgba(255,255,255,0.8); text-decoration: none; }
        .cta__contact-line a:hover { color: white; }

        /* ── FOOTER ── */
        .footer { background: var(--dark); padding-top: 80px; }
        .footer__inner { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr 1fr; gap: 48px; padding-bottom: 60px; border-bottom: 1px solid rgba(255,255,255,0.06); }
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

        /* ── RESPONSIVE ── */
        @media (max-width: 1100px) {
          .hero__inner { grid-template-columns: 1fr; }
          .hero__anim-col { max-width: 500px; margin: 0 auto; }
          .product__layout { grid-template-columns: 1fr; }
          .product__visual { position: static; }
          .dist__layout { grid-template-columns: 1fr; }
          .dist__cta-card { position: static; }
          .about-full__body { grid-template-columns: 1fr; }
          .about-full__stats-col { position: static; display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; }
          .footer__inner { grid-template-columns: 1fr 1fr; }
          .footer__brand { grid-column: 1 / -1; }
        }
        @media (max-width: 900px) {
          :root { --section-pad: 72px; }
          .hero__stats { grid-template-columns: repeat(2, 1fr); }
          .process__layout { grid-template-columns: 1fr; }
          .process__detail { position: static; }
          .why__grid { grid-template-columns: 1fr; }
          .testi__grid { grid-template-columns: 1fr; }
          .nav__links { display: none; }
          .nav__cta { display: none; }
          .nav__burger { display: flex; }
          .about-full__timeline { flex-direction: column; }
          .timeline__connector { display: none; }
          .timeline__item { border-right: none; border-bottom: 1px solid var(--ink-06); }
          .timeline__item:last-child { border-bottom: none; }
          .about-full__values { grid-template-columns: 1fr; }
          .dist__row { grid-template-columns: 150px 1fr; }
          .cook__stage { grid-template-columns: 1fr; }
          .cook__stage-anim { order: -1; }
          .about-full__top { flex-direction: column; gap: 24px; }
        }
        @media (max-width: 640px) {
          :root { --section-pad: 56px; }
          .hero__inner { padding-top: 24px; padding-bottom: 40px; }
          .hero__h1 { font-size: clamp(48px, 14vw, 80px); }
          .hero__actions { flex-direction: column; }
          .hero__actions .btn { width: 100%; }
          .hero__stats { grid-template-columns: repeat(2, 1fr); }
          .about-full__stats-col { grid-template-columns: 1fr 1fr; }
          .about-full__intro { padding: 24px; }
          .footer__inner { grid-template-columns: 1fr; }
          .footer__bottom { flex-direction: column; gap: 12px; text-align: center; }
          .fab span { display: none; }
          .fab { padding: 14px; }
          .dist__cta-grid { grid-template-columns: 1fr; }
          .dist__row { grid-template-columns: 1fr; gap: 4px; }
          .dist__key { font-size: 11px; }
          .cta__actions { flex-direction: column; align-items: stretch; }
          .cook__tabs { flex-wrap: wrap; }
          .cook__tab { min-width: 45%; }
        }
      `}</style>
    </div>
  );
}