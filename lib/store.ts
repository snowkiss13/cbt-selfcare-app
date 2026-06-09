"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CheckIn = {
  id: string;
  date: string;
  mood: 1 | 2 | 3 | 4 | 5;
  factors: string[];
  aiHypothesis: string;
  hypothesisMatch: "yes" | "partly" | "no";
  createdAt: string;
};

export type ThoughtRecord = {
  id: string;
  date: string;
  situation: string;
  autoThoughts: string[];
  emotions: { name: string; intensity: number }[];
  distortions: string[];
  rationalThought: string;
  createdAt: string;
};

export type UserSettings = {
  aiTone: "gentle" | "coach" | "analytical";
  theme: "natural" | "cool" | "warm";
  fontSize: "sm" | "md" | "lg" | "xl";
  responseDetail: number;
  enabledTools: string[];
  stressFactors: string[];
  reminderEnabled: boolean;
  reminderTime: string;
  goalDays: number;
};

type AppState = {
  checkIns: CheckIn[];
  thoughtRecords: ThoughtRecord[];
  settings: UserSettings;
  addCheckIn: (checkIn: Omit<CheckIn, "id" | "createdAt" | "date">) => void;
  addThoughtRecord: (record: Omit<ThoughtRecord, "id" | "createdAt" | "date">) => void;
  updateSettings: (settings: Partial<UserSettings>) => void;
  clearRecords: () => void;
};

const today = () => new Date().toISOString().slice(0, 10);
const id = () => crypto.randomUUID();

export const defaultSettings: UserSettings = {
  aiTone: "coach",
  theme: "natural",
  fontSize: "md",
  responseDetail: 45,
  enabledTools: ["thought-record", "breathing", "activation", "stress-matrix", "distortion-check"],
  stressFactors: ["仕事", "人間関係", "健康", "経済", "将来"],
  reminderEnabled: true,
  reminderTime: "20:00",
  goalDays: 7
};

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      checkIns: [],
      thoughtRecords: [],
      settings: defaultSettings,
      addCheckIn: (checkIn) =>
        set((state) => ({
          checkIns: [{ ...checkIn, id: id(), date: today(), createdAt: new Date().toISOString() }, ...state.checkIns].slice(0, 90)
        })),
      addThoughtRecord: (record) =>
        set((state) => ({
          thoughtRecords: [{ ...record, id: id(), date: today(), createdAt: new Date().toISOString() }, ...state.thoughtRecords]
        })),
      updateSettings: (settings) => set((state) => ({ settings: { ...state.settings, ...settings } })),
      clearRecords: () => set({ checkIns: [], thoughtRecords: [] })
    }),
    { name: "cbt-self-care" }
  )
);

export const moodLabel = (mood: number) => ["しんどい", "不安", "普通", "良い", "安定"][mood - 1] ?? "普通";

export const buildHypothesis = (mood: number, factors: string[]) => {
  const factor = factors[0] ?? "今日の状態";
  if (mood <= 2) return `今日は${factor}の負荷が少し強く出ているのかもしれません。`;
  if (mood === 3) return `${factor}を気にしながらも、今は整え直せる余地がありそうです。`;
  return `${factor}について、今のペースを保てているように見えます。`;
};
