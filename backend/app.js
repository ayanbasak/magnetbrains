import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors';
import connectDB from './config/connectdb.js'
import userRoutes from './routes/userRoutes.js'
import salesRoutes from './routes/salesRoutes.js'

dotenv.config()
const app = express()
const port = process.env.PORT
const DATABASE_URL = process.env.DATABASE_URL

// CORS Policy
app.use(cors())

// Database Connection
connectDB(DATABASE_URL)

// JSON
app.use(express.json())

// Load Routes
app.use("/api/user", userRoutes)
app.use("/api/sales", salesRoutes)

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`)
})