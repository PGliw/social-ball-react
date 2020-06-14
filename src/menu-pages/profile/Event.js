import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import UserDialog from "./UserDialog";
import makeStyles from "@material-ui/core/styles/makeStyles";
import DialogContent from "@material-ui/core/DialogContent";
import Dialog from "@material-ui/core/Dialog";
import { Box, Link, Paper } from "@material-ui/core";
import ProfilePlaceholder from "../../assets/profile-placeholder.png";
import RoundedImage from "react-rounded-image";
import { API_METHODS, withTokenFetchFromApi } from "../../api/baseFetch";
import { EVENT_NAMES } from "../../api/constants";
import { withMaterialDialog } from "../../hoc/withMaterialDialog";
import { MatchProtocol } from "../../forms/match_protocol/MatchProtocol";

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
    },
    paper: {
        padding: theme.spacing(1),
        margin: theme.spacing(2),
    },
    paperBox: {
        padding: theme.spacing(1),
    }
}));

export const Event = ({ token, eventId }) => {
    const classes = useStyles();

    const [isProtocolOpened, setIsProtocolOpened] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [event, setEvent] = useState(null);
    const [eventMatch, setEventMatch] = useState(null);

    const generateTitle = (type, isFemale) => {
        switch (type) {
            case EVENT_NAMES.ASSIST:
                return `${isFemale ? 'zaliczyła asystę' : 'zaliczył asystę'}`;
            case EVENT_NAMES.FOUL:
                return `${isFemale ? 'faulowała' : 'faulował'}`;
            case EVENT_NAMES.INJURY:
                return `${isFemale ? 'została kontuzjowana' : 'został kontuzjowany'}`;
            case EVENT_NAMES.RED_CARD:
                return `${isFemale ? 'otrzymała czerwoną kartkę' : 'otrzymał czerwoną kartkę'}`;
            case EVENT_NAMES.YELLOW_CARD:
                return `${isFemale ? 'otrzymała żółtą kartkę' : 'otrzymał żółtą kartkę'}`;
            default:
                return 'błąd';
        }
    }

    useEffect(() => {
        const fetchFromApiWithToken = withTokenFetchFromApi(token);
        fetchFromApiWithToken(
            API_METHODS.GET,
            `events/${eventId}`,
            setLoading,
            setError,
            setEvent);
    }, [token]);

    useEffect(() => {
        const fetchFromApiWithToken = withTokenFetchFromApi(token);
        fetchFromApiWithToken(
            API_METHODS.GET,
            `footballMatches/${event.footballMatchId}`,
            setLoading,
            setError,
            setEventMatch);
    }, [token]);


    return (
        <Paper className={classes.paper}>
            <Box display="flex" p={1} bgcolor="background.paper">
                <Box className={classes.paperBox}>
                    <RoundedImage image={event && event.matchMemberResponse && event.matchMemberResponse.user ?
                        event.matchMemberResponse.user.image : ProfilePlaceholder}
                        roundedColor="#e6e6e6"
                        roundedSize="13"
                        imageWidth="80"
                        imageHeight="80"
                    />
                </Box>
                <Box className={classes.paperBox}>
                    <p>{event ? event.dateTime : "ładowanie danych"}</p>
                    <p>{event ? event.matchMemberResponse.user.firstName + " " + event.matchMemberResponse.user.lastName +
                        " " + generateTitle(event.type, event.matchMemberResponse.user.firstName.slice(-1) === 'a' ? true : false) : "ładowanie danych"}</p>
                    <Button className={classes.button} variant="outlined" color="primary"
                        onClick={() => setIsProtocolOpened(true)}>
                        Zobacz protokół meczu
                    </Button>
                </Box>
            </Box>
            {
                withMaterialDialog(MatchProtocol, isProtocolOpened, () => setIsProtocolOpened(false), null)({
                    token: token,
                    match: eventMatch
                })
            }
        </Paper>
    );
};