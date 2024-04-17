const mongoose = require("mongoose");

const Product = require("../models/productModel");
const asyncHandler = require("express-async-handler");

// Get all products
const getAllProducts = asyncHandler(async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

// To update (patch) a product to database
const patchProduct = asyncHandler(async (req, res) => {
  let status;
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      status = 400;
      throw new Error(`Product ${id} is not valid`);
    }
    console.log(req.body);

    const update = { name: req.body.name };
    const filter = { _id: id };

    const product = await Product.findOneAndUpdate(filter, update);
    //IF cannot find any product with that id in database
    if (!product) {
      status = 404;
      throw new Error(`Cannot find any product with ID ${id} `);
    }
    const updatedProduct = await Product.findById(id);
    res.status(200).json(updatedProduct);
  } catch (error) {
    status = status || 500;
    res.status(status).json({ error: error.message });
  }
});

// To get(find) a product from database by id
const findProduct = asyncHandler(async (req, res) => {
  let status;

  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      status = 400;
      throw new Error(`Product ${id} is not valid`);
    }
    const product = await Product.findById(id);
    res.status(200).json(product);
  } catch (error) {
    status = status || 500;
    res.status(status).json({ error: error.message });
  }
});

// To create(add) a product to database
const createProduct = asyncHandler(async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//Delete a product from database by id
const deleteProduct = asyncHandler(async (req, res) => {
  let status;
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      status = 400;
      throw new Error(`Product ${id} is not valid`);
    }
    const product = await Product.findByIdAndDelete(id);
    //IF cannot find any product with that id in database
    if (!product) {
      status = 404;
      throw new Error(`Cannot find any product with ID ${id} `);
    }
    res.status(200).json(product);
  } catch (error) {
    status = status || 500;
    res.status(status).json({ error: error.message });
  }
});

module.exports = {
  getAllProducts,
  patchProduct,
  findProduct,
  deleteProduct,
  createProduct,
};
