var express = require("express");
var router = express.Router();
require("../models/connection");

const Cart = require("../models/carts");
const Booking = require("../models/bookings");

// *** URL pour le fetch : http://localhost:3000/cart

// Afficher tous les trips du panier
router.get("/", (req, res) => {
  Cart.find().then((cartData) => {
    res.json({ result: true, trips: cartData });
  });
});

// Ajouter les trips du panier au booking après click purchase puis vide le panier
router.post("/", (req, res) => {
  Cart.find().then((cartData) => {
    for (let trip of cartData) {
      const newBooking = new Booking({
        departure: trip.departure,
        arrival: trip.arrival,
        date: trip.date,
        price: trip.price,
      });
      newBooking.save().then();
    }
  });
  Cart.deleteMany().then(() => {
    res.send("Cart empty");
  });

  // Vide le panier
});

// TODO route delete d'un trip du cart
router.delete("/:id", (req, res) => {
  Cart.deleteOne({ _id: req.params.id }).then(() => {
    res.json({ result: true });
  });
});

module.exports = router;
