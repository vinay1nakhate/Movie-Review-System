const express = require('express');
const serverless = require('serverless-http');
const cors = require('cors');

const authorization = require('../routes/authorization');
const userRouter = require('../routes/user');
const moviesRouter = require('../routes/movies');
const reviewsRouter = require('../routes/reviews');

const app = express();

// Middlewares
app.use(cors({ origin: '*' })); // allow all origins (or specify frontend URL)
app.use(express.json());
app.use(authorization);
app.use('/users', userRouter);
app.use('/movies', moviesRouter);
app.use('/reviews', reviewsRouter);

// Export as serverless function
module.exports.handler = serverless(app);
