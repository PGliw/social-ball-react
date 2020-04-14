import React from "react";
import {PlayersLine} from "./PlayersLine";
import styles from "./PitchHalf.module.css";
import {Draggable} from "./Draggable";
import {Player} from "./Player";

export function PitchHalf(props) {
    const lines = props.lines;
    const color = props.color;
    const players = props.players;

    const renderPlayers = (lineId, players) => {
        const playersDraggables = players.map((playerNumber) =>
            (
                <Draggable key={playerNumber} id={`player-${playerNumber}`} className={styles.draggable} draggable={true}>
                    <Player playerName="Piotrek" color={color}/>
                </Draggable>)
        );
        return (
            <PlayersLine key={lineId} id={lineId} className={styles.playersLine}>
                {playersDraggables}
            </PlayersLine>
        );
    };

    const handleColumns = (team, playersNo) => {
        let columns = 1;
        if (playersNo > 0 && playersNo < 3) {
            columns = playersNo // 1 -> 1, 2 -> 2
        } else if (playersNo >= 3 && playersNo <= 4) {
            columns = 2 // 3 -> 2
        } else if (playersNo > 4) {
            columns = 4
        } else {
            console.error(`Invalid number of players: ${playersNo}`);
        }
    };

    const pitchLines = () => {
        const pitchLines = players.map((players, index) => renderPlayers(index, players));
        return (
            <div className={styles.pitchHalf}>
                {pitchLines}
            </div>
        );

    };

    return pitchLines();
}
