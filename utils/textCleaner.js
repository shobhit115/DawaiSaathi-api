function cleanOCRText(rawText) {
  if (!rawText) return "";

  let text = rawText.toLowerCase();
  text = text.replace(/[^a-z0-9\s]/g, " ");
  text = text.replace(/\s+/g, " ").trim();

  const tokens = text.split(" ");

  const result = [];

  // 1️⃣ Capture mg values correctly
  tokens.forEach((token, index) => {
    if (/^\d+mg$/.test(token)) {
      // Ignore insane mg values (OCR errors)
      const value = parseInt(token.replace("mg", ""));
      if (value < 2000) {
        result.push(token);
      }
    }

    if (/^\d+$/.test(token) && tokens[index + 1] === "mg") {
      const value = parseInt(token);
      if (value < 2000) {
        result.push(token + "mg");
      }
    }
  });

  // 2️⃣ Capture possible brand names (ALL CAPS style words often >3 letters)
  const frequency = {};
  tokens.forEach(t => {
    if (t.length > 3) {
      frequency[t] = (frequency[t] || 0) + 1;
    }
  });

  Object.keys(frequency).forEach(word => {
    if (frequency[word] >= 3) {
      result.push(word);
    }
  });

  // 3️⃣ Capture known salt pattern (words ending with dine, ol, ine, etc.)
  tokens.forEach(token => {
    if (
      token.endsWith("dine") ||
      token.endsWith("ine") ||
      token.endsWith("ol")
    ) {
      result.push(token);
    }
  });

  // Remove unwanted words explicitly
  const blacklist = [
  "contains",
  "dosage",
  "equivalent",
  "prescription",
  "drug",
  "tablet",
  "tablets",
  "pharmaceuticals",
  "directed",
  "physician",
  "schedule",
  "cool",
  "dry",
  "light"
];

  const filtered = result.filter(word => !blacklist.includes(word));

  const unique = [...new Set(filtered)];

  return unique.slice(0, 6).join(" ");
}

module.exports = { cleanOCRText };