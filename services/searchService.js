const Medicine = require("../models/medicineModel");
const searchMedicine = async (query) => {
  const result = await Medicine.aggregate([
    {
      $search: {
        index: "medicine_search",
        compound: {
          should: [
            {
              text: {
                query: query,
                path: "product_name",
                fuzzy: {
                  maxEdits: 2,
                  prefixLength: 1
                },
                score: { boost: { value: 5 } }
              }
            },
            {
              text: {
                query: query,
                path: "salt_composition",
                fuzzy: {
                  maxEdits: 2,
                  prefixLength: 1
                }
              }
            },
            {
              text: {
                query: query,
                path: "search_terms",
                fuzzy: {
                  maxEdits: 2,
                  prefixLength: 1
                }
              }
            }
          ]
        }
      }
    },
    {
      $addFields: {
        score: { $meta: "searchScore" }
      }
    },
    {
      $sort: { score: -1 }
    },
    { $limit: 3 }
  ]);

  return result;
};
console.log("Connected DB:", Medicine.db.name);
module.exports = { searchMedicine };