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
router.get("/", function (req, res) {
  const fields = ["departure", "arrival", "date"];
  if (checkBody(req.body, fields) === false) {
    res.json({ result: false, error: "Missing or empty fields" });
  } else {
    Trip.find({
      departure: { $regex: req.body.departure, $options: "i" },
      arrival: { $regex: req.body.arrival, $options: "i" },
      // TODO sûrement faire RegExp avec la date pour chercher sans l'horaire
      date: req.body.date,
    }).then((tripsData) => {
      res.json({ result: true, trips: tripsData });
    });
  }
});

// Ajoute un trip au cart
router.post("/", function (req, res) {
  const newCart = new Cart({
    departure: req.body.departure,
    arrival: req.body.arrival,
    date: req.body.date,
    price: req.body.price,
  });
  newCart.save().then(() => {
    res.json({ result: true, msg: "New trip added to cart" });
  });
});

module.exports = router;

// cityName: { $regex: new RegExp(req.params.cityName, "i") }
