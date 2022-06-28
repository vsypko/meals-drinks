import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import dotenv from "dotenv"

import authRouter from "./authRouter.js"
// import { cookie } from 'express-validator'

dotenv.config()

const PORT = process.env.PORT || 5000

var corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200, // For legacy browser support
}

const app = express()
app.use(cors(corsOptions))
// app.use(cors())
app.use(express.json())
// app.use(cookieParser())

app.use("/auth", authRouter)

const start = () => {
  try {
    mongoose.connect(
      "mongodb://localhost:27017/vsDB",
      //`mongodb+srv://vsdev:${process.env.API_PASSWORD}@sandbox.zvnd5.mongodb.net/${process.env.API_KEY}?retryWrites=true&w=majority`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    )
    app.listen(PORT, () => {
      console.log(`Server started on PORT: ${PORT}`)
    })
  } catch (e) {
    console.log(e)
  }
}
start()
