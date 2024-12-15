const { Router } = require("express");
const router = Router();
const careerController = require('../controllers/careersService/careerService');


//CAREERS

router.get('/', careerController.getCareers);


// SUBJECTS


const subjectController = require('../controllers/careersService/subjectService');

router.get('/subjects', subjectController.getSubjects);

router.post('/subjects/prerequisites', subjectController.getPrerequisiteObjects);

router.post('/subjects/prerequisites-map', subjectController.getPrerequisiteMap);

router.post('/subjects/postrequisites-map', subjectController.getPostrequisiteMap);



module.exports = router;





module.exports = router;