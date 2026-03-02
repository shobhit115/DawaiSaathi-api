const { extractTextFromImage } = require("../services/ocrService");
const { cleanOCRText } = require("../utils/textCleaner");
const { searchMedicine } = require("../services/searchService");
const { generateLLMResponse } = require("../services/llmService");

const llmAnalyzeImage = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "No image uploaded" });
        }

        const language = req.body.language === "hi" ? "hi" : "en";

        // 1️⃣ OCR
        const rawText = await extractTextFromImage(req.file.buffer);

        if (!rawText) {
            return res.status(400).json({ error: "OCR failed" });
        }

        // 2️⃣ Clean
        const cleanedText = cleanOCRText(rawText);

        if (!cleanedText) {
            return res.status(404).json({ error: "No medicine text detected" });
        }

        // 3️⃣ Search
        // const match = await searchMedicine(cleanedText);
        const results = await searchMedicine(cleanedText);

        if (!results || results.length === 0) {
            return res.status(404).json({ error: "Medicine not found" });
        }

        // ✅ Take only the top scoring match
        const match = results[0];

        if (!match) {
            return res.status(404).json({ error: "Medicine not found in database" });
        }

        // 4️⃣ LLM Explanation
        const explanation = await generateLLMResponse({
            cleanedQuery: cleanedText,
            medicine: match,
            language
        });

        return res.json({
            cleaned_query: cleanedText,
            medicine: match,
            explanation,
            language
        });

    } catch (error) {
        console.error("LLM Analyze error:", error);
        return res.status(500).json({ error: "LLM analyze failed" });
    }
};

const llmAnalyzeText = async (req, res) => {
    try {
        const { query, language } = req.query;

        if (!query) {
            return res.status(400).json({ error: "Query parameter is required" });
        }

        const selectedLanguage = language === "hi" ? "hi" : "en";

        // 🔹 No OCR
        // 🔹 No heavy cleaning
        // Just basic normalization
        const normalizedQuery = query.trim().toLowerCase();

        // 🔹 Search DB directly
        const results = await searchMedicine(normalizedQuery);

        if (!results || results.length === 0) {
            return res.status(404).json({ error: "Medicine not found" });
        }

        const match = results[0];

        // 🔹 Generate LLM explanation
        const explanation = await generateLLMResponse({
            cleanedQuery: normalizedQuery,
            medicine: match,
            language: selectedLanguage
        });

        return res.json({
            query: normalizedQuery,
            medicine: match,
            explanation,
            language: selectedLanguage
        });

    } catch (error) {
        console.error("LLM Text Analyze error:", error);
        return res.status(500).json({ error: "LLM text analyze failed" });
    }
};

module.exports = {
    llmAnalyzeImage,
    llmAnalyzeText
};