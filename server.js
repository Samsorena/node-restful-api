const express = require("express");
const mongoose = require("mongoose");
const Product = require("./models/productModel");
const app = express();

app.use(express.json());
//app.use(express.urlencoded({ extended: false }));

//Routes

// To update (patch) a product to database
app.patch("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log(req.body);

    const update = { name: req.body.name };
    const filter = { _id: id };

    const product = await Product.findOneAndUpdate(filter, update);
    //IF cannot find any product with that id in database
    if (!product) {
      return res
        .status(404)
        .json({ message: `Cannot find any product with ID ${id} ` });
    }
    const updatedProduct = await Product.findById(id);
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// To get all products from database
app.get("/products", async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// To get a product from database by id
app.get("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);
    res.status(200).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

// To create(add) a product to database
app.post("/products", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(200).json(product);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

//Delete a product from database
app.delete("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    //IF cannot find any product with that id in database
    if (!product) {
      return res
        .status(404)
        .json({ message: `Cannot find any product with ID ${id} ` });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
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
