require("dotenv").config({ path: "../.env" });
const User = require("../models/user/user.model.js");
const jwt = require("jsonwebtoken");

//authentication for protected routes

const auth = async (req, res,next) => {
  try {
    const Token = req.header("Authorization");
    const token = Token.replace("Bearer ", "");

    if (!token) {
      const error = "invalid authorization token !!";
      res.json({ error, code: 404 });
    }

    const decode = await jwt.verify(token, process.env.SECRET_KEY);
    console.log("decode: ", decode);
    const user = await User.findOne({ _id: decode._id });

    if (!user) {
      const error = "invalid user";
      res.json({ error, code: 404 });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log("error: ", error);
    res.json({ error: "something went wrong", code: 404 });
  }
};

module.exports = auth;
