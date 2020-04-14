import React from "react";
import {PlayersLine} from "./PlayersLine";
import styles from "./PitchHalf.module.css";
import {Draggable} from "./Draggable";
import {Player} from "./Player";

export function PitchHalf(props) {
    const isLeftSide = props.isLeftSide;
    const color = props.color;
    const players = isLeftSide === true ? props.players : [...props.players].reverse();
    const pitchHalfStyle = isLeftSide === true ? {left: "7%"} : {right: "7%"};
    const teamId = isLeftSide === true ? 1 : 2;

    const renderPlayers = (lineId, players) => {
        const playersDraggables = players.map((playerNumber) =>
            (
                <Draggable key={playerNumber} id={"player-" + teamId + "-" + playerNumber} className={styles.draggable}
                           draggable={true} groupId={teamId}>
                    <Player playerName="Piotrek" color={color}/>
                </Draggable>)
        );
        return (
            <PlayersLine key={lineId} id={lineId} className={styles.playersLine} groupId={teamId}>
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

    const pitchLines = players.map((players, index) => renderPlayers("line-" + teamId + "-" + index, players));
    return (
        <div className={styles.pitchHalf} style={pitchHalfStyle}>
            {pitchLines}
        </div>
    );


}
