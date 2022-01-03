const router = require("express").Router();

//controllers
const {
  placeOrderController,
  myOrderController,
} = require("../../controller/order/order.controller.js");

const auth = require("../../middlewares/auth.js");

//routes

router.post("/api/place/order", auth, placeOrderController);

router.get("/api/my/orders", auth, myOrderController);

module.exports = router;
