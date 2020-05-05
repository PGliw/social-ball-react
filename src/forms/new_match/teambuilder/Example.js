import React, {Component} from 'react';
import {DragDropContext} from 'react-beautiful-dnd';
import styles from "./TeamBuilder.module.css";
import Soccer_field from "../../../assets/Soccer_field.png";
import {DroppableLine} from "./DroppablePlayer";

// fake data generator
const getItems = (count, offset = 0) =>
    Array.from({length: count}, (v, k) => k).map(k => ({
        id: `item-${k + offset}`,
        content: `item ${k + offset}`
    }));

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


export class Example extends Component {
    state = {
        goalkeepers: getItems(1),
        defenders: getItems(2, 1),
        midfields: getItems(2, 3),
        forwards: getItems(1, 5),
    };


    /**
     * A semi-generic way to handle multiple lists. Matches
     * the IDs of the droppable container to the names of the
     * source arrays stored in the state.
     */
    id2List = {
        droppable1: 'goalkeepers',
        droppable2: 'defenders',
        droppable3: 'midfields',
        droppable4: 'forwards',
    };

    getList = id => this.state[this.id2List[id]];

    onDragEnd = result => {
        const {source, destination} = result;

        // dropped outside the list
        if (!destination) {
            return;
        }

        if (source.droppableId === destination.droppableId) {
            const items = reorder(
                this.getList(source.droppableId),
                source.index,
                destination.index
            );

            const state = {};
            const droppableId = source.droppableId;
            const listName = this.id2List[droppableId];
            state[listName] = items;
            this.setState(state);

        } else {
            const result = move(
                this.getList(source.droppableId),
                this.getList(destination.droppableId),
                source,
                destination
            );

            const state = {};
            const sourceDroppableId = source.droppableId;
            const sourceListName = this.id2List[sourceDroppableId];
            const destDroppableId = destination.droppableId;
            const destListName = this.id2List[destDroppableId];
            state[sourceListName] = result[sourceDroppableId];
            state[destListName] = result[destDroppableId];

            this.setState(state);
        }
    };

    // Normally you would want to split things out into separate components.
    // But in this example everything is just done in one place for simplicity
    render() {
        return (
            <DragDropContext onDragEnd={this.onDragEnd}>
                <div className={styles.pitchContainer}>
                    <img className={styles.responsivePitch} draggable="false" src={Soccer_field} alt="Soccer field"/>
                    <div className={styles.pitchHalf}
                         style={{left: "7%"}}
                    >
                        <DroppableLine droppableId="droppable1" items={this.state.goalkeepers}/>
                        <DroppableLine droppableId="droppable2" items={this.state.defenders}/>
                        <DroppableLine droppableId="droppable3" items={this.state.midfields}/>
                        <DroppableLine droppableId="droppable4" items={this.state.forwards}/>
                    </div>
                </div>
            </DragDropContext>
        );
    }
}
