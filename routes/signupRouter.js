const express = require("express")
const signupModel = require("../model/signupModel")
const router = express.Router()

router.post("/creating-users", async (req, res) => {
    try {
        const newUser = new signupModel(req.body)
        await newUser.save()
        res.send("User Created Successfully")
    }
    catch (err) {
        res.send("Error")
    }
})

router.post("/login", async (req, res) => {
    try {
        const loginUser = await signupModel.findOne({ email: req.body.email })
        if (loginUser) {
            res.send("Login Successfully")
        }
        else
        {
            res.send("User Not Exists")
        }
    }
    catch(err){
        res.send("Error")
    }
})

module.exports = router