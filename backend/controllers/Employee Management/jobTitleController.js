const JobTitle = require('../../models/Employee Management/JobTitle');

const jobTitleController = {
    // Create a new Job title
    createJobTitle: async (req, res) => {
        try {
            const { jobTitle, description, depID } = req.body;
            const createdJobTitle = await JobTitle.createJobTitle(jobTitle, description, depID);

            if (!createdJobTitle) {
                return res.status(400).json({ message: 'Failed to create job title' });
            }
            res.status(201).json({ message: "Job title created successfully!", jobTitle: createdJobTitle });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    // Get all job titles
    getAllJobTitles: async (req, res) => {
        try {
            const jobTitles = await JobTitle.getAllJobTitles();
            if (!jobTitles) {
                res.status(404).json({ error: 'No job titles found' });
            }
            res.status(200).json(jobTitles);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    // Get Employee by ID
    getJobTitleById: async (req, res) => {
        try {
            const id = req.params.id;
            const jobTitle = await JobTitle.getJobTitleById(id);
            if (!jobTitle) {
                res.status(404).json({ error: 'Job title not found' });
            }
            res.status(200).json(jobTitle);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    // Update Job title
    updateJobTitleById: async (req, res) => {
        try {
            const id = req.params.id;
            const { title, description, depId } = req.body;

            if (!title && !description && !depId) {
                res.status(400).json({ error: 'No fields to update' });
            }

            const updateJobTitle = await JobTitle.updateJobTitleById(id, title, description, depId);
            if (!updateJobTitle) {
                res.status(404).json({ error: 'Job title not found' });
            }
            res.status(200).json({
                message: "Job title updated successfully",
                updateJobTitle
            });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    // Delete Job title
    deleteJobTitle: async (req, res) => {
        try {
            const id = req.params.id;
            const deleteJobTitle = await JobTitle.deleteJobTitle(id);
            if (!deleteJobTitle) {
                res.status(404).json({ error: 'Job title not found' });
            }
            res.status(200).json({ message: "Job title deleted successfully!" });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
};

module.exports = jobTitleController;