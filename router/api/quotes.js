const express = require("express");
const router = express.Router();
const quotesController = require("../../controllers/quotesController");
const ROLES_LIST = require("../../config/roles_list");
const verifyRoles = require("../../middleware/verifyRoles");

router
   .route("/")
   .get(quotesController.getAllQuotes)
   .post(
      verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor),
      quotesController.createQuote
   )
   .delete(verifyRoles(ROLES_LIST.Admin), quotesController.removeQuote);

router.route("/:quoteId").get(quotesController.getQuoteByID);

module.exports = router;
