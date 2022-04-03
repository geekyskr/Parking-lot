const { validateRequestForParkAVehicle, validateRequestExitAVehicle,
    validateRequestParkingHistory } = require("../validator/vehicleControllerValidator");
const { generateTicketId, getCurrTime } = require("./controllerHelper");

async function parkAVehicle(request, responce) {
    const reqPayload = request.body;
    console.log(reqPayload);
    validateRequestForParkAVehicle(reqPayload);
    const ticketId = generateTicketId();
    const entryTime = getCurrTime();
    const slot = getEmptySlot();
    generateAndStoreTicket(reqPayload, ticketId, entryTime, slot);
    responce.status(201).send(ticketId);
}

async function exitAVehicle(request, responce) {
    const reqPayload = request.body;
    console.log(reqPayload);
    validateRequestExitAVehicle(reqPayload);
    const ticketId = reqPayload.ticketId;
    const ticket = fetchTicketById(ticketId);
    const amount = calculateAmount();
    const exitTime = getCurrTime();
    updateTicket(ticket, amount, exitTime);
    responce.status(201).send(amount);
}

async function getVehicleHistory(request, responce) {
    const reqPayload = request.body;
    console.log(reqPayload);
    validateRequestParkingHistory(reqPayload);
    const vehicleNumber = reqPayload.vehicleNumber;
    const parkingHistory = fetchParkingHistoryByVehicleNumber(vehicleNumber);
    responce.status(200).json(parkingHistory);
}

module.exports = { parkAVehicle, exitAVehicle, getVehicleHistory };