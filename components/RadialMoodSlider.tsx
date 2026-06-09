"use client";

import { PointerEvent, useMemo, useRef } from "react";

const labels = ["とても不快", "不快", "普通", "快適", "とても快適"];

export function RadialMoodSlider({ value, onChange }: { value: 1 | 2 | 3 | 4 | 5; onChange: (value: 1 | 2 | 3 | 4 | 5) => void }) {
  const svgRef = useRef<SVGSVGElement>(null);
  const angle = useMemo(() => 180 - ((value - 1) / 4) * 180, [value]);
  const point = polarToPoint(angle);

  const updateFromPointer = (event: PointerEvent<SVGSVGElement>) => {
    const rect = svgRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height - 12;
    const rawAngle = Math.atan2(centerY - y, x - centerX) * (180 / Math.PI);
    const clamped = Math.max(0, Math.min(180, rawAngle));
    const next = Math.round((1 - clamped / 180) * 4) + 1;
    onChange(next as 1 | 2 | 3 | 4 | 5);
  };

  return (
    <div className="mx-auto max-w-md">
      <svg
        ref={svgRef}
        viewBox="0 0 320 190"
        className="h-auto w-full touch-none"
        role="slider"
        aria-label="感情強度"
        aria-valuemin={1}
        aria-valuemax={5}
        aria-valuenow={value}
        onPointerDown={(event) => {
          event.currentTarget.setPointerCapture(event.pointerId);
          updateFromPointer(event);
        }}
        onPointerMove={(event) => {
          if (event.buttons > 0) updateFromPointer(event);
        }}
      >
        <defs>
          <linearGradient id="auroraGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#f472b6" />
            <stop offset="25%" stopColor="#818cf8" />
            <stop offset="50%" stopColor="#a78bfa" />
            <stop offset="75%" stopColor="#34d399" />
            <stop offset="100%" stopColor="#fbbf24" />
          </linearGradient>
          <filter id="handleGlow">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <path d="M 34 178 A 126 126 0 0 1 286 178" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="18" strokeLinecap="round" />
        <path d={describeArc(160, 178, 126, 180, angle)} fill="none" stroke="url(#auroraGrad)" strokeWidth="18" strokeLinecap="round" className="transition-all duration-200" />
        {[1, 2, 3, 4, 5].map((tick) => {
          const tickPoint = polarToPoint(180 - ((tick - 1) / 4) * 180);
          return <circle key={tick} cx={tickPoint.x} cy={tickPoint.y} r={tick === value ? 5 : 3} fill={tick === value ? "var(--primary)" : "rgba(0,0,0,.28)"} />;
        })}
        <circle cx={point.x} cy={point.y} r="14" fill="#1a1035" stroke="#a78bfa" strokeWidth="3" filter="url(#handleGlow)" className="transition-all duration-200" />
        <text x="160" y="126" textAnchor="middle" fill="#c4b5fd" className="text-sm font-semibold">
          {labels[value - 1]}
        </text>
      </svg>
      <div className="grid grid-cols-5 text-center text-xs text-ink/60">
        <span>不快</span>
        <span />
        <span>中立</span>
        <span />
        <span>快</span>
      </div>
    </div>
  );
}

function polarToPoint(angle: number) {
  const radians = (angle * Math.PI) / 180;
  return {
    x: 160 + 126 * Math.cos(radians),
    y: 178 - 126 * Math.sin(radians)
  };
}

function describeArc(cx: number, cy: number, radius: number, startAngle: number, endAngle: number) {
  const start = {
    x: cx + radius * Math.cos((startAngle * Math.PI) / 180),
    y: cy - radius * Math.sin((startAngle * Math.PI) / 180)
  };
  const end = {
    x: cx + radius * Math.cos((endAngle * Math.PI) / 180),
    y: cy - radius * Math.sin((endAngle * Math.PI) / 180)
  };
  const largeArcFlag = Math.abs(endAngle - startAngle) <= 180 ? "0" : "1";
  return `M ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${end.x} ${end.y}`;
}
