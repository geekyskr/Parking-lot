const [tickets, vehicleDetails] = require("../controllers/script/script");

function generateAndStoreTicket(reqPayload, ticketId, entryTime, slot) {
    let ticket = reqPayload;
    ticket.ticketId = ticketId;
    ticket.entryTime = entryTime;
    ticket.slot = slot
    tickets.set(ticket.ticketId, ticket);
    return ticket.ticketId
}

function fetchTicketById(ticketId) {
    return tickets.get(ticketId)
}

function updateTicket(ticket, amount, exitTime) {
    ticket.exitTime = exitTime;
    ticket.amount = amount;
}

function fetchParkingHistoryByVehicleNumber(vehicleNumber) {

}

module.exports = [generateAndStoreTicket, fetchTicketById, updateTicket, fetchParkingHistoryByVehicleNumber]