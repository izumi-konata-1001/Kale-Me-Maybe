// Setup Express
const express = require("express");
const cors = require("cors");

const app = express();
const port = 3000;

// setup dotenv
require("dotenv").config();
app.use(cors());

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
app.use("/api", require("./routes/users.js"));
app.use("/api", require("./routes/recipes.js"));
app.use("/api", require("./routes/histories.js"));
app.use("/api", require("./routes/collections.js"));
app.use("/api", require("./routes/ingredients.js"));


// Start the server running.
app.listen(port, function () {
  console.log(`App listening on port ${port}!`);
});
