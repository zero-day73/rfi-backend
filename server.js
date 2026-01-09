import express from "express";
import cors from "cors";
import OpenAI from "openai";

const app = express();

app.use(cors());
app.use(express.json({ limit: "2mb" }));

// ✅ Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// ✅ Health check
app.get("/health", (req, res) => {
  res.json({ ok: true, service: "rfi-backend" });
});

// ✅ RFI endpoint
app.post("/api/rfi", async (req, res) => {
  try {
    const payload = req.body || {};
    const userInput = payload.input;

    if (!userInput) {
      return res.status(400).json({ ok: false, error: "Missing input" });
    }

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are a helpful assistant that generates formal RFIs (Request for Information) for construction projects.",
        },
        {
          role: "user",
          content: `Create an RFI for the following input:\n${userInput}`,
        },
      ],
    });

    const rfiText = response.choices[0].message.content;

    res.json({
      ok: true,
      rfi: rfiText,
      received: payload,
      rfi_id: `RFI-${Date.now()}`,
    });
  } catch (error) {
    console.error("RFI ERROR:", error);
    res.status(500).json({
      ok: false,
      error: "Failed to generate RFI",
    });
  }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Listening on ${PORT}`));
