const wishlistModal = require("../../models/wishlist/wishlist.model.js");

exports.addToWishlistController = async (req, res) => {
  const userId = req.user._id;
  const user = req.user;
  try {
    if (user.role !== "USER") {
      return res.status(401).json({
        error: "Access denied",
        data: null,
        code: 401,
      });
    }
    const newWishlist = new wishlistModal({
      product: req.body.productId,
      user: userId,
    });
    await newWishlist.save();
  } catch (error) {
    console.log("Error: ", error);
    res
      .status(500)
      .json({ error: "something went wrong", data: null, code: 500 });
  }
};

exports.myWishlistController = async (req, res) => {
  const user = req.user;
  try {
    if (user.role !== "USER") {
      return res.status(401).json({
        error: "Access denied",
        data: null,
        code: 401,
      });
    }
    const myWishlist = await wishlistModal
      .find({ user: user._id })
      .populate("product");
    res.json({ data: myWishlist, code: 200 });
  } catch (error) {
    console.log("Error: ", error);
    res
      .status(500)
      .json({ error: "something went wrong", data: null, code: 500 });
  }
};
