import React from 'react';
import { GeneratedTitle } from '../types';
import { ChevronRightIcon, CopyIcon } from './Icons';

interface ResultListProps {
  titles: GeneratedTitle[];
  selectedId: string | null;
  onSelect: (title: GeneratedTitle) => void;
  isLoading: boolean;
}

const ResultList: React.FC<ResultListProps> = ({ titles, selectedId, onSelect, isLoading }) => {
  const handleCopy = (e: React.MouseEvent, text: string) => {
    e.stopPropagation();
    navigator.clipboard.writeText(text);
    // Could add toast here
  };

  if (isLoading && titles.length === 0) {
    return (
      <div className="h-full bg-[#F7F8FA] p-6 overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
           <h2 className="text-lg font-bold text-gray-900">生成结果</h2>
        </div>
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="mb-4 p-4 bg-white rounded-xl shadow-sm animate-pulse border border-transparent">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-3"></div>
            <div className="h-3 bg-gray-100 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    );
  }

  if (titles.length === 0) {
     return (
        <div className="h-full bg-[#F7F8FA] flex flex-col items-center justify-center text-gray-400 p-6">
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-4 text-2xl">
                📝
            </div>
            <p className="text-sm">在左侧输入内容开始生成</p>
        </div>
     )
  }

  return (
    <div className="h-full bg-[#F7F8FA] p-6 overflow-y-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold text-gray-900">生成结果 ({titles.length})</h2>
      </div>

      <div className="space-y-4">
        {titles.map((item) => (
          <div
            key={item.id}
            onClick={() => onSelect(item)}
            className={`
              group relative p-5 rounded-xl cursor-pointer transition-all duration-200 border
              ${selectedId === item.id 
                ? 'bg-white border-[#FF2442] shadow-md ring-1 ring-[#FF2442] ring-opacity-10' 
                : 'bg-white border-transparent hover:border-red-200 hover:shadow-sm'}
            `}
          >
            <div className="flex items-start gap-3">
               <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-red-50 rounded-full text-lg">
                  {item.emoji}
               </div>
               <div className="flex-1">
                   <h3 className={`text-base font-medium leading-relaxed mb-2 ${selectedId === item.id ? 'text-gray-900' : 'text-gray-800'}`}>
                      {item.title}
                   </h3>
                   <div className="flex flex-wrap gap-2">
                       <span className="px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-500">
                         {item.style}
                       </span>
                       <span className={`px-2 py-0.5 rounded text-xs font-bold ${item.totalScore >= 90 ? 'bg-orange-100 text-orange-600' : 'bg-green-100 text-green-600'}`}>
                         {item.totalScore}分
                       </span>
                   </div>
               </div>
               
               <div className="flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button 
                    onClick={(e) => handleCopy(e, item.title)}
                    className="p-1.5 rounded-full hover:bg-gray-100 text-gray-400 hover:text-[#FF2442]"
                    title="复制标题"
                  >
                     <CopyIcon className="w-4 h-4" />
                  </button>
                  <div className={`p-1.5 rounded-full ${selectedId === item.id ? 'text-[#FF2442]' : 'text-gray-300'}`}>
                     <ChevronRightIcon className="w-4 h-4" />
                  </div>
               </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResultList;
