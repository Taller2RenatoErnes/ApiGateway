const { Router } = require("express");
const router = Router();
const {allResourcesBySubject, allSubjects} = require('../controllers/monolith/resourcesController')

router.get('/', allSubjects);
router.get('/:subjectId', allResourcesBySubject);

module.exports = router;