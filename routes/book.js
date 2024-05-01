const router = require('express').Router();

const booksController = require('../controllers/book')

router.post('/add-book', booksController.addBook);

router.get('/books', booksController.getBooks);
router.get('/book/:id', booksController.getBookById);

router.put('/book/:id', booksController.updateBookById);


module.exports = router;