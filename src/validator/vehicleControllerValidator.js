function validateRequestForParkAVehicle(reqPayload) {
    validateReqPayloadPresence(reqPayload);
    if (!reqPayload.parkingLotName) {
        throw ("parking lot name is missing in request");
    } else if (!reqPayload.vehicleType) {
        throw ("vehicle type missing");
    } else if (!reqPayload.vehicleNumber) {
        throw ("vehicle number missing");
    }
}

function validateRequestExitAVehicle(reqPayload) {
    validateReqPayloadPresence(reqPayload);
    if (!reqPayload.ticketId) {
        throw ("ticketId is missing in request");
    }
}

function validateRequestParkingHistory(reqPayload) {
    validateReqPayloadPresence(reqPayload);
    if (!reqPayload.vehicleNumber) {
        throw ("vehicleNumber is missing in request");
    }
}

function validateReqPayloadPresence(reqPayload) {
    if (!reqPayload) {
        throw ("request payload missing");
    }
}

export {
    validateRequestForParkAVehicle, validateRequestExitAVehicle,
    validateRequestParkingHistory
};