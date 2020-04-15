import React from "react";

export function Draggable(props) {
    const dragStart = e => {
        const target = e.target;
        e.dataTransfer.setData('draggable_id', target.id);
        e.dataTransfer.setData('group_id', props.groupId);
    };

    const dragOver  = e => {
        e.stopPropagation();
    };


    return (<div
            id={props.id}
            className={props.className}
            draggable={props.draggable}
            onDragStart={dragStart}
            onDragOver={dragOver}
        >
            {props.children}
        </div>
    );
}
