import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

const JobDetails = () => {
    const { id } = useParams();
    const [job, setJob] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:5000/api/jobs/${id}`)
            .then(res => setJob(res.data));
    }, [id]);

    if (!job) return <div>Loading...</div>;

    return (
        <div className="p-6">
            <h2 className="text-3xl font-bold">{job.title}</h2>
            <p className="text-lg">{job.company} - {job.location}</p>
            <p className="mt-4">{job.description}</p>
        </div>
    );
};

export default JobDetails;

const handleApply = async () => {
    try {
        const token = localStorage.getItem('token');
        await axios.post(`http://localhost:5000/api/jobs/apply/${id}`, {}, {
            headers: { Authorization: `Bearer ${token}` }
        });
        alert('Application submitted!');
    } catch (err) {
        alert(err.response?.data?.msg || 'Something went wrong.');
    }
};

return (
    <div className="p-6">
        <h2 className="text-3xl font-bold">{job.title}</h2>
        <p className="text-lg">{job.company} - {job.location}</p>
        <p className="mt-4">{job.description}</p>
        {localStorage.getItem('token') && (
            <button onClick={handleApply} className="bg-blue-500 text-white px-4 py-2 mt-4">Apply</button>
        )}
    </div>
);
