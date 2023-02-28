const { Router } = require('express')
const router = Router()

router.use('/courses', require('./courses'))
router.use('/users', require('./users'))
router.use('/courses', require('./courses'))

module.exports = router