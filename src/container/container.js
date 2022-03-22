import { React, useEffect } from 'react';
import { useSelector, useDispatch} from 'react-redux';

import './container.scss';
import LogIn from '../components/Start/login';
import SignIn from '../components/Start/signin';
import Dashboard from '../components/dashboard/dashboard';

function Container() {

    const dispatch = useDispatch();
    const {window, authenticated} = useSelector((state) => state);

    //Check if user was logged in previously and if so log him in automaticall as long as the access token is still valid
    useEffect(() => {

        const access_token = localStorage.getItem("token");

        if (access_token !== null) {
            (async () => {
                try {
                    let response = await fetch("http://localhost:8055?access_token=" + access_token, {
                        method: "GET",
                    });
                    (response.status === 200) 
                    ? dispatch({type: "AUTHENTICATION", value: true}) && dispatch({type: "LOADING", value: true})
                    : dispatch({type: "AUTHENTICATION", value: false} && dispatch({type: "LOGOUT"} && localStorage.clear()))
                } catch(e) {
                    console.log(e);
                }
            })();
        };
    }, []);

    //Refresh the access token for as long as the user is still active and hasn't logged out
    // I NEED TO FIX THIS TOMORROW OR I'LL GET AN ANERIOUSM

        const refresh_token = localStorage.getItem("refresh");
        const payload = JSON.stringify({"refresh_token": refresh_token});
    

        if (authenticated === true) { 

        (async () => {
            try {
                let response = await fetch("http://localhost:8055/auth/refresh", {
                    method: "POST",
                    headers: {"Content-Type" : "application/json"},
                    body: payload
                });
                // console.log(response)
                // let json = await response.json();
                // localStorage.setItem("token", json .data.access_token);
                // localStorage.setItem("refresh", json.data.refresh_token);
            } catch(e) {
                console.log(e)
            }
        })();
    }

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