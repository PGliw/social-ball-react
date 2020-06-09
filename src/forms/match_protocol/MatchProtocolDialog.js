import {Dialog, DialogContent} from "@material-ui/core";
import React from "react";
import DialogTitle from "@material-ui/core/DialogTitle";
import {MatchProtocol} from "./MatchProtocol";

export const MatchProtocolDialog = (props) => {
    return <Dialog
        open={props.open}
        onClose={props.onClose}
        fullWidth={true}
        maxWidth = {'md'}
    >
        <DialogTitle onClose={props.onClose}>
            Protokół pomeczowy
        </DialogTitle>
        <DialogContent>
            <MatchProtocol {...props}/>
        </DialogContent>
    </Dialog>
};
