const express = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const cors = require("cors")
const signupRouter = require("./routes/signupRouter")
const addExpenseRouter = require("./routes/addExpenseRouter")

dotenv.config()
const app = express()
app.use(cors())
app.use(express.json())
app.use("/users", signupRouter)
app.use("/expenses", addExpenseRouter)

const PORT = process.env.PORT
mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log("Mongoose is Connected")
        app.listen(PORT, () => console.log("Server is Connected on the PORT", PORT))
    })
    .catch((err) => { console.log(err) })