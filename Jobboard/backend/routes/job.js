router.post('/apply/:id', authMiddleware, async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);
        const user = await User.findById(req.user.id);

        if (!job || !user) return res.status(404).json({ msg: 'Job or user not found' });

        // Prevent duplicate applications
        const alreadyApplied = job.applicants.find(app => app.userId.toString() === req.user.id);
        if (alreadyApplied) return res.status(400).json({ msg: 'Already applied' });

        job.applicants.push({
            userId: user._id,
            name: user.name,
            email: user.email
        });

        await job.save();
        res.json({ msg: 'Application submitted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/my-jobs', authMiddleware, async (req, res) => {
    try {
        const jobs = await Job.find({ recruiterId: req.user.id });
        res.json(jobs);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


router.get('/applied', authMiddleware, async (req, res) => {
    try {
        const jobs = await Job.find({ "applicants.userId": req.user.id });
        const filteredJobs = jobs.map(job => {
            const application = job.applicants.find(app => app.userId.toString() === req.user.id);
            return {
                id: job._id,
                title: job.title,
                company: job.company,
                location: job.location,
                appliedAt: application?.appliedAt
            };
        });
        res.json(filteredJobs);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
