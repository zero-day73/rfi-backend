app.post("/api/rfi", async (req, res) => {
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





