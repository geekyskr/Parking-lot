import express from "express";
import pkg from 'body-parser';
const { json } = pkg;
const app = express();
import { parkAVehicle, exitAVehicle, getVehicleHistory } from "../controllers/vehicleController.js";

const jsonParser = json()


app.post("/parkVehicle", jsonParser,  parkAVehicle);
app.post("/exitVehicle", jsonParser, exitAVehicle);
app.post("/parkingHistory", jsonParser, getVehicleHistory);

export default app;