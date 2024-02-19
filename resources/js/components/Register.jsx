import { useState } from "react"
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import axios from "axios";

export default function Register() {
    const navigate = useNavigate();
    const [name,setName] = useState();
    const [email,setEmail] = useState();
    const [password,setPassword] = useState();
    const [error, setError] = useState(null);

    const submitForm = () =>{
        if (!name || !email || !password) {
            setError('Please fill in all fields.');
            return;
          }
        // api call
        axios.post('/api/register',{email:email,password:password,name:name}).then((res)=>{
            console.log("Res data", res)
            navigate('/')
        })
        .catch((error) => {
            // Handle errors, e.g., credential error
            if (error.response && error.response.status === 422) {
              setError(error.response.data.message);
            } else {
              setError('An error occurred. Please try again later.');
            }
          });
    }

    return(
        <div className="row justify-content-center pt-5">
            <div className="col-sm-6">
                <div className="card p-4">
                    <h1 className="text-center mb-3">Register </h1>
                    {error && <div className="alert alert-danger">{error}</div>}

                    <div className="form-group">
                        <label>Name:</label>
                        <input type="test" className="form-control" placeholder="Enter name"
                            onChange={e=>setName(e.target.value)}
                        id="name" />
                    </div>
                    <div className="form-group mt-3">
                        <label>Email address:</label>
                        <input type="email" className="form-control" placeholder="Enter email"
                            onChange={e=>setEmail(e.target.value)}
                        id="email" />
                    </div>

                    <div className="form-group mt-3">
                        <label>Password:</label>
                        <input type="password" className="form-control" placeholder="Enter password"
                            onChange={e => setPassword(e.target.value)}
                        id="pwd" />
                    </div>
                    <button type="button" onClick={submitForm} className="btn btn-primary mt-4">Register</button>
                    <p className="mt-2">Already Registered?<Link to="/login">Login here</Link></p>

                </div>
            </div>
        </div>
    )
}