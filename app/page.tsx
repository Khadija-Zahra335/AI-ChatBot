



// That's a component — a JavaScript function that returns UI. 
// That's the whole idea of React: your screen is built from functions that return markup.
// //  The Home function returns what shows on the homepage.
// The markup inside return() looks like HTML but it's JSX — HTML written inside JavaScript. Two things that trip up beginners:

// You write className instead of class (because class is a reserved word in JS)
// A component can only return one top-level element — so everything gets wrapped in a single parent <div>

// This is static UI , button doesn't do anything , Now we will add usestate concept .. 

// UseState: A React component is just a function that returns UI. But a function runs once and forgets everything.
//  So how does React "remember" what you typed, or the list of messages?
// UseState. It's React's memory. You hand React a piece of data to hold onto, and it gives you back two things:

// the current value
// a function to update it


"use client";

import { useState, useRef, useEffect } from "react";

export default function Home() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hi there, how can I help?" },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const bottomRef = useRef(null);



  async function handleSend() {
    if (input.trim() === "" || isLoading) return;

    const userMessage = { role: "user", content: input };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: updatedMessages }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Request failed");

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.reply },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "⚠️ Sorry, something went wrong. Please try again.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="flex justify-center min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-slate-100">
      <div className="flex flex-col w-full max-w-3xl h-screen px-4 sm:px-6">
        {/* Header */}
        <header className="py-5 border-b border-slate-700">
          <h1 className="text-2xl sm:text-5xl font-bold text-center">
            Groq Chatbot
          </h1>
          <p className="text-center text-base sm:text-xl text-slate-400 mt-1">
            Powered by Llama on Groq
          </p>
        </header>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto py-6 space-y-4">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${
                msg.role === "user" ? "justify-end" : "justify-start"
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
                Thinking…
              </div>
            </div>
          )}

          {/* Invisible anchor we scroll to */}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="flex gap-2 py-4 border-t border-slate-700">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Type a message…"
            disabled={isLoading}
            className="flex-1 bg-slate-800 border border-slate-600 rounded-xl px-4 py-3 text-sm sm:text-xl placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
          />
          <button
            onClick={handleSend}
            disabled={isLoading}
            className="bg-blue-600 text-white px-5 sm:px-6 py-3 rounded-xl font-medium hover:bg-blue-700 transition-colors disabled:bg-blue-800 disabled:opacity-50"
          >
            Send
          </button>
        </div>
      </div>
    </main>
  );
}
