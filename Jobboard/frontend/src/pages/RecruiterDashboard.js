import { useEffect, useState } from 'react';
import axios from 'axios';

const RecruiterDashboard = () => {
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        axios.get('http://localhost:5000/api/jobs/my-jobs', {
            headers: { Authorization: `Bearer ${token}` }
        }).then(res => setJobs(res.data));
    }, []);

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Your Posted Jobs</h2>
            {jobs.length === 0 ? <p>No jobs posted yet.</p> :
                jobs.map(job => (
                    <div key={job._id} className="border p-4 mb-4 rounded">
                        <h3 className="text-xl font-semibold">{job.title}</h3>
                        <p>{job.company} - {job.location}</p>
                        <p className="mt-2 font-semibold">Applicants:</p>
                        {job.applicants.length === 0 ? (
                            <p className="text-gray-500">No applications yet.</p>
                        ) : (
                            <ul className="list-disc pl-5">
                                {job.applicants.map(app => (
                                    <li key={app.userId}>{app.name} ({app.email})</li>
                                ))}
                            </ul>
                        )}
                    </div>
                ))
            }
        </div>
    );
};

export default RecruiterDashboard;
