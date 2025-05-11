import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PostJob = () => {
    const [form, setForm] = useState({
        title: '', company: '', location: '', description: '', jobType: 'full-time'
    });

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        try {
            await axios.post('http://localhost:5000/api/jobs', form, {
                headers: { Authorization: `Bearer ${token}` }
            });
            alert('Job posted!');
            navigate('/jobs');
        } catch (err) {
            alert('Error posting job');
        }
    };

    return (
        <form className="p-6" onSubmit={handleSubmit}>
            <input className="border p-2 mb-2 w-full" placeholder="Title" onChange={e => setForm({ ...form, title: e.target.value })} />
            <input className="border p-2 mb-2 w-full" placeholder="Company" onChange={e => setForm({ ...form, company: e.target.value })} />
            <input className="border p-2 mb-2 w-full" placeholder="Location" onChange={e => setForm({ ...form, location: e.target.value })} />
            <textarea className="border p-2 mb-2 w-full" placeholder="Description" onChange={e => setForm({ ...form, description: e.target.value })}></textarea>
            <select className="border p-2 mb-2 w-full" onChange={e => setForm({ ...form, jobType: e.target.value })}>
                <option value="full-time">Full-time</option>
                <option value="internship">Internship</option>
                <option value="freelance">Freelance</option>
            </select>
            <button className="bg-green-600 text-white px-4 py-2">Post Job</button>
        </form>
    );
};

export default PostJob;
