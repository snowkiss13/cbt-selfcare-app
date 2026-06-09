"use client";

import { useMemo, useState } from "react";
import { buildHypothesis, useAppStore } from "@/lib/store";
import { buildCheckInSuggestion } from "@/lib/patterns";
import { RadialMoodSlider } from "@/components/RadialMoodSlider";
import { Card, Chip } from "@/components/ui";

const moodWords = ["嬉しい", "穏やか", "充実", "疲れた", "不安", "イライラ", "悲しい", "焦り", "空虚", "その他"];
const factors = ["仕事", "人間関係", "健康", "お金", "将来", "天気", "睡眠", "その他"];

export function CheckIn() {
  const [mood, setMood] = useState<1 | 2 | 3 | 4 | 5>(3);
  const [selectedMoodWords, setSelectedMoodWords] = useState<string[]>([]);
  const [selectedFactors, setSelectedFactors] = useState<string[]>([]);
  const [match, setMatch] = useState<"yes" | "partly" | "no">("partly");
  const [completed, setCompleted] = useState(false);
  const addCheckIn = useAppStore((state) => state.addCheckIn);
  const checkIns = useAppStore((state) => state.checkIns);
  const suggestion = useMemo(() => buildCheckInSuggestion(checkIns, selectedFactors), [checkIns, selectedFactors]);
  const hypothesis = completed ? suggestion : buildHypothesis(mood, selectedFactors);

  const save = () => {
    addCheckIn({
      mood,
      moodIntensity: mood,
      moodWords: selectedMoodWords,
      factors: selectedFactors,
      aiHypothesis: suggestion,
      hypothesisMatch: match
    } as Parameters<typeof addCheckIn>[0]);
    setCompleted(true);
  };

  return (
    <>
      <section className="mb-6">
        <h2 className="mb-3 text-[22px] font-semibold leading-tight">今の気分は？</h2>
        <Card>
          <RadialMoodSlider value={mood} onChange={setMood} />
          <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-3">
            {moodWords.map((word) => (
              <button
                key={word}
                type="button"
                onClick={() => setSelectedMoodWords((current) => toggle(current, word))}
                className={`min-h-11 select-none rounded-button px-3 py-2 text-sm font-medium ${
                  selectedMoodWords.includes(word)
                    ? "scale-[1.04] border-2 border-[var(--primary)] bg-[var(--primary)]/10 text-ink transition-transform duration-150"
                    : "border border-[var(--gray-200)] bg-white text-ink transition-colors duration-150 hover:border-[var(--gray-300)]"
                }`}
              >
                {word}
              </button>
            ))}
          </div>
        </Card>
      </section>

      <section className="mb-6">
        <h2 className="mb-3 text-[22px] font-semibold leading-tight">主な要因</h2>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {factors.map((factor) => (
            <button
              key={factor}
              type="button"
              onClick={() => setSelectedFactors((current) => toggle(current, factor))}
              className={`min-h-12 select-none rounded-button px-4 py-2 text-sm font-medium ${
                selectedFactors.includes(factor)
                  ? "scale-[1.04] border-2 border-[var(--primary)] bg-[var(--primary)]/10 text-ink transition-transform duration-150"
                  : "border border-[var(--gray-200)] bg-white text-ink transition-colors duration-150 hover:border-[var(--gray-300)]"
              }`}
            >
              {factor}
            </button>
          ))}
        </div>
      </section>

      {completed && (
        <Card className="mb-6 bg-calm/10">
          <p className="mb-3 text-sm font-semibold text-primary">AI Suggestions</p>
          <p className="mb-4 text-lg font-semibold">{hypothesis}</p>
          <div className="grid grid-cols-3 gap-2">
            {[
              ["yes", "そう"],
              ["partly", "少し違う"],
              ["no", "違う"]
            ].map(([value, label]) => (
              <button
                key={value}
                type="button"
                onClick={() => setMatch(value as typeof match)}
                className={`min-h-12 select-none rounded-button border px-3 text-sm font-semibold ${
                  match === value ? "border-primary text-primary" : "border-black/15 bg-transparent text-ink/70"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </Card>
      )}

      <button className="mb-6 min-h-12 w-full rounded-button bg-primary px-4 py-3 font-semibold text-white" onClick={save}>
        チェックインを完了
      </button>
    </>
  );
}

function toggle(values: string[], value: string) {
  return values.includes(value) ? values.filter((item) => item !== value) : [...values, value];
}
