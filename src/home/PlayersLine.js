import React from "react";
import styles from "./PlayersLine.module.css";

export function PlayersLine(props) {
    const drop = (e) => {
        e.preventDefault();
        const playerId = e.dataTransfer.getData('draggable_id');
        const player = document.getElementById(playerId);
        player.style.display = "block";
        e.target.appendChild(player);
    };

    const dragOver = (e) => {
        e.preventDefault();
    };

    return (
        <div
            id={props.id}
            onDrop={drop}
            onDragOver={dragOver}
            className={props.className}
        >
            {props.children}
        </div>
    )
}
