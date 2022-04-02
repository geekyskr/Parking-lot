const express = require("express");
const app = express();
const {parkAVehical, exitAVehical, getVehicalHistory} = require("../controllers/vehicalController")

app.post("/parkVehical", parkAVehical);
app.post("/exitVehical", exitAVehical);
app.post("/parkingHistory", getVehicalHistory);