var express = require("express");
var router = express.Router();
const { checkBody } = require("../modules/checkBody");
const Trip = require("../models/trips");
const Cart = require("../models/carts");

// *** URL pour le fetch : http://localhost:3000/index

// Affiche les trips en fonction de la recherche
// TODOS Coté frontend :
// fetch('http://localhost:3000/index', {
// 		method: 'POST',
// 		headers: { 'Content-Type': 'application/json' },
// 		body: JSON.stringify({ departure,arrival,date }),
// TODOS ajouter RegExp pour la casse des inputs
router.post("/search", function (req, res) {
  const fields = ["departure", "arrival", "date"];
  const start = new Date(req.body.date);
  const end = new Date(req.body.date);
  end.setDate(end.getDate() + 1);
  if (checkBody(req.body, fields) === false) {
    res.json({ result: false, error: "Missing or empty fields" });
  } else {
    Trip.find({
      departure: { $regex: new RegExp(req.body.departure, "i") },
      arrival: { $regex: new RegExp(req.body.arrival, "i") },
      date: { $gte: start, $lt: end },
    }).then((tripsData) => {
      res.json({ result: true, trips: tripsData });
    });
  }
});

// Ajoute un trip au cart
router.post("/", (req, res) => {
  const { tripId } = req.body;

  if (!tripId) {
    return res.json({ result: false, error: "Missing tripId" });
  }

  Trip.findById(tripId)
    .then((trip) => {
      if (!trip) {
        return res.json({ result: false, error: "Trip not found" });
      }

      const newCart = new Cart({
        departure: trip.departure,
        arrival: trip.arrival,
        date: trip.date,
        price: trip.price,
        tripId: trip._id,
      });

      newCart.save().then(() => {
        res.json({ result: true, msg: "Trip added to cart" });
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ result: false, error: "Server error" });
    });
});

module.exports = router;
