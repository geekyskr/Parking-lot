const { validateRequestForParkAVehicle, validateRequestExitAVehicle,
    validateRequestParkingHistory } = require("../validator/vehicleControllerValidator");
const { generateTicketId, getCurrTime, getEmptySlot, markSlotBooked,
    markSlotUnBooked } = require("./controllerHelper");
const { generateAndStoreTicket, fetchTicketById, updateTicket,
    fetchParkingHistoryByVehicleNumber } = require("../models/model-helper");


function parkAVehicle(request, responce) {
    const reqPayload = request.body;
    console.log(reqPayload);
    validateRequestForParkAVehicle(reqPayload);
    const ticketId = generateTicketId();
    const entryTime = getCurrTime();
    const parkingLotName = reqPayload.parkingLotName;
    const vehicleType = reqPayload.vehicleType;
    const slot = getEmptySlot(parkingLotName, vehicleType);
    generateAndStoreTicket(reqPayload, ticketId, entryTime, slot);
    markSlotBooked(parkingLotName, vehicleType, slot);
    responce.status(201).send(ticket);
}

function exitAVehicle(request, responce) {
    const reqPayload = request.body;
    console.log(reqPayload);
    validateRequestExitAVehicle(reqPayload);
    const ticketId = reqPayload.ticketId;
    const ticket = fetchTicketById(ticketId);
    const exitTime = getCurrTime();
    const amount = calculateAmount(ticket, exitTime);
    updateTicket(ticket, amount, exitTime);
    markSlotUnBooked(ticket.parkingLotName, ticket.vehicleType, ticket.slot)
    responce.status(201).send(amount);
}

function getVehicleHistory(request, responce) {
    const reqPayload = request.body;
    console.log(reqPayload);
    validateRequestParkingHistory(reqPayload);
    const vehicleNumber = reqPayload.vehicleNumber;
    const parkingHistory = fetchParkingHistoryByVehicleNumber(vehicleNumber);
    responce.status(200).json(parkingHistory);
}

module.exports = { parkAVehicle, exitAVehicle, getVehicleHistory };