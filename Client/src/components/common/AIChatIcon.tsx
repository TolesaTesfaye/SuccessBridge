import React, { useState, useRef, useEffect } from 'react';
import { Bot, X, Send, User, Loader2 } from 'lucide-react';
import api from '@services/api';

type Message = { role: "user" | "model"; content: string };

export const AIChatIcon: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "model", content: "Hello! 👋 I'm your AI learning assistant. I can help you understand concepts, answer questions about your courses, or guide you through the learning center." }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen, isLoading]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    
    const updatedMessages: Message[] = [...messages, { role: "user", content: userMessage }];
    setMessages(updatedMessages);
    setIsLoading(true);

    try {
      const response = await api.post('/ai/chat', { messages: updatedMessages });
      if (response.data.success) {
        setMessages(prev => [...prev, { role: "model", content: response.data.data }]);
      } else {
        setMessages(prev => [...prev, { role: "model", content: "Sorry, I encountered an error. Please try again." }]);
      }
    } catch (error: any) {
      console.error("AI Chat Error:", error);
      const errorMsg = error.response?.data?.error || "Sorry, I am unable to connect right now.";
      setMessages(prev => [...prev, { role: "model", content: errorMsg }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  // Helper to format basic markdown-like text (bold) and newlines
  const formatText = (text: string) => {
    return text.split('\n').map((line, i) => {
      // Basic bold formatting for **text**
      const parts = line.split(/(\*\*.*?\*\*)/g);
      return (
        <span key={i}>
          {parts.map((part, j) => {
            if (part.startsWith('**') && part.endsWith('**')) {
              return <strong key={j}>{part.slice(2, -2)}</strong>;
            }
            return part;
          })}
          {i !== text.split('\n').length - 1 && <br />}
        </span>
      );
    });
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 p-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-full shadow-xl shadow-blue-500/30 transition-all transform hover:scale-110 z-50 flex items-center justify-center group"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Bot className="w-6 h-6" />}
        <span className="absolute right-full mr-4 bg-gray-900 text-white text-sm px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          {isOpen ? 'Close Chat' : 'AI Assistant'}
        </span>
      </button>

      {isOpen && (
        <div className="fixed bottom-24 right-6 w-[340px] md:w-96 h-[500px] bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 z-50 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-8 duration-300">
          <div className="p-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-white/20 rounded-lg">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold text-sm">AI Learning Assistant</h3>
                <p className="text-xs text-blue-100">Online & ready to help</p>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)} 
              className="hover:bg-white/20 p-1.5 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-4 bg-slate-50 dark:bg-slate-900/50">
            {messages.map((msg, index) => (
              <div 
                key={index} 
                className={`flex gap-2 max-w-[85%] ${msg.role === 'user' ? 'self-end flex-row-reverse' : 'self-start'}`}
              >
                <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-1 ${msg.role === 'user' ? 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900/50 dark:text-indigo-300' : 'bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-300'}`}>
                  {msg.role === 'user' ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
                </div>
                <div 
                  className={`p-3 rounded-2xl text-sm shadow-sm border ${
                    msg.role === 'user' 
                      ? 'bg-indigo-600 text-white rounded-tr-sm border-indigo-700' 
                      : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-tl-sm border-slate-100 dark:border-slate-700/50'
                  }`}
                >
                  {formatText(msg.content)}
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex gap-2 max-w-[85%] self-start">
                <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-300 flex items-center justify-center flex-shrink-0 mt-1">
                  <Bot className="w-3.5 h-3.5" />
                </div>
                <div className="p-3 rounded-2xl rounded-tl-sm bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-sm shadow-sm border border-slate-100 dark:border-slate-700/50 flex items-center gap-1.5">
                  <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
                  <span className="text-slate-500 animate-pulse">Thinking...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          
          <div className="p-4 border-t border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900">
            <div className="relative flex items-center">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Message AI Assistant..."
                disabled={isLoading}
                className="w-full bg-slate-100 dark:bg-slate-800 border-none rounded-full pl-4 pr-12 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 dark:text-white placeholder:text-slate-500 disabled:opacity-50"
              />
              <button 
                onClick={sendMessage}
                disabled={!input.trim() || isLoading}
                className="absolute right-1.5 p-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed text-white rounded-full transition-colors"
              >
                <Send className="w-4 h-4 ml-0.5" />
              </button>
            </div>
            <p className="text-center text-[10px] text-slate-400 mt-2">
              AI can make mistakes. Consider verifying important information.
            </p>
          </div>
        </div>
      )}
    </>
  );
};
