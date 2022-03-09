import React from 'react';
import './container.scss';
import LogIn from '../components/login';
import SignIn from '../components/signin';

function Container() {
    return (
        <div className = "container">
            <LogIn />
            {/* <SignIn /> */}
        </div>
    )
}

export default Container;