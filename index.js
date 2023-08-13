const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const tournamentModel = require("./models/Tournament");
const participantModel = require("./models/Participant");

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(
  "mongodb+srv://Velmurugan:Ajith004@yelpcamp.az7batc.mongodb.net/yelpcamp?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

app.post("/api/addtournament", async (req, res) => {
  const {
    tournamentName,
    imageUrl,
    description,
    startDate,
    endDate,
    status
  } = req.body;
  const addTournament = new tournamentModel({
    tournamentName: tournamentName,
    imageUrl: imageUrl,
    description: description,
    startDate: startDate,
    endDate: endDate,
    status: status
  });
  try {
    await addTournament.save();
    res.json({
      status: 200,
      message: "Tournament Added Successfully"
    });
  } catch (error) {
    console.log(error);
  }
});

app.post("/api/addparticipant", async (req, res) => {
  const { name, dob, email, address, mobile, tournamentName } = req.body;
  const addParticipant = new participantModel({
    name: name,
    dob: dob,
    email: email,
    address: address,
    mobile: mobile,
    tournamentName: tournamentName
  });
  try {
    await addParticipant.save();
    res.json({
      status: 200,
      message: "Participant Added Successfully"
    });
  } catch (error) {
    console.log(error);
  }
});

app.put("/api/edittournament", async (req, res) => {
  const {
    id,
    tournamentName,
    imageUrl,
    description,
    startDate,
    endDate,
    status
  } = req.body;
  console.log(req.body);
  try {
    await tournamentModel.updateOne(
      { _id: id },
      {
        $set: {
          tournamentName: tournamentName,
          imageUrl: imageUrl,
          description: description,
          startDate: startDate,
          endDate: endDate,
          status: status
        }
      }
    );
    res.json({ status: 200, message: "Tournament Updated Successfully" });
  } catch (error) {
    console.log(error);
  }
});

app.put("/api/editparticipant", async (req, res) => {
  const { id, name, dob, email, address, mobile } = req.body;
  console.log(req.body);
  try {
    await participantModel.updateOne(
      { _id: id },
      {
        $set: {
          name: name,
          dob: dob,
          email: email,
          address: address,
          mobile: mobile
        }
      }
    );
    res.json({ status: 200, message: "Participant Updated Successfully" });
  } catch (error) {
    console.log(error);
  }
});

app.get("/api/gettournamentlist/", async (req, res) => {
  const tournamentList = await tournamentModel.find({});
  res.status(200).send(tournamentList);
});

app.get("/api/getparticipantlist/", async (req, res) => {
  const { tournamentName } = req.query;
  const participantList = await participantModel.find({
    tournamentName: tournamentName
  });
  res.status(200).send(participantList);
});

app.delete("/api/deletetournament", async (req, res) => {
  var { tournamentName } = req.query;
  console.log(req.query);
  await tournamentModel.deleteOne({
    tournamentName: tournamentName
  });
  res.json({ status: 200 });
});

app.delete("/api/deleteparticipant", async (req, res) => {
  var { name } = req.query;
  await participantModel.deleteOne({
    name: name
  });
  res.json({ status: 200 });
});

app.listen(3001, () => {
  console.log("running on port 3001");
});
