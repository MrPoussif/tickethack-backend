var express = require("express");
var router = express.Router();
require("../models/connection");
const Trip = require("../models/trips");
const Cart = require("../models/carts");
const Booking = require("../models/bookings");

// Affiche les trips en fonction de la recherche
// router.get("/", (req, res) => {
//   Trip.find();
// });

// Ajoute trip au panier si click book button
router.post("/", (req, res) => {
  const newCart = new Cart({
    departure: req.body.departure,
    arrival: req.body.arrival,
    date: new Date(req.body.date),
    price: req.body.price,
  });
  newCart.save().then(() => {
    res.send("Trip added to cart");
  });
});

module.exports = router;
