//imports
const express = require('express')
const cors = require('cors')
//user defined modules
const authorization = require('./routes/authorization')
const userRouter = require('./routes/user')
const moviesRouter = require('./routes/movies')
const reviewsRouter = require('./routes/reviews')


//creating the express object
const app = express()

//added middlewares
app.use(cors({ origin: '*' }));
app.use(express.json())
app.use(authorization)
app.use('/users', userRouter)
app.use('/movies', moviesRouter)
app.use('/reviews', reviewsRouter)


//starting the server at port 4000
// app.listen(4000, 'localhost', () => {
//     console.log('server started at port 4000')
// })

module.exports = app;