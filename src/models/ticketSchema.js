const ticketSchema = new Schema ({
    ticketId: {
        type: String
    },
    vehicleNumber: {
        type: String
    },
    parkingLotName: {
        type: String
    },
    vehicleType: {
        type: String
    },
    entryTime: {
        type: Number
    },
    exitTime: {
        type: Number
    },
    amount: {
        type: Number
    }
});