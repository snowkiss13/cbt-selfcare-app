import { Card, PrimaryLink } from "@/components/ui";

const tools = [
  ["思考記録", "5ステップ・10分", "/cbt/thought-record"],
  ["認知の歪みチェッカー", "AI分析・3分", "/cbt/distortion-check"],
  ["行動活性化プランナー", "楽しい活動登録", "/cbt/activation"],
  ["ストレス要因マトリクス", "コントロール可否分類", "/cbt/stress-matrix"],
  ["呼吸法ガイド", "4-7-8法・視覚ガイド", "/cbt/breathing"]
];

export default function CbtPage() {
  return (
    <div className="pt-14 md:pt-16">
      <h1 className="mb-5 text-[28px] font-semibold leading-tight">CBTツール</h1>
      <div className="grid gap-3 md:grid-cols-2">
        {tools.map(([title, body, href]) => (
          <Card key={title}>
            <h2 className="mb-1 text-xl font-semibold">{title}</h2>
            <p className="mb-4 text-ink/70">{body}</p>
            <PrimaryLink href={href}>開く</PrimaryLink>
          </Card>
        ))}
      </div>
    </div>
  );
}
