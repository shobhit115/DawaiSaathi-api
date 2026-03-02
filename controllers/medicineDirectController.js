const { getMedicineDirect } = require("../services/medicineDirectService");

const medicineDirect = async (req, res) => {
  try {
    const { name } = req.query;

    if (!name) {
      return res.status(400).json({ error: "Medicine name is required" });
    }

    const medicine = await getMedicineDirect(name);

    if (!medicine) {
      return res.status(404).json({ error: "Medicine not found in database" });
    }

    res.status(200).json({
      source: "database",
      product_name: medicine.product_name,
      salt_composition: medicine.salt_composition,
      manufacturer: medicine.manufacturer,
      description: medicine.medicine_desc,
      side_effects: medicine.side_effects,
      drug_interactions: medicine.drug_interactions
    });
  } catch (error) {
    console.error("Direct DB fetch error:", error);
    res.status(500).json({ error: "Direct medicine fetch failed" });
  }
};

module.exports = { medicineDirect };