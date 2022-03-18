import React from 'react';
import { useSelector, useDispatch} from 'react-redux';
import { useEffect} from 'react';
import './login.scss';

function LogIn() {

    const dispatch = useDispatch();

    useEffect(() => {
        document.getElementById("log-in-form").addEventListener("submit", handleLogInSubmit);
    })

    function handleLogInSubmit(e) {
        
        e.preventDefault();
        
        const formData = new FormData(e.currentTarget);
        const payload = JSON.stringify(Object.fromEntries(formData.entries()));
        
        (async () => {
            try {
                let response = await fetch("http://localhost:8055/auth/login", {
                    method: "POST",
                    headers: {"Content-Type" : "application/json"},
                    body: payload
                });
                let json = await response.json();
                localStorage.setItem("token", json.data.access_token);
                dispatch({type: "AUTHENTICATION", value: true});
            } catch(e) {
                console.log(e);
            }
        })();
    }

    return (
            <div className = "log-in-container">
                <form className = "log-in-container-form" id = "log-in-form">
                    <img className = "log-in-logo" src = "ZAUBAR-logo.png" alt = "Zaubar Logo"></img>
                    <p>Please sign in to continue</p>
                        <input type = "email" name = "email" className = "email" required = "required" placeholder = "Email" />
                    <input type = "password" name = "password" className = "password" required = "required" placeholder = "Password" />
                    <p className = "forgot-password">
                        <a href = "" target = "_blank" className = "reset-a">Forgot password?</a>
                    </p>
                    <button type = "submit" className = "log-in-button">Login</button>
                    <p className = "horizontal-line">or</p>
                    <button type = "button" className = "sing-up-button" onClick = {() => dispatch({type: "START", value: "signup"})}>Sign Up</button>
                </form>
            </div>
    )
}

export default LogIn;