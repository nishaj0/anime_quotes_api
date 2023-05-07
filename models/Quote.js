const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const quotesSchema = new Schema({
   quote: {
      type: String,
      required: true,
   },
   character: {
      type: String,
      required: true,
   },
   anime: {
      type: String,
      required: true,
   },
   episode: {
      type: String,
      required: true,
   },
});

module.exports = mongoose.model("Quote", quotesSchema);
