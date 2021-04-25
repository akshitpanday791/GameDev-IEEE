import React, {useState} from 'react';
import {Link, useHistory,Redirect} from 'react-router-dom';
import {useAuth} from '../authcontext';

import Spinner from 'react-bootstrap/Spinner';
import { Alert } from "react-bootstrap";

import './Login.css';

const Login = () => {
    const {login} = useAuth();
    const history = useHistory()
    const { currentUser } = useAuth()
    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');
    const[error, setError] = useState('');
    const[loading, setLoading] = useState(false);

    const handleLogin = async(e) => {
        e.preventDefault();
        try {
            setLoading(true);
            await login(email,password);
            history.replace('/')
        } catch(err) {
            setError(err.message);
        }
        setLoading(false);
        setEmail('');
        setPassword('');
    }

    return (
        <React.Fragment>
        {currentUser? (
            <Redirect to="/" />
        ) :(
            <div className="wrapper">

            {loading && <Spinner animation="border" />}

            <form className="form">
                <h2>Welcome back Friend! </h2>
                {error && <Alert variant="danger">{error}</Alert>}
                <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} className="box" placeholder="Your Email" />
                <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} className="box" placeholder="Your Password" />
                <button className="submit-button" type="submit" onClick={handleLogin}>Lets Play!</button>
                <p className="text">Don't have an account ? Don't worry!! </p>
                <Link className="register-button" to="/register"><p>Register</p></Link>
            </form>

            <ul className="links-container">
                <li><a href="/" className="box link">Need Help?</a></li>
                <li><a href="/" className="box link">Forgot Password?</a></li>
                <li><a href="/" className="box link">How the game works?</a></li>
            </ul>

        </div>
        )
        }
       
       </React.Fragment>
    );
};

export default Login;

