const router = require("express").Router();

//controllers

const {
  addProductController,
  fetchProductController,
  deleteProductController,
  fetchUserProductController,
} = require("../../controller/product/product.controller.js");

const auth = require("../../middlewares/auth.js");

//routes

//add
router.post("/api/add/product", auth, addProductController);

//update
router.put("/api/update/product", auth, fetchProductController);

//delete
router.delete("/api/remove/product", auth, deleteProductController);

//fatch
router.get("/api/get/products", auth, fetchUserProductController);

//fatch
router.get("/api/user/get/products", fetchUserProductController);

module.exports = router;
