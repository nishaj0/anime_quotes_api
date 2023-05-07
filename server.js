require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const verifyJWT = require("./middleware/verifyJWT");
const errorHandler = require("./middleware/errorHandler");
const router = require("./router/auth");
const connectDB = require("./config/dbConn");

// Connect to MongoDB
connectDB();

const PORT = process.env.PORT || 3001;

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// routes
app.use("/register", require("./router/register"));
app.use("/auth", require("./router/auth"));
app.use("/refresh", require("./router/refresh"));
app.use("/logout", require("./router/logout"));

app.use(verifyJWT);
app.use("/quotes", require("./router/api/quotes"));

// error handler
app.use(errorHandler);

mongoose.connection.once("open", () => {
   console.log("Connected to MongoDB");
   
   // saving all data from quotes.json to mongoDB
   // ? this is only needed once
   // app.use(require("./config/saveQuotesToDB"));

   app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
});
