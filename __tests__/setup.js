require('dotenv').config({ override: false})
const db = require('../app/models/index')

module.exports = async () => {
   await db.sequelize.authenticate()
}

module.exports.db = db