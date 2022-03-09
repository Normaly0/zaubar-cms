import React from 'react';
import './signin.scss';

function SignIn() {
    return (
        <div className = "sign-in-container">
            <form className = "log-in-container-form">
                    <img className = "log-in-logo" src = "ZAUBAR-logo.png" alt = "Zaubar Logo"></img>
                    <p>Please sign up to continue</p>
                    <input type = "text" className = "user-name" required = "required" placeholder = "Username" />
                    <input type = "email" className = "email" required = "required" placeholder = "Email" />
                    <input type = "text" className = "password" required = "required" placeholder = "Password" />
                    <input type = "text" className = "password-confirm" required = "required" placeholder = "Repeat Password" />
                    <button type = "submit" className = "log-in-button">Sign Up</button>
                    <p className = "horizontal-line">or</p>
                    <button type = "button" className = "sing-up-button">Login</button>
                </form>
        </div>
    )
}

export default SignIn;