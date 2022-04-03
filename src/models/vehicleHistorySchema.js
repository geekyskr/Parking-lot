const vehicleHistorySchema = new Schema ({
    history: [{
        ticket: {
            type: ObjectId,
            ref: ticketSchema
        }
    }]
})