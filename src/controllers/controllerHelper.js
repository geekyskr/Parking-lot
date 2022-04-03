import { v4 as uuidv4 } from 'uuid';

function generateTicketId() {
    return uuidv4();
}

function getCurrTime() {
    const date = new Date();
    return date.getTime();
}

module.exports = { generateTicketId, getCurrTime };