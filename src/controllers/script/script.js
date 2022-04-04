const parkingLotDetails = require("../../db/seeds/parking-lot-details.json");

// key: ticketId, value: json ticket details.
let tickets = new Map();
// key: vehicleNumber, value: arr of tickets json.
let vehicleDetails = new Map();

let slotsState = parkingLotDetails;
module.exports = [tickets, vehicleDetails, slotsState];