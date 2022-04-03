const express = require("express");
const app = express();
const {parkAVehicle, exitAVehicle, getVehicleHistory} = require("../controllers/vehicleController")

app.post("/parkVehicle", parkAVehicle);
app.post("/exitVehicle", exitAVehicle);
app.post("/parkingHistory", getVehicleHistory);

module.exports = app;