import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Dashboard from '../components/Dashboard';
import AuthUser from '../components/AuthUser';
import CreateStudent from '../pages/Create';
import Students from '../pages/Students';
import EditStudent from '../pages/EditStudent';

function Auth() {
    const { token, logout } = AuthUser();
    const logoutUser = () => {
        if (token != undefined) {
            logout();
        }
    }
    if (token === undefined) {
        navigate('/');
        return null;
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <Link className="navbar-brand" to="/dashboard">Dashboard</Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarNavAltMarkup"
                    aria-controls="navbarNavAltMarkup"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-item nav-link" to="/students">Students</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-item nav-link" to="/create">Create</Link>
                        </li>
                        <li className="nav-item">
                            <span role="button" className="nav-item nav-link" onClick={logoutUser}>Logout</span>
                        </li>
                    </div>
                </div>
            </nav>
            <div className="container">
                <Routes>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/students" element={<Students />} />
                    <Route path="/create" element={<CreateStudent />} />
                    <Route path="/students/edit/:id" element={<EditStudent />} />
                </Routes>
            </div>
        </>
    );
}

export default Auth;