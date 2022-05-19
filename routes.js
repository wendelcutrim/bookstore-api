const express = require('express');
const router = express.Router();
const BooksController = require('./controllers/BooksController');

router.get('/books', BooksController.showAllBooks);
router.post('/books', BooksController.createBook);
router.get('/books/:id', BooksController.showOneBook);
router.put('/books/:id', BooksController.updateBook);
router.delete('/books/:id', BooksController.destroyBook);

module.exports = router;