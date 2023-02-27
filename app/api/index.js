const { Router } = require('express')
const router = Router()

router.use('/users', require('./users'))
router.use('/courses', require('./courses'))

module.exports = router