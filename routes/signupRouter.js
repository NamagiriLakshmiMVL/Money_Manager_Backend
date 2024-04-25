const express = require("express");
const signupModel = require("../model/signupModel");
const router = express.Router();
const genPassword = require("../helper.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post("/creating-users", async (req, res) => {
  try {
    const { name, mobile, email, password } = req.body;

    const userExists = await signupModel.findOne({ email: email });
    if (userExists) {
      res.send({ message: "User Already Exists", token: token });
      return;
    }
    const hashedPassword = await genPassword(password);
    let newUser = new signupModel({
      password: hashedPassword,
      email,
      mobile,
      name,
    });

    await newUser.save();
    const token = jwt.sign({ email: email }, process.env.SECRET_KEY);
    res.send({ message: "User Created Successfully", token: token });
  } catch (err) {
    res.send({ message: "Error" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { password } = req.body;
    const loginUser = await signupModel.findOne({ email: req.body.email });
    if (loginUser) {
      const storedDbPassword = loginUser.password;
      const isPasswordMatch = await bcrypt.compare(password, storedDbPassword);
      if (!isPasswordMatch) {
        res.send({ message: "Invalid Credentials" });
        return;
      }
      const token = jwt.sign({ id: loginUser._id }, process.env.SECRET_KEY);
      res.send({ message: "Login Successfully", token: token });
    } else {
      res.send({ message: "Invalid Credentials" });
      return;
    }
  } catch (err) {
    res.send({ message: "Error" });
  }
});

module.exports = router;
