import React from 'react';
import { GeneratedTitle } from '../types';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { InfoIcon, SparklesIcon, ChevronRightIcon } from './Icons';

interface AnalysisPanelProps {
  data: GeneratedTitle | null;
}

const AnalysisPanel: React.FC<AnalysisPanelProps> = ({ data }) => {
  if (!data) {
    return (
      <div className="h-full bg-white border-l border-gray-200 p-8 flex flex-col items-center justify-center text-center">
        <div className="w-32 h-32 bg-gray-50 rounded-full flex items-center justify-center mb-6">
           <SparklesIcon className="w-12 h-12 text-gray-300" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">标题分析面板</h3>
        <p className="text-gray-500 max-w-xs">
          选择左侧的一个标题，查看详细的 AI 维度分析、关键词提取及优化建议。
        </p>
      </div>
    );
  }

  const chartData = [
    { subject: '吸引力', A: data.dimensions.attraction, fullMark: 10 },
    { subject: '差异化', A: data.dimensions.differentiation, fullMark: 10 },
    { subject: '时效性', A: data.dimensions.timeliness, fullMark: 10 },
    { subject: '共鸣度', A: data.dimensions.resonance, fullMark: 10 },
    { subject: '话题度', A: data.dimensions.topicHeat, fullMark: 10 },
    { subject: '搜索', A: data.dimensions.searchFriendliness, fullMark: 10 },
    { subject: 'SEO', A: data.dimensions.seoOptimization, fullMark: 10 },
  ];

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case '高': return 'text-red-600 bg-red-100';
      case '中': return 'text-orange-600 bg-orange-100';
      default: return 'text-green-600 bg-green-100';
    }
  };

  return (
    <div className="h-full bg-white border-l border-gray-200 flex flex-col overflow-y-auto">
      <div className="p-6 border-b border-gray-100">
         <h2 className="text-lg font-bold text-gray-900 mb-1">深度分析</h2>
         <p className="text-xs text-gray-400">ID: {data.id}</p>
      </div>

      <div className="p-6 space-y-8">
        {/* Style & Core */}
        <div className="grid grid-cols-2 gap-4">
           <div className="bg-gray-50 p-4 rounded-xl">
              <span className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">风格</span>
              <span className="text-gray-900 font-bold">{data.style}</span>
           </div>
           <div className="bg-gray-50 p-4 rounded-xl">
              <span className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">违规风险</span>
              <span className={`inline-block px-2 py-0.5 rounded text-sm font-bold mt-0.5 ${getRiskColor(data.violationRisk)}`}>
                {data.violationRisk}
              </span>
           </div>
        </div>

        {/* Radar Chart */}
        <div>
           <div className="flex items-center justify-between mb-4">
             <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                <span className="w-1 h-4 bg-[#FF2442] rounded-full"></span>
                七维评分图谱
             </h3>
             <span className="text-xs font-bold text-[#FF2442] bg-red-50 px-2 py-1 rounded-full">
               综合: {data.totalScore}
             </span>
           </div>
           <div className="h-64 w-full -ml-4">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="70%" data={chartData}>
                  <PolarGrid gridType="polygon" stroke="#E5E7EB" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: '#6B7280', fontSize: 11 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 10]} tick={false} axisLine={false} />
                  <Radar
                    name="Score"
                    dataKey="A"
                    stroke="#FF2442"
                    strokeWidth={2}
                    fill="#FF2442"
                    fillOpacity={0.2}
                  />
                </RadarChart>
              </ResponsiveContainer>
           </div>
        </div>

        {/* Keywords */}
        <div>
            <h3 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
               <span className="w-1 h-4 bg-[#FF2442] rounded-full"></span>
               核心元素
            </h3>
            <div className="flex flex-wrap gap-2">
               {data.keywords.map((kw, i) => (
                  <span key={i} className="px-3 py-1 bg-red-50 text-[#FF2442] text-sm rounded-full font-medium">
                     #{kw}
                  </span>
               ))}
            </div>
        </div>

        {/* Suggestion */}
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
           <div className="flex items-start gap-3">
              <InfoIcon className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
              <div>
                 <h4 className="text-sm font-bold text-blue-900 mb-1">优化建议</h4>
                 <p className="text-sm text-blue-700 leading-relaxed">
                    {data.suggestion}
                 </p>
              </div>
           </div>
        </div>
        
        {/* Fake Follow-up Input */}
        <div className="pt-4 border-t border-gray-100">
             <div className="relative">
                <input 
                   type="text" 
                   placeholder="Ask follow-up..." 
                   className="w-full pl-4 pr-10 py-3 bg-gray-50 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-1 focus:ring-gray-300 transition-shadow"
                />
                <button className="absolute right-2 top-1.5 p-1.5 bg-gray-200 text-gray-500 rounded-full hover:bg-[#FF2442] hover:text-white transition-colors">
                   <ChevronRightIcon className="w-4 h-4" />
                </button>
             </div>
        </div>

      </div>
    </div>
  );
};

export default AnalysisPanel;
