"use client";

import { useMemo } from "react";
import { useAppStore } from "@/lib/store";
import { MiniBars, PrimaryLink, Section } from "@/components/ui";
import { CheckIn } from "@/components/CheckIn";

export default function HomePage() {
  const checkIns = useAppStore((state) => state.checkIns);
  const week = useMemo(() => checkIns.slice(0, 7).map((item) => item.mood).reverse(), [checkIns]);

  return (
    <>
      <header className="mb-6 pt-14 md:pt-16">
        <p className="text-sm font-medium text-primary">30秒チェックイン</p>
        <h1 className="text-[28px] font-semibold leading-tight">今の状態を選ぶだけで整える</h1>
      </header>

      <CheckIn />

      <section className="mb-6 flex flex-wrap gap-2">
        <div className="flex flex-wrap gap-2">
          <PrimaryLink href="/cbt/thought-record">思考記録</PrimaryLink>
          <PrimaryLink href="/cbt/breathing">呼吸法</PrimaryLink>
        </div>
      </section>

      <Section title="週間グラフ">
        <MiniBars values={week.length ? week : [3, 3, 4, 2, 3, 4, 3]} />
      </Section>
    </>
  );
}
