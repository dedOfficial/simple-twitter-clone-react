import React from "react";

import './app-header.css';

const AppHeader = ({likedCount, allCount}) => {
    return (
        <div className="app-header d-flex">
            <h1>Konstantin Karpov</h1>
            <h2>{allCount} записей, из них понравилось {likedCount}</h2>
        </div>
    );
};

export default AppHeader;