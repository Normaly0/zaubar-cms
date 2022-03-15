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
        
        (async () => {
            try {
                let response = await fetch("http://localhost:8055/items/Tour", {
                    method: "GET",
                    headers: {authorization: "bearer " + access_token},
                });
                (response.status === 200) ? dispatch({type: "AUTHENTICATION", value: true}) : dispatch({type: "AUTHENTICATION", value: false})

            } catch(e) {
                console.log(e);
            }
        })();
    }, [])

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