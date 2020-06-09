import React, {useEffect, useState} from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {Paper} from "@material-ui/core";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import {API_METHODS, withTokenFetchFromApi} from "../../api/baseFetch";

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
    const [editable, setEditable] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [events, setEvents] = useState(null);
    const [match, setMatch] = useState(null);
    const [eventsRows, setEventsRows] = useState(null);

    const handleEvents = (evs) => {
        console.log(evs);
        if (evs) {
            const rows = evs.map(ev => {
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
            console.log(rows);
            setEventsRows(rows);
        }
    };

    useEffect(() => {
        const fetchFromApiWithToken = withTokenFetchFromApi(token);
        fetchFromApiWithToken(
            API_METHODS.GET,
            `footballMatches/${matchId}`,
            setLoading,
            setError,
            setMatch);
    }, [token]);

    useEffect(() => {
        const fetchFromApiWithToken = withTokenFetchFromApi(token);
        fetchFromApiWithToken(
            API_METHODS.GET,
            `footballMatches/${matchId}/events`,
            setLoading,
            setError,
            handleEvents);
    }, [token]);

    const handleUserClick = (userId) => {
        // TODO
        console.log(userId);
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
                    {eventsRows ?
                        eventsRows
                        :
                        "Brak protokołu"
                    }
                </TableBody>
            </Table>
        </TableContainer>
    );
};
