import { React, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import './dashboard.scss';
import TourCard from './tourCard';
import UserDropDown from './userDropDown';

const fields = "?fields=Tour_title,tour_thumbnail,date_created"

function sortData(json) {
    let arr = [];

    json.forEach((el, index) => {
        arr.push({});
        Object.keys(el).forEach(key => (key === "Stations") 
        ? arr[index][key] = (() => {
            let stationArr = [];
            el[key].forEach((el, index) => {
                stationArr.push({});
                Object.keys(el.Station_id).forEach(key => (key === "Scenes")
                ? stationArr[index][key] = (() => {
                    let sceneArr = [];
                    el.Station_id[key].forEach((el, index) => {
                        sceneArr.push({});
                        Object.keys(el.Scene_id).forEach(key => sceneArr[index][key] = el.Scene_id[key])
                    })
                    return sceneArr;
                })()
                : stationArr[index][key] = el.Station_id[key])
            })
            return stationArr;
        })()
        : arr[index][key] = el[key])
    })
    return arr
}

function Dashboard() {

    const dispatch = useDispatch();
    const {data, user, dropdown} = useSelector((store) => store);
    const access_token = localStorage.getItem("token");

    useEffect(() => {
        (async () => {
            try {
                let response = await fetch("http://localhost:8055/items/Tour" + fields , {
                    method: "GET",
                    headers: {authorization: "bearer " + access_token}
                })
                let json = await response.json();
                dispatch({type: "DATA", value: sortData(json.data)});
            } catch(e) {
                console.log(e)
            }
        })();

        (async () => {
            try {
                let response = await fetch("http://localhost:8055/users/me", {
                    method: "GET",
                    headers: {authorization: "bearer " + access_token}
                })
                let json = await response.json()
                dispatch({type: "USER", value: json.data})
            }   catch(e) {
                console.log(e)
            }
        })();
    }, []);
    
    function expandDropdown() {
        dispatch({type: "DROPDOWN", value: !dropdown})
    };

    useEffect(
        function handleClickOutside() {
            if (dropdown) {
                window.addEventListener("click", expandDropdown);
            }
            return () => {
                window.removeEventListener("click", expandDropdown);
            }
    })
    
    return (
        <div className = "dashboard">
            <nav className = "nav-bar">
                <div className = "nav-logo">
                <img src="ZAUBAR-icon-small-black.png"></img>
                </div>
                <div className = "nav-bar-headers">
                    <button type = "button" className = "nav-bar-button">
                        <i className="fa-solid fa-gauge-high"></i>
                    </button>
                    <button type = "button" className = "nav-bar-button">
                        <i className="fa-solid fa-suitcase"></i>                    
                    </button>
                    <button type = "button" className = "nav-bar-button">
                        <i className="fa-solid fa-folder"></i>
                    </button>
                    <button type = "button" className = "nav-bar-button">
                        <i className="fa-solid fa-circle-question"></i>
                    </button>
                </div>
                <div className = "nav-bar-settings">
                    <button type = "button" className = "nav-bar-button">
                        <i className="fa-solid fa-gear"></i>                    
                    </button>
                </div>
            </nav>

            <div className = "dashboard-container">
                <div className = "dashboard-container-top">
                    <h1>
                        Welcome back {user.first_name}!
                    </h1>
                    <div className = "dashboard-container-top-buttons">
                        <button type = "button" className = "top-row-button">
                            <i className="fa-solid fa-bell"></i>
                        </button>
                        <button type = "button" className = "top-row-button" onClick = {expandDropdown}>
                            <img src={"http://localhost:8055/assets/" + user.avatar + "?access_token=" + access_token}></img>
                        </button>
                        {dropdown === true
                        ? <UserDropDown first_name = {user.first_name} last_name = {user.last_name} />
                        : <div></div>
                        }
                    </div>
                </div>

                <div className = "dashboard-container-stats">
                    <h2>Stats</h2>
                </div>
                
                <div className = "dashboard-container-tours">
                    <h2>Tours</h2>
                    <div className = "tour-preview">
                    {/* Render max 4 Tour Cards */}
                    {[...Array(data.length)].map(
                        (value, index) => {
                             if (index < 4) {
                                return (
                                    <TourCard 
                                    id={index + 1} 
                                    key={index} 
                                    title={data[index].Tour_title} 
                                    date={data[index].date_created} 
                                    img={data[index].tour_thumbnail}/>
                                );
                            };
                        }
                    )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;



//To get all the data
// http://localhost:8055/items/Tour?fields=*.*.*.*.*.*

// const fields = "?fields=Tour_title,tour_thumbnail,date_created,date_updated,Stations,Stations.Station_id.station_title,Stations.Station_id.date_created,Stations.Station_id.thumbnail,Stations.Station_id.Scenes,Stations.Station_id.Scenes.Scene_id.scene_title"
