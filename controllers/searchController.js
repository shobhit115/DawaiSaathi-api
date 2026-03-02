const { searchMedicine } = require("../services/searchService");

const search = async (req, res) => {
  try {
    const { query } = req.body;

    if (!query) {
      return res.status(400).json({ error: "Query is required" });
    }

    const result = await searchMedicine(query);

    res.status(200).json(result);
  } catch (error) {
    console.error("Search error:", error);
    res.status(500).json({ error: "Search failed" });
  }
};

module.exports = { search };