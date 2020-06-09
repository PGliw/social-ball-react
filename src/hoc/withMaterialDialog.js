import {Dialog, DialogContent} from "@material-ui/core";
import React from "react";
import DialogTitle from "@material-ui/core/DialogTitle";

export const withMaterialDialog = (InnerComponent, open, onClose, title) => (props) => <Dialog
    open={open}
    onClose={onClose}
    fullWidth={true}
    maxWidth={'md'}
>
    <DialogTitle onClose={onClose}>
        {title}
    </DialogTitle>
    <DialogContent>
        <InnerComponent {...props}/>
    </DialogContent>
</Dialog>;
