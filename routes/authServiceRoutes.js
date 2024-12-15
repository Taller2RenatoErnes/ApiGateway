const { Router } = require("express");
const router = Router();
const { login, getUserId, validateToken } = require('../controllers/authService/authServiceController');


router.post('/login', login);

// Rutas deprueba

router.post('/getId', getUserId)

router.post('/validate', validateToken);

module.exports = router;