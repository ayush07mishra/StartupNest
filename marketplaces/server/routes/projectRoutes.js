const router = require("express").Router();
const Project = require("../models/project");

// Upload Project
router.post("/upload", async (req, res) => {
    try {
        const newProject = await Project.create(req.body);
        res.status(201).json(newProject);
    } catch (err) {
        res.status(400).json({ error: "Project upload failed" });
    }
});

// Get All Projects
router.get("/", async (req, res) => {
    const projects = await Project.find().populate("sellerId", "username");
    res.json(projects);
});

module.exports = router;
