const ProductModal = require("../../models/product/product.model.js");
//const { cloudinary } = require("../../cloudinary");

exports.addProductController = async (req, res) => {
  const user = req.user;
  try {
    if (user.role !== "ADMIN") {
      return res.json({ error: "Access denied", data: null, code: 401 });
    }

    //const uploadResponse = await cloudinary.uploader.upload(req.body.picture, {
    //  upload_preset: "attachments",
    //});

    const product = new ProductModal({
      productName: req.body.productName,

      price: req.body.price,
      //picture: uploadResponse.secure_url,
      description: req.body.description,
    });

    await product.save();

    res.json({ data: product, err: null, code: 200 });
  } catch (err) {
    console.log("err: ", err);
    res.json({ error: "Something went wrong", data: null, code: 500 });
  }
};

// get product list
exports.fetchProductController = async (req, res) => {
  const user = req.user;
  try {
    if (user.role !== "ADMIN") {
      return res.status(401).json({
        error: "Access denied ",
        data: null,
        code: 401,
      });
    }
    const products = await ProductModal.find({});
    res.json({ data: products, error: null, code: 200 });
  } catch (error) {
    console.log("error: ", error);
    res.json({ error: "something went wrong", data: null, code: 500 });
  }
};

exports.fetchUserProductController = async (req, res) => {
  const user = req.user;
  try {
    const products = await ProductModal.find({});
    res.json({ data: products, error: null, code: 200 });
  } catch (error) {
    console.log("error =>", error);
    res
      .status(500)
      .json({ error: "something went wrong", data: null, code: 500 });
  }
};

// delete product item by admin
exports.deleteProductController = async (req, res) => {
  const user = req.user;
  const productId = req.query.productId;
  try {
    if (user.role !== "ADMIN") {
      return res.json({
        error: "Access denied",
        data: null,
        code: 401,
      });
    }
    await ProductModal.findByIdAndDelete({ _id: productId });
    res.json({
      data: { message: "Successfully deleted" },
      error: null,
      code: 200,
    });
  } catch (error) {
    console.log("Error: ", error.message);
    res.json({ error: "something went wrong", data: null, code: 500 });
  }
};

//update product item by admin
exports.fetchProductController = async (req, res) => {
  const user = req.user;
  const productId = req.query.productId;
  try {
    if (user.role !== "ADMIN") {
      return res.json({
        error: "Access denied",
        data: null,
        code: 401,
      });
    }
    await ProductModal.findByIdAndUpdate({ _id: productId });
    res.json({
      data: { message: "Successfully edited" },
      error: null,
      code: 200,
    });
  } catch (error) {
    console.log("Error: ", error.message);
    res.json({ error: "something went wrong", data: null, code: 500 });
  }
};
