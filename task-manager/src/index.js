const express = require('express')
require('./db/mongoose')    //ensure mongoose runs and database connection is set 
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()
const PORT = process.env.PORT || 3000

//parse incoming json to object
app.use(express.json())

//use the routes
app.use(userRouter)
app.use(taskRouter)

app.listen(PORT, () => {
    console.log("Server is up on port ", PORT)
})