const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

(async () => {
  try {
    const models = await genAI.listModels();
    console.log("Available Gemini models:");
    models.models.forEach(m => {
      console.log("-", m.name);
    });
  } catch (err) {
    console.error("Failed to list models:", err.message);
  }
})();

// Model priority queue (safe ordering)
const MODEL_QUEUE = [
  "gemini-3-flash-preview",
  "gemini-1.5-flash",
  "gemini-pro"
];

async function generateLLMResponse({ cleanedQuery, medicine, language }) {

  const languageInstruction =
    language === "hi"
      ? "Explain completely in simple Hindi."
      : "Explain completely in simple English.";

  const prompt = `
You are a medical assistant whose job is to clearly explain medicines in simple, easy-to-understand language.

The OCR text may contain extra unrelated words (warnings, excipients, color agents, etc.).
Focus ONLY on:
- Medicine name
- Dosage (mg/ml)
- Salt composition

Language: ${language === "hi" ? "Hindi" : "English"}

OCR Extracted Text:
"${cleanedQuery}"

Database Medicine:
Product Name: ${medicine.product_name}
Salt Composition: ${medicine.salt_composition}
Manufacturer: ${medicine.manufacturer}
Description: ${medicine.medicine_desc}
Side Effects: ${medicine.side_effects}
Drug Interactions: ${medicine.drug_interactions}

Matching Rules:
- If the brand name OR salt composition matches AND dosage is reasonably consistent → treat as MATCH.
- Ignore unrelated words like "caution", "color", "tartrazine", etc.
- Minor spelling mistakes are acceptable.
- Only treat as NOT FOUND if both brand and salt clearly refer to a different medicine.

Response Rules:

If MATCH:
- Do NOT say "verified" or "matched".
- Directly explain the medicine in simple language.
- Include:
  • What it is used for  
  • How it works (in simple terms)  
  • Common side effects  
  • Important warnings  
- Keep the tone clear and easy to understand (not overly technical).
- End with a short disclaimer: 
  "This information is for educational purposes only and is not medical advice. Please consult a doctor before taking any medicine."

If NOT FOUND:
- Respond with exactly:
  "This medicine is not available in our database. Please consult a doctor or pharmacist before using it."
- Then add the same disclaimer line.
`;

  let lastError = null;

  for (const modelName of MODEL_QUEUE) {
    try {
      console.log(`Trying Gemini model: ${modelName}`);

      const model = genAI.getGenerativeModel({ model: modelName });

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      if (text) {
        console.log(`Model success: ${modelName}`);
        return text;
      }

    } catch (error) {
      console.error(`Model failed: ${modelName}`, error.message);
      lastError = error;
    }
  }

  // If all models fail
  throw new Error(
    `All Gemini models failed. Last error: ${lastError?.message}`
  );
}

module.exports = { generateLLMResponse };