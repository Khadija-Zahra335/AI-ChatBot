# Groq Chatbot

A simple, responsive AI chatbot built with **Next.js** and the **Groq API**. Users type a message, and the app returns a fast AI-generated reply powered by Groq's LPU inference. The Groq API key is handled entirely server-side and is never exposed to the browser.

> Built as a portfolio project to practice Next.js, React state management, secure API routes, and third-party LLM integration.

## Live Demo

🔗 **[View Live](https://ai-chat-bot-tau-ten.vercel.app/)** <!-- replace with your Vercel URL -->

## Features

- 💬 Clean chat interface with message history
- ⚡ Fast responses via the Groq API (Llama model)
- 🔒 Secure server-side API route — the API key never reaches the client
- 🧠 Full conversation context sent on each request (the bot remembers earlier messages)
- ⏳ Loading indicator while awaiting a reply
- ⚠️ Graceful error handling (empty input, API failures)
- 📱 Fully responsive — works on mobile and desktop
- ⬇️ Auto-scroll to the newest message

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js (App Router) |
| UI | React, Tailwind CSS |
| AI | Groq API (OpenAI-compatible endpoint) |
| Language | JavaScript |
| Deployment | Vercel |

## How It Works

The app keeps the API key safe by never calling Groq from the browser. Instead:

```
Browser (chat UI)  →  Next.js API route (server)  →  Groq API
   no key                  holds the key
```

The browser talks only to the app's own `/api/chat` route. That route runs on the server, reads the key from an environment variable, calls Groq, and returns only the reply. The key never leaves the server.

## Getting Started

### Prerequisites

- Node.js 18 or higher
- A free Groq API key from [console.groq.com](https://console.groq.com)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/groq-chatbot.git
   cd groq-chatbot
   ```
   <!-- replace your-username above -->

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up your environment variable**

   Create a file named `.env.local` in the project root and add your Groq API key:

   ```
   GROQ_API_KEY=your_groq_api_key_here
   ```

   > This file is listed in `.gitignore` and is never committed. Each person running the project supplies their own key.

4. **Run the development server**

   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   └── chat/
│   │       └── route.js    # Server-side API route that calls Groq
│   ├── page.js             # Chat UI (client component)
│   ├── layout.js           # Root layout
│   └── globals.css         # Global styles + Tailwind
```

## Deployment

This app is deployed on **Vercel**. To deploy your own:

1. Push the project to GitHub.
2. Import the repository into [Vercel](https://vercel.com).
3. Add `GROQ_API_KEY` as an **Environment Variable** in the Vercel project settings.
4. Deploy.

> Note: `.env.local` is not uploaded to Vercel. You must add the key in Vercel's dashboard so the deployed app can read it.

## What I Learned

- Building a Next.js API route to keep secrets off the client
- Managing UI state in React with `useState` (input, message history, loading)
- Handling asynchronous requests with `fetch` and `async/await`
- Handling edge cases: empty input and API errors
- Integrating a third-party LLM API using an OpenAI-compatible format
- Making a layout responsive with Tailwind's mobile-first breakpoints

## License

This project is open source and available under the [MIT License](LICENSE).
