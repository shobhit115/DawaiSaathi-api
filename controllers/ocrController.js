const { extractTextFromImage } = require("../services/ocrService");
const { cleanOCRText } = require("../utils/textCleaner");

async function analyzeImage(req, res) {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "No image uploaded" });
        }

        const rawText = await extractTextFromImage(req.file.buffer);

        const cleanedText = cleanOCRText(rawText);

        res.json({
            raw_text: rawText,
            cleaned_text: cleanedText
        });

    } catch (error) {
        console.error("FULL OCR ERROR:");
        console.error(error);
        console.error("Error message:", error.message);
        console.error("Error details:", error.details);

        res.status(500).json({
            message: error.message,
            details: error.details
        });
    }
}

module.exports = { analyzeImage };