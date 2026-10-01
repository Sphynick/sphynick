import React, { useState, useRef, useEffect } from 'react';
import { getGeminiResponse } from '../services/gemini';
import { PixelCat } from './pixel-sprite';

type Msg = { role: 'user' | 'ai'; text: string };

const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([
    { role: 'ai', text: "meow. I'm Nick's assistant. Ask about his skills, projects, or how to hire him." },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    const text = input;
    setInput('');
    setMessages((p) => [...p, { role: 'user', text }]);
    setIsLoading(true);
    const reply = await getGeminiResponse(text);
    setMessages((p) => [...p, { role: 'ai', text: reply }]);
    setIsLoading(false);
  };

  return (
    <div className="fixed bottom-5 right-5 z-[60]">
      {isOpen ? (
        <div className="w-[calc(100vw-2.5rem)] sm:w-96 h-[480px] flex flex-col px-box bg-panel">
          <div className="flex items-center justify-between px-4 py-3 border-b-2 border-line">
            <div className="flex items-center gap-3">
              <PixelCat size={2} />
              <span className="font-pixel text-[10px]">ASSISTANT</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="font-pixel text-[10px] text-mute hover:text-amber" aria-label="Close chat">
              [X]
            </button>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[85%] px-3 py-2 text-xs leading-relaxed ${
                    m.role === 'user' ? 'bg-amber text-ink' : 'bg-ink text-paper border-2 border-line'
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
            {isLoading && <div className="font-retro text-xl text-amber">typing<span className="blink">_</span></div>}
          </div>

          <div className="p-3 border-t-2 border-line flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="> ask me anything"
              className="flex-1 bg-ink border-2 border-line px-3 py-2 text-xs text-paper placeholder-mute focus:outline-none focus:border-amber"
            />
            <button onClick={handleSend} disabled={isLoading} className="font-pixel text-[10px] px-3 bg-amber text-ink disabled:opacity-50">
              GO
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="px-box bg-panel p-3 px-hover flex items-center gap-3"
          aria-label="Open chat assistant"
        >
          <PixelCat size={3} className="bob" />
          <span className="hidden sm:inline font-pixel text-[9px] text-amber">CHAT</span>
        </button>
      )}
    </div>
  );
};

export default ChatWidget;
