const {
    Book
} = require('../models');
const {
    Op
} = require('sequelize');
const jwt = require('jsonwebtoken');

const BooksController = {
    showAllBooks: async (req, res) => {
        try {
            const books = await Book.findAll();
            console.log(req.headers)

            return res.status(200).json(books);
        } catch (error) {
            console.log(error);

            if (error.name === "SequelizeConnectionRefusedError") {
                return res.status(500).json({
                    error: true,
                    message: "System unavailable, try again!"
                })
            }

            if (error.name === "SequelizeUniqueConstraintError") {
                return res.status(400).json(error.parent.sqlMessage);
            }

            if (error.name === "SequelizeValidationError") {
                return res.status(400).json({
                    error: true,
                    message: `${error.errors[0].type} at ${error.errors[0].path}`
                })
            }

            return res.status(400).json({
                error: true,
                message: "Bad request, try again!"
            })
        }
    },

    createBook: async (req, res) => {
        try {
            const {
                title,
                total_pages,
                author,
                release_year,
                stock
            } = req.body;

            const verifyBookExists = await Book.findOne({
                where: {
                    [Op.and]: [{
                            title: title
                        },
                        {
                            author: author
                        }
                    ]
                }
            });

            if (verifyBookExists) {
                return res.status(422).json("This book is already registered")
            }

            const book = await Book.create({
                title,
                total_pages,
                author,
                release_year,
                stock
            });

            return res.status(201).json(book)

        } catch (error) {
            console.log(error);

            if (error.name === "SequelizeConnectionRefusedError") {
                return res.status(500).json({
                    error: true,
                    message: "System unavailable, try again!"
                })
            }

            if (error.name === "SequelizeUniqueConstraintError") {
                return res.status(400).json(error.parent.sqlMessage);
            }

            if (error.name === "SequelizeValidationError") {
                return res.status(400).json({
                    error: true,
                    message: `${error.errors[0].type} at ${error.errors[0].path}`
                })
            }

            return res.status(400).json({
                error: true,
                message: "Bad request, try again!"
            })
        }
    },

    showOneBook: async (req, res) => {
        try {
            const {
                id
            } = req.params;
            const book = await Book.findByPk(id);
            if (!book) {
                throw new Error
            };
            return res.status(200).json(book);
        } catch (error) {
            console.log(error);

            if (error.name === "SequelizeConnectionRefusedError") {
                return res.status(500).json({
                    error: true,
                    message: "System unavailable, try again!"
                })
            }

            if (error.name === "SequelizeUniqueConstraintError") {
                return res.status(400).json(error.parent.sqlMessage);
            }

            if (error.name === "SequelizeValidationError") {
                return res.status(400).json({
                    error: true,
                    message: `${error.errors[0].type} at ${error.errors[0].path}`
                })
            }

            return res.status(400).json({
                error: true,
                message: "Bad request, try again!"
            })
        }
    },

    updateBook: async (req, res) => {
        try {
            const {
                id
            } = req.params;
            const {
                title,
                total_pages,
                author,
                release_year,
                stock
            } = req.body;

            await Book.update({
                title,
                total_pages,
                author,
                release_year,
                stock,
            }, {
                where: {
                    id
                }
            });

            const book = await Book.findByPk(id);
            if (!book) {
                throw new Error
            };
            return res.status(200).json(book);
        } catch (error) {
            console.log(error);

            if (error.name === "SequelizeConnectionRefusedError") {
                return res.status(500).json({
                    error: true,
                    message: "System unavailable, try again!"
                })
            }

            if (error.name === "SequelizeUniqueConstraintError") {
                return res.status(400).json(error.parent.sqlMessage);
            }

            if (error.name === "SequelizeValidationError") {
                return res.status(400).json({
                    error: true,
                    message: `${error.errors[0].type} at ${error.errors[0].path}`
                })
            }

            return res.status(400).json({
                error: true,
                message: "Bad request, try again!"
            })
        }
    },

    destroyBook: async (req, res) => {
        try {
            const {
                id
            } = req.params;
            const book = await Book.findByPk(id);
            if (!book) {
                throw new Error
            };

            await Book.destroy({
                where: {
                    id
                }
            });
            return res.status(200).json("The book was successfully deleted");
        } catch (error) {
            console.log(error);

            if (error.name === "SequelizeConnectionRefusedError") {
                return res.status(500).json({
                    error: true,
                    message: "System unavailable, try again!"
                })
            }

            if (error.name === "SequelizeUniqueConstraintError") {
                return res.status(400).json(error.parent.sqlMessage);
            }

            if (error.name === "SequelizeValidationError") {
                return res.status(400).json({
                    error: true,
                    message: `${error.errors[0].type} at ${error.errors[0].path}`
                })
            }

            return res.status(400).json({
                error: true,
                message: "Bad request, try again!"
            })
        }

    }
};

module.exports = BooksController;