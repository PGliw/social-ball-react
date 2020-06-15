import React from "react";
import Button from "@material-ui/core/Button";

export const Confirmation = ({message, isLoading, onYes, onNo, isSuccessful}) => {
    if (!isLoading && !isSuccessful) {
        return <div>{message}
            <br/>
            <Button onClick={onNo}>Anuluj</Button>
            <Button onClick={onYes}>Zatwierdź</Button>
        </div>
    } else if (!!isSuccessful) {
        return <div>Zapisano</div>
    } else if (!!isLoading) {
        return <div>Trwa ładowanie...</div>
    } else {
        return <div>Wystąpił bład.</div>
    }
};
