import React, {useEffect, useState} from "react";
import Button from "@material-ui/core/Button";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {Box} from "@material-ui/core";
import ProfilePlaceholder from "../../assets/profile-placeholder.png";
import RoundedImage from "react-rounded-image";
import {API_METHODS, withTokenFetchFromApi} from "../../api/baseFetch";

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

export const OtherUserProfile = ({token, userId, user}) => {
    const classes = useStyles();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [positions, setPositions] = useState(null);
    const [stats, setStats] = useState(null);

    const handlePosition = (newPosition) => {
        setPositions(newPosition);
    };

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
            handlePosition);
    }, [token]);

    return (
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
    );
};
