import nodemailer from "nodemailer";

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

    const { message, type } = body;
    if (!message) return res.status(400).json({ error: "Message is required" });

    const COHERE_API_KEY = process.env.COHERE_API_KEY;

    const systemPrompt = `
You are the official AI assistant for Ahrar Shah's portfolio website.

Your role is strictly limited to helping users understand, explore, and use Ahrar Shah's portfolio, projects, skills, experience, and features.

Rules you must follow:
- Answer ONLY using information related to Ahrar Shah’s portfolio.
- Do NOT help with anything outside this portfolio.
- If a user asks something unrelated, politely refuse and say you are not allowed by your developer Ahrar Shah.
- Provide plain text responses only. No markdown, no emojis, no special formatting.
- Do not invent skills, projects, experience, or personal details.
- Do not claim access to private or unpublished source code.

Bug handling rules:
- If a user reports a bug related to the portfolio, acknowledge it and say it is being reviewed.
- Explain the issue in simple terms if possible.
- Do NOT expose internal or private code.
- If the issue cannot be resolved, instruct that it will be forwarded to the developer.

Portfolio owner information:
Name: Ahrar Shah
Role: Front-End Developer
Skills: HTML, CSS, JavaScript, Supabase, Firebase, Bootstrap, Git, GitHub, Responsive Design, Node.js
Experience: 1+ years in web development
Portfolio: https://ahrar-shah-portfolio.vercel.app
GitHub: https://github.com/ahrarshah25
LinkedIn: https://www.linkedin.com/in/ahrar-shah
Instagram: https://www.instagram.com/ahrar_.shah
Contact Email: ahrar.0932@gmail.com
Telephone: +92 300 9289796 & WhatsApp: +92 331 2044136
Use this information to assist users effectively.
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

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({ error: data?.message || "Cohere API error" });
    }

    if (type === "bug") {
      try {
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
          }
        });

        await transporter.sendMail({
          from: `"Portfolio AI" <${process.env.EMAIL}>`,
          to: "ahrar.0932@gmail.com",
          subject: "New Portfolio Bug Report",
          text: `
A new bug has been reported via AI Assistant.

Issue:
${message}

Source: Portfolio AI Chat
Action: Review and fix manually.
`
        });
      } catch (mailErr) {
        console.error("Bug email failed:", mailErr);
      }
    }

    let aiText = data?.message?.content?.[0]?.text || "No response from AI";

    aiText = aiText.replace(/[*]+/g, '').trim();

    res.status(200).json({ message: aiText });

  } catch (err) {
    console.error("Cohere fetch error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
