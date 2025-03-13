const Team = require('../../models/Employee Management/Team');

const teamController = {
    // Create new Team
    createTeam: async (req, res) => {
        try {
            const { teamName, teamLead, depId } = req.body;
            const createdTeam = await Team.createTeam(teamName, teamLead, depId);
            if (!createdTeam) {
                return res.status(400).json({ message: 'Failed to create a team' });
            }
            res.status(201).json({ message: 'Team created successfully!', team: createdTeam });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    // Get all Teams
    getAllTeams: async (req, res) => {
        try {
            const teams = await Team.getAllTeams();
            if (!teams) {
                return res.status(404).json({ message: 'No teams found' });
            }
            res.status(200).json(teams);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    // Get Team by ID
    getTeamById: async (req, res) => {
        try {
            const id = req.params.id;
            const team = await Team.getTeamById(id);
            if (!team) {
                return res.status(404).json({ message: 'Team not found' });
            }
            res.status(200).json(team);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Update Team by ID
    updateTeam: async (req, res) => {
        try {
            const id = req.params.id;
            const { teamName, teamLead, depId } = req.body;

            if (!teamName && !teamLead && !depId) {
                return res.status(400).json({ message: 'No fields to update' });
            }

            const updatedTeam = await Team.updateTeam(id, teamName, teamLead, depId);
            if (!updatedTeam) {
                return res.status(404).json({ message: 'Team not found' });
            }
            res.status(200).json({
                message: 'Team updated successfully!',
                team: updatedTeam
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Delete Team by ID
    deleteTeam: async (req, res) => {
        try {
            const id = req.params.id;
            const deletedTeam = await Team.deleteTeam(id);
            if (!deletedTeam) {
                return res.status(404).json({ message: 'Team not found' });
            }
            res.status(200).json({ message: 'Team deleted successfully!' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

module.exports = teamController;