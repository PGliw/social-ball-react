import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import {Box, Button} from "@material-ui/core";
import {API_METHODS, withTokenFetchFromApi} from "../../api/baseFetch";
import makeStyles from "@material-ui/core/styles/makeStyles";
import ProfilePlaceholder from "../../assets/profile-placeholder.png";
import RoundedImage from "react-rounded-image";
import DialogContent from "@material-ui/core/DialogContent";
import Dialog from "@material-ui/core/Dialog";

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

export const Invitation = ({token, logout, id}) => {
    const classes = useStyles();

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [open, setOpen] = useState(false);
    const [stats, setStats] = useState(null);
    const [positions, setPositions] = useState(null);
    const [userId, setUserId] = useState(id);
    const [requestDone, setRequestDone] = useState(false);
    const [rejected, setRejected] = useState(false);
    const [header, setHeader] = useState("");

    const onDialogClose = () => setOpen(false);

    useEffect(() => {
        const fetchFromApiWithToken = withTokenFetchFromApi(token);
        fetchFromApiWithToken(
            API_METHODS.GET,
            `users/${id}`,
            setLoading,
            setError,
            setUser);
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

    useEffect(() => {
        const fetchFromApiWithToken = withTokenFetchFromApi(token);
        fetchFromApiWithToken(
            API_METHODS.GET,
            `favouritePositions/${userId}`,
            setLoading,
            setError,
            setPositions);
    }, [token]);

    const acceptRequest = () => {
        const fetchFromApiWithToken = withTokenFetchFromApi(token);
        fetchFromApiWithToken(
            API_METHODS.PUT,
            `acquaitances/accept?senderId=${userId}`,
            setLoading,
            setError,
            null,
            null);
        setRequestDone(true);
        setHeader("✅ Dodano");
    };

    const denyRequest = () => {
        const fetchFromApiWithToken = withTokenFetchFromApi(token);
        fetchFromApiWithToken(
            API_METHODS.PUT,
            `acquaitances/reject?senderId=${userId}`,
            setLoading,
            setError,
            null,
            null);
        setRequestDone(true);
        setHeader("❌ Odrzucono");
        setRejected(true);
    };

    return (
        <li className='friend'>
            <img className="profile-pic" src={user && user.image ? user.image : ProfilePlaceholder}/>

            <h3>{user ? user.firstName + " " + user.lastName : null}</h3>

            {/* <div className="nickname">
                Nickname: {props.nickname}
            </div> */}
            <br></br>

            <div className="status">
                <Button variant="outlined" color="primary" disabled={requestDone}
                        onClick={() => {
                            acceptRequest();
                        }}>
                    Akceptuj
                </Button>
                &nbsp;
                <Button variant="outlined" color="primary" disabled={requestDone}
                        onClick={() => {
                            denyRequest();
                        }}>
                    Odrzuć
                </Button>
                &nbsp;
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
                <h2>{header}</h2>

            </div>


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
                            disabled={!rejected}
                        >
                            Wyślij zaproszenie do znajomych
                        </Button>
                    </Box>
                </DialogContent>
            </Dialog>

        </li>
    );
}

Invitation.propTypes = {
    name: PropTypes.string.isRequired
    , picSquare: PropTypes.string.isRequired
    , nickname: PropTypes.string.isRequired
};
