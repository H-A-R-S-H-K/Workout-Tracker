const jwt = require('jsonwebtoken')

const jwtMiddleware = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const verifiedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
        console.log(verifiedToken);
        req.body.userId = verifiedToken.userId;
        next();
    }
    catch(error) {
        res.status(401).send({ success : false, message : "Token invalid"});
    }
}

module.exports = jwtMiddleware