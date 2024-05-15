// Setup Express
const express = require("express");

const app = express();
const port = process.env.PORT || 3000;

//Set up cross-domain access
const cors = require("cors");
app.use(cors());

// setup dotenv
require("dotenv").config();

// Setup body-parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Setup cookie-parser
const cookieParser = require("cookie-parser");
app.use(cookieParser());

// Setup bcrypt
const bcrypt = require("bcrypt");

// Make the "public" folder available statically
const path = require("path");
app.use(express.static(path.join(__dirname, "public")));

// Setup routes
app.use("/api", require("./routes/users.js"));
app.use("/api", require("./routes/recipes.js"));
app.use("/api", require("./routes/browsing-histories.js"));
app.use("/api", require("./routes/ingredients.js"));
app.use("/api", require("./routes/scores.js"));
app.use("/api", require("./routes/search-histories.js"));
app.use("/api/collection", require("./routes/collections.js"));
app.use("/api/favorites", require("./routes/favorites.js"));
app.use("/api/discover", require("./routes/discover.js"));

// Start the server running.
//app.listen(port, function () {
//  console.log(`App listening on port ${port}!`);
//});

if(require.main === module) {
  app.listen(port, function () {
    console.log(`App listening on port ${port}!`);
  });
}

module.exports = app;