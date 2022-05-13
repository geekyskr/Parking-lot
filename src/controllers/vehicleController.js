import { validateRequestForParkAVehicle, validateRequestExitAVehicle, validateRequestParkingHistory } from "../validator/vehicleControllerValidator.js";
import { generateTicketId, getCurrTime, getEmptySlot, markSlotBooked, markSlotUnBooked, calculateAmount } from "./controllerHelper.js";
import { generateAndStoreTicket, fetchTicketById, updateTicket, fetchParkingHistoryByVehicleNumber, appendTicketToVehicleDetails, deleteTicketFromAllTickets } from "../models/model-helper.js";


function parkAVehicle(request, responce) {
    const reqPayload = request.body;
    validateRequestForParkAVehicle(reqPayload);
    const ticketId = generateTicketId();
    const entryTime = getCurrTime();
    const parkingLotName = reqPayload.parkingLotName;
    const vehicleType = reqPayload.vehicleType;
    const slot = getEmptySlot(parkingLotName, vehicleType);
    generateAndStoreTicket(reqPayload, ticketId, entryTime, slot);
    markSlotBooked(parkingLotName, vehicleType, slot);
    responce.status(201).send(ticketId);
}

function exitAVehicle(request, responce) {
    const reqPayload = request.body;
    validateRequestExitAVehicle(reqPayload);
    const ticketId = reqPayload.ticketId;
    const ticket = fetchTicketById(ticketId);
    if(ticket ==  undefined) {
        throw "Ticket is not present in allTickets doc";
    }
    const exitTime = getCurrTime();
    const amount = calculateAmount(ticket, exitTime);
    const updatedTicket = updateTicket(ticket, amount, exitTime);
    markSlotUnBooked(ticket.parkingLotName, ticket.vehicleType, ticket.slot);
    appendTicketToVehicleDetails(ticket.vehicleNumber, updatedTicket);
    deleteTicketFromAllTickets(ticketId);
    responce.status(201).send(amount.toString());
}

function getVehicleHistory(request, responce) {
    const reqPayload = request.body;
    validateRequestParkingHistory(reqPayload);
    const vehicleNumber = reqPayload.vehicleNumber;
    const parkingHistory = fetchParkingHistoryByVehicleNumber(vehicleNumber);
    responce.status(200).json(parkingHistory);
}

export { parkAVehicle, exitAVehicle, getVehicleHistory };