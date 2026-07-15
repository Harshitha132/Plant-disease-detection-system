const express = require("express");

const router = express.Router();

const PlantRecovery =
  require("../models/PlantRecovery");

// SAVE PLANT DATA
router.post("/save", async (req, res) => {

  try {

    const newPlant =
      new PlantRecovery(req.body);

    await newPlant.save();

    res.status(201).json({
      message:
        "Plant recovery data saved",
      data: newPlant,
    });

  } catch (error) {

    res.status(500).json({
      error: error.message,
    });

  }

});

module.exports = router;