export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  try {
    let body;
    try {
      body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
    } catch {
      return res.status(400).json({ error: "Invalid JSON" });
    }

    const { message } = body;
    if (!message) return res.status(400).json({ error: "Message is required" });

    const COHERE_API_KEY = process.env.COHERE_API_KEY;

    const systemPrompt = `
You are a professional AI assistant for Ahrar Shah's portfolio.
Answer ONLY based on Ahrar Shah's real portfolio content (projects, skills, experience, code).
Do NOT add any extra formatting, markdown, bold, asterisks, or unnecessary special characters.
Keep only characters that are part of actual code or content like @, #, ., etc.
Provide clean, plain text answers.
`;

    const response = await fetch("https://api.cohere.ai/v2/chat", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${COHERE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "command-a-03-2025",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: message }
        ],
        max_tokens: 300
      }),
    });

    if (!response.ok) {
      const errData = await response.json();
      return res.status(response.status).json({ error: errData?.message || "Cohere API error" });
    }

    const data = await response.json();
    let aiText = data?.message?.content?.[0]?.text || "No response from AI";

    aiText = aiText.replace(/[*]+/g, '').trim();

    res.status(200).json({ message: aiText });

  } catch (err) {
    console.error("Cohere fetch error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
