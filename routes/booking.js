var express = require("express");
var router = express.Router();
require("../models/connection");
const Trip = require("../models/trips");
const Booking = require("../models/bookings");

// Afficher tous les trips du booking (les purchased)
router.get("/", (req, res) => {
  Booking.find().then((bookingData) => {
    res.json({ result: true, trips: bookingData });
  });
});

module.exports = router;
