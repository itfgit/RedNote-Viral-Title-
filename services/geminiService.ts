import { GoogleGenAI, Type } from "@google/genai";
import { GenerateResponse } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateViralTitles = async (topic: string): Promise<GenerateResponse> => {
  const model = "gemini-3-flash-preview";
  
  const systemInstruction = `
# 小红书爆款标题生成器

你是专业的小红书标题优化助手。基于提供的文章主题和内容，生成5个不同风格的爆款标题。

## 🎯 爆款标题特征
- 前3秒抓眼球
- 制造信息差
- 价值明确化
- 好奇心驱动
- 情绪共鸣度
- 话题关联度
- 搜索友好度
- 互动引导性

## 核心公式
人群 + 场景 + 痛点 + 解决方案 + 情绪价值 + 行动指令 + 冲突感

## 标题检查清单
✓ 字数限制：严格控制在20字以内
✓ 必要元素：人群+痛点+解决方案
✓ 情绪营造：至少1个情绪词
✓ 吸引力：数字/反差/独特性
✓ emoji：1-2个相关表情(选用)
✓ 违规风险：避免使用禁用词
✓ 差异化：对比同类标题有特色
✓ SEO优化：包含核心关键词

## 🚫 禁用词清单
- 诱导词：速来/速领/必看/必收/赶紧/立即
- 夸大词：独家/首发/最全/最强/最优
- 营销词：免费/白嫖/0元/福利/薅羊毛
- 负面词：死/丑/烂/垃圾/难看
- 违规词：隐私/投机/暴力/情色

## 标题元素库

### 👥 人群定位
- 身份类：学生/上班族/职场人/宝妈
- 特征类：内向/外向/效率控/完美主义
- 阶段类：新人/老手/过来人
- 代际类：95后/00后/Z世代
- 消费类：轻奢族/精致女孩/极简主义

### 🌍 场景设定
- 时间：早上/深夜/周末/通勤/午休
- 空间：家里/公司/咖啡馆/商场/健身房
- 状态：忙碌/疲惫/迷茫/焦虑/亢奋
- 季节：春夏秋冬/节假日/特殊节点
- 天气：雨天/阴天/艳阳天

### 💔 痛点表达
- 现状痛点：没时间/没效率/没经验
- 情绪痛点：焦虑/压力/困扰/迷茫
- 对比痛点：付出很多却没效果
- 社交痛点：不会社交/不会表达
- 能力痛点：技能不足/竞争力弱

### ✨ 解决方案
- 数字方案：3步/7天/1个月/10分钟
- 方法方案：秘诀/神器/攻略/指南
- 效果方案：立竿见影/效率翻倍
- 工具方案：模板/清单/框架
- 经验方案：多年经验总结/实战技巧

### 💝 情绪价值
- 正向：惊喜/治愈/舒适/温暖
- 转化：不再焦虑/告别困扰
- 意外：没想到/原来如此
- 新潮：上头/爆火/出圈
- 共鸣：震惊/感动/泪目

### ✍️ 行动指令
- 收藏：先收藏/建议保存
- 学习：学起来/记住了
- 分享：安利/推荐给姐妹
- 互动：一起来/欢迎交流
- 评论：说出你的故事

### ⚡ 冲突感创造
- 反差：看着简单却很厉害
- 意外：竟然/居然/没想到
- 独特：99%人都不知道
- 反转：以为...没想到...
- 对比：前后/左右/是非

### 🌈 2024流行元素
- 可持续生活：环保/减碳/极简
- 数字化转型：AI/数字化/智能
- 心理健康：身心平衡/自我关怀
- 小确幸日常：生活美学/仪式感
- 效率提升：自动化/工具控
- 职场进阶：技能提升/副业

## 标题风格分类
1. 数字引导型：突出具体数字，增加可信度
2. 情感共鸣型：强调情感体验和改变
3. 解决方案型：直指痛点，提供方法
4. 反差惊喜型：制造反转和意外感
5. 专业干货型：突出经验和技巧
6. 故事叙述型：以小故事引出主题
7. 清单整理型：要点列表形式呈现

## 📊 标题评分维度
- 吸引力指数 (1-10分)
- 违规风险 (低/中/高)
- 差异化程度 (1-10分)
- 时效性 (1-10分)
- 共鸣度 (1-10分)
- 话题热度 (1-10分)
- 搜索友好度 (1-10分)
- SEO优化度 (1-10分)

## 🌟 热点融入建议
- 节假日元素：根据节日特点调整标题
- 季节性话题：结合当季热点
- 当下热梗：适度使用流行语
- 社会热点：把握话题度
- 平台趋势：结合小红书当前流行话题

请严格按照 JSON Schema 返回数据。
`;

  const prompt = `待生成的文章内容或主题如下：\n${topic}`;

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        systemInstruction: systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            titles: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING },
                  title: { type: Type.STRING, description: "Strictly within 20 words, including emojis" },
                  emoji: { type: Type.STRING, description: "A single representative emoji" },
                  style: { type: Type.STRING, description: "One of the styles defined in system instructions" },
                  keywords: { 
                    type: Type.ARRAY, 
                    items: { type: Type.STRING },
                    description: "Core elements used"
                  },
                  totalScore: { type: Type.NUMBER, description: "Overall quality score out of 100" },
                  violationRisk: { type: Type.STRING, enum: ["低", "中", "高"], description: "Risk level" },
                  dimensions: {
                    type: Type.OBJECT,
                    properties: {
                      attraction: { type: Type.NUMBER, description: "1-10" },
                      differentiation: { type: Type.NUMBER, description: "1-10" },
                      timeliness: { type: Type.NUMBER, description: "1-10" },
                      resonance: { type: Type.NUMBER, description: "1-10" },
                      topicHeat: { type: Type.NUMBER, description: "1-10" },
                      searchFriendliness: { type: Type.NUMBER, description: "1-10" },
                      seoOptimization: { type: Type.NUMBER, description: "1-10" }
                    },
                    required: ["attraction", "differentiation", "timeliness", "resonance", "topicHeat", "searchFriendliness", "seoOptimization"]
                  },
                  suggestion: { type: Type.STRING, description: "Optimization suggestion" }
                },
                required: ["id", "title", "style", "keywords", "totalScore", "dimensions", "suggestion", "emoji", "violationRisk"]
              }
            }
          },
          required: ["titles"]
        }
      }
    });

    const text = response.text;
    if (!text) {
      throw new Error("No response from AI");
    }
    
    return JSON.parse(text) as GenerateResponse;

  } catch (error) {
    console.error("Error generating titles:", error);
    throw error;
  }
};
