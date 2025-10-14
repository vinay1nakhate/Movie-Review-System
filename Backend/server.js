const express = require('express')

//user defined modules
const authorization = require('./routes/authorization')
const userRouter = require('./routes/user')

//creating the express object
const app = express()

//added middlewares
app.use(express.json())
app.use(authorization)
app.use('/users', userRouter)

//starting the server at port 4000
app.listen(4000, 'localhost', () => {
    console.log('server started at port 4000')
})