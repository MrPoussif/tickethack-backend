var express = require("express");
var router = express.Router();
require("../models/connection");
const Trip = require("../models/trips");
const Cart = require("../models/carts");
const Booking = require("../models/bookings");

// *** Afficher tous les trips du panier
router.get("/", (req, res) => {
  Cart.find().then((cartData) => {
    res.json({ result: true, trips: cartData });
  });
});

// *** Ajouter les trips du panier au booking après click purchase puis vide le panier
router.post("/", (req, res) => {
  // ajouter une boucle pour ajouter chaque trip au booking
  // ! corriger la boucle, ne parcoure pas la DB actuellement
  // for (let trip of cart) {
  // }
  const newBooking = new Booking({
    departure: req.body.departure,
    arrival: req.body.arrival,
    date: new Date(req.body.date),
    price: req.body.price,
  });
  newBooking.save().then((tripData) => {
    res.json({ result: true, msg: "New trip purchased!", trip: tripData });
  });
  // Vide le panier
  Cart.deleteMany().then(() => {
    res.send("Cart empty");
  });
});
// TODOS *** route delete sur chaque trip pour les boutons suppr
router.delete();

module.exports = router;
