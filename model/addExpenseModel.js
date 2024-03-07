const mongoose = require("mongoose")

const addExpenseSchema = mongoose.Schema(
    {
        title: { type: String, required: true },
        amount: { type: Number, required: true },
        type: { type: String, required: true },
        category: { type: String, requied: true },
        expensefor: { type: String, requied: true },
        email: { type: String, requied: true }


    },
    { timestamps: true }
)

const addExpenseModel = mongoose.model("addingExpenseList", addExpenseSchema)

module.exports = addExpenseModel