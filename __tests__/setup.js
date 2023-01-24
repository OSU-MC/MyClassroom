require('dotenv').config({ override: false})
const db = require('../app/models/index')

module.exports = () => {
   return db.sequelize.sync()
    .then(() => {
        return //can seed the database here
    })
}

module.exports.db = db