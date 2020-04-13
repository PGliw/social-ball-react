import React from "react"
import styles from "./FormInput.module.css"

export function FormInput(props) {
    return (
        <label className={styles.textInputLabel}>
            {props.label}
            <input className={styles.textInput}
                value={props.value}
                name={props.name}
                type={props.type}
                onChange={(e) => props.onChange(e)}
            />
            <div className={styles.errorMessage}>{props.error}</div>
        </label>
    );
}

