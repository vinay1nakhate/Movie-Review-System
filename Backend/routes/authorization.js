const jwt = require('jsonwebtoken')

const result = require('../utils/result')
const config = require('../utils/config')

function authorization(req, res, next) {
    if (req.url == '/users/registration' ||
        req.url == '/users/login')
        next()
    else {
        const token = req.headers.token
        if (token) {
            try {
                const payload = jwt.verify(token, config.secret)
                req.headers.userId = payload.userId
                next()
            } catch (e) {
                res.send(result.createErrorResult('Invalid Token'))
            }
        }
        else
            res.send(result.createErrorResult('Token is Missing'))
    }
}

module.exports = authorization 