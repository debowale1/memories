import express from 'express'
// import bodyParser from 'body-parser'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import postRouter from './routes/postRoutes.js'

dotenv.config()
const app = express()

const URI = process.env.MONGO_URI.replace('<PASSWORD>', process.env.PASSWORD)
mongoose.connect(URI).then(con => {
  console.log(`connected to ${con.connection.host}`)
})


app.use(express.json({ limit: '30mb'}))
app.use(express.urlencoded({ extended: true, limit: '30mb'}))
app.use(cors())


//mount routes
app.use('/posts', postRouter)

const port = process.env.PORT || 3030
app.listen(port, console.log(`server running on port ${port}`))