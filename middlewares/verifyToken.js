const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decode = jwt.verify(token, process.env.JWT_KEY);
        req.user = decode;
        next()
    } catch(error){
        return res.status(401).json({message: "Falha na autenticação"})
    }
}

module.exports = verifyToken;