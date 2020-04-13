import React, {useState} from "react";
import styles from "./Home.module.css";
import SoccerField from "./assets/soccer_field.png"
import {Player} from "./Player"

export function Home() {
    const [color1, setColor1] = useState("#f54242");
    const [color2, setColor2] = useState("#ffffff");
    const [name1, setName1] = useState("Gospodarze");
    const [name2, setName2] = useState("Goście");
    const [players1, setPlayers1] = useState(5);
    const [players2, setPlayers2] = useState(5);

    return (
        <div className={styles.teamBuilderContainer}>
            <p>
                <input value={color1} onChange={e => setColor1(e.target.value)} type="color"/>Gospodarze
                Goście <input value={color2} onChange={e => setColor2(e.target.value)} type="color"/>
            </p>
            <input value={players1} onSubmit={e => setPlayers1(e.target.value)} type="number"/>
            vs
            <input value={players2} onSubmit={e => setPlayers2(e.target.value)} type="number"/>
            <div className={styles.pitchContainer}>
                <img className={styles.responsivePitch} draggable="false" src={SoccerField} alt="Soccer field"/>
                <Player playerName="Piotrek" color={color1}/>
                <Player playerName="Maciek" color={color2}/>
            </div>
        </div>);
}
