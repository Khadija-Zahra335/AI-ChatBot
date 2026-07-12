



// // // That's a component — a JavaScript function that returns UI. 
// // // That's the whole idea of React: your screen is built from functions that return markup.
// // // //  The Home function returns what shows on the homepage.
// // // The markup inside return() looks like HTML but it's JSX — HTML written inside JavaScript. Two things that trip up beginners:

// // // You write className instead of class (because class is a reserved word in JS)
// // // A component can only return one top-level element — so everything gets wrapped in a single parent <div>

// // // This is static UI , button doesn't do anything , Now we will add usestate concept .. 

// // // UseState: A React component is just a function that returns UI. But a function runs once and forgets everything.
// // //  So how does React "remember" what you typed, or the list of messages?
// // // UseState. It's React's memory. You hand React a piece of data to hold onto, and it gives you back two things:

// // // the current value
// // // a function to update it


// // "use client";

  
// // import { useState, useRef, useEffect } from "react";

// // export default function Home() {
// //   const [input, setInput] = useState("");
// //   const [messages, setMessages] = useState([
// //     { role: "assistant", content: "Hi there, how can I help?" },
// //   ]);
// //   const [isLoading, setIsLoading] = useState(false);

// //   const bottomRef = useRef(null);

 

// //   async function handleSend() {
// //     if (input.trim() === "" || isLoading) return;

// //     const userMessage = { role: "user", content: input };
// //     const updatedMessages = [...messages, userMessage];
// //     setMessages(updatedMessages);
// //     setInput("");
// //     setIsLoading(true);

// //     try {
// //       const res = await fetch("/api/chat", {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify({ messages: updatedMessages }),
// //       });

// //       const data = await res.json();
// //       if (!res.ok) throw new Error(data.error || "Request failed");

// //       setMessages((prev) => [
// //         ...prev,
// //         { role: "assistant", content: data.reply },
// //       ]);
// //     } catch (error) {
// //       setMessages((prev) => [
// //         ...prev,
// //         {
// //           role: "assistant",
// //           content: "⚠️ Sorry, something went wrong. Please try again.",
// //         },
// //       ]);
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   }

// //   return (
// //     <main className="flex justify-center min-h-[100dvh] bg-gradient-to-b from-slate-900 to-slate-800 text-slate-100">
// //       <div className="flex flex-col w-full max-w-3xl h-[100dvh] px-4 sm:px-6">
// //         {/* Header */}
// //         <header className="py-5 border-b border-slate-700">
// //           <h1 className="text-2xl sm:text-3xl font-bold text-center">
// //             Groq Chatbot
// //           </h1>
// //           <p className="text-center text-base sm:text-xl text-slate-400 mt-1">
// //             Powered by Llama on Groq
// //           </p>
// //         </header>

// //         {/* Messages */}
// //         <div className="flex-1 overflow-y-auto py-6 space-y-4">
// //           {messages.map((msg, index) => (
// //             <div
// //               key={index}
// //               className={`flex ${
// //                 msg.role === "user" ? "justify-end" : "justify-start"
// //               }`}
// //             >
// //               <div
// //                 className={`px-4 py-3 rounded-2xl max-w-[85%] sm:max-w-[75%] text-base sm:text-xl leading-relaxed whitespace-pre-wrap ${
// //                   msg.role === "user"
// //                     ? "bg-blue-600 text-white rounded-br-sm"
// //                     : "bg-slate-700 text-slate-100 rounded-bl-sm"
// //                 }`}
// //               >
// //                 {msg.content}
// //               </div>
// //             </div>
// //           ))}

// //           {isLoading && (
// //             <div className="flex justify-start">
// //               <div className="bg-slate-700 text-slate-400 px-4 py-3 rounded-2xl rounded-bl-sm italic">
// //                 Thinking…
// //               </div>
// //             </div>
// //           )}

// //           {/* Invisible anchor we scroll to */}
// //           <div ref={bottomRef} />
// //         </div>

// //         {/* Input */}
// //         <div className="flex gap-2 py-3 border-t border-slate-700">
// //           <input
// //             type="text"
// //             value={input}
// //             onChange={(e) => setInput(e.target.value)}
// //             onKeyDown={(e) => e.key === "Enter" && handleSend()}
// //             placeholder="Type a message…"
// //             disabled={isLoading}
// //             className="flex-1 bg-slate-800 border border-slate-600 rounded-xl px-4 py-3 text-sm sm:text-xl placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
// //           />
// //           <button
// //             onClick={handleSend}
// //             disabled={isLoading}
// //             className="bg-blue-600 text-white px-5 sm:px-6 py-3 rounded-xl font-medium hover:bg-blue-700 transition-colors disabled:bg-blue-800 disabled:opacity-50"
// //           >
// //             Send
// //           </button>
// //         </div>

// //         {/* Footer */}
// //         <footer className="py-3 border-t border-slate-700 text-center text-xs sm:text-sm text-slate-400">
// //           <p>
// //             Built by{" "}
// //             <span className="text-slate-200 font-medium"> 
// //               <a
// //                href="https://khadijazahra-portfolio.vercel.app/" 
// //                target="_blank"
// //               rel="noopener noreferrer"
// //               className="hover:text-blue-400 transition-colors">
// //               Khadija Zahra
// //               </a>
// //               </span>
// //           </p>
// //           <div className="flex justify-center gap-4 mt-1">
// //             <a
// //               href="https://github.com/Khadija-Zahra335"
// //               target="_blank"
// //               rel="noopener noreferrer"
// //               className="hover:text-blue-400 transition-colors"
// //             >
// //               GitHub
// //             </a>
// //             <a
// //               href="https://www.linkedin.com/in/khadija-zahra-06a37a270/"
// //               target="_blank"
// //               rel="noopener noreferrer"
// //               className="hover:text-blue-400 transition-colors"
// //             >
// //               LinkedIn
// //             </a>
// //             <a
// //               href="mailto:your@email.com"
// //               className="hover:text-blue-400 transition-colors"
// //             >
// //               Email
// //             </a>
// //           </div>
// //         </footer>
// //       </div>
// //     </main>
// //   );
// // }





// "use client";

// import { useState, useRef, useEffect } from "react";

// type Message = {
//   role: "user" | "assistant";
//   content: string;
// };

// export default function Home() {
//   const [input, setInput] = useState("");
//   const inputRef = useRef<HTMLInputElement>(null);
//   const [messages, setMessages] = useState<Message[]>([
//     {
//       role: "assistant",
//       content: "Hi there, how can I help?",
//     },
//   ]);

//   const [isLoading, setIsLoading] = useState(false);

//   const messagesContainerRef = useRef<HTMLDivElement>(null);

//   // Auto-scroll whenever a new message is added
//   useEffect(() => {
//     if (messagesContainerRef.current) {
//       messagesContainerRef.current.scrollTo({
//         top: messagesContainerRef.current.scrollHeight,
//         behavior: "smooth",
//       });
//     }
//   }, [messages, isLoading]);

//   async function handleSend() {
//     if (input.trim() === "" || isLoading) return;

//     const trimmedInput = input.trim();

// const userMessage: Message = {
//   role: "user",
//   content: trimmedInput,
// };

//     const updatedMessages = [...messages, userMessage];

//     setMessages(updatedMessages);
//     setInput("");
//     setIsLoading(true);

//     try {
//       const res = await fetch("/api/chat", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           messages: updatedMessages,
//         }),
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         throw new Error(data.error || "Request failed");
//       }

//       setMessages((prev) => [
//         ...prev,
//         {
//           role: "assistant",
//           content: data.reply,
//         },
//       ]);
//     } catch (error) {
//       setMessages((prev) => [
//         ...prev,
//         {
//           role: "assistant",
//           content:
//             "⚠️ Sorry, something went wrong. Please try again.",
//         },
//       ]);
//     } finally {
//       inputRef.current?.focus();
//       setIsLoading(false);
//     }
//   }

//   return (
//     <main className="flex justify-center h-screen overflow-hidden bg-gradient-to-b from-slate-900 to-slate-800 text-slate-100">
//       <div className="flex flex-col w-full max-w-3xl h-full px-4 sm:px-6">
//         {/* Header */}
//         <header className="py-5 border-b border-slate-700">
//           <h1 className="text-2xl sm:text-3xl font-bold text-center">
//             Groq Chatbot
//           </h1>

//           <p className="text-center text-base sm:text-xl text-slate-400 mt-1">
//             Powered by Llama on Groq
//           </p>
//         </header>

//         {/* Messages */}
//         <div
//           ref={messagesContainerRef}
//           className="flex-1 overflow-y-auto py-6 space-y-4"
//         >
//           {messages.map((msg, index) => (
//             <div
//               key={index}
//               className={`flex ${
//                 msg.role === "user"
//                   ? "justify-end"
//                   : "justify-start"
//               }`}
//             >
//               <div
//                 className={`px-4 py-3 rounded-2xl max-w-[85%] sm:max-w-[75%] text-base sm:text-xl leading-relaxed whitespace-pre-wrap ${
//                   msg.role === "user"
//                     ? "bg-blue-600 text-white rounded-br-sm"
//                     : "bg-slate-700 text-slate-100 rounded-bl-sm"
//                 }`}
//               >
//                 {msg.content}
//               </div>
//             </div>
//           ))}

//           {isLoading && (
//             <div className="flex justify-start">
//               <div className="bg-slate-700 text-slate-400 px-4 py-3 rounded-2xl rounded-bl-sm italic">
//                 Thinking...
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Input */}
//         <div className="flex gap-2 py-3 border-t border-slate-700">
//           <input
//             type="text"
//             value={input}
//             onChange={(e) => setInput(e.target.value)}
//             onKeyDown={(e) =>
//               e.key === "Enter" && handleSend()
//             }
//             placeholder="Type a message..."
//             disabled={isLoading}
//             className="flex-1 bg-slate-800 border border-slate-600 rounded-xl px-4 py-3 text-sm sm:text-xl placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
//           />

//           <button
//             onClick={handleSend}
//             disabled={isLoading || !input.trim()}
//             className="bg-blue-600 text-white px-5 sm:px-6 py-3 rounded-xl font-medium transition-colors hover:bg-blue-700 disabled:bg-slate-700 disabled:text-slate-400 disabled:cursor-not-allowed"
//          >
//             Send
//           </button>
//         </div>

//         {/* Footer */}
//         <footer className="py-3 border-t border-slate-700 text-center text-xs sm:text-sm text-slate-400">
//           <p>
//             Built by{" "}
//             <span className="text-slate-200 font-medium">
//               <a
//                 href="https://khadijazahra-portfolio.vercel.app/"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="hover:text-blue-400 transition-colors"
//               >
//                 Khadija Zahra
//               </a>
//             </span>
//           </p>

//           <div className="flex justify-center gap-4 mt-1">
//             <a
//               href="https://github.com/Khadija-Zahra335"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="hover:text-blue-400 transition-colors"
//             >
//               GitHub
//             </a>

//             <a
//               href="https://www.linkedin.com/in/khadija-zahra-06a37a270/"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="hover:text-blue-400 transition-colors"
//             >
//               LinkedIn
//             </a>

//             <a
//               href="mailto:your@email.com"
//               className="hover:text-blue-400 transition-colors"
//             >
//               Email
//             </a>
//           </div>
//         </footer>
//       </div>
//     </main>
//   );
// }



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