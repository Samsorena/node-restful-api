const express = require("express");
const Product = require("../models/productModel");
const {
  getAllProducts,
  patchProduct,
  findProduct,
  deleteProduct,
  createProduct,
} = require("../controllers/productController");

const router = express.Router();

//Routes

// To get all products from database
router.get("/", getAllProducts);

// To update (patch) a product to database
router.patch("/:id", patchProduct);

// To get a product from database by id
router.get("/:id", findProduct);

// To create(add) a product to database
router.post("/", createProduct);

//Delete a product from database
router.delete("/:id", deleteProduct);

module.exports = router;
