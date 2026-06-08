# 星樞 · 個人化紫微斗數排盤與解讀

> 基於開源紫微斗數排盤引擎打造的個人化命理平臺。

---

## 簡介

星樞（fortune-vault）是一個以 Next.js 14 打造的紫微斗數排盤與解讀網站。

排盤引擎、四化系統、格局知識庫、古籍原文資料均承自上游開源專案（見下方資料來源）。本專案重新整理為繁體中文／臺灣在地語感，並重新命名為「星樞」品牌上線。

---

## 功能

- **排盤工作臺**：命盤方格、宮位詳情、星曜面板
- **格局判定**：1100+ 行格局知識庫（紫府同宮、日月並明、七殺朝斗等）
- **合盤分析**：雙盤對照
- **古籍閱讀器**：骨髓賦、紫微斗數全集、紫微斗數全書全文搜尋
- **命理百科**：14 主星 + 12 宮位知識頁
- **真太陽時校正**：城市經緯度自動換算
- **亮色／暗色主題**、行動裝置自適應

---

## 技術棧

- **框架**：Next.js 14（App Router）
- **語言**：TypeScript
- **樣式**：Tailwind CSS + CSS Variables
- **排盤**：iztro + lunar-javascript
- **動畫**：Framer Motion

---

## 快速開始

```bash
git clone <this-repo>
cd fortune-vault
npm install
cp .env.example .env.local
# 編輯 .env.local，填入你的 AI API Key
npm run dev
```

---

## 開源內容

### 排盤演算法（`lib/ziwei/`）

| 檔案 | 說明 |
|------|------|
| `algorithm.ts` | 完整排盤流程：安命宮、定五行局、安十四主星、安輔星、排大限流年 |
| `constants.ts` | 天干地支、十四主星、輔星常量 |
| `sihua.ts` | 四化飛星系統（祿權科忌） |
| `patterns.ts` | 格局知識庫 |
| `heming-knowledge.ts` | 合盤方法論 |
| `types.ts` | TypeScript 型別定義 |
| `cities.ts` | 城市經緯度（真太陽時校正） |
| `famous.ts` | 歷史名人命盤示例 |

### 古籍原文（`lib/classics/`）

- **骨髓賦**（`gusuifu.ts`）
- **紫微斗數全集**（`quanji.ts`）
- **紫微斗數全書**（`quanshu.ts`）

### 前端介面（`app/` + `components/`）

Next.js 14 完整前端。

### SEO 知識圖譜（`lib/seo/`）

14 主星 × 12 宮位的結構化知識資料。

---

## 授權

| 內容 | 授權 |
|------|------|
| **程式碼**（`lib/`、`app/`、`components/`） | [MIT License](./LICENSE) |
| **資料**（51.8 萬命盤樣本） | 自由商用 · 需保留資料來源標註 |
| **古籍原文** | Public Domain |

---

## 資料來源（Attribution）

本專案的排盤引擎、格局知識庫、古籍原文資料及 51.8 萬命盤樣本資料集，承自下列上游開源專案：

- **上游 repo**：https://github.com/Renhuai123/ziwei-doushu
- **原作者**：王多魚AI
- **資料集**：紫微斗數開源樣本資料集 v3.0（518,400 條）

依資料授權條件，使用本專案時請保留此標註。
