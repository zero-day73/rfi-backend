import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json({ limit: "2mb" }));

app.get("/health", (req, res) => {
  res.json({ ok: true, service: "rfi-backend" });
});

app.post("/api/rfi", (req, res) => {
  const payload = req.body || {};
  res.json({
    ok: true,
    const response = await openai.responses.create({
  model: "gpt-4.1-mini",
  input: prompt,
  text: {
    format: { type: "json_object" }
  }
});

const rfiData = JSON.parse(response.output_text);

res.json({
  ok: true,
  rfi: rfiData
});
res.send({ message: response.choices[0].message.content });
    received: payload,
    rfi_id: `RFI-${Date.now()}`
  });
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Listening on ${PORT}`));
