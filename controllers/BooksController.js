const { Book } = require('../models');
const { Op } = require('sequelize');

const BooksController = {
    showAllBooks: async (req, res) => {
        try{
            const books = await Book.findAll();
            return res.status(200).json(books);
        } catch(error){
            console.log(error);
            return res.status(400).json(`Bad request. ${error}`);
        }
    },

    createBook: async (req, res) => {
        try{
            const { title, total_pages, author, release_year, stock } = req.body;

            const verifyBookExists = await Book.findOne({
                where: {
                    [Op.and]: [
                        {title: title},
                        {author: author}
                    ]
                }
            });

            if(verifyBookExists){
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

        } catch(error){
            console.log(error);
            return res.status(400).json(`Bad request, check if the request data is in accordance with the suggested parameters.|| ${error}`)
        }
    },

    showOneBook: async (req, res) => {
        try{
            const { id } = req.params;
            const book = await Book.findByPk(id);
            if(!book){throw new Error};
            return res.status(200).json(book);
        } catch(error){
            console.log(error);
            return res.status(404).json(`The server can't find the requested book || ${error}`);
        }
    },

    updateBook: async (req, res) => {
        try{
            const { id } = req.params;
            const { title, total_pages, author, release_year, stock } = req.body;

            await Book.update({
                title,
                total_pages,
                author,
                release_year,
                stock,
            },{where: {id}});

            const book = await Book.findByPk(id);
            if(!book){throw new Error};
            return res.status(200).json(book);
        } catch(error){
            console.log(error);
            return res.status(400).json(`Bad request. ${error}`);
        }
    },

    destroyBook: async (req, res) => {
        try {
            const { id } = req.params;
            const book = await Book.findByPk(id);
            if(!book){throw new Error};
    
            await Book.destroy({where: {id}});
            return res.status(200).json("The book was successfully deleted");
        } catch(error){
            console.log(error);
            res.status(500).json(`The server can't find the requested book. | ${error}`)
        }

    }
};

module.exports = BooksController;