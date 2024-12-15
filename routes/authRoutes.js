const { Router } = require("express");
const router = Router();
const { login, getUserId, validateToken } = require('../controllers/authService/authServiceController');


router.post('/login', login);




module.exports = router;