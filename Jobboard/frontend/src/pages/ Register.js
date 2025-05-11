import { useState } from 'react';
import axios from 'axios';

const Register = () => {
    const [form, setForm] = useState({ name: '', email: '', password: '', role: 'seeker' });

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post('http://localhost:5000/api/auth/register', form);
        alert('Registered! Now login.');
    };

    return (
        <form className="p-6" onSubmit={handleSubmit}>
            <input className="border p-2 mb-2 w-full" placeholder="Name" onChange={e => setForm({ ...form, name: e.target.value })} />
            <input className="border p-2 mb-2 w-full" placeholder="Email" onChange={e => setForm({ ...form, email: e.target.value })} />
            <input className="border p-2 mb-2 w-full" placeholder="Password" type="password" onChange={e => setForm({ ...form, password: e.target.value })} />
            <select className="border p-2 mb-2 w-full" onChange={e => setForm({ ...form, role: e.target.value })}>
                <option value="seeker">Job Seeker</option>
                <option value="recruiter">Recruiter</option>
            </select>
            <button className="bg-blue-500 text-white px-4 py-2">Register</button>
        </form>
    );
};

export default Register;
