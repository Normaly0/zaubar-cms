import React from 'react';
import './login.scss';

function LogIn() {
    return (
            <div className = "log-in-container">
                <form className = "log-in-container-form">
                    <img className = "log-in-logo" src = "ZAUBAR-logo.png" alt = "Zaubar Logo"></img>
                    <p>Please sign in to continue</p>
                        <input type = "email" name = "email" className = "email" required = "required" placeholder = "Email" />
                    <input type = "text" name = "password" className = "password" required = "required" placeholder = "Password" />
                    <p className = "forgot-password">
                        <a href = "" target = "_blank" className = "reset-a">Forgot password?</a>
                    </p>
                    <button type = "submit" className = "log-in-button">Login</button>
                    <p className = "horizontal-line">or</p>
                    <button type = "button" className = "sing-up-button">Sign Up</button>
                </form>
            </div>
    )
}

export default LogIn;