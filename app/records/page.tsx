"use client";

import { Card, Section } from "@/components/ui";
import { useAppStore } from "@/lib/store";

export default function RecordsPage() {
  const { checkIns, thoughtRecords } = useAppStore();
  const moods = checkIns.slice(0, 7).map((item) => item.mood).reverse();
  const avg = checkIns.length ? (checkIns.reduce((sum, item) => sum + item.mood, 0) / checkIns.length).toFixed(1) : "0";
  return (
    <div className="pt-14 md:pt-16">
      <h1 className="mb-5 text-[28px] font-semibold">記録・進捗</h1>
      <div className="mb-6 grid grid-cols-2 gap-3 md:grid-cols-4">
        {[["継続日数", `${Math.min(checkIns.length, 99)}日`], ["思考記録", `${thoughtRecords.length}回`], ["平均気分", avg], ["習得スキル", "4種"]].map(([label, value]) => (
          <Card key={label}><p className="text-sm text-ink/60">{label}</p><p className="text-2xl font-semibold">{value}</p></Card>
        ))}
      </div>
      <Section title="気分グラフ"><ConstellationChart values={moods.length ? moods : [3, 3, 4, 2, 3, 4, 3]} /></Section>
      <Section title="バッジ"><div className="flex flex-wrap gap-2">{["初回チェックイン", "呼吸法トライ", "思考の見直し", "7日目標"].map((item) => <span key={item} className="rounded-button bg-success px-3 py-2 text-sm font-semibold text-white">{item}</span>)}</div></Section>
      <Card className="bg-calm/10"><p className="font-semibold">AIインサイト</p><p>仕事や将来のタグが続く日は、短い呼吸法から始めると記録の継続につながりやすそうです。</p></Card>
    </div>
  );
}

function ConstellationChart({ values }: { values: number[] }) {
  const width = 320;
  const height = 140;
  const points = values.map((value, index) => ({
    x: 22 + (index * (width - 44)) / Math.max(values.length - 1, 1),
    y: height - 20 - ((value - 1) / 4) * 100
  }));

  return (
    <div className="rounded-card border p-3">
      <svg viewBox={`0 0 ${width} ${height}`} className="h-auto w-full" role="img" aria-label="気分のコンステレーショングラフ">
        <defs>
          <filter id="star-glow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <linearGradient id="constellation-line" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(167,139,250,0.1)" />
            <stop offset="100%" stopColor="rgba(167,139,250,0.45)" />
          </linearGradient>
        </defs>
        {points.slice(1).map((point, index) => {
          const previous = points[index];
          return <line key={`${point.x}-${point.y}`} x1={previous.x} y1={previous.y} x2={point.x} y2={point.y} stroke="url(#constellation-line)" strokeWidth="1" strokeDasharray="4 4" />;
        })}
        {points.map((point, index) => (
          <g key={index}>
            <circle cx={point.x} cy={point.y} r="5" fill="#fbbf24" filter="url(#star-glow)" />
            <text x={point.x} y={height - 4} textAnchor="middle" fill="var(--text-muted)" fontSize="10">
              {index + 1}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}
