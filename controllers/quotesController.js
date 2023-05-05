const quotesDB = {
   quotes: require("../models/quotes.json"),
   setQuotes: (data) => (quotesDB.quotes = data),
};

const getAllQuotes = (req, res) => {
   const allQuotes = quotesDB.quotes;
   if (!allQuotes) return res.status(204).send("No quotes found");
   console.log(req.user);
   res.json(allQuotes);
};

const createQuote = (req, res) => {
   const { quote, character, anime, episode } = req.body;
   if (!quote || !character || !anime || !episode)
      return res.status(400).send("Missing data");

   const newQuote = {
      quote,
      character,
      anime,
      episode,
   };
   const duplicateQuote = quotesDB.quotes.find(
      (q) => q.quote === newQuote.quote
   );

   if (duplicateQuote) return res.status(400).send("Quote already exists");
   quotesDB.setQuotes([...quotesDB.quotes, newQuote]);

   console.log(newQuote);
   res.json(newQuote);
};

// const removeQuote = (req, res) => {
//    const id = req.body.id;
//    if (!id) return res.status(400).send("Missing ID");

//    const quote = quotesDB.quotes.find((q) => q._id === id);
// };

module.exports = { getAllQuotes, createQuote };
