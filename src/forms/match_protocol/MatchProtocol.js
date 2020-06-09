import React, {useEffect, useState} from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {FormControl, InputLabel, MenuItem, Paper, Select} from "@material-ui/core";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import {API_METHODS, withTokenFetchFromApi} from "../../api/baseFetch";
import Button from "@material-ui/core/Button";
import {EVENT_NAMES} from "../../api/constants";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        marginTop: theme.spacing(6),
    },
    paper: {
        padding: theme.spacing(1),
        margin: theme.spacing(2),
    },
    paperBox: {
        padding: theme.spacing(1),
    },
    dialogPaper: {
        minHeight: '10vh',
        maxHeight: '100vh',
    },
    table: {
        minWidth: 650,
    }
}));

export const MatchProtocol = ({token, matchId}) => {
    const classes = useStyles();
    const [isEditable, setEditable] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [events, setEvents] = useState(null);
    const [match, setMatch] = useState(null);
    const [isEditMode, setEditMode] = useState(false);
    const [editButtonName, setEditButtonName] = useState("Edytuj");
    const [user, setUser] = useState(null);
    const [protocolContent, setProtocolContent] = useState("Pobieranie informacji...");
    const [newEvent, setNewEvent] = useState({
        event: EVENT_NAMES.GOAL,
        dateTime: new Date(),
        team: "Tygrysy",
        matchMember: "Abc"
    });

    const renderProtocolContent = (matchArg, eventsArg) => {
        if (matchArg && matchArg.hasProtocol === false) {
            return "Brak protokołu pomeczowego"
        } else if (eventsArg && eventsArg.length === 0) {
            return "Brak zarejestrowanych zdarzeń"
        } else if (!eventsArg || !matchArg) {
            return "Pobieranie informacji..."
        } else {
            return eventsArg.map(ev => {
                const matchMember = ev.matchMemberResponse;
                const userName = matchMember.user ? matchMember.user.firstName + matchMember.user.lastName : "Nieznany";
                const userId = matchMember.user ? matchMember.user.id : null;
                return <TableRow key={ev.id}>
                    <TableCell component="th" scope="row">{ev.type}</TableCell>
                    <TableCell>{ev.dateTime}</TableCell>
                    <TableCell>{ev.teamName}</TableCell>
                    <TableCell onClick={() => handleUserClick(userId)}>{userName}</TableCell>
                </TableRow>
            });
        }
    };

    useEffect(() => {
        const newProtocolContent = renderProtocolContent(match, events);
        setProtocolContent(newProtocolContent);
    }, [match, events]);


    useEffect(() => {
        console.log(user);
        console.log(match);
        if (user && user.email && match && match.organizer && user.email === match.organizer.email) {
            setEditable(true);
        }
    }, [user, match]);

    useEffect(() => {
        if (!isEditMode) {
            const fetchFromApiWithToken = withTokenFetchFromApi(token);
            fetchFromApiWithToken(
                API_METHODS.GET,
                'profile',
                setLoading,
                setError,
                setUser);
        }
    }, [token]);

    useEffect(() => {
        if (!isEditMode) {
            const fetchFromApiWithToken = withTokenFetchFromApi(token);
            fetchFromApiWithToken(
                API_METHODS.GET,
                `footballMatches/${matchId}`,
                setLoading,
                setError,
                setMatch);
        }
    }, [token]);

    useEffect(() => {
        const fetchFromApiWithToken = withTokenFetchFromApi(token);
        fetchFromApiWithToken(
            API_METHODS.GET,
            `footballMatches/${matchId}/events`,
            setLoading,
            setError,
            setEvents);
    }, [token]);

    const handleUserClick = (userId) => {
        // TODO
        console.log(userId);
    };

    const handleEditButton = () => {
        if (isEditMode) {
            setEditButtonName("Edytuj");
            setEditMode(false);
        } else {
            setEditButtonName("Zakończ edycję");
            setEditMode(true);
        }
    };

    const handleNewEventTypeChange = (newEventType) => {
        const updatedNewEvent = {...newEvent};
        updatedNewEvent["event"] = newEventType;
        setNewEvent(updatedNewEvent);
    };

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Zdarzenie</TableCell>
                        <TableCell>Minuta</TableCell>
                        <TableCell>Drużyna</TableCell>
                        <TableCell>Gracz</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        {protocolContent}
                    </TableRow>
                    {isEditMode
                        ?
                        <TableRow>
                            <TableCell>
                                <FormControl>
                                    <InputLabel id="event_name">Zdarzenie</InputLabel>
                                    <Select labelId="event_name"
                                            onChange={e => handleNewEventTypeChange(e.target.value)}
                                            value={newEvent.event}>
                                        {
                                            Object.values(EVENT_NAMES).map(eventName => <MenuItem
                                                value={eventName}>eventName</MenuItem>)
                                        }
                                    </Select>
                                </FormControl>
                            </TableCell>

                            <TableCell>Drużyna</TableCell>
                            <TableCell>Gracz</TableCell>
                        </TableRow>
                        : null}
                </TableBody>
            </Table>
            {isEditable ? <Button onClick={handleEditButton}>{editButtonName}</Button> : null}
        </TableContainer>
    );
};
