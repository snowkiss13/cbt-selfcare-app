import { Card, Chip } from "@/components/ui";

export default function StressMatrixPage() {
  return (
    <div className="pt-14 md:pt-16">
      <h1 className="mb-4 text-[28px] font-semibold">ストレス要因マトリクス</h1>
      <div className="grid gap-3 sm:grid-cols-2">{["重要・コントロール可", "重要・コントロール不可", "低重要・コントロール可", "低重要・コントロール不可"].map((title) => <Card key={title}><h2 className="mb-3 font-semibold">{title}</h2><Chip>仕事</Chip></Card>)}</div>
    </div>
  );
}
