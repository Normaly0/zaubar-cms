import React from 'react';
import { useSelector } from 'react-redux';
import { Skeleton } from '@mui/material'
import './overview.scss';

import TourCard from './tourCard';
import StatsCard from './statsCard';

function Overview() {

    const {data, loading} = useSelector((store) => store);

    return (
        <div className = "dashboard-container-body-overview">
            <div className = "dashboard-container-body-overview-stats">
                {
                        loading
                        ? <Skeleton variant='text' animation = "wave" width = {130} height = {"30%"} />
                        : <h2>Stats</h2>
                    }
                    <div className = "stats-preview">
                    {loading
                        ? [...Array(4)].map(
                            (value, index) => {
                                return (
                                    <Skeleton 
                                    id = {index + 1}
                                    key = {index}
                                    style = {{
                                        transform: "none",
                                        height: "90%",
                                        borderRadius: "5px"
                                    }}
                                    className = "stats-card" />
                                )
                            }
                        )
                        : [...Array(data.length)].map(
                            (value, index) => {
                                 if (index < 4) {
                                    return (
                                        <StatsCard 
                                        id={index + 1} 
                                        key={index} />
                                    );
                                };
                            } 
                        )
                    }
                    </div>
                </div>
                
                <div className = "dashboard-container-body-overview-tours">
                    {
                        loading
                        ? <Skeleton variant='text' animation = "wave" width = {130} height = {"20%"} />
                        : <h2>Tours</h2>
                    }
                    <div className = "tour-preview">
                    {loading
                        ? [...Array(4)].map(
                            (value, index) => {
                                return (
                                    <Skeleton 
                                    id = {index + 1}
                                    key = {index}
                                    style = {{
                                        transform: "none",
                                        height: "90%",
                                        borderRadius: "5px"
                                    }}
                                    className = "tour-card" />
                                )
                            }
                        )
                        : [...Array(data.length)].map(
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
                        )
                    }
                    </div>
                </div>
        </div>
    )
}

export default Overview;