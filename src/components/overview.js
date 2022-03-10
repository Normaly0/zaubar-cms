import { React, useEffect } from 'react';
import { useSelector } from 'react-redux';
import './overview.scss';

function Overview() {

    const token = useSelector((store) => store.token);

    useEffect(() => {
        fetch("http://localhost:8055/items/Tour" ,{
            method: "GET",
            headers: {
                authorization : "bearer " + token
            }
        }).then(res => console.log(res.json()))
    }) 

    return (
        <div className = "overview">
            <h1>Overview</h1>

        </div>
    )
}

export default Overview;