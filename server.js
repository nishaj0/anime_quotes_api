require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const errorHandler = require("./middleware/errorHandler");
const router = require("./router/auth");

const PORT = process.env.PORT || 3001;

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// routes
app.use("/register", require("./router/register"));
app.use("/auth", require("./router/auth"));
app.use("/refresh", require("./router/refresh"));

app.use("/quotes", require("./router/api/quotes"));

// error handler
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
