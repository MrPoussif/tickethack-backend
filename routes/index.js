var express = require("express");
var router = express.Router();
const Trip = require("../models/trips");

// *** URL pour le fetch : http://localhost:3000/index

// Affiche les trips en fonction de la recherche
// TODOS ajouter la récupération des INPUTS de recherche
router.get("/", function (req, res) {
  Trip.find().then((tripsData) => {
    res.json({ result: true, trips: tripsData });
  });
});

module.exports = router;
