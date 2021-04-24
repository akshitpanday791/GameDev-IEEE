import React, {useState} from 'react';
import {Link} from 'react-router-dom';

import './Login.css';

const Login = () => {

    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        console.log(email + " " + password);
        setEmail('');
        setPassword('');
    }

    return (
        <div className="wrapper">
            <form className="form">
                <h2>Welcome back Friend! </h2>
                <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} className="box" placeholder="Your Email" />
                <input type="password" name="password" name="email" value={password} onChange={(e) => setPassword(e.target.value)} className="box" placeholder="Your Password" />
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
    );
};

export default Login;

