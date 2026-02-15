export interface ScoringDimensions {
  attraction: number;        // 吸引力 (1-10)
  differentiation: number;   // 差异化 (1-10)
  timeliness: number;        // 时效性 (1-10)
  resonance: number;         // 共鸣度 (1-10)
  topicHeat: number;         // 话题热度 (1-10)
  searchFriendliness: number; // 搜索友好度 (1-10)
  seoOptimization: number;    // SEO优化度 (1-10)
}

export interface GeneratedTitle {
  id: string;
  title: string;
  style: string;
  keywords: string[];
  totalScore: number;
  dimensions: ScoringDimensions;
  suggestion: string;
  emoji: string;
  violationRisk: string; // 低/中/高
}

export interface GenerateResponse {
  titles: GeneratedTitle[];
}

export interface ChatMessage {
  role: 'user' | 'ai';
  content: string;
}

export const XIAOHONGSHU_RED = '#FF2442';
export const BG_GRAY = '#F7F8FA';
