const Quote = require("../models/Quote");

const getAllQuotes = async (req, res) => {
   const allQuotes = await Quote.find();
   if (!allQuotes) return res.status(204).send("No quotes found");
   console.log(req.user);
   res.json(allQuotes);
};

const createQuote = async (req, res) => {
   const { quote, character, anime, episode } = req.body;
   if (!quote || !character || !anime || !episode)
      return res.status(400).send("Missing data");

   try {
      const duplicateQuote = await Quote.findOne({ quote: quote }).exec();
      if (duplicateQuote) return res.status(400).send("Quote already exists");
      const result = await Quote.create({
         quote,
         character,
         anime,
         episode,
      });

      console.log(result);
      res.json(result);
   } catch (err) {
      console.error(err);
   }
};

// const removeQuote = (req, res) => {
//    const id = req.body.id;
//    if (!id) return res.status(400).send("Missing ID");

//    const quote = quotesDB.quotes.find((q) => q._id === id);
// };

module.exports = { getAllQuotes, createQuote };
