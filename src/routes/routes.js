const express = require("express");
const bodyParser = require('body-parser')
const app = express();
const {parkAVehicle, exitAVehicle, getVehicleHistory} = require("../controllers/vehicleController")

const jsonParser = bodyParser.json()


app.post("/parkVehicle", jsonParser,  parkAVehicle);
app.post("/exitVehicle", jsonParser, exitAVehicle);
app.post("/parkingHistory", jsonParser, getVehicleHistory);

module.exports = app;