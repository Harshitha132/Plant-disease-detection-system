const mongoose = require("mongoose");

const plantRecoverySchema =
  new mongoose.Schema({

    plantName: {
      type: String,
      required: true,
    },

    diseaseName: {
      type: String,
      required: true,
    },

    severity: {
      type: Number,
      required: true,
    },

    recommendation: {
      type: String,
      required: true,
    },

    recoveryPercentage: {
      type: Number,
      default: 0,
    },

    expectedRecoveryDays: {
      type: Number,
      default: 0,
    },

    imageUrl: {
      type: String,
      required: true,
    },

    day: {
      type: Number,
      required: true,
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },

  });

module.exports =
  mongoose.model(
    "PlantRecovery",
    plantRecoverySchema
  );