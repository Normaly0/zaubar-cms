import React from 'react';
import './tourCard.scss';

function TourCard(props) {

    return (
        <div className = "tour-card">
            <div className = "tour-card-img">
                {/* <img src = {''}></img> */}
            </div>
                <p className = "tour-card-title">{props.title}</p>
                <p className = "tour-card-date">{props.date.slice(0, 10)}</p>
        </div>
    )
}

export default TourCard;