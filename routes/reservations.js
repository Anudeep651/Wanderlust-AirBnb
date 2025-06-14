const express = require("express");
const router = express.Router({ mergeParams: true });
const Reservation = require("../models/reservation");
const Listing = require("../models/listing");
const { isLoggedIn } = require("../middleware");
const wrapAsync = require("../utils/WrapAsync");


router.post("/", isLoggedIn,  wrapAsync(async (req, res) => {
    const { id } = req.params;
    const { checkIn, checkOut, guests } = req.body.reservation;

    const reservation = new Reservation({
        listing: id,
        user: req.user._id,
        checkIn,
        checkOut,
        guests,
       
    });

    await reservation.save();

    const listing = await Listing.findById(id);
    listing.reservations.push(reservation);
    await listing.save();

    req.flash("success", "Reservation created successfully!");
    res.redirect(`/listings/${id}`);
}));

// Cancel Reservation Route
router.delete("/:reservationId", isLoggedIn,  wrapAsync(async (req, res) => {
    const { id, reservationId } = req.params;

     // Update the reservation status to "canceled"
     await Reservation.findByIdAndUpdate(reservationId, { status: "canceled" });

    // Remove the reservation reference from the listing
    await Listing.findByIdAndUpdate(id, { $pull: { reservations: reservationId } });

    req.flash("success", "Reservation canceled successfully!");
    res.redirect(`/listings/${id}`);
}));

module.exports = router;