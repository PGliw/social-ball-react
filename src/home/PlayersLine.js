import React from "react";
import styles from "./PlayersLine.module.css";

export function PlayersLine(props) {
    const drop = (e) => {
        e.preventDefault();
        const draggableId = e.dataTransfer.getData('draggable_id');
        const draggable = document.getElementById(draggableId);
        e.target.appendChild(draggable);
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
