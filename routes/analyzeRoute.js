const express = require("express");
const router = express.Router();
const upload = require("../utils/upload");
const { analyzeImage} = require("../controllers/analyzeController");

router.post("/analyze", upload.single("image"), analyzeImage);

module.exports = router;