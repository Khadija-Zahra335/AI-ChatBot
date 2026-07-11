// This code runs ONLY on the server — never sent to the browser.
// That's why it's safe to read the secret key here.


// Next.js turns this into an endpoint.
// Naming it POST means it responds to POST requests (used for sending data — perfect for submitting a message).
// async because we await network calls.

export async function POST(request) {
  try {
    // 1. Read the messages the UI sent us
    // Reads the JSON body the browser sent. We pull out messages from it.
    const { messages } = await request.json();

    // 2. Basic validation — reject empty/malformed requests
    // Edge case (task requirement): if the request has no messages, reject with status 400 (= "bad request") instead of crashing.
    if (!messages || messages.length === 0) {
      return Response.json(
        { error: "No messages provided." },
        { status: 400 }
      );
    }

    // 3. Call the Groq API, using the secret key from the environment
    // The actual call to Groq. fetch is the standard way to make HTTP requests in JS.
    const groqResponse = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        },

        // What we send Groq: which model, and the conversation.
        //  Note messages is passed straight through — same shape as our React state.
        body: JSON.stringify({
          model: "llama-3.1-8b-instant",
          messages: messages,
        }),
      }
    );

    // 4. If Groq itself returned an error, surface it

    // Edge case: if Groq returns an error (bad key, rate limit, downtime), 
    // we catch it and pass the status back instead of pretending it worked.
    if (!groqResponse.ok) {
      return Response.json(
        { error: "Groq API request failed." },
        { status: groqResponse.status }
      );
    }

    // 5. Extract the reply text from Groq's response
    const data = await groqResponse.json();
    // Digging into Groq's response to grab just the reply text. Groq returns a big object; the reply lives at this path.
    const reply = data.choices[0].message.content;

    // 6. Send just the reply back to the UI
    return Response.json({ reply });
  } catch (error) {
    // 7. Catch anything unexpected (network down, bad JSON, etc.)
    // Send only the reply back to the UI — nothing sensitive.
    return Response.json(
      { error: "Something went wrong on the server." },
      { status: 500 }
    );
  }
}