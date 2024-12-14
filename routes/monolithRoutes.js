const { Router } = require("express");
const router = Router();
const {allResourcesBySubject, allSubjects} = require('../controllers/monolith/resourcesController')

router.get('/createStudent', allSubjects);
router.get('/createStudent/:subjectId', allResourcesBySubject);

module.exports = router;