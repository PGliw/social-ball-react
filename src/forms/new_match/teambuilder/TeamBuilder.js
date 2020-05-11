import React, {useEffect, useState} from "react";
import styles from "./Home.module.css";
import Grid from '@material-ui/core/Grid';
import TextField from "@material-ui/core/TextField";
import {DroppablePitch} from "./DroppablePitch";
import {usePrevious} from "../../../utils/Hooks";



export function TeamBuilder(props) {
    const equalTeams = props.equalTeams;
    const [color1, color2] = props.colors;
    const [setColor1, setColor2] = props.colorSetters;
    const [name1, name2] = props.names;
    const [setName1, setName2]= props.nameSetters;
    const [players1, players2] = props.players;
    const [setPlayers1, setPlayers2] = props.playersSetters;
    const [team1, team2] = props.teams;
    const [setTeam1, setTeam2] = props.teamSetters;
    const [team1Limits, team2Limits] = props.teamLimits;
    const [setTeam1Limits, setTeam2Limits] = props.teamLimitsSetters;
    const limits = props.limits;

    useEffect(() => {
        handleEqualTeamsChange(equalTeams);
    }, [equalTeams]);


    useEffect(() => {
        handleNewDisabled(team1, setTeam1Limits);
    }, [team1]);

    useEffect(() => {
        handleNewDisabled(team2, setTeam2Limits);
    }, [team2]);

    const previousPlayers1 = usePrevious(players1);
    useEffect(() => {
        const difference = players1 - previousPlayers1;
        handleNewPlayersPlacement(difference, 1, team1, setTeam1);
    }, [players1]);

    const previousPlayers2 = usePrevious(players2);
    useEffect(() => {
        const difference = players2 - previousPlayers2;
        handleNewPlayersPlacement(difference, 2, team2, setTeam2);
    }, [players2]);

    const handleNewPlayersPlacement = (difference, teamId, team, setTeam) => {
        const keys = Object.keys(team);
        let newTeam = null;
        if (difference > 0) {
            newTeam = JSON.parse(JSON.stringify(team));
            for (let i = 0; i < difference; i++) {

                let usedNums = [];
                keys.forEach(key => {
                        let result;
                        result = usedNums.concat(team[key].map(item => item.num));
                        usedNums = result;
                    }
                );
                if (usedNums.length === 0) {
                    console.error("No ids found");
                    return;
                }
                const maxNum = Math.max.apply(Math, usedNums);
                const nextItem = {
                    id: `item-${teamId}-${maxNum + i + 1}`,
                    content: `item-${teamId}-${maxNum + i + 1}`,
                    num: maxNum + i + 1
                };

                let nameOfLineToInsert = null;
                for (let k = 0; k < keys.length; k++) {
                    const key = keys[k];
                    if (newTeam[key].length < limits[key]) {
                        nameOfLineToInsert = key;
                        break;
                    }
                }
                if (nameOfLineToInsert === null) {
                    console.error("No free space found");
                    return;
                }
                newTeam[nameOfLineToInsert].push(nextItem);
            }
        } else if (difference < 0) {
            newTeam = JSON.parse(JSON.stringify(team));
            for (let i = 0; i < Math.abs(difference); i++) {

                let nameOfLineToRemove = null;
                for (let k = keys.length - 1; k >= 0; k--) {
                    const key = keys[k];
                    if (newTeam[key].length > 0) {
                        nameOfLineToRemove = key;
                        break;
                    }
                }
                if (nameOfLineToRemove === null) {
                    console.error("All lines already are empty");
                    return;
                }
                newTeam[nameOfLineToRemove].pop();
            }
        }
        if (newTeam === null) {
            console.error("New team is null");
        } else {
            setTeam(newTeam);
        }
    };


    const handleNewDisabled = (newPlayers, setDisabled) => {
        const newDisabledState = {
            goalkeepers: newPlayers.goalkeepers.length >= limits.goalkeepers,
            defenders: newPlayers.defenders.length >= limits.defenders,
            midfields: newPlayers.midfields.length >= limits.midfields,
            forwards: newPlayers.forwards.length >= limits.forwards
        };
        setDisabled(newDisabledState);
    };

    const handlePlayersCountChange = (setPlayers, e) => {
        const nextValue = parseInt(e.target.value);
        if (equalTeams === true) {
            setPlayers1(nextValue);
            setPlayers2(nextValue);
        } else {
            setPlayers(nextValue);
        }
    };

    const handleEqualTeamsChange = (areEqual) => {
        if (areEqual === true && players1 !== players2) {
            const max = Math.max(players1, players2);
            setPlayers1(max);
            setPlayers2(max);
        }
    };

    return (
        <div className={styles.teamBuilderContainer}>
            <Grid container>
                <Grid item md={6} sm={12}>
                    <TextField
                        label="Nazwa drużyny 1."
                        id="firstTeamName"
                        type="text"
                        value={name1}
                        onChange={e => setName1(e.target.value)}/>
                    <TextField
                        label="Liczba graczy"
                        id="players1"
                        type="number"
                        value={players1}
                        inputProps={{min: "1", max: "11", step: "1"}}
                        onChange={(e) => handlePlayersCountChange(setPlayers1, e)}/>
                    <input value={color1} onChange={e => setColor1(e.target.value)} type="color"/>
                </Grid>
                <Grid item md={6} sm={12}>
                    <TextField
                        label="Nazwa drużyny 2."
                        id="secondTeamName"
                        type="text"
                        value={name2}
                        onChange={e => setName2(e.target.value)}/>
                    <TextField
                        label="Liczba graczy"
                        id="players2"
                        type="number"
                        value={players2}
                        inputProps={{min: "1", max: "11", step: "1"}}
                        onChange={(e) => handlePlayersCountChange(setPlayers2, e)}/>
                    <input value={color2} onChange={e => setColor2(e.target.value)} type="color"/>
                </Grid>
                <br/>
            </Grid>
            <DroppablePitch
                teams={[team1, team2]}
                changeHandlers={[setTeam1, setTeam2]}
                teamsLimits={[team1Limits, team2Limits]}
                teamsColors={[color1, color2]}
            />
        </div>);
}
