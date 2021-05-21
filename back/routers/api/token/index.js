const router = require('express').Router()
const postRouter = require('./post')
const getRouter = require('./get')

router.post('/', postRouter);
router.get('/', getRouter);

module.exports = router;

