"use client";

import { Card, Chip, Section } from "@/components/ui";
import { useAppStore } from "@/lib/store";

export default function SettingsPage() {
  const { settings, updateSettings, clearRecords } = useAppStore();
  const toggle = (key: "enabledTools" | "stressFactors", item: string) => {
    const values = settings[key];
    updateSettings({ [key]: values.includes(item) ? values.filter((value) => value !== item) : [...values, item] });
  };
  return (
    <div className="pt-14 md:pt-16">
      <h1 className="mb-5 text-[28px] font-semibold">コントロールボード</h1>
      <Section title="AI・体験設定">
        <Card>
          <div className="mb-4 flex flex-wrap gap-2">
            {[["gentle", "やさしい"], ["coach", "コーチ型"], ["analytical", "分析型"]].map(([value, label]) => (
              <Chip key={value} active={settings.aiTone === value} onClick={() => updateSettings({ aiTone: value as typeof settings.aiTone })}>{label}</Chip>
            ))}
          </div>
          <label className="font-semibold">返答速度</label>
          <input className="mt-3 w-full" type="range" min="0" max="100" value={settings.responseDetail} onChange={(e) => updateSettings({ responseDetail: Number(e.target.value) })} />
        </Card>
      </Section>
      <Section title="表示設定">
        <Card>
          <div className="mb-4 flex flex-wrap gap-2">
            {[["natural", "ナチュラル"], ["cool", "クール"], ["warm", "ウォーム"]].map(([value, label]) => (
              <Chip key={value} active={settings.theme === value} onClick={() => updateSettings({ theme: value as typeof settings.theme })}>{label}</Chip>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            {(["sm", "md", "lg", "xl"] as const).map((value) => <Chip key={value} active={settings.fontSize === value} onClick={() => updateSettings({ fontSize: value })}>{value}</Chip>)}
          </div>
        </Card>
      </Section>
      <Section title="CBT・ケア設定">
        <Card className="space-y-4">
          <div className="flex flex-wrap gap-2">{["thought-record", "breathing", "activation", "stress-matrix", "distortion-check"].map((item) => <Chip key={item} active={settings.enabledTools.includes(item)} onClick={() => toggle("enabledTools", item)}>{item}</Chip>)}</div>
          <div className="flex flex-wrap gap-2">{["仕事", "人間関係", "健康", "経済", "将来"].map((item) => <Chip key={item} active={settings.stressFactors.includes(item)} onClick={() => toggle("stressFactors", item)}>{item}</Chip>)}</div>
          <select className="min-h-12 rounded-button border border-black/10 px-3" value={settings.goalDays} onChange={(e) => updateSettings({ goalDays: Number(e.target.value) })}>
            {[7, 14, 30].map((days) => <option key={days} value={days}>{days}日</option>)}
          </select>
        </Card>
      </Section>
      <Section title="通知">
        <Card className="flex flex-wrap items-center gap-3">
          <Chip active={settings.reminderEnabled} onClick={() => updateSettings({ reminderEnabled: !settings.reminderEnabled })}>{settings.reminderEnabled ? "ON" : "OFF"}</Chip>
          <input className="min-h-12 rounded-button border border-black/10 px-3" type="time" value={settings.reminderTime} onChange={(e) => updateSettings({ reminderTime: e.target.value })} />
        </Card>
      </Section>
      <Section title="データ">
        <Card className="flex flex-wrap gap-2">
          <a className="inline-flex min-h-12 items-center rounded-button bg-primary px-4 font-semibold text-white" href={`data:application/json,${encodeURIComponent(JSON.stringify(useAppStore.getState()))}`} download="cbt-records.json">JSONダウンロード</a>
          <button className="min-h-12 rounded-button bg-red-600 px-4 font-semibold text-white" onClick={clearRecords}>全記録削除</button>
        </Card>
      </Section>
    </div>
  );
}
