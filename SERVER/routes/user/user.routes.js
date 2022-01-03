const router = require("express").Router();

//controllers

const {
  signinController,
  signupController,
} = require("../../controller/user/user.controller.js");

//routes
//signin controller

router.post("/api/signin", signinController);

//signup
router.post("/api/signup", signupController);

router.post("/api/admin/signup", signupController);

module.exports = router;
