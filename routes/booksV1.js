const express = require('express');
const router = express.Router();
const BooksController = require('../controllers/BooksController');
const verifyToken = require("../middlewares/verifyToken");

router.get('/books', BooksController.showAllBooks);
router.get('/books/:id', BooksController.showOneBook);

router.use(verifyToken);
router.post('/books', BooksController.createBook);
router.put('/books/:id', BooksController.updateBook);
router.delete('/books/:id', BooksController.destroyBook);

module.exports = router;