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
    message: "Placeholder response: RFI received",
    received: payload,
    rfi_id: `RFI-${Date.now()}`
  });
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Listening on ${PORT}`));
