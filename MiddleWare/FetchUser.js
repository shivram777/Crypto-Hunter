const jwt = require('jsonwebtoken');


const JWT_SEC = "ramkrushna ramen naruto";


const FetchUser = (req, res, next) => {
    const token = req.header('auth-token');

    if (!token) {
        res.status(401).send({ error: "please authenticate using a valid token" });
    }

    try {
        const data = jwt.verify(token, JWT_SEC);
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).send({ error: "please authenticate using a valid token" });
    }
}

module.exports=FetchUser;