import React, { useState } from 'react';
import { ArrowLeftIcon } from './components/Icons';
import InputPanel from './components/InputPanel';
import ResultList from './components/ResultList';
import AnalysisPanel from './components/AnalysisPanel';
import { GeneratedTitle, ChatMessage } from './types';
import { generateViralTitles, refineTitle } from './services/geminiService';

const App: React.FC = () => {
  const [input, setInput] = useState('');
  const [titles, setTitles] = useState<GeneratedTitle[]>([]);
  const [selectedTitleId, setSelectedTitleId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Chat history state: map title ID to list of messages
  const [chatHistories, setChatHistories] = useState<Record<string, ChatMessage[]>>({});
  const [isChatLoading, setIsChatLoading] = useState(false);

  const handleGenerate = async () => {
    if (!input.trim()) return;
    
    setIsLoading(true);
    setError(null);
    setTitles([]); 
    setSelectedTitleId(null);
    setChatHistories({}); // Clear old chats on new generation

    try {
      const response = await generateViralTitles(input);
      setTitles(response.titles);
      if (response.titles.length > 0) {
        setSelectedTitleId(response.titles[0].id);
      }
    } catch (err) {
      setError("生成失败，请检查网络或重试。");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendFollowUp = async (query: string) => {
    if (!selectedTitleId) return;
    const currentTitle = titles.find(t => t.id === selectedTitleId);
    if (!currentTitle) return;

    // 1. Add user message
    const newMessage: ChatMessage = { role: 'user', content: query };
    const currentHistory = chatHistories[selectedTitleId] || [];
    
    setChatHistories(prev => ({
      ...prev,
      [selectedTitleId]: [...currentHistory, newMessage]
    }));

    setIsChatLoading(true);

    try {
      // 2. Call API
      const responseText = await refineTitle(currentTitle, query, currentHistory);

      // 3. Add AI response
      const aiMessage: ChatMessage = { role: 'ai', content: responseText };
      setChatHistories(prev => ({
        ...prev,
        [selectedTitleId]: [...prev[selectedTitleId], aiMessage]
      }));
    } catch (err) {
      console.error(err);
      // Optional: Add error message to chat
    } finally {
      setIsChatLoading(false);
    }
  };

  const selectedTitle = titles.find(t => t.id === selectedTitleId) || null;
  const currentChatHistory = selectedTitleId ? (chatHistories[selectedTitleId] || []) : [];

  return (
    <div className="h-screen w-full flex flex-col bg-[#F7F8FA] overflow-hidden">
      {/* Header */}
      <header className="h-16 bg-white border-b border-gray-200 flex items-center px-6 flex-shrink-0 z-10 shadow-sm">
        <button className="mr-4 p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-600">
          <ArrowLeftIcon className="w-5 h-5" />
        </button>
        <h1 className="text-xl font-bold text-gray-900 tracking-tight">
          小红书爆款标题
        </h1>
      </header>

      {/* Main Content - 3 Columns */}
      <main className="flex-1 flex overflow-hidden">
        {/* Left: Input */}
        <section className="w-[30%] min-w-[320px] max-w-[400px] h-full flex-shrink-0 z-0">
          <InputPanel 
            input={input} 
            setInput={setInput} 
            onGenerate={handleGenerate}
            isLoading={isLoading}
          />
        </section>

        {/* Middle: Results */}
        <section className="flex-1 h-full min-w-[320px]">
          {error ? (
             <div className="h-full flex flex-col items-center justify-center text-red-500">
               <p>{error}</p>
               <button onClick={handleGenerate} className="mt-4 text-sm underline">重试</button>
             </div>
          ) : (
            <ResultList 
              titles={titles} 
              selectedId={selectedTitleId} 
              onSelect={(t) => setSelectedTitleId(t.id)} 
              isLoading={isLoading}
            />
          )}
        </section>

        {/* Right: Analysis */}
        <section className="w-[35%] min-w-[360px] max-w-[480px] h-full flex-shrink-0 shadow-[-5px_0_15px_-5px_rgba(0,0,0,0.05)] z-10 bg-white">
          <AnalysisPanel 
            data={selectedTitle} 
            chatHistory={currentChatHistory}
            onSendFollowUp={handleSendFollowUp}
            isChatLoading={isChatLoading}
          />
        </section>
      </main>

      {/* Mobile Notice (Hidden on Desktop) */}
      <div className="lg:hidden fixed inset-0 bg-white z-50 flex items-center justify-center p-8 text-center">
        <div>
           <h2 className="text-xl font-bold mb-2">请使用桌面端访问</h2>
           <p className="text-gray-500">为了最佳的创作体验，本工具仅支持宽度大于 1024px 的设备。</p>
        </div>
      </div>
    </div>
  );
};

export default App;
