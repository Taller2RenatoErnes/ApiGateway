const jwt = require('jsonwebtoken');

const getIdJWT = (token) => {
    const secret = process.env.SECRET;
    const { id } = jwt.verify(token, secret);
    return id;
}

const getTokenAuth = (req) => {
    try {
        const header = req.headers['authorization'];
        const token = header && header.split(' ')[1];
        return token ? token : null;
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                error: true,
                msg: 'Token expirado'
            });
        }
        return res.status(401).json({
            error: true,
            msg: 'Token no válido',
        });
    }
};


module.exports = { getIdJWT, getTokenAuth };
