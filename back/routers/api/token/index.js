const router = require('express').Router()
const postRouter = require('./post')
const getRouter = require('./get')
const deleteRouter = require('./delete')

router.post('/', postRouter);
router.get('/', getRouter);
router.get('/delete', deleteRouter);

module.exports = router;

