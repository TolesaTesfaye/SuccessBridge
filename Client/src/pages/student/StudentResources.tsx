import React, { useState, useRef, useEffect } from "react";
import { MessageSquare, Send, X, RefreshCw } from "lucide-react";
import { DashboardLayout } from "@components/dashboards/DashboardLayout";
import { ResourceList } from "@components/resources/ResourceList";
import { ResourceFilter } from "@components/resources/ResourceFilter";
import { useResources } from "@hooks/useResources";
import { AIService, ChatMessage } from "@services/aiService";

export const StudentResources: React.FC = () => {
  const [filters, setFilters] = useState({});
  const { resources, loading, error } = useResources(filters);

  // Chat state
  const [showChat, setShowChat] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [chatLoading, setChatLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  // Handle chat send
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userMessage: ChatMessage = {
      role: "user",
      content: inputMessage,
    };

    setChatMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setChatLoading(true);

    try {
      const response = await AIService.generateChatResponse(
        [...chatMessages, userMessage],
        "gemini-2.5-flash",
      );
      const aiMessage: ChatMessage = {
        role: "assistant",
        content: response,
      };
      setChatMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Chat error:", error);
      const errorMessage: ChatMessage = {
        role: "assistant",
        content: "Sorry, I encountered an error. Please try again.",
      };
      setChatMessages((prev) => [...prev, errorMessage]);
    } finally {
      setChatLoading(false);
    }
  };

  return (
    <DashboardLayout
      title="Resources"
      subtitle="Browse and access learning materials"
    >
      <div className="space-y-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white m-0">
          Available Resources
        </h2>
        <ResourceFilter onFilter={setFilters} />
        {error && (
          <div className="p-4 text-sm text-red-600 bg-red-50 dark:bg-red-900/20 rounded-xl border border-red-200 dark:border-red-500/20">
            {error}
          </div>
        )}
        <ResourceList
          resources={resources}
          loading={loading}
          showActions={false}
        />
      </div>

      {/* Floating Chat Button - Mobile Only */}
      <button
        onClick={() => setShowChat(!showChat)}
        className="fixed bottom-4 right-4 md:hidden bg-indigo-600 hover:bg-indigo-700 text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-110 z-40"
        title="Chat with AI"
        aria-label="Open AI chat"
      >
        <MessageSquare className="w-6 h-6" />
      </button>

      {/* Floating Chat Panel */}
      {showChat && (
        <div className="fixed bottom-20 right-4 md:hidden w-[calc(100%-32px)] max-w-sm bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 z-50 flex flex-col h-[500px] overflow-hidden">
          {/* Header */}
          <div className="bg-indigo-600 text-white px-4 py-3 flex items-center justify-between rounded-t-2xl">
            <span className="font-semibold text-sm">AI Study Companion</span>
            <button
              onClick={() => setShowChat(false)}
              className="p-1 hover:bg-indigo-700 rounded-lg transition"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {chatMessages.length === 0 ? (
              <div className="text-center text-slate-500 text-sm py-8">
                <p>👋 Hi! Ask me anything about your studies.</p>
              </div>
            ) : (
              chatMessages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-xs px-3 py-2 rounded-lg text-sm ${
                      msg.role === "user"
                        ? "bg-indigo-600 text-white rounded-br-none"
                        : "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 rounded-bl-none"
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))
            )}
            {chatLoading && (
              <div className="flex justify-start">
                <div className="bg-slate-100 dark:bg-slate-800 px-3 py-2 rounded-lg text-sm text-slate-500 flex items-center gap-2">
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Thinking...
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form
            onSubmit={handleSendMessage}
            className="border-t border-slate-200 dark:border-slate-700 p-3 bg-slate-50 dark:bg-slate-800/50"
          >
            <div className="flex gap-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Ask anything..."
                className="flex-1 px-3 py-2 rounded-lg text-sm border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                disabled={chatLoading}
              />
              <button
                type="submit"
                disabled={chatLoading || !inputMessage.trim()}
                className="p-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition disabled:opacity-50 flex items-center justify-center"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>
      )}
    </DashboardLayout>
  );
};

export default StudentResources;
