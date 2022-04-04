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
    slot: {
        type: Number
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