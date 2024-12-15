const { Router } = require("express");
const router = Router();
const userController = require('../controllers/usersService/userServiceController.js')

router.post('/register', userController.register)

router.get('/update-profile', userController.updateProfile);
router.get('/profile', userController.profile);
router.get('/my-progress', userController.myProgress);
router.patch('/my-progress', userController.updateProgress);

module.exports = router;