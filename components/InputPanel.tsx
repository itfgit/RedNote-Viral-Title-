import React from 'react';
import { SparklesIcon } from './Icons';

interface InputPanelProps {
  input: string;
  setInput: (value: string) => void;
  onGenerate: () => void;
  isLoading: boolean;
}

const InputPanel: React.FC<InputPanelProps> = ({ input, setInput, onGenerate, isLoading }) => {
  return (
    <div className="flex flex-col h-full bg-white p-6 border-r border-gray-200">
      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-900 mb-2">
          文章主题 / 内容
        </label>
        <p className="text-xs text-gray-500 mb-4">
          输入你想写的话题、关键词或大致内容，AI 将为你生成爆款标题。
        </p>
        <textarea
          className="w-full h-[calc(100vh-280px)] min-h-[300px] p-4 text-gray-700 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#FF2442] focus:border-transparent outline-none resize-none transition-all placeholder-gray-400 text-base leading-relaxed"
          placeholder="例如：
- 沉浸式护肤流程
- 2024年最值得去的5个小众海岛
- 职场新人如何通过试用期
..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </div>

      <div className="mt-auto sticky bottom-0 bg-white pt-4">
        <button
          onClick={onGenerate}
          disabled={isLoading || !input.trim()}
          className={`
            w-full flex items-center justify-center gap-2 py-4 rounded-full text-white font-bold text-lg shadow-lg transition-all transform
            ${isLoading || !input.trim() 
              ? 'bg-red-300 cursor-not-allowed' 
              : 'bg-[#FF2442] hover:bg-[#FF0022] hover:shadow-xl hover:-translate-y-0.5 active:scale-95'}
          `}
        >
          {isLoading ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>生成中...</span>
            </>
          ) : (
            <>
              <SparklesIcon className="w-5 h-5" />
              <span>生成标题</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default InputPanel;
