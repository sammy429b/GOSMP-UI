import React from 'react'

const Card = () => {
    return (
        <>
            <div className="stats stats-vertical lg:stats-horizontal shadow-xl">

                <div className="stat">
                    <div className="stat-title">Downloads</div>
                    <div className="stat-value">31K</div>
                </div>

                <div className="stat">
                    <div className="stat-title">New Users</div>
                    <div className="stat-value">4,200</div>
                </div>

                <div className="stat">
                    <div className="stat-title">New Registers</div>
                    <div className="stat-value">1,200</div>
                </div>

            </div>
        </>
    )
}

export default Card