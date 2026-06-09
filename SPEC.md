# CBT セルフケアWebアプリ — 実装仕様書

## Purpose
AI伴走型認知行動療法（CBT）アプリ。ユーザーが自律的にストレス管理・セルフケアスキルを習得できる環境を提供。

## コンセプト
- **入力最小化**: テキスト入力は原則不要。タップ・スワイプ・選択で完結
- **AI仮説提示モデル**: AIが状態を提案 → ユーザーが確認するだけ
- **コントロールボード**: AIトーン・テーマ・通知等をユーザーが自由設定

## Apple Journal 参照設計（v2追加）

Apple Journal / Health app の State of Mind を参考に以下を改善する。

### チェックインUI改善（ホーム画面）

**感情選択: ラジアルスライダー方式**
- 半円スライダーで感情の「強さ（Pleasant ↔ Unpleasant）」を表現
- 内側リング: 強さ（Very Pleasant / Pleasant / Neutral / Unpleasant / Very Unpleasant）
- 外側チップ: 感情語タップ（嬉しい / 穏やか / 不安 / イライラ / 悲しい 等 10語）
- 実装: SVG + CSS transform でラジアル配置。タップのみで完結

**「なぜそう感じるか」: chip grid方式**
- Apple Journal同様のグリッドチップ選択（複数タップ可）
- カテゴリ: 仕事・人間関係・健康・お金・将来・天気・睡眠・その他
- チップサイズ: 44px以上、選択時 --primary border + background tint

**Suggestions（文脈提案）カード**
- 過去ログ×時刻×曜日から「今日はこれが原因では？」をAI提示
- 例: 「月曜夕方 + 仕事タグ多い → 仕事のことが気になっていそう」
- 確認UI: [そう] [少し違う] [違う] の3択ボタン（Ghost variant）

---

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **AI**: Claude API (claude-haiku-4-5 デフォルト、claude-sonnet-4-6 複雑推論時)
- **State**: Zustand
- **DB**: Supabase (PostgreSQL) — ローカル開発はlocalStorage fallback可
- **Deploy**: Vercel

---

## 画面構成（5タブ）

```
/          → ホーム（日次チェックイン + AIカード + 週間グラフ）
/cbt       → CBTツール一覧
/cbt/[tool]→ 各ツール実行画面
/records   → 記録・進捗（グラフ・バッジ・AIインサイト）
/chat      → AI相談チャット
/settings  → コントロールボード
```

---

## 画面詳細

### ① ホーム `/`

**チェックイン（毎日・30秒完結）**

```
今の気分は？
[😊良い] [😐普通] [😔しんどい] [😤イライラ] [😰不安]

主な要因（複数タップ可）
[仕事] [人間関係] [体調] [お金] [将来] [その他]
```

→ タップ後 AIカードが更新: "今日は仕事のことが気になっているのかもしれません"
→ [そう] [少し違う] [違う] の3択ボタン

**AIカード**（--calm: #8b7ec8 10% opacity背景）
- AI伴走メッセージ表示
- 今日のおすすめツール（1〜3個）へのリンク

**週間グラフ**
- 気分スコア7日間折れ線
- 要因タグ頻度バー

---

### ② CBTツール `/cbt`

カード一覧:
1. **思考記録** (5ステップ・10分)
2. **認知の歪みチェッカー** (AI分析・3分)
3. **行動活性化プランナー** (楽しい活動登録)
4. **ストレス要因マトリクス** (コントロール可否分類)
5. **呼吸法ガイド** (4-7-8法・視覚ガイド)

#### 思考記録フロー `/cbt/thought-record`

ステッパーUI（5ステップ・1画面1問）:

```
Step 1: 状況
  「どんな状況でしたか？」
  よくある状況チップ: [職場でのミス] [批判された] [締切が迫る] [ひとりになった]
  + 任意テキスト入力（省略可）

Step 2: 自動思考
  AIが状況から仮説提示:
  □ 「自分はダメだと感じた」
  □ 「うまくいかないと思った」
  □ 「みんなに迷惑をかけた」
  当てはまるものをタップ（複数可）+ [違う]ボタン

Step 3: 感情・強度
  感情タップ: [悲しい] [怒り] [不安] [恥ずかしい] [焦り] [落ち込み]
  強度スライダー: 0〜100%

Step 4: 認知の歪み（AI自動検出）
  選んだ思考から自動分析:
  "「全か無か思考」が見られます"
  "「マイナス化思考」が見られます"
  → [そう思う] [よくわからない] の2択

Step 5: 合理的思考
  AIが代替思考を提案:
  "「ミスは誰でもする。次に活かせる」という見方もできます"
  [この考え方を試してみる] [別の視点を見せて]
```

#### 認知の歪みチェッカー `/cbt/distortion-check`
- テキストエリア（任意入力 or 音声入力）
- AI分析 → 歪みタイプをバッジ表示
- 各歪みの説明カード

#### 行動活性化プランナー `/cbt/activation`
- カテゴリ別おすすめ活動チップ（身体/社交/創造/休息）
- タップで「やってみたいリスト」に追加
- 週間カレンダーに配置

#### ストレス要因マトリクス `/cbt/stress-matrix`
- 4象限マップ（コントロール可/不可 × 重要/重要でない）
- 要因チップをドラッグ or タップで配置
- AI: "コントロール可能な部分に注力しましょう" コメント

#### 呼吸法ガイド `/cbt/breathing`
- 視覚的なサークルアニメーション（吸う/止める/吐く）
- 4-7-8秒カウント
- 完了後に気分再評価（before/after比較）

---

### ③ 記録 `/records`

- KPIカード（継続日数・思考記録回数・平均気分・習得スキル数）
- 気分グラフ（7日/30日 切替）
- 要因ヒートマップ（曜日×要因）
- 習得スキルバッジ
- AIインサイト（パターン分析コメント）

---

### ④ AI相談チャット `/chat`

- Claude API連携チャット
- CBTフレームに基づくシステムプロンプト
- AI提案ボタン（思考記録/呼吸法/マトリクスへのリンク）
- トーン3種（設定から反映）: やさしい/コーチ/分析

---

### ⑤ コントロールボード `/settings`

セクション構成:

```
▼ AI・体験設定
  AIトーン: ○やさしい ◉コーチ型 ○分析型
  返答速度: [速い ●━━━━○ 詳しい]

▼ 表示設定
  カラーテーマ: [🌿ナチュラル] [🌊クール] [🌸ウォーム]
  フォントサイズ: [小 ●━━○━━○ 大]

▼ CBT・ケア設定
  有効ツール: ☑思考記録 ☑呼吸法 ☑行動活性化 ☑マトリクス ☑歪みチェック
  ストレス要因カテゴリ: ☑仕事 ☑人間関係 ☑健康 ☑経済 ☑将来
  目標継続日数: [7日 ▼]

▼ 通知
  毎日リマインダー: [ON/OFF toggle]
  時刻: 20:00

▼ データ
  エクスポート: [JSONダウンロード]
  全記録削除: [削除] (Destructive)
```

---

## データモデル（localStorage / Supabase）

```typescript
// チェックイン記録
interface CheckIn {
  id: string
  date: string          // YYYY-MM-DD
  mood: 1 | 2 | 3 | 4 | 5
  factors: string[]     // ['仕事', '人間関係', ...]
  aiHypothesis: string
  hypothesisMatch: 'yes' | 'partly' | 'no'
  createdAt: string
}

// 思考記録
interface ThoughtRecord {
  id: string
  date: string
  situation: string
  autoThoughts: string[]
  emotions: { name: string; intensity: number }[]
  distortions: string[]
  rationalThought: string
  createdAt: string
}

// ユーザー設定
interface UserSettings {
  aiTone: 'gentle' | 'coach' | 'analytical'
  theme: 'natural' | 'cool' | 'warm'
  fontSize: 'sm' | 'md' | 'lg' | 'xl'
  enabledTools: string[]
  stressFactors: string[]
  reminderEnabled: boolean
  reminderTime: string  // "HH:MM"
  goalDays: number
}
```

---

## カラートークン（テーマ別）

```css
/* ナチュラル（デフォルト） */
--primary: #4f86c6;
--calm: #8b7ec8;
--success: #5a9e6f;
--warning: #d4874a;
--gray-50: #faf9f7;
--gray-100: #f4f2ef;
--gray-700: #3d3835;

/* クール */
--primary: #2e86ab;
--calm: #5c7fa6;
--gray-50: #f4f8fb;

/* ウォーム */
--primary: #c2708b;
--calm: #d4875a;
--gray-50: #fdf8f5;
```

---

## デザイントークン（共通）

```
フォント: "Inter", "Noto Sans JP", system-ui
H1: 28px / 600
H2: 22px / 600
Body: 16px / 400 (日本語)
Caption: 12px / 400

スペーシング: 8px基準
  --space-4: 16px  (カード内余白)
  --space-5: 24px  (セクション間)
  --space-6: 32px  (大セクション間)

ボタン角丸: 6px
カード角丸: 8px
タップターゲット最小: 48px × 48px
```

---

## アクセシビリティ
- WCAG 2.1 AA準拠
- 感情ボタン: aria-label="気分: 良い"
- チャット: aria-live="polite"
- スライダー: aria-valuemin/max/now

---

## Definition of Done

- [ ] `/` ホーム: チェックイン（気分タップ+要因タップ）+ AI仮説カード + 週間グラフ
- [ ] `/cbt` ツール一覧カード（5種）
- [ ] `/cbt/thought-record` 5ステップフロー（ステッパーUI）
- [ ] `/cbt/breathing` 呼吸法アニメーション
- [ ] `/chat` Claude APIチャット（トーン反映）
- [ ] `/settings` コントロールボード（全設定項目）
- [ ] `/records` KPI + グラフ + バッジ
- [ ] テーマ3種の切替動作
- [ ] localStorage永続化（Supabase未接続でも動作）
- [ ] モバイルファースト（375px〜）レスポンシブ
- [ ] 変更は最小限・関係ないファイルに触らない
- [ ] 不確実な点はリスクとして明記
