



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

import { useState } from "react";

export default function Home() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hi there, how can I help?" },
  ]);
  const [isLoading, setIsLoading] = useState(false); // NEW: are we waiting on Groq?

  async function handleSend() {
    if (input.trim() === "" || isLoading) return; // ignore empty input or double-sends

    const userMessage = { role: "user", content: input };

    // Build the new conversation including the user's message
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput("");        // clear the box
    setIsLoading(true);  // enter "thinking" state

    try {
      // Send the whole conversation to our own API route
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: updatedMessages }),
      });

      const data = await res.json();

      if (!res.ok) {
        // Our route returned an error (bad key, Groq down, etc.)
        throw new Error(data.error || "Request failed");
      }

      // Add Groq's reply to the conversation
      const botMessage = { role: "assistant", content: data.reply };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      // Show a friendly error bubble instead of crashing
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "⚠️ Sorry, something went wrong. Please try again." },
      ]);
    } finally {
      setIsLoading(false); // leave "thinking" state no matter what
    }
  }

  return (
    <main className="flex flex-col h-screen max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-4">Groq Chatbot</h1>

      <div className="flex-1 overflow-y-auto space-y-3 mb-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`px-4 py-2 rounded-lg max-w-xs ${
                msg.role === "user"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-900"
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}

        {/* NEW: "thinking" indicator while waiting */}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-200 text-gray-500 px-4 py-2 rounded-lg italic">
              Thinking...
            </div>
          </div>
        )}
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Type a message..."
          disabled={isLoading}
          className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
        />
        <button
          onClick={handleSend}
          disabled={isLoading}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:bg-blue-300"
        >
          Send
        </button>
      </div>
    </main>
  );
}