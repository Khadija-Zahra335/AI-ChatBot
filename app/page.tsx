








"use client";

import { useState, useRef, useEffect } from "react";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function Home() {
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hi there, how can I help?",
    },
  ]);

  const [isLoading, setIsLoading] = useState(false);

  const messagesContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll whenever a new message is added
  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTo({
        top: messagesContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages, isLoading]);

  async function handleSend() {
    if (input.trim() === "" || isLoading) return;

    const trimmedInput = input.trim();

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
            "⚠️ Sorry, something went wrong. Please try again.",
        },
      ]);
    } finally {
      inputRef.current?.focus();
      setIsLoading(false);
    }
  }

  return (
    <main className="flex justify-center h-screen overflow-hidden bg-gradient-to-b from-slate-900 to-slate-800 text-slate-100">
      <div className="flex flex-col w-full max-w-3xl h-full px-4 sm:px-6">
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
          ref={messagesContainerRef}
          className="flex-1 overflow-y-auto py-6 space-y-4"
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
                className={`px-4 py-3 rounded-2xl max-w-[85%] sm:max-w-[75%] text-base sm:text-xl leading-relaxed whitespace-pre-wrap ${
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
              <div className="bg-slate-700 text-slate-400 px-4 py-3 rounded-2xl rounded-bl-sm italic">
                Thinking...
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="flex gap-2 py-3 border-t border-slate-700">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) =>
              e.key === "Enter" && handleSend()
            }
            placeholder="Type a message..."
            disabled={isLoading}
            className="flex-1 bg-slate-800 border border-slate-600 rounded-xl px-4 py-3 text-sm sm:text-xl placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
          />

          <button
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className="bg-blue-600 text-white px-5 sm:px-6 py-3 rounded-xl font-medium transition-colors hover:bg-blue-700 disabled:bg-slate-700 disabled:text-slate-400 disabled:cursor-not-allowed"
         >
            Send
          </button>
        </div>

        {/* Footer */}
        <footer className="py-3 border-t border-slate-700 text-center text-xs sm:text-sm text-slate-400">
          <p>
            Built by{" "}
            <span className="text-slate-200 font-medium">
              <a
                href="https://khadijazahra-portfolio.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-400 transition-colors"
              >
                Khadija Zahra
              </a>
            </span>
          </p>

          <div className="flex justify-center gap-4 mt-1">
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
        </footer>
      </div>
    </main>
  );
}
