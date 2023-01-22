const db = require('./models/index')
const port = process.env.PORT || 3001
const app = require('./app')
const { logger } = require('./services/logger')

db.sequelize.sync()
    .then(function () { //sync will automatically create the table, but it will never alter a table (migrations must be run for alterations)
        app.listen(port, function () {
            logger.info(`Server is listening on port: ${port}`)
        })
    })
    .catch(error => {
        logger.error(`Unable to connect to sequelize database`)
        logger.error(error)
    })