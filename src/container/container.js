import { React, useEffect } from 'react';
import { useSelector, useDispatch} from 'react-redux';

import './container.scss';
import LogIn from '../components/login';
import SignIn from '../components/signin';
import Dashboard from '../components/dashboard';

function Container() {

    const dispatch = useDispatch();

    useEffect(() => {

        const access_token = localStorage.getItem("token");

        if (access_token !== null) {
            (async () => {
                try {
                    let response = await fetch("http://localhost:8055?access+token=" + access_token, {
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

    const {window, authenticated} = useSelector((state) => state);

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