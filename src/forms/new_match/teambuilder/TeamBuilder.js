import React, {useEffect, useState} from "react";
import styles from "./Home.module.css";
import {PlayersLine} from "./PlayersLine";
import Grid from '@material-ui/core/Grid';
import TextField from "@material-ui/core/TextField";
import {DroppablePitch} from "./DroppablePitch";

// fake data generator
const getItems = (count, offset = 0) =>
    Array.from({length: count}, (v, k) => k).map(k => ({
        id: `item-${k + offset}`,
        content: `item ${k + offset}`
    }));

const limits = [1, 5, 5, 5];

export function TeamBuilder({equalTeams, samePositions}) {
    const [color1, setColor1] = useState("#f54242");
    const [color2, setColor2] = useState("#ffffff");
    const [name1, setName1] = useState("Gospodarze");
    const [name2, setName2] = useState("Goście");
    const [players1, setPlayers1] = useState(7);
    const [players2, setPlayers2] = useState(7);
    const team1Items = getItems(7);
    const team2Items = getItems(7, 20);
    const [team1, setTeam1] = useState(
        {
            goalkeepers: team1Items.slice(0, 1),
            defenders: team1Items.slice(1, 3),
            midfields: team1Items.slice(3, 6),
            forwards: team1Items.slice(6, 7)
        }
    );
    const [team2, setTeam2] = useState(
        {
            goalkeepers: team2Items.slice(0, 1),
            defenders: team2Items.slice(1, 3),
            midfields: team2Items.slice(3, 6),
            forwards: team2Items.slice(6, 7)
        }
    );
    const [team1Limits, setTeam1Limits] = useState(
        {
            goalkeepers: true,
            defenders: false,
            midfields: false,
            forwards: false
        }
    );
    const [team2Limits, setTeam2Limits] = useState(
        {
            goalkeepers: true,
            defenders: false,
            midfields: false,
            forwards: false
        }
    );

    useEffect(() => {
        handleEqualTeamsChange(equalTeams);
    }, [equalTeams]);

    useEffect(() => {
        // TODO
    }, [players1]);

    useEffect(() => {
        // TODO
    }, [players2]);

    const handlePlayersChange = (e) => {
        const target = e.target;
        const nextValue = parseInt(target.value);
        console.log(equalTeams);
        if (equalTeams === true) {
            setPlayers1(nextValue);
            setPlayers2(nextValue);
        } else {
            if (target.id === "players1") {
                setPlayers1(nextValue);
            } else if (target.id === "players2") {
                setPlayers2(nextValue);
            } else {
                console.error(`Unknown team ${target.name}`);
            }
        }
    };

    const handlePlayersNumberChange = (team, oldPlayers, newPlayers) => {
        // TODO
    };

    const handleEqualTeamsChange = (areEqual) => {
        if (areEqual === true && players1 !== players2) {
            const max = Math.max(players1, players2);
            setPlayers1(max);
            setPlayers2(max);
        }
    };

    const handleSamePostionsChange = () => {
        // TODO
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
                        min={1} max={11}
                        onChange={handlePlayersChange}/>
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
                        min={1} max={11}
                        onChange={handlePlayersChange}/>
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
