import React from "react";
import "./Home.css";
import SoccerField from "./assets/soccer_field.png"
import {Player} from "./Player"

export function Home() {
    return (<div className="pitch-container">
        <img className="selectDisable" draggable="false" src={SoccerField} alt="Soccer field"/>
        <Player />
    </div>);
}
