// backend/src/routes/musebot.ts
import express from "express";
import OpenAI from "openai";

const router = express.Router();

// Create OpenAI client using your API key from .env
const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

//
// 1) POST /api/musebot  → general Q&A chat (Ask MuseBot)
//
router.post("/", async (req, res) => {
  try {
    const { query } = req.body as { query?: string };

    if (!query || !query.trim()) {
      return res.status(400).json({ error: "Missing query" });
    }

    const completion = await client.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [
        {
          role: "system",
          content:
            "You are MuseBot — a friendly assistant that helps users understand musical instruments, music production, and buying advice. Be clear and concise.",
        },
        { role: "user", content: query },
      ],
    });

    const answer = completion.choices[0]?.message?.content ?? "I’m not sure how to answer that.";
    res.json({ answer });
  } catch (err) {
    console.error("MuseBot chat error:", err);
    res.status(500).json({ error: "MuseBot failed." });
  }
});

//
// 2) POST /api/musebot/bundle  → AI bundle generator
//
router.post("/bundle", async (req, res) => {
  try {
    const { query } = req.body as { query?: string };

    if (!query || !query.trim()) {
      return res.status(400).json({ error: "Missing query" });
    }

    const prompt = `
You are an AI assistant that creates curated musical instrument bundles.

User request:
"${query}"

Create a realistic, beginner-friendly or level-appropriate bundle based on what they described.
Avoid specific brand names where possible (say "entry-level acoustic guitar" instead of a brand).
Include 3–5 items max.

Respond ONLY in JSON with this shape:
{
  "bundle": {
    "items": [
      { "name": "Item 1", "description": "Short description" },
      { "name": "Item 2", "description": "Short description" },
      { "name": "Item 3", "description": "Short description" }
    ],
    "notes": "Any additional advice."
  }
}
`;

    const response = await client.chat.completions.create({
      model: "gpt-4.1-mini",
      response_format: { type: "json_object" },
      messages: [{ role: "user", content: prompt }],
    });

    const content = response.choices[0]?.message?.content;
    if (!content) {
      return res.status(500).json({ error: "Empty AI response" });
    }

    // Parse the JSON the model returned
    const parsed = JSON.parse(content);
    return res.json(parsed);
  } catch (err) {
    console.error("MuseBot bundle error:", err);
    res.status(500).json({ error: "Failed to build bundle." });
  }
});

export default router;
