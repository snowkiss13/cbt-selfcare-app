"use client";

import { useState } from "react";
import { Card, Chip } from "@/components/ui";

export default function BreathingPage() {
  const [before, setBefore] = useState(3);
  const [after, setAfter] = useState(3);
  return (
    <div className="pt-14 md:pt-16">
      <h1 className="mb-4 text-[28px] font-semibold">呼吸法ガイド</h1>
      <Card className="text-center">
        <div className="mx-auto my-8 flex h-56 w-56 items-center justify-center rounded-full bg-calm/20">
          <div className="breathe-circle flex h-40 w-40 items-center justify-center rounded-full bg-primary text-xl font-semibold text-white">4-7-8</div>
        </div>
        <p className="mb-6 text-lg font-semibold">吸う 4秒 ・ 止める 7秒 ・ 吐く 8秒</p>
        <div className="grid gap-4 sm:grid-cols-2">
          <MoodPicker label="開始前" value={before} setValue={setBefore} />
          <MoodPicker label="終了後" value={after} setValue={setAfter} />
        </div>
      </Card>
    </div>
  );
}

function MoodPicker({ label, value, setValue }: { label: string; value: number; setValue: (value: number) => void }) {
  return (
    <div>
      <p className="mb-2 font-semibold">{label}</p>
      <div className="flex justify-center gap-2">
        {[1, 2, 3, 4, 5].map((item) => (
          <Chip key={item} active={value === item} onClick={() => setValue(item)}>
            {item}
          </Chip>
        ))}
      </div>
    </div>
  );
}
