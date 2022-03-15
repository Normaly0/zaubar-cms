import { React, useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './dashboard.scss';
import Table from './table';

function Dashboard() {

    const dispatch = useDispatch();
    const data = useSelector((store) => store.data);

    useEffect(() => {
        
        const access_token = localStorage.getItem("token");
        
        (async () => {
            try {
                let response = await fetch("http://localhost:8055/items/Tour" , {
                    method: "GET",
                    headers: {authorization: "bearer " + access_token}
                })
                let json = await response.json();
                //Time conversion
                json.data.forEach((el) => {
                    el.date_created = el.date_created.slice(0, 10);
                    if (el.date_updated !== null) {
                        el.date_updated = el.date_updated.slice(0, 10);
                    } else {
                        return el.date_updated;
                    }
                });
                dispatch({type: "DATA", value: json.data});
            } catch(e) {
                console.log(e)
            }
        })();

    }, [])

    function handleLogout() {
        localStorage.clear()
        dispatch({type: "AUTHENTICATION", value: false})
    }

    const columns = useMemo(
        () => [
            {
                Header: "Tours",
                columns: [
                    {
                        Header: "Tour Name",
                        accessor: "Tour_title"
                    },
                    {
                        Header: "Date Created",
                        accessor: "date_created"
                    },
                    {
                        Header: "Date Updated",
                        accessor: "date_updated"
                    },
                    {
                        Header: "Stations",
                        accessor: "Stations"
                    }
                ]
            }
        ]
    )

    return (
        <div className = "dashboard">
            <div className = "title-container">
                <h1>Overview</h1>
            </div>
            <div className = "nav-bar">
                <button type = "buttom" className = "logOut" onClick = {handleLogout}>Log Out</button>
            </div>
            <Table columns={columns} data={data} />
        </div>
    )
}

export default Dashboard;