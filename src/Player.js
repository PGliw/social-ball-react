import React from "react";
import {ReactComponent as TShirt} from "./assets/t_shirt.svg"
import "./Player.css"

export function Player(props) {
    return (
        <div className="PlayerContainer">
            <TShirt class="TShirtCss"/>
            <p>{props.playerName}</p>
        </div>

    );
}
