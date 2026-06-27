"use client";

import { useState, useRef, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { IconSend, IconScale, IconTrash, IconUser } from "@tabler/icons-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function ChatPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/login?callbackUrl=/chat");
    }
  }, [status, router]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || loading) return;

    const userMessage: Message = { role: "user", content: text };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });

      const data = await res.json();
      setMessages([...newMessages, { role: "assistant", content: data.text }]);
    } catch {
      setMessages([...newMessages, { role: "assistant", content: "Произошла ошибка. Попробуйте ещё раз." }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  if (status === "loading" || status === "unauthenticated") {
    return (
      <div className="min-h-screen bg-dark flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] bg-dark">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-700">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-bordeaux flex items-center justify-center">
            <IconScale size={20} className="text-gold" />
          </div>
          <div>
            <h1 className="text-white font-semibold font-playfair">AI-Юрист LexAI</h1>
            <p className="text-gray-400 text-xs">Консультация по праву РФ</p>
          </div>
        </div>
        <button
          onClick={() => { setMessages([]); setInput(""); }}
          className="flex items-center gap-2 text-gray-400 hover:text-gold transition-colors text-sm px-3 py-2 rounded-lg hover:bg-gray-800"
        >
          <IconTrash size={16} />
          <span className="hidden sm:inline">Новый чат</span>
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center px-4">
            <div className="w-16 h-16 rounded-full bg-bordeaux/20 border border-bordeaux/40 flex items-center justify-center mb-4">
              <IconScale size={32} className="text-gold" />
            </div>
            <h2 className="text-white text-xl font-playfair font-semibold mb-2">
              Задайте вопрос юристу
            </h2>
            <p className="text-gray-400 text-sm max-w-md mb-8">
              Получите консультацию по гражданскому, трудовому, семейному или уголовному праву РФ
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-lg">
              {[
                "Как уволиться без отработки?",
                "Права при задержке зарплаты",
                "Раздел имущества при разводе",
                "Как подать на алименты?",
              ].map((hint) => (
                <button
                  key={hint}
                  onClick={() => setInput(hint)}
                  className="text-left text-sm text-gray-300 bg-gray-800 hover:bg-gray-700 border border-gray-700 hover:border-bordeaux/50 rounded-xl px-4 py-3 transition-all"
                >
                  {hint}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex gap-3 max-w-4xl mx-auto w-full ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
          >
            <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
              msg.role === "user" ? "bg-bordeaux" : "bg-gray-700 border border-gray-600"
            }`}>
              {msg.role === "user"
                ? <IconUser size={16} className="text-white" />
                : <IconScale size={16} className="text-gold" />}
            </div>
            <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap ${
              msg.role === "user"
                ? "bg-bordeaux text-white rounded-tr-sm"
                : "bg-gray-800 text-gray-100 rounded-tl-sm"
            }`}>
              {msg.content}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex gap-3 max-w-4xl mx-auto w-full">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-700 border border-gray-600 flex items-center justify-center">
              <IconScale size={16} className="text-gold" />
            </div>
            <div className="bg-gray-800 rounded-2xl rounded-tl-sm px-4 py-3">
              <span className="flex gap-1 items-center">
                <span className="w-2 h-2 bg-gold rounded-full animate-bounce [animation-delay:0ms]" />
                <span className="w-2 h-2 bg-gold rounded-full animate-bounce [animation-delay:150ms]" />
                <span className="w-2 h-2 bg-gold rounded-full animate-bounce [animation-delay:300ms]" />
              </span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="px-4 py-4 border-t border-gray-700">
        <div className="max-w-4xl mx-auto flex gap-3 items-end">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Напишите вопрос... (Enter — отправить, Shift+Enter — новая строка)"
            rows={1}
            disabled={loading}
            className="flex-1 bg-gray-800 text-white placeholder-gray-500 rounded-xl px-4 py-3 resize-none focus:outline-none focus:ring-2 focus:ring-bordeaux border border-gray-700 focus:border-transparent text-sm"
            onInput={(e) => {
              const el = e.currentTarget;
              el.style.height = "auto";
              el.style.height = Math.min(el.scrollHeight, 160) + "px";
            }}
          />
          <button
            onClick={sendMessage}
            disabled={!input.trim() || loading}
            className="flex-shrink-0 w-12 h-12 rounded-xl bg-bordeaux hover:bg-bordeaux-dark disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
          >
            {loading
              ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              : <IconSend size={18} className="text-white" />}
          </button>
        </div>
        <p className="text-center text-gray-600 text-xs mt-2">
          Это общая юридическая консультация. Для вашего дела обратитесь к адвокату.
        </p>
      </div>
    </div>
  );
}
