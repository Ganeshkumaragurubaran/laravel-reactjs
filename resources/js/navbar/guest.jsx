import { Routes, Route, BrowserRouter, Link } from "react-router-dom";
import Login from '../components/Login';
import Register from '../components/Register';
import Home from '../components/Home';

function Guest() {
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <Link className="navbar-brand" to="/">Home</Link>
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
                            <Link className="nav-item nav-link" to="/login">Login</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-item nav-link" to="/register">Register</Link>
                        </li>
                    </div>
                </div>
            </nav>

            <div className="container">

                <Routes>
                    <Route>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                    </Route>
                </Routes>

            </div>
        </>
    );
}

export default Guest;

