import React from "react";
import {Draggable, Droppable} from 'react-beautiful-dnd';

export const lineStyle = {
    display: 'flex',
    // justifyContent: 'space-between',
    flexDirection: 'column',
    padding: '2px',
    border: '2px solid green',
    justifyContent: 'center',
    flexBasis: '100%',
};

const getDroppableLineStyle = isDraggingOver => ({
    background: isDraggingOver ? 'rgba(130, 255, 151, 0.5)' : 'transparent',
    ...lineStyle
});

const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: 'none',
    // padding: grid * 2,
    // margin: `0 0 ${grid}px 0`,

    // change background colour if dragging
    background: isDragging ? 'lightblue' : 'transparent',

    // styles we need to apply on draggables
    ...draggableStyle
});


// const
const withDraggable = (component, props, id, index) => {
    return (
        <Draggable
            key={id}
            draggableId={id}
            index={index}>
            {(provided, snapshot) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={getItemStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style
                    )}>
                    {component({...props})}
                </div>
            )}
        </Draggable>
    );
};

export function DroppableLine(props) {
    const droppableId = props.droppableId;
    const items = props.items;
    const color = props.color;
    const isDropDisabled = props.dropDisabled;
    const component = props.playerComponent;

    return (
        <Droppable
            droppableId={droppableId}
            isDropDisabled={isDropDisabled || false}>
            {(provided, snapshot) => {
                return (
                    <div
                        ref={provided.innerRef}
                        style={getDroppableLineStyle(snapshot.isDraggingOver)}
                    >
                        {items.map((item, index) => withDraggable(component, {...props}, item.id, index))}
                        {provided.placeholder}
                    </div>
                )
            }}
        </Droppable>
    );
}


