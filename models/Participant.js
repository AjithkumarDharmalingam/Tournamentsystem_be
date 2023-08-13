const mongoose = require("mongoose");

const participantData = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  dob: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },

  address: {
    type: String,
    required: true
  },
  mobile: {
    type: String,
    required: true
  },
  tournamentName: {
    type: String,
    required: true
  }
});
const participantModel = mongoose.model("participant", participantData);

module.exports = participantModel;
