const {
    User
} = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")

const AuthController = {
    store: async (req, res) => {
        try {
            const {
                name,
                email,
                password
            } = req.body;
            const verifyUser = await User.findOne({
                where: {
                    email
                }
            });
            if (verifyUser) {
                return res.status(400).json({
                    message: "Não foi possível realizar o cadastro"
                });
            }
            const hash = bcrypt.hashSync(password, 10);
            const newUser = await User.create({
                name,
                email,
                password: hash
            });

            return res.status(201).json(newUser);
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

    login: async (req, res) => {
        try {
            const {
                email,
                password
            } = req.body;

            const user = await User.findOne({
                where: {
                    email
                }
            });
            console.log(user)

            if (!user || !bcrypt.compareSync(password, user.password)) {
                return res.status(404).json({
                    message: "Não foi possível realizar o login"
                })
            };

            const token = jwt.sign({
                    id: user.id,
                    email: user.email
                },
                process.env.JWT_KEY, {
                    expiresIn: "1h"
                })

            return res.status(200).json({
                message: "Autenticado",
                token
            });
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

module.exports = AuthController;