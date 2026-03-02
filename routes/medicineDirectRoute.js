const express = require("express");
const { medicineDirect } = require("../controllers/medicineDirectController");

const router = express.Router();

router.get("/medicine-direct", medicineDirect);

module.exports = router;