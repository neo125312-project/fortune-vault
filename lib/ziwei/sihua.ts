/**
 * 四化工具模組 — 年幹 / 大限宮幹 / 流年幹 / 流月幹 四化對映
 *                + 宮幹自化檢測 + 來因宮追溯
 *
 * 倪海廈《天紀》體系核心：
 *   本命四化 = 出生年天干四化（靜態基礎）
 *   大限四化 = 大限宮**宮幹**（非本命年幹）的四化（十年動態）
 *   流年四化 = 當年年乾的四化（一年動態）
 *   自化     = 某宮的宮幹四化，其中被化星恰在本宮
 *   來因宮   = 某顆化星的"動力來源宮"——即宮幹引發該化的宮位
 */

import type { ZiweiChart, Palace, SiHua } from './types';
import { SI_HUA_TABLE, STEMS } from './constants';

// ─── 1) 由天干索引取四化四星 ───────────────────────────────────
/** 天干索引 0-9 → { 祿, 權, 科, 忌 } 對應星名 */
export function getSiHuaByStem(stemIndex: number): Record<SiHua, string> {
  const arr = SI_HUA_TABLE[stemIndex];
  if (!arr) return { 祿: '', 權: '', 科: '', 忌: '' };
  return { 祿: arr[0], 權: arr[1], 科: arr[2], 忌: arr[3] };
}

/** 星名 → 四化型別（由某天干確定） */
export function buildStarSiHuaMap(stemIndex: number): Record<string, SiHua> {
  const arr = SI_HUA_TABLE[stemIndex];
  if (!arr) return {};
  return { [arr[0]]: '祿', [arr[1]]: '權', [arr[2]]: '科', [arr[3]]: '忌' };
}

// ─── 2) 公曆年 → 年柱天干索引 ──────────────────────────────────
/** 公曆年份 → 年柱天干索引（0=甲, ... 9=癸） */
export function getYearStemIndex(year: number): number {
  return ((year - 4) % 10 + 10) % 10;
}

/** 公曆年份 → 年柱地支索引（0=子, ... 11=亥） */
export function getYearBranchIndex(year: number): number {
  return ((year - 4) % 12 + 12) % 12;
}

// ─── 3) 大限四化：取大限宮的宮幹（非本命年幹）───────────────
/**
 * 大限宮幹四化
 * @param chart 命盤
 * @param dxIndex 大限索引（chart.daXians[dxIndex]）
 * @returns 該大限的四化四星
 */
export function getDaXianSiHua(
  chart: ZiweiChart,
  dxIndex: number,
): { stemIndex: number; stemName: string; transforms: Record<SiHua, string> } | null {
  const dx = chart.daXians[dxIndex];
  if (!dx) return null;
  const dxPalace = chart.palaces.find(p => p.branch === dx.palaceBranch);
  if (!dxPalace) return null;
  const stemIndex = dxPalace.stem;
  return {
    stemIndex,
    stemName: STEMS[stemIndex] ?? '',
    transforms: getSiHuaByStem(stemIndex),
  };
}

// ─── 4) 流年四化 ──────────────────────────────────────────────
export function getLiuNianSiHua(year: number): {
  stemIndex: number;
  stemName: string;
  transforms: Record<SiHua, string>;
} {
  const stemIndex = getYearStemIndex(year);
  return {
    stemIndex,
    stemName: STEMS[stemIndex] ?? '',
    transforms: getSiHuaByStem(stemIndex),
  };
}

// ─── 5) 流月四化（月柱天干，由年幹 + 月序推） ───────────────
/**
 * 流月天干（五虎遁：甲己年起丙寅、乙庚年起戊寅、丙辛年起庚寅、丁壬年起壬寅、戊癸年起甲寅）
 * month: 農曆月 1-12
 */
export function getLiuYueStemIndex(yearStem: number, month: number): number {
  // 五虎遁：正月（寅月）天干
  const startStemOfYin: Record<number, number> = {
    0: 2, 5: 2,  // 甲己 → 丙
    1: 4, 6: 4,  // 乙庚 → 戊
    2: 6, 7: 6,  // 丙辛 → 庚
    3: 8, 8: 8,  // 丁壬 → 壬
    4: 0, 9: 0,  // 戊癸 → 甲
  };
  const yinStem = startStemOfYin[yearStem] ?? 0;
  // 從寅（正月）到目標月（month 取 1-12）
  return (yinStem + ((month - 1) % 12) + 10) % 10;
}

export function getLiuYueSiHua(yearStem: number, month: number): {
  stemIndex: number;
  stemName: string;
  transforms: Record<SiHua, string>;
} {
  const stemIndex = getLiuYueStemIndex(yearStem, month);
  return {
    stemIndex,
    stemName: STEMS[stemIndex] ?? '',
    transforms: getSiHuaByStem(stemIndex),
  };
}

// ─── 6) 宮幹自化檢測 ──────────────────────────────────────────
/**
 * 自化：該宮宮幹引發的四化，被化星恰在本宮
 * e.g. 宮幹為甲（廉破武陽），如果本宮主星含"廉貞"，則該宮有"自化祿"
 */
export interface SelfSihua {
  siHua: SiHua;        // 祿/權/科/忌
  starName: string;    // 被化的星
}

export function detectSelfSihua(palace: Palace): SelfSihua[] {
  const transforms = getSiHuaByStem(palace.stem);
  const found: SelfSihua[] = [];
  const palaceStarNames = new Set(palace.stars.map(s => s.name));
  (['祿', '權', '科', '忌'] as SiHua[]).forEach(sh => {
    const starName = transforms[sh];
    if (starName && palaceStarNames.has(starName)) {
      found.push({ siHua: sh, starName });
    }
  });
  return found;
}

// ─── 7) 來因宮追溯 ────────────────────────────────────────────
/**
 * 來因宮：對某顆星某種化，追溯是哪個宮的宮幹"飛"過來的
 *
 * 倪師體系常用：化忌的來因宮——化忌由哪個宮位的"宮幹"引發，那個宮位就是問題的根源宮位
 *
 * @param chart 命盤
 * @param starName 被化的星名（如 "太陰"）
 * @param sihua  四化型別（如 "忌"）
 * @returns 引發該化的宮位陣列（通常只有一個，但若多宮宮幹相同可能多個）
 */
export function findIncomingPalaces(
  chart: ZiweiChart,
  starName: string,
  sihua: SiHua,
): Palace[] {
  const result: Palace[] = [];
  chart.palaces.forEach(p => {
    const transforms = getSiHuaByStem(p.stem);
    if (transforms[sihua] === starName) {
      result.push(p);
    }
  });
  return result;
}

/**
 * 批次計算盤面所有宮位的自化列表
 */
export function buildAllSelfSihua(chart: ZiweiChart): Record<number, SelfSihua[]> {
  const result: Record<number, SelfSihua[]> = {};
  chart.palaces.forEach(p => {
    const list = detectSelfSihua(p);
    if (list.length > 0) result[p.branch] = list;
  });
  return result;
}

// ─── 8) 綜合覆蓋（overlay）：多個四化層疊加後的效果 ──────────
/**
 * 生成某星名 → 多層四化的合成檢視
 * 用於在宮位上同時顯示：本命化 / 大限化 / 流年化
 * 優先順序：本命 < 大限 < 流年（但都標出來）
 */
export interface SiHuaOverlay {
  native?: SiHua;    // 本命（年幹）
  daXian?: SiHua;    // 大限
  liuNian?: SiHua;   // 流年
  liuYue?: SiHua;    // 流月
}

export function buildOverlayForStar(
  starName: string,
  nativeMap: Record<string, SiHua>,
  daXianMap?: Record<string, SiHua>,
  liuNianMap?: Record<string, SiHua>,
  liuYueMap?: Record<string, SiHua>,
): SiHuaOverlay {
  return {
    native: nativeMap[starName],
    daXian: daXianMap?.[starName],
    liuNian: liuNianMap?.[starName],
    liuYue: liuYueMap?.[starName],
  };
}
