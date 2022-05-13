const allTicketPath = "/home/sunilrk/Documents/Parking-lot/src/models/allTickets.json";
const vehicleHistory = "/home/sunilrk/Documents/Parking-lot/src/models/vehicleHistory.json";
import { readFile, readFileSync, writeFile } from "fs";

function generateAndStoreTicket(reqPayload, ticketId, entryTime, slot) {
    let ticket = reqPayload;
    ticket.ticketId = ticketId;
    ticket.entryTime = entryTime;
    ticket.slot = slot
    readFile(allTicketPath, "utf-8", (err, data)=>{
        if(err) {
            console.log(err);
        }
        else {
            const currState = JSON.parse(data);
            console.log(currState);
            currState[ticketId] = ticket;
            writeFile(allTicketPath, JSON.stringify(currState, null, 2), (err) => {
                if(err) console.log("Failed to update file", err);
            });
        }
    })
    return ticket.ticketId
}

function fetchTicketById(ticketId) {
    try {
        const result = JSON.parse(readFileSync(allTicketPath, "utf-8"));
        return result[ticketId];
    } catch (error) {
        console.log(error);
    }
}

function updateTicket(ticket, amount, exitTime) {
    ticket.exitTime = exitTime;
    ticket.amount = amount;
    return ticket;
}

function fetchParkingHistoryByVehicleNumber(vehicleNumber) {
    try {
        const result = JSON.parse(readFileSync(vehicleHistory, "utf-8"));
        return result[vehicleNumber];
    } catch (error) {
        console.log(error);
    }
}

function appendTicketToVehicleDetails(vehicleNumber, updatedTicket) {
    readFile(vehicleHistory, "utf-8", (err, data)=>{
        if(err) {
            console.log(err);
        }
        else {
            const currState = JSON.parse(data);
            console.log(currState[vehicleNumber]);
            if(currState[vehicleNumber] == undefined) {
                currState[vehicleNumber] = [];
            }
            let vehicleDetailsArray = currState[vehicleNumber];
            let index = vehicleDetailsArray.length;
            currState[vehicleNumber][index] = updatedTicket;
            console.log(updatedTicket, currState[vehicleNumber][index], index);
            writeFile(vehicleHistory, JSON.stringify(currState, null, 2), (err) => {
                if(err) console.log("Failed to update file", err);
            });
        }
    })
}

export { generateAndStoreTicket, fetchTicketById, updateTicket,
    fetchParkingHistoryByVehicleNumber, appendTicketToVehicleDetails }