import express from "express";
import cors from "cors";
import OpenAI from "openai";

const app = express();
app.use(cors());
app.use(express.json({ limit: "2mb" }));

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.get("/health", (req, res) => {
  res.json({ ok: true, service: "rfi-backend" });
});

app.post("/api/rfi", async (req, res) => {
  const payload = req.body || {};
  const userInput = payload.input;

  if (!userInput) {
    return res.status(400).json({ ok: false, error: "Missing input" });
  }

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are a helpful assistant that generates formal RFIs (Request for Information) for construction projects."
        },
        {
          role: "user",
          content: `Create an RFI for the following input: ${userInput}`
        }
      ]
    });

    const rfiText = response.choices[0].message.content;

    res.json({
      ok: true,
      rfi: rfiText,
      rfi_id: `RFI-${Date.now()}`,
      received: payload
    });
  } catch (error) {
    console.error("OpenAI API Error:", error);
    res.status(500).json({ error: "Failed to generate RFI" });
  }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`RFI Creator backend running on port ${PORT}`);
});
