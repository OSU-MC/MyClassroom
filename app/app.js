var express = require('express');
var app = express();
const { logger, morganMiddleware } = require('./services/logger')

app.use(express.json())
app.use(express.static('public'))
app.use(morganMiddleware)

// this is our global exception handler function. If an error is thrown, it lands here if not caught elsewhere
app.use(function (err, req, res, next) {
    logger.error(err)
    res.status(500).send()
})

app.use('*', function(req, res) {
    res.status(404).send({
        error: "The requested resource does not exist"
    })
})

module.exports = app