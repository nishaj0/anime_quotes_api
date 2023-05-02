const express = require("express");
const router = express.Router();
const quotesController = require("../../controllers/quotesController");

router
   .route("/")
   .get(quotesController.getAllQuotes)
   .post(quotesController.createQuote);

module.exports = router;
