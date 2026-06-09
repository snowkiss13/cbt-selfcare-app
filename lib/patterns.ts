import type { CheckIn } from "@/lib/store";

type CheckInWithMoodMeta = CheckIn & {
  moodIntensity?: number;
  moodWords?: string[];
};

const fallback = "今の状態を見ながら、まず一つだけ整えられることを選ぶとよさそうです。";

export function buildCheckInSuggestion(checkIns: CheckInWithMoodMeta[], factors: string[]) {
  if (checkIns.length < 3) {
    const factor = factors[0];
    return factor ? `${factor}のことが少し気になっていそうです。` : fallback;
  }

  const now = new Date();
  const currentDay = now.getDay();
  const currentHourBlock = Math.floor(now.getHours() / 6);
  const scores = new Map<string, number>();

  checkIns.forEach((checkIn) => {
    const created = new Date(checkIn.createdAt);
    const dayMatch = created.getDay() === currentDay ? 2 : 0;
    const hourMatch = Math.floor(created.getHours() / 6) === currentHourBlock ? 2 : 0;

    checkIn.factors.forEach((factor) => {
      scores.set(factor, (scores.get(factor) ?? 0) + 1 + dayMatch + hourMatch);
    });
  });

  factors.forEach((factor) => {
    scores.set(factor, (scores.get(factor) ?? 0) + 2);
  });

  const [topFactor] = Array.from(scores.entries()).sort((a, b) => b[1] - a[1])[0] ?? [];
  return topFactor ? `${topFactor}のことが気になっていそうです。` : fallback;
}
