import React from "react"
import styles from "./login_registration/FormInput.module.css"

export function FormInput(props) {
    return (
        <label classsName={styles.textInputLabel}>
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

