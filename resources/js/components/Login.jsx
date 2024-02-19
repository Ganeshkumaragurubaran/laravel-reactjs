import React from 'react';
import ReactDOM from 'react-dom/client';
import { useState } from "react"
import AuthUser from './AuthUser.js';
import { Link } from "react-router-dom";

function Login() {
    const { http, setToken } = AuthUser();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [error, setError] = useState(null);

    const submitForm = () => {
        if (!email || !password) {
            setError('Please fill in all fields.');
            return;
          }
          setError(null);
        // api call
        http.post('/login', { email: email, password: password }).then((res) => {
            setToken(res.data.user, res.data.access_token);
            setError(null);
        })
        .catch((error) => {
            // Handle errors, e.g., credential error
            if (error.response && error.response.status === 401) {
              setError('Invalid credentials. Please try again.');
            } else {
              setError('An error occurred. Please try again later.');
            }
          });
    }

    return (
        <div className="row justify-content-center pt-5">
            <div className="col-sm-6">
                <div className="card p-4">
                    <h1 className="text-center mb-3">Login </h1>
                    {error && <div className="alert alert-danger">{error}</div>}
                    <div className="form-group">
                        <label>Email address:</label>
                        <input type="email" className="form-control" placeholder="Enter email"
                            onChange={e => setEmail(e.target.value)}
                            id="email" required/>
                    </div>
                    
                    <div className="form-group mt-3">
                        <label>Password:</label>
                        <input type="password" className="form-control" placeholder="Enter password"
                            onChange={e => setPassword(e.target.value)}
                            id="pwd" />
                    </div>                    
                    <button type="button" onClick={submitForm} className="btn btn-primary mt-4">Login</button>
                    <p className="mt-2">New User?<Link to="/register">Register here</Link></p>

                </div>
            </div>
        </div>
    )
}

export default Login;


