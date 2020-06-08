import React, { useState } from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import UserDialog from "./UserDialog";
import makeStyles from "@material-ui/core/styles/makeStyles";
import DialogContent from "@material-ui/core/DialogContent";
import Dialog from "@material-ui/core/Dialog";
import { Box, Link } from "@material-ui/core";
import ProfilePlaceholder from "../../assets/profile-placeholder.png";
import RoundedImage from "react-rounded-image";
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

export default function Friend(props) {
    const classes = useStyles();

    const [open, setOpen] = useState(false);

    const onDialogClose = () => setOpen(false);

    return (
        <li className='friend'>
            <img className="profile-pic" src={props.picSquare} />

            <h3>{props.name}</h3>

            <div className="nickname">
                Nickname: {props.nickname}
            </div>
            <br></br>

            <Button
                type="submit"
                variant="contained"
                color="primary"
                className="button"
                onClick={() => { setOpen(true); }}
            >
                Zobacz profil
                            </Button>
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
        </li>
    );
}

Friend.propTypes = {
    name: PropTypes.string.isRequired
    , picSquare: PropTypes.string.isRequired
    , nickname: PropTypes.string.isRequired
    , friendCount: PropTypes.number
};