"use client";

const queryRows = [
  { region: "Asia Pacific", q1: 250, q2: 295, growth: 18 },
  { region: "Europe", q1: 400, q2: 448, growth: 12 },
  { region: "North America", q1: 500, q2: 540, growth: 8 },
];

export function QueryResults() {
  return <div className="query-result"><div className="query-result-caption"><b>Quarterly growth</b><span>3 rows · Sample data</span></div><table><thead><tr><th>Region</th><th>Q1 sales</th><th>Q2 sales</th><th>Growth</th></tr></thead><tbody className="query-moving-rows">{queryRows.map(row => <tr key={row.region}><td>{row.region}</td><td>${row.q1}K</td><td>${row.q2}K</td><td>+{row.growth}%</td></tr>)}</tbody></table></div>;
}

function WindowBar({ title }: { title: string }) {
  return <div className="query-window-bar"><span className="window-dots"><i /><i /><i /></span><span>{title}</span><span className="query-demo-label">DEMO</span></div>;
}

export function PropertyPreview() {
  return <div className="website-preview property-preview" role="img" aria-label="Sample real estate dashboard with property filters, a map search radius, a condo preview, and market data."><div aria-hidden="true">
    <WindowBar title="atlas / property explorer" />
    <div className="mini-app-nav"><b><span>▧</span> atlas</b><small>Explore properties</small><span className="mini-avatar">SB</span></div>
    <div className="property-map-layout">
      <aside className="property-filters"><div className="mini-panel-title">Filters <span>☷</span></div><small>LOCATION</small><div className="fake-field">Mandaluyong <span>⌄</span></div><small>PROPERTY TYPE</small><div className="filter-pills"><span className="selected">Condo</span><span>House</span></div><small>PRICE RANGE</small><p>₱4M — ₱8M</p><div className="fake-slider"><i /><i /></div><small>BEDROOMS</small><div className="filter-pills"><span>1</span><span className="selected">2</span><span>3+</span></div><div className="fake-apply">Show 12 properties</div></aside>
      <div className="property-map">
        <svg viewBox="0 0 300 290" preserveAspectRatio="xMidYMid slice"><rect width="300" height="290" fill="#edf0e9" /><g fill="#dfe7d8"><path d="M10 8H89V60H10Z"/><path d="M180 12H290V68H180Z"/><path d="M20 155H95V232H20Z"/><path d="M208 163H286V259H208Z"/></g><path d="M-20 252 Q65 200 130 236 T320 205" fill="none" stroke="#b9dfe9" strokeWidth="29"/><g stroke="#fff" strokeWidth="11" fill="none"><path d="M-20 90L320 152"/><path d="M104 -10L144 320"/><path d="M222 -10L184 320"/><path d="M-10 180L320 72"/></g><g stroke="#e0c98b" strokeWidth="3" fill="none"><path d="M-20 90L320 152"/><path d="M104 -10L144 320"/></g><circle className="property-search-radius" cx="161" cy="111" r="68" fill="#2676c21c" stroke="#2676c2" strokeWidth="1.5" strokeDasharray="4 3"/><g fill="#8c9b91" fontSize="8" fontFamily="Arial"><text x="14" y="77">GREENFIELD</text><text x="184" y="47">ORTIGAS</text><text x="27" y="279">PASIG RIVER</text></g><circle cx="116" cy="149" r="5" fill="#fff" stroke="#4386b5" strokeWidth="2"/><circle cx="206" cy="87" r="5" fill="#fff" stroke="#4386b5" strokeWidth="2"/></svg>
        <span className="map-radius-label">Up to 2 km radius</span><div className="condo-pin">⌂</div>
        <div className="condo-card"><div className="condo-illustration"><span/><span/><span/></div><div><small>FEATURED CONDO</small><b>Parkside Residences</b><p>2 beds · 58 m² · Mandaluyong</p><strong>₱6.2M <span>Sample listing</span></strong></div></div>
        <div className="map-zoom">+<hr/>−</div>
      </div>
    </div>
    <div className="property-analytics"><div className="market-chart"><div className="mini-panel-title">Area price trend <small>Sample data</small></div><svg viewBox="0 0 180 62"><path d="M0 50H180M0 30H180M0 10H180" stroke="#e8edf2"/><path d="M3 49L33 40L62 43L94 24L124 27L154 14L178 6L178 61H3Z" fill="#e8f1fd"/><path d="M3 49L33 40L62 43L94 24L124 27L154 14L178 6" fill="none" stroke="#397bcc" strokeWidth="2.5"/></svg><div className="chart-labels"><span>Jan</span><span>Jun</span></div></div><div className="property-data"><div className="mini-panel-title">Nearby properties</div><table><thead><tr><th>Property</th><th>Area</th><th>Price</th></tr></thead><tbody><tr><td>Parkside</td><td>58 m²</td><td>₱6.2M</td></tr><tr><td>Urban Loft</td><td>42 m²</td><td>₱4.8M</td></tr><tr><td>Skyline</td><td>65 m²</td><td>₱7.4M</td></tr></tbody></table></div></div>
  </div></div>;
}

export function SkinPreview() {
  return <div className="website-preview skin-preview" role="img" aria-label="Sample dermatology website with an illustrated face scan, an animated analysis line, initial screening information, and a skincare product catalog."><div aria-hidden="true">
    <WindowBar title="derma / screening studio" />
    <div className="mini-app-nav"><b><span>✧</span> derma</b><small>Skin screening studio</small><span className="skin-session">NEW SESSION</span></div>
    <div className="skin-workspace"><div className="skin-heading"><div><small>A LITTLE CLARITY FOR YOUR SKIN</small><b>Your skin, in focus.</b></div><span>01 / Capture</span></div>
      <div className="skin-screening-grid"><div className="face-camera"><span className="camera-live">● CAMERA PREVIEW</span><svg viewBox="0 0 190 215"><defs><linearGradient id="skin-face-shade" x1="0" x2="1"><stop stopColor="#f1c6b5"/><stop offset="1" stopColor="#dca58e"/></linearGradient></defs><path d="M34 215Q35 170 73 165L77 139H113L117 165Q155 170 157 215" fill="#aabfba"/><path d="M77 138V166Q95 180 113 166V138" fill="#d8a28e"/><ellipse cx="95" cy="92" rx="49" ry="65" fill="url(#skin-face-shade)"/><path d="M46 88Q32 28 75 18Q121 0 145 55L144 89Q135 68 130 43Q92 64 58 48Z" fill="#3d4145"/><path d="M66 83Q74 77 83 83M106 83Q115 77 124 83" fill="none" stroke="#66504a" strokeWidth="2" strokeLinecap="round"/><path d="M69 91H80M110 91H121" stroke="#3d4145" strokeWidth="2" strokeLinecap="round"/><path d="M95 92L89 114H100" fill="none" stroke="#bf8976" strokeWidth="1.5"/><path d="M82 130Q95 136 108 130" fill="none" stroke="#a66e66" strokeWidth="2"/><g fill="none" stroke="#228979" strokeWidth="1" strokeDasharray="3 3"><ellipse cx="65" cy="112" rx="12" ry="16"/><ellipse cx="125" cy="112" rx="12" ry="16"/><ellipse cx="96" cy="70" rx="21" ry="8"/></g><g fill="#339e8b"><circle cx="64" cy="108" r="2"/><circle cx="128" cy="116" r="2"/><circle cx="96" cy="70" r="2"/></g></svg><div className="face-scan-line"/><span className="camera-corner tl"/><span className="camera-corner tr"/><span className="camera-corner bl"/><span className="camera-corner br"/><span className="face-scan-status">✧ Analyzing sample capture</span></div>
      <div className="screening-summary"><span className="screening-kicker">INITIAL SCREENING</span><h4>First look</h4><p>A clear starting point for a clinician’s review.</p><div><span>Capture quality</span><b>Clear lighting ✓</b></div><div><span>Areas to review</span><b>Cheeks · T-zone</b></div><div><span>Review status</span><b className="review-pending">Clinician pending</b></div><small>Illustrative screening · Not a diagnosis</small></div></div>
      <div className="skin-catalog-heading"><b>Product catalog</b><span>Browse skincare essentials</span></div><div className="skin-catalog">{[{name:"Gentle cleanser",type:"CLEANSE",tone:"cleanser"},{name:"Daily moisturizer",type:"HYDRATE",tone:"moisturizer"},{name:"Sun protection",type:"PROTECT",tone:"sunscreen"}].map(product => <div className="skin-product" key={product.name}><div className={`product-display ${product.tone}`}><div className="product-bottle"><i/><span>derma<br/><b>{product.type}</b></span></div></div><b>{product.name}</b><small>Sample product</small></div>)}</div>
    </div>
  </div></div>;
}
