const mongoose = require("mongoose")

const userSchema = mongoose.Schema(
    {
        name: { type: String, required: true },
        mobile: { type: Number, required: true },
        email: { type: String, required: true },
        password: { type: String, required: true }
    },
    { timestamps: true }
)

const signupModel = mongoose.model("moneyusers", userSchema)

module.exports = signupModel