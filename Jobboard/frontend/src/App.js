import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Jobs from './pages/Jobs';
import JobDetails from './pages/JobDetails';
import Login from './pages/Login';
import Register from './pages/Register';
import PostJob from './pages/PostJob';

function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/jobs" element={<Jobs />} />
                <Route path="/jobs/:id" element={<JobDetails />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/post-job" element={<PostJob />} />
            </Routes>
        </Router>
    );
}

export default App;

import RecruiterDashboard from './pages/RecruiterDashboard';

<Route path="/dashboard/recruiter" element={<RecruiterDashboard />} />

import UserDashboard from './pages/UserDashboard';

<Route path="/dashboard/user" element={<UserDashboard />} />
