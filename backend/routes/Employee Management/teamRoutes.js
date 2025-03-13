const express = require('express');
const router = express.Router();
const teamController = require('../../controllers/Employee Management/teamController');

router.post('/', teamController.createTeam); //create new Team
router.get('/', teamController.getAllTeams); // get all Teams
router.get('/:id', teamController.getTeamById); // get Team by ID
router.put('/:id', teamController.updateTeam); // update Team by ID
router.delete('/:id', teamController.deleteTeam); // delete Team by ID

module.exports = router;