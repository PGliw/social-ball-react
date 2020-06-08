import React, { useState } from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import DialogContent from "@material-ui/core/DialogContent";
import Dialog from "@material-ui/core/Dialog";
import { Box, Link } from "@material-ui/core";
import ProfilePlaceholder from "../../assets/profile-placeholder.png";
import RoundedImage from "react-rounded-image";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
    box: {
        padding: theme.spacing(1),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    button: {
        width: '75%',
        margin: theme.spacing(0, 2, 2),
    }
}));

const UserDialog = () => {
    const classes = useStyles();

    const [open, setOpen] = useState(true);

    const onDialogClose = () => setOpen(false);

    return (
        <Dialog
            open={open}
            onClose={onDialogClose}>
            <DialogContent >
                <Box className={classes.box}>
                    <RoundedImage className={classes.image} image={ProfilePlaceholder}
                        roundedColor="#e6e6e6"
                        roundedSize="13"
                        imageWidth="160"
                        imageHeight="160"
                    />
                    <h2 className={classes.header}>Jan Kowalski</h2>
                    <p className={classes.positions}>Ulubione pozycje: napastnik</p>
                    <p>
                        172 rozegrane mecze | 221 godzin na boisku | 71 strzelonych goli
                      </p>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        className={classes.button}>
                        Wyślij zaproszenie do znajomych
                            </Button>
                </Box>
            </DialogContent>
        </Dialog>
    );
};

export default UserDialog;
