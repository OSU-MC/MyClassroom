require('dotenv').config({ override: false})
const db = require('../app/models/index')

module.exports = async function () {
    await db.sequelize.close()
    process.exit()
};