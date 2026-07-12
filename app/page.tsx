
"use client";

import { useEffect, useRef, useState } from "react";


type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function Home() {
  const [input, setInput] = useState("");

  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "👋 Hi there! How can I help you today?",
    },
  ]);

  const [isLoading, setIsLoading] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const messagesRef = useRef<HTMLDivElement>(null);

  // Focus input on page load
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Auto-scroll to latest message
  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTo({
        top: messagesRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages, isLoading]);

  async function handleSend() {
    const trimmedInput = input.trim();

    if (!trimmedInput || isLoading) return;

    const userMessage: Message = {
      role: "user",
      content: trimmedInput,
    };

    const updatedMessages = [...messages, userMessage];

    setMessages(updatedMessages);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: updatedMessages,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Request failed");
      }

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: data.reply,
        },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "⚠️ I couldn't reach the AI service. Please try again in a moment.",
        },
      ]);
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  }

  return (
    <main className="h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-slate-100 flex justify-center overflow-hidden">
      <div className="flex flex-col h-full w-full max-w-3xl px-4 sm:px-6">
                {/* Header */}
        <header className="py-5 border-b border-slate-700">
          <h1 className="text-center text-2xl sm:text-3xl font-bold tracking-tight">
            🤖 AI Chatbot
          </h1>

          <p className="mt-1 text-center text-sm sm:text-base text-slate-400">
            Powered by Llama on Groq
          </p>
        </header>

        {/* Messages */}
        <div
          ref={messagesRef}
          className="flex-1 overflow-y-auto py-6 space-y-5"
        >
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${
                msg.role === "user"
                  ? "justify-end"
                  : "justify-start"
              }`}
            >
              <div
                className={`max-w-[85%] sm:max-w-[75%] rounded-2xl px-4 py-3 shadow-md whitespace-pre-wrap leading-relaxed text-sm sm:text-base ${
                  msg.role === "user"
                    ? "bg-blue-600 text-white rounded-br-sm"
                    : "bg-slate-700 text-slate-100 rounded-bl-sm"
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-slate-700 rounded-2xl rounded-bl-sm px-4 py-3">
                <div className="flex items-center gap-1">
                  <span
                    className="h-2 w-2 rounded-full bg-slate-300 animate-bounce"
                  />
                  <span
                    className="h-2 w-2 rounded-full bg-slate-300 animate-bounce [animation-delay:150ms]"
                  />
                  <span
                    className="h-2 w-2 rounded-full bg-slate-300 animate-bounce [animation-delay:300ms]"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
                {/* Input */}
        <div className="flex items-center gap-3 py-4 border-t border-slate-700">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder="Type your message..."
            disabled={isLoading}
            className="flex-1 rounded-xl border border-slate-600 bg-slate-800 px-4 py-3 text-sm sm:text-base text-white placeholder-slate-500 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
          />

          <button
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className="rounded-xl bg-blue-600 px-6 py-3 font-medium text-white transition-all duration-200 hover:bg-blue-700 active:scale-95 disabled:cursor-not-allowed disabled:bg-slate-700 disabled:text-slate-400"
          >
            {isLoading ? "Sending..." : "Send"}
          </button>
        </div>
                {/* Footer */}
        <footer className="border-t border-slate-700 py-4 text-center text-xs sm:text-sm text-slate-400">
          <p>
            Built with ❤️ by{" "}
            <a
              href="https://khadijazahra-portfolio.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-slate-200 hover:text-blue-400 transition-colors"
            >
              Khadija Zahra
            </a>
          </p>

          <div className="mt-2 flex justify-center gap-6">
            <a
              href="https://github.com/Khadija-Zahra335"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400 transition-colors"
            >
              GitHub
            </a>

            <a
              href="https://www.linkedin.com/in/khadija-zahra-06a37a270/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400 transition-colors"
            >
              LinkedIn
            </a>

            <a
              href="mailto:your@email.com"
              className="hover:text-blue-400 transition-colors"
            >
              Email
            </a>
          </div>

          <p className="mt-3 text-[11px] text-slate-500">
            Built with Next.js • React • Tailwind CSS • Groq API
          </p>
        </footer>
      </div>
    </main>
  );
}