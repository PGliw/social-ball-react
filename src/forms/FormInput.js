import React from "react"
import "./FormInput.css"

export function FormInput(props) {
    return (
        <label>
            {props.label}
            <input
                value={props.value}
                name={props.name}
                type={props.type}
                onChange={(e) => props.onChange(e)}
            />
            <div className="error-message">{props.error}</div>
        </label>
    );
}

