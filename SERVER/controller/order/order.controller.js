const OrderModel = require("../../models/order/order.model.js");

//buy now
exports.placeOrderController = async (req, res) => {
  const userId = req.user._id;
  const user = req.user;
  try {
    if (user.role !== "USER") {
      return res.status(401).json({
        error: "Access denied ",
        data: null,
        code: 401,
      });
    }
    const newOrder = new OrderModel({
      product: req.body.productId,
      orderDate: req.body.todaysDate,
      transactionId: req.body.transactionId,
      address: req.body.address,
      user: userId,
    });
    await newOrder.save();
    res.status(200).json({ data: newOrder, code: 200 });
  } catch (error) {
    console.log("error: ", error);
    res
      .status(500)
      .json({ error: "something went wrong", data: null, code: 500 });
  }
};

exports.myOrderController = async (req, res) => {
  const user = req.user;
  try {
    if (user.role !== "USER") {
      return res.status(401).json({
        error: "Access denied ",
        data: null,
        code: 401,
      });
    }
    const myOrders = await OrderModel.find({ user: user._id })
      .populate("product")
      .populate("user", "-password");
    res.status(200).json({ data: myOrders, code: 200 });
  } catch (error) {
    console.log("error: ", error);
    res
      .status(500)
      .json({ error: "something went wrong", data: null, code: 500 });
  }
};
