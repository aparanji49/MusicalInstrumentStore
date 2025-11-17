// backend/routes/recommendations.ts
import express from "express";
import OpenAI from "openai";
import Product from "../models/Product.js"; // your mongoose model

const router = express.Router();

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// POST /api/recommend
router.post("/", async (req, res) => {
  try {
    const { cartItems } = req.body; // array of product IDs

    const products = await Product.find({}); // full catalog
    const cartDetails = await Product.find({ _id: { $in: cartItems } });

    const prompt = `
      You are a recommendation engine for a musical instrument store.

      Catalog:
      ${products.map((p) => `${p._id}: ${p.name} - ${p.category} - $${p.price}`).join("\n")}

      User cart currently contains:
      ${cartDetails.map((p) => `${p.name} (${p.category})`).join(", ")}

      Recommend EXACTLY 3 products from the catalog that the user is most likely to buy next.
      Avoid items already in the cart.

      Respond ONLY in JSON:
      {
        "recommendations": ["productId1", "productId2", "productId3"]
      }
    `;

    const response = await client.chat.completions.create({
      model: "gpt-4.1-mini",
      response_format: { type: "json_object" },
      messages: [{ role: "user", content: prompt }],
    });

    const content = response.choices[0].message.content;
    if (!content) {
      return res.status(500).json({ error: "No content in response" });
    }

    const result = JSON.parse(content);

    return res.json(result);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Failed to generate recommendations" });
  }
});

export default router;
