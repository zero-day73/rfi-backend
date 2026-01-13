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
});app.post("/api/rfi", async (req, res) => {
  const { input: userInput } = req.body;

  if (!userInput || userInput.trim() === "") {
    return res.status(400).json({ ok: false, error: "Missing input" });
  }

  try {
    const response = await openai.responses.create({
      model: "gpt-4o-mini",
      input: `You are a professional construction assistant.
Provide RFIs in a structured format with Subject, Reference, and Question.

${userInput}`
    });

    const rfiText =
      response.output?.[0]?.content?.[0]?.text || "No RFI text generated.";

    res.json({
      ok: true,
      rfi: rfiText,
      rfi_id: `RFI-${Date.now()}`
    });

  } catch (error) {
    console.error("OpenAI API Error:", error);
    res.status(500).json({
      ok: false,
      error: "AI service is currently unavailable."
    });
  }
});
⚠️ Do not nest it inside another route.
⚠️ Do not put it inside app.get("/health").

6️⃣ SCROLL DOWN → COMMIT CHANGES
Fill in:

Commit message:

pgsql
Copy code
Replace /api/rfi route with stable OpenAI responses implementation
Click:
👉 Commit changes

7️⃣ WAIT FOR RENDER (1–2 minutes)
Go to:

Render Dashboard

rfi-backend

Events

Wait for Deploy succeeded

8️⃣ FINAL TEST (Bubble)
In Bubble → API Connector:

Body (JSON):

json
Copy code
{
  "input": "<input>"
}
Header:

pgsql
Copy code
Content-Type : application/json
Click Initialize call.

✅ QUICK CONFIRMATION (ONE LINE)
Reply with:

“Pasted and committed”
or

“Not sure where to delete”

Once this is in, your backend is production-ready.















  }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`RFI Creator backend running on port ${PORT}`);
});
