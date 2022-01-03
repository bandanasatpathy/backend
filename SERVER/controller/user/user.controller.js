const UserModal = require("../../models/user/user.model.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "../../.env" });

exports.signupController = async (request, response) => {
  const isAdmin = request.query.isAdmin;
  const $isAdmin = isAdmin === "true" ? true : false;

  try {
    if (!$isAdmin) {
      const isExist = await UserModal.findOne({ email: request.body.email });
      if (isExist) {
        return response.status(400).json({
          error: "user already exist",
          data: null,
          code: 400,
        });
      }

      const newUser = new UserModal({
        email: request.body.email,
        password: request.body.password,
        role: "USER",
      });

      const salt = await bcrypt.genSalt();
      const hashedPssword = await bcrypt.hash(newUser.password, salt);
      newUser.password = hashedPssword;
      await newUser.save();
      newUser.password = undefined;
      response.json({ data: newUser, err: null, code: 200 });
    } else {
      const isExist = await UserModal.findOne({ email: request.body.email });
      if (isExist) {
        return response.status(400).json({
          error: "Admin already exists",
          data: null,
          code: 400,
        });
      }

      const newUser = new UserModal({
        email: request.body.email,
        password: request.body.password,
        role: "ADMIN",
      });

      const salt = await bcrypt.genSalt();
      const hashedPssword = await bcrypt.hash(newUser.password, salt);
      newUser.password = hashedPssword;
      await newUser.save();
      newUser.password = undefined;
      response.json({ data: newUser, err: null, code: 200 });
    }
  } catch (error) {
    console.log("Error:", error.message);
    response.status(500).json({
      error: "something went wrong",
      data: null,
      code: 500,
    });
  }
};

exports.signinController = async (request, response) => {
  try {
    const user = await UserModal.findOne({ email: request.body.email });
    if (!user)
      return response
        .status(400)
        .json({ error: "invalid user", data: null, code: 404 });

    const comparePassword = await bcrypt.compare(
      request.body.password,
      user.password
    );

    if (!comparePassword)
      return response
        .status(400)
        .json({ error: "invalid credential", data: null, code: 404 });

    const token = await jwt.sign(
      { _id: user._id.toString()}, //payload
      process.env.SECRET_KEY
    );

    user.password = undefined;
    response.json({ data: { user, token }, err: null, code: 200 });
  } catch (error) {
    console.log("Error:", error.message);
    response.json({ error: "Something went wrong", data: null, code: 500 });
  }
};
