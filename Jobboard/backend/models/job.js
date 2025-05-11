// const mongoose = require('mongoose');

// const jobSchema = new mongoose.Schema({
//     title: String,
//     company: String,
//     location: String,
//     description: String,
//     jobType: { type: String, enum: ['internship', 'full-time', 'freelance'] },
//     postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
//     createdAt: { type: Date, default: Date.now }
// });

module.exports = mongoose.model('job', jobSchema);

const jobSchema = new mongoose.Schema({
    title: String,
    company: String,
    location: String,
    description: String,
    jobType: String,
    recruiterId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    applicants: [
        {
            userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
            name: String,
            email: String,
            appliedAt: { type: Date, default: Date.now }
        }
    ]
});
