const mongoose = require("mongoose");
const Quote = require("../models/Quote");
const quotes = require("../models/quotes.json");

const saveQuotesToDB = async () => {
   try{
      await Quote.insertMany(quotes);
      console.log("all Quotes saved to DB");
   }catch(err){
      console.log(err);
   }
}

module.exports = saveQuotesToDB;