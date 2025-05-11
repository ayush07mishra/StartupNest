import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/');
    };

    return (
        <nav className="flex justify-between items-center p-4 bg-gray-100">
            <div className="font-bold text-xl">🚀 Startup Board</div>
            <div className="flex gap-4">
                <Link to="/">Home</Link>
                <Link to="/jobs">Jobs</Link>
                {user?.role === 'recruiter' && <Link to="/post-job">Post Job</Link>}
                {!user ? (
                    <>
                        <Link to="/login">Login</Link>
                        <Link to="/register">Register</Link>
                    </>
                ) : (
                    <button onClick={handleLogout}>Logout</button>
                )}
            </div>
        </nav>
    );
};

export default Navbar;


{
    user?.role === 'recruiter' && (
        <Link to="/dashboard/recruiter">Dashboard</Link>
    )
}
{
    user?.role === 'user' && (
        <Link to="/dashboard/user">Dashboard</Link>
    )
}
