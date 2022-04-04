const {v4} = require("uuid");
const { slotsState } = require("./script/script");
const {vehicleTypeHourlyrate} = require("../db/seeds/vehicle-type-hourly-rate.json");

function generateTicketId() {
    return v4();
}

function getCurrTime() {
    const date = new Date();
    return date.getTime();
}

function getEmptySlot(parkingLotName, vehicleType) {
    console.log({parkingLotName}, {vehicleType}, {slotsState});
    const stateArray = slotsState.parkingLotName.vehicleType;
    for (let i = 0; i < stateArray.length; i++) {
        if (stateArray[i] == false) {
            return i;
        }
    }
    throw ("Slot is not available");
}

function markSlotBooked(parkingLotName, vehicleType, slot) {
    slotsState[parkingLotName][vehicleType][slot] = true;
}

function markSlotUnBooked(parkingLotName, vehicleType, slot) {
    slotsState[parkingLotName][vehicleType][slot] = false;
}

function calculateAmount(ticket, exitTime) {
    const vehicleType = ticket.vehicleType;
    const ratePerHour = vehicleTypeHourlyrate[vehicleType];
    const hour = Math.ceil((exitTime - ticket.entryTime)/(1000*60*60));
    return ratePerHour*hour;
}

module.exports = {
    generateTicketId, getCurrTime, getEmptySlot, markSlotBooked,
    markSlotUnBooked, calculateAmount
};