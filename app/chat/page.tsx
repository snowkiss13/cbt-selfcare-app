"use client";

import { useState } from "react";
import { Card, PrimaryLink } from "@/components/ui";
import { useAppStore } from "@/lib/store";

export default function ChatPage() {
  const tone = useAppStore((state) => state.settings.aiTone);
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([{ role: "assistant", body: "今日はどの方向から整理しますか？選ぶだけでも大丈夫です。" }]);
  const send = () => {
    if (!text.trim()) return;
    const prefix = tone === "gentle" ? "ゆっくり整理しましょう。" : tone === "analytical" ? "状況・思考・感情に分けると、" : "まず一歩に絞りましょう。";
    setMessages((current) => [...current, { role: "user", body: text }, { role: "assistant", body: `${prefix} 今の内容は思考記録にすると扱いやすそうです。` }]);
    setText("");
  };
  return (
    <div className="pt-14 md:pt-16">
      <h1 className="mb-5 text-[28px] font-semibold">AI相談チャット</h1>
      <Card>
        <div className="mb-4 space-y-3" aria-live="polite">
          {messages.map((message, index) => (
            <p
              key={index}
              className={`p-3 ${
                message.role === "assistant" ? "rounded-[12px] rounded-tl bg-calm/10 border-l-4 border-[var(--calm)]" : "rounded-card bg-surface"
              }`}
              style={message.role === "assistant" ? { backgroundColor: "color-mix(in srgb, var(--calm) 8%, transparent)" } : undefined}
            >
              {message.body}
            </p>
          ))}
        </div>
        <div className="mb-4 flex flex-wrap gap-2"><PrimaryLink href="/cbt/thought-record">思考記録</PrimaryLink><PrimaryLink href="/cbt/breathing">呼吸法</PrimaryLink><PrimaryLink href="/cbt/stress-matrix">マトリクス</PrimaryLink></div>
        <textarea className="mb-2 min-h-24 w-full rounded-card border border-black/10 p-3" value={text} onChange={(e) => setText(e.target.value)} placeholder="任意入力" />
        <button className="min-h-12 rounded-button bg-primary px-4 font-semibold text-white" onClick={send}>送信</button>
      </Card>
    </div>
  );
}
