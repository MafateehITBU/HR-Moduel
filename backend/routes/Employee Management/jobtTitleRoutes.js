const express = require('express');
const router = express.Router();
const jobTitleController = require('../../controllers/Employee Management/jobTitleController');

router.post('/', jobTitleController.createJobTitle); // create new job title
router.get('/', jobTitleController.getAllJobTitles); // get all job titles
router.get('/:id', jobTitleController.getJobTitleById); // get job title by ID
router.put('/:id', jobTitleController.updateJobTitleById); // update job title
router.delete('/:id', jobTitleController.deleteJobTitle); // delete job title

module.exports = router;