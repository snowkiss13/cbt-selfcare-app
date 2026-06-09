import { Card, Chip } from "@/components/ui";

export default function ActivationPage() {
  return (
    <div className="pt-14 md:pt-16">
      <h1 className="mb-4 text-[28px] font-semibold">行動活性化プランナー</h1>
      <Card><div className="flex flex-wrap gap-2">{["散歩", "友人に連絡", "音楽", "昼寝", "片付け"].map((item) => <Chip key={item}>{item}</Chip>)}</div></Card>
    </div>
  );
}
