import React, {useState} from "react";
import styles from "./Home.module.css";
import Soccer_field from "../assets/Soccer_field.png"
import {Player} from "./Player"
import {PlayersLine} from "./PlayersLine";
import {Draggable} from "./Draggable";

export function Home() {
    const [color1, setColor1] = useState("#f54242");
    const [color2, setColor2] = useState("#ffffff");
    const [name1, setName1] = useState("Gospodarze");
    const [name2, setName2] = useState("Goście");
    const [players1, setPlayers1] = useState(5);
    const [players2, setPlayers2] = useState(5);
    const [equalTeams, setEqualTeams] = useState(true);
    const [samePositions, setSamePostitions] = useState(true);


    return (
        <div className={styles.teamBuilderContainer}>
            <p>
                <input value={color1} onChange={e => setColor1(e.target.value)} type="color"/>Gospodarze
                Goście <input value={color2} onChange={e => setColor2(e.target.value)} type="color"/>
            </p>
            <input value={players1} min={1} max={11} onChange={e => setPlayers1(parseInt(e.target.value))}
                   type="number"/>
            vs
            <input value={players2} min={1} max={11} onChange={e => setPlayers2(parseInt(e.target.value))}
                   type="number"/>
            <div className={styles.pitchContainer}>
                <img className={styles.responsivePitch} draggable="false" src={Soccer_field} alt="Soccer field"/>
                <div className={styles.pitchHalf}>

                    <PlayersLine className={styles.playersLine} id={"line-1"}>
                        <Draggable id={"player-1"} className={styles.draggable} draggable={true}>
                            <Player playerName="Piotrek" color={color1}/>
                        </Draggable>

                    </PlayersLine>
                    <PlayersLine className={styles.playersLine} id={"line-2"}>
                        <Draggable id={"player-2"} className={styles.draggable} draggable={true}>
                        <Player playerName="Maciek" color={color2}/>
                        </Draggable>
                    </PlayersLine>

                </div>
            </div>
        </div>);
}
