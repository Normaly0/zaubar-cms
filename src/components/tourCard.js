import React from 'react';
import './tourCard.scss';

function TourCard(props) {

        const access_token = localStorage.getItem("token");

    return (
        <div className = "tour-card">
            <div className = "tour-card-img">
                <img alt = "foo" src = {"http://localhost:8055/assets/" + props.img + "?access_token=" + access_token}></img>
            </div>
                <p className = "tour-card-title">{props.title}</p>
                <p className = "tour-card-date">{props.date.slice(0, 10)}</p>
        </div>
    )
}

export default TourCard;