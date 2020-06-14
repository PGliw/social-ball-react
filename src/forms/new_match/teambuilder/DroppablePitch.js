import React from 'react';
import styles from "./TeamBuilder.module.css";
import Soccer_field from "../../../assets/Soccer_field.png";
import {DroppablePitchHalf, PitchHalf} from "./DroppablePitchHalf";

export function DroppablePitch(props) {
    const [team1, team2] = props.teams;
    const [handleTeam1Change, handleTeam2Change] = props.changeHandlers;
    const [team1Limits, team2Limits] = props.teamsLimits;
    const [team1Color, team2Color] = props.teamsColors;

    return (
        <div className={styles.pitchContainer}>
            <img className={styles.responsivePitch} draggable="false" src={Soccer_field} alt="Soccer field"/>
            <DroppablePitchHalf
                players={team1}
                disabledLines={team1Limits}
                color={team1Color}
                handleChange={handleTeam1Change}
            />
            <DroppablePitchHalf
                players={team2}
                disabledLines={team2Limits}
                color={team2Color}
                handleChange={handleTeam2Change}
                rightSide
            />
        </div>
    );
}
