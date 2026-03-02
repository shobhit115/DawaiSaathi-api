const mongoose = require("mongoose");

const medicineSchema = new mongoose.Schema(
  {
    sub_category: String,
    product_name: String,
    normalized_name: String,
    salt_composition: String,
    product_price: Number,
    manufacturer: String,
    medicine_desc: String,
    side_effects: String,
    drug_interactions: String,
    search_terms: [String]
  },
  { collection: "medicine" }
);

module.exports = mongoose.model("Medicine", medicineSchema);