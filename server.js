require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const searchRoute = require("./routes/searchRoute");
const medicineDirectRoute = require("./routes/medicineDirectRoute");


const app = express();

connectDB();

app.use(
  cors({
    origin: "https://dawaisaathi.vercel.app",
    methods: ["GET", "POST"],
    credentials: true,
  })
);
app.use(express.json());

app.use("/api/search", searchRoute);
app.use("/api", require("./routes/ocrRoute"));
app.use("/api", require("./routes/analyzeRoute"));
app.use("/api", require("./routes/llmRoute"));
app.use("/api", medicineDirectRoute);
// app.use("/tts", require("./routes/ttsRoute"));

app.get("/", (req, res) => {
  res.send("Medicine Search API Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});