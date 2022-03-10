import React from 'react';
import { useSelector} from 'react-redux';

import './container.scss';
import LogIn from '../components/login';
import SignIn from '../components/signin';
import Overview from '../components/overview';

function Container() {

    const {window, authenticated} = useSelector((state) => state);

    if (authenticated === true) {
        return (
            <div className = "container">
                <Overview />
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