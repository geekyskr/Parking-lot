import { v4 } from "uuid";
import vehicleTypeHourlyrate from "../db/seeds/vehicle-type-hourly-rate.json" assert {type: "json"};
const parkingLotDetailsPath = "/home/sunilrk/Documents/Parking-lot/src/db/seeds/parking-lot-details.json";
import { readFile, readFileSync, writeFile } from "fs";


function generateTicketId() {
    return v4();
}

function getCurrTime() {
    const date = new Date();
    return date.getTime();
}

function getEmptySlot(parkingLotName, vehicleType) {
    try {
        const result = readFileSync(parkingLotDetailsPath, "utf-8");
        const currState = JSON.parse(result);
        const stateArray = currState[parkingLotName][vehicleType]
        for (let i = 0; i < stateArray.length; i++) {
            if (stateArray[i] == false) {
                    return i;
                }
            }
        throw ("Slot is not available");
    } catch(error) {
        console.log(error);
    }
}

function updateParkingLotDetails(parkingLotName, vehicleType, slot, placeHolder) {
    readFile(parkingLotDetailsPath, "utf-8", (err, data)=>{
        if(err) {
            console.log(err);
        }
        else {
            const currState = JSON.parse(data);
            const stateArray = currState[parkingLotName][vehicleType];
            stateArray[slot] = placeHolder;
            writeFile(parkingLotDetailsPath, JSON.stringify(currState, null, 2), (err) => {
                if(err) console.log("Failed to update file", err);
            });
        }
    })
}

function markSlotBooked(parkingLotName, vehicleType, slot) {
    updateParkingLotDetails(parkingLotName, vehicleType, slot, true);
}

function markSlotUnBooked(parkingLotName, vehicleType, slot) {
    updateParkingLotDetails(parkingLotName, vehicleType, slot, false);
}

function calculateAmount(ticket, exitTime) {
    const vehicleType = ticket.vehicleType;
    const ratePerHour = vehicleTypeHourlyrate[vehicleType];
    const hour = Math.ceil((exitTime - ticket.entryTime) / (1000 * 60 * 60));
    return ratePerHour * hour;
}

export {
    generateTicketId, getCurrTime, getEmptySlot, markSlotBooked,
    markSlotUnBooked, calculateAmount
}