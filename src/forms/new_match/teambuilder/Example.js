import React, {Component} from 'react';
import styles from "./TeamBuilder.module.css";
import Soccer_field from "../../../assets/Soccer_field.png";
import {DroppablePitchHalf} from "./DroppablePitchHalf";

// fake data generator
const getItems = (count, offset = 0) =>
    Array.from({length: count}, (v, k) => k).map(k => ({
        id: `item-${k + offset}`,
        content: `item ${k + offset}`
    }));


export class Example extends Component {
    state = {
        goalkeepers: getItems(1),
        defenders: getItems(2, 1),
        midfields: getItems(2, 3),
        forwards: getItems(1, 5),
        disabledGoalkeepers: true,
        disabledDefenders: false,
        disabledMidfields: false,
        disabledForwards: false,
    };

    playersToObject = () => {
        return {
            goalkeepers: this.state.goalkeepers,
            defenders: this.state.defenders,
            midfields: this.state.midfields,
            forwards: this.state.forwards
        }
    };

    disabledToObject = () => {
        return {
            goalkeepers: this.state.disabledGoalkeepers,
            defenders: this.state.disabledDefenders,
            midfields: this.state.disabledMidfields,
            forwards: this.state.disabledForwards
        }
    };

    handleChange = (st) => {
        console.log(this.state);
        console.log(st);
        this.setState(st);
    };


    render() {
        return (
            <div className={styles.pitchContainer}>
                <img className={styles.responsivePitch} draggable="false" src={Soccer_field} alt="Soccer field"/>
                <DroppablePitchHalf
                    players={this.playersToObject()}
                    disabledLines={this.disabledToObject()}
                    color={"blue"}
                    handleChange={this.handleChange}
                />
                <DroppablePitchHalf
                    players={this.playersToObject()}
                    disabledLines={this.disabledToObject()}
                    color={"red"}
                    handleChange={this.handleChange}
                    rightSide
                />
            </div>
        );
    }
}
