const express = require("express")
const addExpenseModel = require("../model/addExpenseModel")
const router = express.Router()

router.post("/adding-expenses", async (req, res) => {
    try {
        const newExpense = new addExpenseModel(req.body)
        await newExpense.save()
        res.send("Added Successfully")
    }
    catch (err) {
        res.send("Error")
    }
})

router.post("/getting-expenses", async (req, res) => {
    try {
        const allExpenses = await addExpenseModel.find({ email: req.body.email })
        res.send(allExpenses)
    }
    catch (err) {
        res.send(err)
    }

})

router.post("/deleting-expenses", async (req, res) => {
    try {
        const newExpense = await addExpenseModel.findOneAndDelete({ _id: req.body.id })
        res.send("Deleted Successfully")
    }
    catch (err) {
        res.send(err)
    }
})

router.post("/updating-expenses",async(req,res)=>{
    try{
        const update = await addExpenseModel.findOneAndUpdate({ _id: req.body.id }, req.body)
        res.send("Updated Successfully")
    }
    catch(err){
        res.send(err)
    }
})

module.exports = router