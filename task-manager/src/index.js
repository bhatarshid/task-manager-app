const express = require('express')
require('./db/mongoose')
require('dotenv').config()
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')
const cors = require('cors')

const app = express()
const PORT = process.env.PORT

app.use(cors()) 
//parse incoming json to object
app.use(express.json())

//use the routes
app.use(userRouter)
app.use(taskRouter)
app.get('/', async (req, res) => {
  res.status(200).send({ message: 'App is running'})
})

app.listen(PORT, () => {
    console.log("Server is up on port ", PORT)
})