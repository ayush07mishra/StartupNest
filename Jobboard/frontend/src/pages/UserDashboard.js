import { useEffect, useState } from 'react';
import axios from 'axios';

const UserDashboard = () => {
    const [appliedJobs, setAppliedJobs] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        axios.get('http://localhost:5000/api/jobs/applied', {
            headers: { Authorization: `Bearer ${token}` }
        }).then(res => setAppliedJobs(res.data));
    }, []);

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Jobs You Applied To</h2>
            {appliedJobs.length === 0 ? (
                <p>You haven't applied to any jobs yet.</p>
            ) : (
                appliedJobs.map(job => (
                    <div key={job.id} className="border p-4 mb-4 rounded">
                        <h3 className="text-xl font-semibold">{job.title}</h3>
                        <p>{job.company} - {job.location}</p>
                        <p className="text-gray-600">Applied on: {new Date(job.appliedAt).toLocaleDateString()}</p>
                    </div>
                ))
            )}
        </div>
    );
};

export default UserDashboard;
