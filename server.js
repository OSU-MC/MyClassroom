const db = require('./db/models/index')
const port = process.env.PORT || 3001
const app = require('./app')

db.sequelize.sync().then(function () { //sync will automatically create the table, but it will never alter a table (migrations must be run for alterations)
    app.listen(port, function () {
        console.log("== Server is listening on port:", port)
    })
  })