import React, {Fragment, useEffect, useState} from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {Paper} from "@material-ui/core";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import {API_METHODS, withTokenFetchFromApi} from "../../../api/baseFetch";
import {TIME} from "../../../api/constants";
import {formatDate} from "../../../utils/helpers";
import {withMaterialDialog} from "../../../hoc/withMaterialDialog";
import MatchCard from "../../board/board/MatchCard";
import Button from "@material-ui/core/Button";

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


export const MatchesTable = ({token, user, filterPredicate}) => {
    const classes = useStyles();
    const [matches, setMatches] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [chosenMatch, setChosenMatch] = useState(null);
    const [chosenMatchId, setChosenMatchId] = useState(null);
    const [refreshMatch, setRefreshMatch] = useState(false);
    const [positions, setPositions] = useState(null);

    useEffect(() => {
        const fetchFromApiWithToken = withTokenFetchFromApi(token);
        fetchFromApiWithToken(
            API_METHODS.GET,
            `footballMatches?organizer=true&player=true`,
            setLoading,
            setError,
            setMatches);
    }, [token]);


    useEffect(() => {
        if (chosenMatchId) {
            const fetchFromProtectedApi = withTokenFetchFromApi(token);
            fetchFromProtectedApi(
                API_METHODS.GET,
                `footballMatches/${chosenMatchId}`,
                setLoading,
                setError,
                (newMatch) => setChosenMatch(newMatch)
            );
        } else {
            setChosenMatch(null);
        }
    }, [token, chosenMatchId, refreshMatch]);

    useEffect(() => {
        const fetchFromAdiWithToken = withTokenFetchFromApi(token);
        fetchFromAdiWithToken(API_METHODS.GET, 'positions', setLoading, setError, setPositions);
    }, [token]);


    const handleDetailsClick = (id) => {
        setChosenMatchId(id);
    };

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Data meczu</TableCell>
                        <TableCell>Nazwa meczu</TableCell>
                        <TableCell>Drużyny</TableCell>
                        <TableCell>Wynik</TableCell>
                        <TableCell>Moja pozycja</TableCell>
                        <TableCell>Jestem organizatorem</TableCell>
                        <TableCell>Opcje</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {matches ?
                        matches
                            .filter(filterPredicate)
                            .map(match => (
                                <MatchRow key={match.id}
                                          match={match}
                                          handleDetailsClick={() => handleDetailsClick(match.id)}
                                />
                            ))
                        : 'Brak meczów.'}
                </TableBody>
            </Table>
            {
                !!chosenMatch ?
                    withMaterialDialog(MatchCard, !!chosenMatch, () => setChosenMatchId(null), chosenMatch ? chosenMatch.title : '')(
                        {
                            footballMatch: chosenMatch,
                            refreshMatch: () => setRefreshMatch(!refreshMatch),
                            currentUser: user,
                            token: token,
                            positions: positions,
                        }
                    )
                    :
                    null
            }
        </TableContainer>
    );
};

const MatchRow = (props) => {
    return (
        <Fragment>
            <TableRow key={props.match.id}>
                <TableCell component="th" scope="row">{formatDate(new Date(props.match.beginningTime))}</TableCell>
                <TableCell>{props.match.title ? props.match.title : '-'}</TableCell>
                <TableCell>{props.match.teamNames ? props.match.teamNames : '-'}</TableCell>
                <TableCell onClick={() => props.handleResultClick(props.match.id)}>
                    {props.match.score ? props.match.score : '- : -'}
                    {props.match.statusTime === TIME.PRESENT}
                </TableCell>
                <TableCell>{props.match.currentUserPositionName ? props.match.currentUserPositionName : '-'}</TableCell>
                <TableCell>
                    <h3 align="center">
                        {props.match.currentUserOrganizer === true ? '✅' : null}
                    </h3>
                </TableCell>
                <TableCell>
                    <Button variant="outlined" color="primary" onClick={props.handleDetailsClick}>Szczegóły</Button>
                </TableCell>
            </TableRow>
        </Fragment>
    );
};
