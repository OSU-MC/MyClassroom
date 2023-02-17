var express = require('express');
var app = express();
const { logger, morganMiddleware } = require('../lib/logger')
const api = require('./api')

app.use(express.json())
app.use(express.static('public'))
app.use(morganMiddleware)

/*
 * All routes for the API are written in modules in the api/ directory.  The
 * top-level router lives in api/index.js.  That's what we include here, and
 * it provides all of the routes.
 */
app.use('/', api)

app.use('*', function(err, req, res) {
    res.status(404).send({
        error: "The requested resource does not exist"
    })
})

// this is our global exception handler function. If an error is thrown and caught, use the next() function with the error to pass it down to here
app.use(function (err, req, res, next) {
    logger.error(err)
    res.status(500).send({error: "Something unexpected happened. Please try again or contact the admin"})
})

module.exports = app