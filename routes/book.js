const router = require('express').Router();

const booksController = require('../controllers/book')

router.post('/add-book', booksController.addBook);


module.exports = router;