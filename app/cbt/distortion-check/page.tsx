import { Card } from "@/components/ui";

export default function DistortionCheckPage() {
  return <Placeholder title="認知の歪みチェッカー" body="任意入力から歪みタイプをバッジ表示する画面です。Phase 1では説明カードを先に表示しています。" />;
}

function Placeholder({ title, body }: { title: string; body: string }) {
  return (
    <div className="pt-14 md:pt-16">
      <h1 className="mb-4 text-[28px] font-semibold">{title}</h1>
      <Card><p>{body}</p></Card>
    </div>
  );
}
