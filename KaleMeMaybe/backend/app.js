// Setup Express
const express = require("express");
const app = express();
const port = 3000;

// setup dotenv
require("dotenv").config();

// Setup body-parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Setup cookie-parser
const cookieParser = require("cookie-parser");
app.use(cookieParser());

// Make the "public" folder available statically
const path = require("path");
app.use(express.static(path.join(__dirname, "public")));

// Setup routes
app.use("/api", require("./routes/homepage-routes.js"));

// Start the server running.
app.listen(port, function () {
  console.log(`App listening on port ${port}!`);
});
