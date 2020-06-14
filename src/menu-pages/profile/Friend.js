import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import UserDialog from "./UserDialog";
import makeStyles from "@material-ui/core/styles/makeStyles";
import DialogContent from "@material-ui/core/DialogContent";
import Dialog from "@material-ui/core/Dialog";
import { Box, Link } from "@material-ui/core";
import ProfilePlaceholder from "../../assets/profile-placeholder.png";
import RoundedImage from "react-rounded-image";
import { API_METHODS, withTokenFetchFromApi } from "../../api/baseFetch";

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

export const Friend = ({ token, logout, id }) => {
    const classes = useStyles();

    const [open, setOpen] = useState(false);
    const [userId, setUserId] = useState(id);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [positions, setPositions] = useState(null);
    const [stats, setStats] = useState(null);

    const onDialogClose = () => setOpen(false);

    const handleUser = (newUser) => {
        // console.log('newUser');
        // console.log(newUser);
        setUser(newUser);
        // console.log('newUser');
        // console.log(newUser);
    };

    const handlePosition = (newPosition) => {
        // console.log('newPosition');
        // console.log(newPosition);
        setPositions(newPosition);
        // console.log('newPosition');
        // console.log(newPosition);
    };

    useEffect(() => {
        const fetchFromApiWithToken = withTokenFetchFromApi(token);
        fetchFromApiWithToken(
            API_METHODS.GET,
            `users/${userId}`,
            setLoading,
            setError,
            handleUser);
    }, [token]);

    useEffect(() => {
        const fetchFromApiWithToken = withTokenFetchFromApi(token);
        fetchFromApiWithToken(
            API_METHODS.GET,
            `favouritePositions/${userId}`,
            setLoading,
            setError,
            handlePosition);
    }, [token]);

    useEffect(() => {
        const fetchFromApiWithToken = withTokenFetchFromApi(token);
        fetchFromApiWithToken(
            API_METHODS.GET,
            `statistics/${userId}`,
            setLoading,
            setError,
            setStats);
    }, [token]);

    // useEffect(() => {
    //     const fetchFromApiWithToken = withTokenFetchFromApi(token);
    //     fetchFromApiWithToken(
    //         API_METHODS.GET,
    //         `statistics/${userId}`,
    //         setLoading,
    //         setError,
    //         handlePosition);
    // }, [token]);

    return (
        <li className='friend'>
            <img className="profile-pic" src={user && user.image ? user.image : ProfilePlaceholder} />

            <h3>{user ? user.firstName + " " + user.lastName : null}</h3>

            <br />

            <Button
                type="submit"
                variant="outlined"
                color="primary"
                className="button"
                onClick={() => {
                    setOpen(true);
                }}
            >
                Zobacz profil
            </Button>
            <Dialog
                open={open}
                onClose={onDialogClose}>
                <DialogContent>
                    <Box className={classes.box}>
                        <RoundedImage className={classes.image}
                            image={user && user.image ? user.image : ProfilePlaceholder}
                            roundedColor="#e6e6e6"
                            roundedSize="13"
                            imageWidth="160"
                            imageHeight="160"
                        />
                        <h2 className={classes.header}>{user ? user.firstName + " " + user.lastName : null}</h2>
                        <p className={classes.positions}>{positions && positions[0] ? "Ulubione pozycje: " + positions[0].positionId.side + " " + positions[0].positionId.name : "brak ulubionych pozycji"}</p>
                        <p>
                            {stats ? stats.matchesPlayed + " rozegranych meczów | " + stats.hoursPlayed + "  godzin na boisku | " + stats.goalsScored + " strzelonych goli" : null}
                        </p>
                        <p>
                            {stats ? stats.yellowCardsReceived + " otrzymanych żółtych kartek | " + stats.redCardsReceived + " otrzymanych czerwonych kartek | " + stats.fauls + "  faulowań" : null}
                        </p>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            className={classes.button}
                            disabled={true}
                        >
                            Wyślij zaproszenie do znajomych
                        </Button>
                    </Box>
                </DialogContent>
            </Dialog>
        </li>
    );
};
