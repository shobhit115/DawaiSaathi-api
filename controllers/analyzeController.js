const { extractTextFromImage } = require("../services/ocrService");
const { cleanOCRText } = require("../utils/textCleaner");
const { searchMedicine } = require("../services/searchService");

const analyzeImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No image uploaded" });
    }

    // 1️⃣ OCR
    const rawText = await extractTextFromImage(req.file.buffer);

    // 2️⃣ Clean
    const cleanedText = cleanOCRText(rawText);

    if (!cleanedText) {
      return res.status(404).json({ error: "No medicine text detected" });
    }

    // 3️⃣ Search
    const match = await searchMedicine(cleanedText);

    return res.json({
      cleaned_query: cleanedText,
      match
    });

  } catch (error) {
    console.error("Analyze error:", error);
    res.status(500).json({ error: "Analyze failed" });
  }
};


module.exports = { analyzeImage };