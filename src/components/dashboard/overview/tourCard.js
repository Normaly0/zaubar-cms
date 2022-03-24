import React from 'react';
import './tourCard.scss';

function dateFormating(date) {
    let arr = date.split("-")
    arr[2] = arr[2].slice(0, 2);
    return arr.reverse().join("-")
}

function TourCard(props) {

    const access_token = localStorage.getItem("token");
    
        return (
            <div className = "tour-card">
                <div className = "tour-card-img darken">
                    <img alt = "" className = "" src = {"http://localhost:8055/assets/" + props.img + "?access_token=" + access_token}></img>
                </div>
                    <p className = "tour-card-title">{props.title}</p>
                    <p className = "tour-card-date">{dateFormating(props.date)}</p>
            </div>
        )
}

export default TourCard;