export interface BirthInfo {
  year: number;      // Gregorian year
  month: number;     // Gregorian month (1-12)
  day: number;       // Gregorian day
  hour: number;      // 時辰 branch index (0=子, 1=醜, ... 11=亥)
  gender: 'male' | 'female';
  name?: string;
  province?: string;   // 出生省份
  city?: string;       // 出生城市
  longitude?: number;  // 出生地經度（用於真太陽時校正）
}

export interface LunarInfo {
  lunarYear: number;
  lunarMonth: number;    // positive = normal, negative = leap month
  lunarDay: number;
  yearStem: number;      // 0-9 (甲乙丙丁戊己庚辛壬癸)
  yearBranch: number;    // 0-11 (子醜寅卯辰巳午未申酉戌亥)
  isLeapMonth: boolean;
}

export type SiHua = '祿' | '權' | '科' | '忌';

export interface Star {
  name: string;
  type: 'major' | 'minor' | 'lucky' | 'sha';
  siHua?: SiHua;
  brightness?: 'bright' | 'normal' | 'dim';  // 廟旺利陷
}

export interface SelfSihuaMark {
  siHua: SiHua;       // 祿/權/科/忌
  starName: string;   // 自化的星
}

export interface Palace {
  branch: number;      // 0-11 (地支索引)
  stem: number;        // 0-9 (天干索引)
  name: string;        // 宮名
  stars: Star[];
  daXianAge?: [number, number];   // 大限年齡段
  isCurrentDaXian?: boolean;
  isMingGong?: boolean;
  isShenGong?: boolean;
  /** 宮幹自化（倪師體系核心） */
  selfSihua?: SelfSihuaMark[];
  /** 對宮地支索引（永遠 = (branch + 6) % 12） */
  oppositeBranch?: number;
  /** 是否空宮（無主星） */
  isEmpty?: boolean;
  /** 若為空宮，借自哪個宮的地支索引 = oppositeBranch */
  borrowedFromBranch?: number;
  /** 若為空宮，借自哪個宮名 */
  borrowedFromName?: string;
  /** 若為空宮，借到的對宮主星名列表（結構化資料，文案層不再需要從文字反查） */
  borrowedStars?: string[];
}

export interface DaXianSiHua {
  stemIndex: number;
  stemName: string;
  lu: string;    // 化祿星名
  quan: string;  // 化權星名
  ke: string;    // 化科星名
  ji: string;    // 化忌星名
}

export interface DaXian {
  startAge: number;
  endAge: number;
  palaceBranch: number;
  palaceName: string;
  stemIndex?: number;    // 大限宮的天干索引（用於大限四化）
  stemName?: string;
  siHua?: DaXianSiHua;   // 該大限四化（基於宮幹）
}

export interface ZiweiChart {
  birthInfo: BirthInfo;
  lunarInfo: LunarInfo;
  mingGongBranch: number;    // 命宮地支
  shenGongBranch: number;    // 身宮地支
  wuxingJu: number;          // 五行局 (2,3,4,5,6)
  wuxingJuName: string;      // e.g. '水二局'
  ziweiPos: number;          // 紫微星位置
  palaces: Palace[];         // 12宮，按地支0-11排序
  daXians: DaXian[];
  currentAge: number;
  currentDaXianIndex: number;
}
