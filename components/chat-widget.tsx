import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, X } from 'lucide-react';

type Msg = { role: 'user' | 'ai'; text: string };

const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: 'ai',
      text: "Hi, I'm Nick's assistant. Ask about his services, case studies, or how to book a discovery call.",
    },
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
    // Lazy-load the Gemini SDK so it doesn't slow down first paint.
    const { getGeminiResponse } = await import('../services/gemini');
    const reply = await getGeminiResponse(text);
    setMessages((p) => [...p, { role: 'ai', text: reply }]);
    setIsLoading(false);
  };

  return (
    <div className="fixed bottom-5 right-5 z-[60]">
      {isOpen ? (
        <div
          role="dialog"
          aria-label="Chat assistant"
          className="w-[calc(100vw-2.5rem)] sm:w-96 h-[480px] flex flex-col bg-panel border border-line rounded-2xl shadow-2xl overflow-hidden"
        >
          <div className="flex items-center justify-between px-4 py-3 border-b border-line">
            <div className="flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-mint" />
              <span className="font-semibold text-sm">Ask Nick&apos;s assistant</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 text-mute hover:text-amber"
              aria-label="Close chat"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[85%] px-3.5 py-2.5 text-sm leading-relaxed rounded-2xl ${
                    m.role === 'user'
                      ? 'bg-amber text-ink rounded-br-sm'
                      : 'bg-ink text-paper border border-line rounded-bl-sm'
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
            {isLoading && <div className="text-sm text-mute">Typing…</div>}
          </div>

          <div className="p-3 border-t border-line flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask a question…"
              aria-label="Your message"
              className="field !py-2.5"
            />
            <button
              onClick={handleSend}
              disabled={isLoading}
              aria-label="Send message"
              className="btn btn-primary !px-3.5 disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          aria-label="Open chat assistant"
          className="btn btn-ghost bg-panel shadow-xl !px-4"
        >
          <MessageSquare className="w-4 h-4" />
          <span className="hidden sm:inline">Ask a question</span>
        </button>
      )}
    </div>
  );
};

export default ChatWidget;
