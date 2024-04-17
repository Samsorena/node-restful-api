require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const productRoute = require("./routes/productRoute");
const errorMiddleware = require("./middleware/errorMiddleware.js");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());

app.use(cors());

app.use(errorMiddleware);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Middleware to apply basic authentication
const checkAuth = require("./middleware/authMiddleware");

// Apply the authentication middleware to routes that require authentication
app.use("/api/products", checkAuth);

app.use("/api/products", productRoute);

app.get("/", (req, res) => {
  res.send("Hello Node API");
});

app.get("/api/protected", (req, res) => {
  res.send("Hi, This API is protected by Basic Auth");
});

mongoose
  .connect(`mongodb+srv://${process.env.MONGO_DB}`)
  .then(() => {
    console.log("Conneced to MongoDB");
    app.listen(3000, () => {
      console.log("Node API app is running on port 3000");
    });
  })
  .catch((error) => {
    console.log(error);
  });
