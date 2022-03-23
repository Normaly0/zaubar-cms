import React from 'react';
import { useDispatch } from 'react-redux';
import './userDropDown.scss';

function UserDropDown(props) {

    const dispatch = useDispatch();

    function handleLogout() {
        dispatch({type: "LOGOUT"})
        
        const refresh_token = localStorage.getItem("refresh");
        const payload = JSON.stringify({"refresh_token": refresh_token});

        (async() => {
            try {
                    fetch("http://localhost:8055/auth/logout", {
                    method: "POST",
                    headers: {"Content-Type" : "application/json"},
                    body: payload
                });
            } catch(e) {
                console.log(e)
            }
            })();
        
        localStorage.clear();
    };

    return (
        <div className = "user-dropdown">
            <p>{props.first_name + " " + props.last_name}</p>
            <button type = "button">Your Profile</button>
            <button type = "button">Your ....</button>
            <button type = "button">Your ....</button>
            <button type = "button" onClick={handleLogout}>Log Out</button>
        </div>
    )
}

export default UserDropDown;