# Parking-lot

**Routes explanation**

1. /parkVehicle: Request will contain parkingLotName, vehicleType, vehicleNumber. With all these
information we will generate a ticket and gave ticketId to user. We will store ticket in database
as ticketId as primary key.

2. /exitVehicle: Request will contain ticketId. we will look in database for information for that particular ticketId and tell the amount to user for that duration.

3. /parkingHistory: Request will contain vehicleNumber. Get all tickets for vehicle number and then all history of vehicle.

**states of ticket:**

Creation: At the time of parking vehicle. we will store ticketId (Generated by uuid)
vehicleNumber, parkingLotName, vehicleType, entryTime. This data will live in ticket table.

Updation: At the time of exit vehicle. we will update exitTime and amount with actual data which
was initially 0 at the creation time. After this we will append this ticket to vehicalNumber in
vehicleDetails table.

Deletion (Optional): We can delete the ticket from ticket table because it gets associated with
respective vehicle number and there won't be any further changes in data.

**vehicleDetails table:**
We will store array of tickets with every vehicle number and after every succesful parking lot
process (park and exit vehicle), we will append ticket to vehicle number.