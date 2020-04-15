import React from "react";
//import {ReactComponent as TShirt} from "./assets/t_shirt.svg"
import {TShirtCsv} from '../assets/TShirtCsv'
import styles from "./Player.module.css"

export function Player(props) {
    return (
        <div>
            <TShirtCsv color={props.color} width="100%" height="100%"/>
            <p className={styles.playerName}>{props.playerName}</p>
        </div>

    );
}
