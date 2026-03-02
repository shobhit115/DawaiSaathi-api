const express = require("express");
const router = express.Router();
const upload = require("../utils/upload");
const { analyzeImage } = require("../controllers/ocrController");

router.post("/ocr", upload.single("image"), analyzeImage);

module.exports = router;