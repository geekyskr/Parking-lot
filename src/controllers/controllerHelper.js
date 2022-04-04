import { v4 as uuidv4 } from 'uuid';
const { slotsState } = require("./script/script");

function generateTicketId() {
    return uuidv4();
}

function getCurrTime() {
    const date = new Date();
    return date.getTime();
}

function getEmptySlot(parkingLotName, vehicleType) {
    const stateArray = slotsState[parkingLotName][vehicleType];
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

}

module.exports = {
    generateTicketId, getCurrTime, getEmptySlot, markSlotBooked,
    markSlotUnBooked, calculateAmount
};