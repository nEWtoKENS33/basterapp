"use client";

type Slice = { label: string; value: number; color: string };

function arcPath(cx: number, cy: number, r: number, startAng: number, endAng: number) {
  const sx = cx + r * Math.cos(startAng);
  const sy = cy + r * Math.sin(startAng);
  const ex = cx + r * Math.cos(endAng);
  const ey = cy + r * Math.sin(endAng);
  const large = endAng - startAng > Math.PI ? 1 : 0;
  return `M ${sx} ${sy} A ${r} ${r} 0 ${large} 1 ${ex} ${ey}`;
}

export default function PieChart({
  holdersPct,
  airdropPct,
  size = 220,
  stroke = 24,
}: {
  holdersPct: number;
  airdropPct: number;
  size?: number;
  stroke?: number;
}) {
  const total = holdersPct + airdropPct || 1;
  const holders = Math.max(0, holdersPct) / total;
  const airdrop = Math.max(0, airdropPct) / total;

  const cx = size / 2;
  const cy = size / 2;
  const r = (size - stroke) / 2;

  // Comenzamos a las 12 en punto
  const start = -Math.PI / 2;
  const angleH = holders * Math.PI * 2;
  const angleA = airdrop * Math.PI * 2;

  const pathH = arcPath(cx, cy, r, start, start + angleH);
  const pathA = arcPath(cx, cy, r, start + angleH, start + angleH + angleA);

  return (
    <div className="pieWrap">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="pieSvg">
        {/* fondo base del donut */}
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth={stroke} />
        {/* Holders (Base blue) */}
        <path d={pathH} fill="none" stroke="#0052FF" strokeWidth={stroke} strokeLinecap="butt" />
        {/* Airdrop (BNB yellow) */}
        <path d={pathA} fill="none" stroke="#F3BA2F" strokeWidth={stroke} strokeLinecap="butt" />
      </svg>

      {/* Logo centrado */}
      <img src="/logo.png" alt="logo" className="logoCenter" />

      {/* Leyenda */}
      <div className="pieLegend">
        <span><b>Holders</b> — {Math.round(holders * 100)}%</span>
        <span><b>Airdrop</b> — {Math.round(airdrop * 100)}%</span>
      </div>
    </div>
  );
}
