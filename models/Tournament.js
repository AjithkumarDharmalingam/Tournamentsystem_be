const mongoose = require("mongoose");

const tournamentData = new mongoose.Schema({
  tournamentName: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },

  startDate: {
    type: String,
    required: true
  },
  endDate: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  }
});
const tournamentModel = mongoose.model("tournament", tournamentData);

module.exports = tournamentModel;
