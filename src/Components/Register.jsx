import React, {useState} from 'react';
import {Link, useHistory } from 'react-router-dom';
import {useAuth} from '../Contexts/AuthContect';
import { Alert } from "react-bootstrap"

import './Register.css';

const Register = () => {

    const[email, setEmail] = useState('');
    const[username, setUsername] = useState('');
    const[password, setPassword] = useState('');
    const[confirmPassword, setConfirmPassword] = useState('');
    const { signup } = useAuth()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    const handleRegister = async(e) => {
        e.preventDefault();
        if(password!==confirmPassword){
            setError("Passwords Do not match");
            console.log(error);
        }
        try{
            setError("");
            setLoading(true);
            await signup(email,password);
            history.push('/')
        }catch(err){
            setError("Something went Wrong...")
        }
        //console.log(email + " " + password + " " + confirmPassword);
        setEmail('');
        setUsername('');
        setPassword('');
        setConfirmPassword('');
        setLoading(false);
    }

    return (
        <div className="wrapper">
            <form className="register__form">
                <h2>Create your account</h2>
                {error && <Alert variant="danger">{error}</Alert>}
                <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} className="register__box" placeholder="Your Email" />
                <input type="text" name="username" value={username} onChange={(e) => setUsername(e.target.value)} className="register__box" placeholder="Enter username" />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} name="password" className="register__box" placeholder="Create a Password" />
                <input type="password" value={confirmPassword}  onChange={(e) => setConfirmPassword(e.target.value)}name="confirmPassword" className="register__box" placeholder="Confirm Password" />
                <button className="register__submit-button" disabled={loading} type="submit" onClick={handleRegister}>Create Account</button>
                <p className="text">Already have an account? </p>
                <Link className="register__login-button" to="/login"><p>Login</p></Link>
            </form>
            <ul className="links-container">
                <li><a href="/" className="box link">Need Help?</a></li>
                <li><a href="/" className="box link">Forgot Password?</a></li>
                <li><a href="/" className="box link">How the game works?</a></li>
            </ul>
        </div>
    );
};

export default Register;
