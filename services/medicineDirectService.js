const Medicine = require("../models/medicineModel");

const getMedicineDirect = async (name) => {
  if (!name) return null;

  const normalized = name.toLowerCase().trim();

  const result = await Medicine.findOne({
    $or: [
      { normalized_name: normalized },
      { product_name: new RegExp(normalized, "i") },
      { search_terms: { $in: [normalized] } }
    ]
  }).lean();

  return result;
};

module.exports = { getMedicineDirect };