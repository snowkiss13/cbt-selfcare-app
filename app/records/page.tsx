"use client";

import { Card, MiniBars, Section } from "@/components/ui";
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
      <Section title="気分グラフ"><MiniBars values={moods.length ? moods : [3, 3, 4, 2, 3, 4, 3]} /></Section>
      <Section title="バッジ"><div className="flex flex-wrap gap-2">{["初回チェックイン", "呼吸法トライ", "思考の見直し", "7日目標"].map((item) => <span key={item} className="rounded-button bg-success px-3 py-2 text-sm font-semibold text-white">{item}</span>)}</div></Section>
      <Card className="bg-calm/10"><p className="font-semibold">AIインサイト</p><p>仕事や将来のタグが続く日は、短い呼吸法から始めると記録の継続につながりやすそうです。</p></Card>
    </div>
  );
}
