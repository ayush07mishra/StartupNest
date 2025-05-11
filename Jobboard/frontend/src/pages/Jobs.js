import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Jobs = () => {
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/api/jobs')
            .then(res => setJobs(res.data));
    }, []);

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Available Jobs</h2>
            {jobs.map(job => (
                <div key={job._id} className="border p-4 mb-3 rounded shadow">
                    <h3 className="text-xl font-semibold">{job.title}</h3>
                    <p>{job.company} - {job.location}</p>
                    <Link to={`/jobs/${job._id}`} className="text-blue-600 underline">View Details</Link>
                </div>
            ))}
        </div>
    );
};

export default Jobs;

