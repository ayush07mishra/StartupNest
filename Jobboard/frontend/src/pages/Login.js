import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [form, setForm] = useState({ email: '', password: '' });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/api/auth/login', form);
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('user', JSON.stringify(res.data.user));
            alert('Logged in successfully!');
            navigate('/');
        } catch (err) {
            alert('Invalid credentials');
        }
    };

    return (
        <form className="p-6" onSubmit={handleSubmit}>
            <input className="border p-2 mb-2 w-full" placeholder="Email" onChange={e => setForm({ ...form, email: e.target.value })} />
            <input className="border p-2 mb-2 w-full" placeholder="Password" type="password" onChange={e => setForm({ ...form, password: e.target.value })} />
            <button className="bg-blue-500 text-white px-4 py-2">Login</button>
        </form>
    );
};

export default Login;
