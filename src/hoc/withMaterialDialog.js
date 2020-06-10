import {Dialog, DialogContent} from "@material-ui/core";
import React from "react";
import DialogTitle from "@material-ui/core/DialogTitle";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";

export const withMaterialDialog = (InnerComponent, open, onClose, title) => (props) => {

    return <Dialog
        open={open}
        onClose={onClose}
        fullWidth={true}
        maxWidth={'md'}
    >
        <DialogTitle onClose={onClose}>
            {title}
            <IconButton aria-label="close" onClick={onClose} style={{float: 'right'}}>
                <CloseIcon/>
            </IconButton>
        </DialogTitle>
        <DialogContent>
            <InnerComponent {...props}/>
        </DialogContent>
    </Dialog>;
};
