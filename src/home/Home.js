import React, {useState} from "react";
import styles from "./Home.module.css";
import Soccer_field from "../assets/Soccer_field.png"
import {Player} from "./Player"
import {PlayersLine} from "./PlayersLine";
import {Draggable} from "./Draggable";
import {PitchHalf} from "./PitchHalf";

export function Home() {
    const [color1, setColor1] = useState("#f54242");
    const [color2, setColor2] = useState("#ffffff");
    const [name1, setName1] = useState("Gospodarze");
    const [name2, setName2] = useState("Goście");
    const [players1, setPlayers1] = useState(5);
    const [players2, setPlayers2] = useState(5);
    const [lines1, setLines1] = useState(4);
    const [lines2, setLines2] = useState(4);
    const [equalTeams, setEqualTeams] = useState(true);
    const [samePositions, setSamePostitions] = useState(true);


    const pitchLines1 = Array(lines1).map((el) => <PlayersLine className={styles.playersLine} id={"line-"+el}/>);

    const handlePlayersChange = (e) => {
        const target = e.target;
        const nextValue = parseInt(target.value);
        if (equalTeams === true) {
            setPlayers1(nextValue);
            setPlayers2(nextValue);
        } else {
            if (target.name === "players1") {
                setPlayers1(nextValue);
            } else if (target.name === "players2") {
                setPlayers2(nextValue);
            } else {
                console.error(`Unknown team ${target.name}`);
            }
        }
    };

    const handleEqualTeamsChange = () => {
        if (players1 !== players2) {
            const max = Math.max(players1, players2);
            setPlayers1(max);
            setPlayers2(max);
        }
        setEqualTeams(prevState => !prevState);
    };

    return (
        <div className={styles.teamBuilderContainer}>
            <p>
                <input value={color1} onChange={e => setColor1(e.target.value)} type="color"/> {name1} {" - "}
                {name2} <input value={color2} onChange={e => setColor2(e.target.value)} type="color"/>
            </p>
            <input name="players1" value={players1} min={1} max={11} onChange={handlePlayersChange}
                   type="number"/>
            vs
            <input name="players2" value={players2} min={1} max={11} onChange={handlePlayersChange}
                   type="number"/>
            <br/>
            <label>
                <input type="checkbox" checked={equalTeams} onChange={handleEqualTeamsChange}/>
                Równe składy drużyn
            </label>
            <div className={styles.pitchContainer}>
                <img className={styles.responsivePitch} draggable="false" src={Soccer_field} alt="Soccer field"/>
                <PitchHalf players={[[1], [2, 3], [4, 5]]} color={color1}/>
            </div>
        </div>);
}
