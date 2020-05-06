// fake data generator
import React from "react";
import styles from "./TeamBuilder.module.css";
import {DroppableLine} from "./DroppableLine";
import {DragDropContext} from 'react-beautiful-dnd';


// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

/**
 * Moves an item from one list to another list.
 */
const move = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);

    destClone.splice(droppableDestination.index, 0, removed);

    const result = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;

    return result;
};


export function DroppablePitchHalf(props) {
    const players = props.players;
    const disabledLines = props.disabledLines;
    const handleChange = props.handleChange;
    const color = props.color;
    const isRightSide = props.rightSide || false;
    const pitchHalfStyle = isRightSide === true ? {right: "7%"} : {left: "7%"};
    const teamId = isRightSide === true ? 2 : 1;


    /**
     * A semi-generic way to handle multiple lists. Matches
     * the IDs of the droppable container to the names of the
     * source arrays stored in the state.
     */
    const id2List = {
        droppable1: 'goalkeepers',
        droppable2: 'defenders',
        droppable3: 'midfields',
        droppable4: 'forwards',
    };

    const getList = id => players[id2List[id]];

    const onDragEnd = result => {
        const {source, destination} = result;

        // dropped outside the list
        if (!destination) {
            return;
        }

        if (source.droppableId === destination.droppableId) {
            const items = reorder(
                getList(source.droppableId),
                source.index,
                destination.index
            );

            const state = {};
            const droppableId = source.droppableId;
            const listName = id2List[droppableId];
            state[listName] = items;

            handleChange(state);

        } else {
            const result = move(
                getList(source.droppableId),
                getList(destination.droppableId),
                source,
                destination
            );

            const state = {};
            const sourceDroppableId = source.droppableId;
            const sourceListName = id2List[sourceDroppableId];
            const destDroppableId = destination.droppableId;
            const destListName = id2List[destDroppableId];
            state[sourceListName] = result[sourceDroppableId];
            state[destListName] = result[destDroppableId];

            handleChange(state);
        }
    };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className={styles.pitchHalf}
                 style={pitchHalfStyle}
            >
                <DroppableLine droppableId="droppable1" items={players.goalkeepers}
                               dropDisabled={disabledLines.goalkeepers || false}/>
                <DroppableLine droppableId="droppable2" items={players.defenders}
                               dropDisabled={disabledLines.defenders || false}/>
                <DroppableLine droppableId="droppable3" items={players.midfields}
                               dropDisabled={disabledLines.midfields || false}/>
                <DroppableLine droppableId="droppable4" items={players.forwards}
                               dropDisabled={disabledLines.forwards || false}/>
            </div>
        </DragDropContext>
    );

}
