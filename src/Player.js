import React from "react";
//import {ReactComponent as TShirt} from "./assets/t_shirt.svg"
import {TShirtComponent} from './assets/TShirtComponent'
import "./Player.css"

export function Player(props) {
    return (
        <div className="PlayerContainer">
            <TShirtComponent color={props.color} width="80%" height="80%"/>
            <p>{props.playerName}</p>
        </div>

    );
}
