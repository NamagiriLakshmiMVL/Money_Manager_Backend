const express = require("express");
const signupModel = require("../model/signupModel");
const router = express.Router();
const genPassword = require("../helper.js");
const bcrypt = require("bcryptjs");

router.post("/creating-users", async (req, res) => {
  try {
    const { name, mobile, email, password } = req.body;

    const userExists = await signupModel.findOne({ email: email });
    if (userExists) {
      res.send("User Already Exists");
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
        res.send("User Created Successfully");
        
  } catch (err) {
    res.send("Error");
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
        res.send("Invalid Credentials");
        return;
      }
      res.send("Login Successfully");
    }
  } catch (err) {
    res.send("Error");
  }
});

module.exports = router;
