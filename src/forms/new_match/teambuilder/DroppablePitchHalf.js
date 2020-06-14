// fake data generator
import React from "react";
import styles from "./TeamBuilder.module.css";
import {DroppableLine, Line} from "./DroppableLine";
import {DragDropContext} from 'react-beautiful-dnd';
import {TShirtPlayer} from "./TShirtPlayer";


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
    const playerLinesKeys = Object.keys(players);
    const playersLinesCount = playerLinesKeys.length;
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
    const droppableNames = [...Array(playersLinesCount).keys()].map(i => `droppable${i}`);
    // eg. {droppable0: 'goalkeepers', droppable1: 'defenders', ... }
    const id2List = {};
    droppableNames.forEach((droppableName, index) => id2List[droppableName] = playerLinesKeys[index]);
    const getList = id => players[id2List[id]];

    const onDragEnd = result => {
        const {source, destination} = result;

        // dropped outside the list
        if (!destination) {
            return;
        }

        const newPlayers = JSON.parse(JSON.stringify(players));

        if (source.droppableId === destination.droppableId) {
            const items = reorder(
                getList(source.droppableId),
                source.index,
                destination.index
            );

            const droppableId = source.droppableId;
            const listName = id2List[droppableId];
            newPlayers[listName] = items;

            handleChange(newPlayers);

        } else {
            const result = move(
                getList(source.droppableId),
                getList(destination.droppableId),
                source,
                destination
            );

            const sourceDroppableId = source.droppableId;
            const sourceListName = id2List[sourceDroppableId];
            const destDroppableId = destination.droppableId;
            const destListName = id2List[destDroppableId];
            newPlayers[sourceListName] = result[sourceDroppableId];
            newPlayers[destListName] = result[destDroppableId];

            handleChange(newPlayers);
        }
    };

    const originalLines = droppableNames.map((droppableName) => {
        const playersLineKey = id2List[droppableName];
        const items = players[playersLineKey];
        const dropDisabled = disabledLines[playersLineKey];
        return (
            <DroppableLine
                key={droppableName}
                color={color}
                droppableId={droppableName} items={items}
                playerComponent={TShirtPlayer}
                dropDisabled={dropDisabled || false}/>
        );
    });
    const transformedLines = isRightSide === false ? originalLines : originalLines.reverse();

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className={styles.pitchHalf}
                 style={pitchHalfStyle}
            >
                {transformedLines}
            </div>
        </DragDropContext>
    );

}
