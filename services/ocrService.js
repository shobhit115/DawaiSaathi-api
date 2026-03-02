const Tesseract = require("tesseract.js");

async function extractTextFromImage(buffer) {
  const { data } = await Tesseract.recognize(
    buffer,
    "eng",
    {
      logger: m => console.log(m.status)
    }
  );

  return data.text;
}

module.exports = { extractTextFromImage };