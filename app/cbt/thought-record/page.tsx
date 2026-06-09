"use client";

import { useState } from "react";
import { Card, Chip } from "@/components/ui";
import { useAppStore } from "@/lib/store";

const situations = ["職場でのミス", "批判された", "締切が迫る", "ひとりになった"];
const thoughts = ["自分はダメだと感じた", "うまくいかないと思った", "みんなに迷惑をかけた"];
const emotions = ["悲しい", "怒り", "不安", "恥ずかしい", "焦り", "落ち込み"];

export default function ThoughtRecordPage() {
  const [step, setStep] = useState(1);
  const [situation, setSituation] = useState("");
  const [autoThoughts, setAutoThoughts] = useState<string[]>([]);
  const [emotion, setEmotion] = useState("不安");
  const [intensity, setIntensity] = useState(60);
  const [distortions, setDistortions] = useState<string[]>(["全か無か思考", "マイナス化思考"]);
  const [rationalThought, setRationalThought] = useState("ミスは誰でもする。次に活かせることを一つ選べば十分。");
  const addThoughtRecord = useAppStore((state) => state.addThoughtRecord);

  const save = () => {
    addThoughtRecord({ situation, autoThoughts, emotions: [{ name: emotion, intensity }], distortions, rationalThought });
    setStep(1);
  };

  return (
    <div className="pt-14 md:pt-16">
      <h1 className="mb-4 text-[28px] font-semibold">思考記録</h1>
      <div className="mb-4 grid grid-cols-5 gap-2">
        {[1, 2, 3, 4, 5].map((item) => (
          <div key={item} className={`h-2 rounded ${item <= step ? "bg-primary" : "bg-surface"}`} />
        ))}
      </div>
      <Card>
        {step === 1 && (
          <>
            <h2 className="mb-3 text-xl font-semibold">どんな状況でしたか？</h2>
            <div className="mb-3 flex flex-wrap gap-2">
              {situations.map((item) => (
                <Chip key={item} active={situation === item} onClick={() => setSituation(item)}>
                  {item}
                </Chip>
              ))}
            </div>
            <textarea className="min-h-24 w-full rounded-card border border-black/10 p-3" placeholder="任意入力" value={situation} onChange={(e) => setSituation(e.target.value)} />
          </>
        )}
        {step === 2 && (
          <>
            <h2 className="mb-3 text-xl font-semibold">近い自動思考を選ぶ</h2>
            <div className="flex flex-wrap gap-2">
              {[...thoughts, "違う"].map((item) => (
                <Chip
                  key={item}
                  active={autoThoughts.includes(item)}
                  onClick={() => setAutoThoughts((current) => (current.includes(item) ? current.filter((v) => v !== item) : [...current, item]))}
                >
                  {item}
                </Chip>
              ))}
            </div>
          </>
        )}
        {step === 3 && (
          <>
            <h2 className="mb-3 text-xl font-semibold">感情・強度</h2>
            <div className="mb-4 flex flex-wrap gap-2">
              {emotions.map((item) => (
                <Chip key={item} active={emotion === item} onClick={() => setEmotion(item)}>
                  {item}
                </Chip>
              ))}
            </div>
            <label className="font-semibold">強度 {intensity}%</label>
            <input className="mt-3 w-full" type="range" min="0" max="100" value={intensity} onChange={(e) => setIntensity(Number(e.target.value))} aria-valuemin={0} aria-valuemax={100} aria-valuenow={intensity} />
          </>
        )}
        {step === 4 && (
          <>
            <h2 className="mb-3 text-xl font-semibold">AI自動検出</h2>
            <p className="mb-3">「全か無か思考」と「マイナス化思考」が見られます。</p>
            <div className="flex gap-2">
              <Chip active={distortions.length > 0} onClick={() => setDistortions(["全か無か思考", "マイナス化思考"])}>そう思う</Chip>
              <Chip active={distortions.length === 0} onClick={() => setDistortions([])}>よくわからない</Chip>
            </div>
          </>
        )}
        {step === 5 && (
          <>
            <h2 className="mb-3 text-xl font-semibold">合理的思考</h2>
            <p className="mb-4 rounded-card bg-calm/10 p-4">{rationalThought}</p>
            <div className="flex flex-wrap gap-2">
              <Chip active onClick={() => setRationalThought("ミスは誰でもする。次に活かせることを一つ選べば十分。")}>この考え方を試してみる</Chip>
              <Chip onClick={() => setRationalThought("一度の出来事だけで自分全体を評価しなくていい。")}>別の視点を見せて</Chip>
            </div>
          </>
        )}
        <div className="mt-6 flex gap-2">
          <button className="min-h-12 rounded-button border border-black/10 px-4" disabled={step === 1} onClick={() => setStep((value) => value - 1)}>戻る</button>
          <button className="min-h-12 rounded-button bg-primary px-4 font-semibold text-white" onClick={step === 5 ? save : () => setStep((value) => value + 1)}>
            {step === 5 ? "保存" : "次へ"}
          </button>
        </div>
      </Card>
    </div>
  );
}
