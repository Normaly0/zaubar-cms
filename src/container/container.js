import { React, useEffect } from 'react';
import { useSelector, useDispatch} from 'react-redux';

import './container.scss';
import LogIn from '../components/Start/login';
import SignIn from '../components/Start/signin';
import Dashboard from '../components/dashboard/dashboard';

function Container() {

    const dispatch = useDispatch();
    const {window, authenticated} = useSelector((state) => state);

    function checkToken() {
        const refresh_token = localStorage.getItem("refresh");

        if (refresh_token !== null) {
            (async () => {
                try {
                    let response = await fetch("http://localhost:8055/auth/refresh", {
                        method: "POST",
                        headers: {"Content-Type" : "application/json"},
                        body: JSON.stringify({"refresh_token": refresh_token})
                    });
                    let json = await response.json();
                    if (response.status === 200) { 
                        dispatch({type: "AUTHENTICATION", value: true}); 
                        dispatch({type: "LOADING", value: true});
                        localStorage.setItem("token", json.data.access_token);
                        localStorage.setItem("refresh", json.data.refresh_token);
                        //refresh token before TTL is reached
                        setTimeout(() => {checkToken()}, (json.data.expires - 5000));
                    } else {
                        dispatch({type: "AUTHENTICATION", value: false}); 
                        dispatch({type: "LOGOUT"});
                        localStorage.clear();
                    }
                } catch(e) {
                    console.log(e);
                }
            })();
        };
    } 

    //Check if refresh token is still valid and log user in
    useEffect(() => {
        checkToken();
    }, []);

    if (authenticated === true) {
        return (
            <div className = "container">
                <Dashboard />
            </div>
        )
    } else {
    return (
        <div className = "container">
            {window === "login"
            ? <LogIn />
            : <SignIn />}
        </div>
    )
}
}

export default Container;