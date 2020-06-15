import React, {Fragment, useEffect, useState} from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {Dialog, DialogContent, Paper} from "@material-ui/core";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import {API_METHODS, withTokenFetchFromApi} from "../../api/baseFetch";
import {TIME} from "../../api/constants";
import {formatDate} from "../../utils/helpers";

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


export const MatchesTable = ({token, filterPredicate}) => {
    const classes = useStyles();
    const [editMatchDialogOpen, setEditMatchDialogOpen] = useState(false);
    const [editResultDialogOpen, setEditResultDialogOpen] = useState(false);
    const [editable, setEditable] = useState(false);
    const [matches, setMatches] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);


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
        console.log(matches);
    }, [matches]); // TODO

    const onDialogClose = () => {
        setEditMatchDialogOpen(false);
        setEditResultDialogOpen(false);
    };

    const handleRowClick = (id) => {
        setEditMatchDialogOpen(editResultDialogOpen !== true);
        const match = matches.find(element => element.id === id);
        setEditable(!!(match.currentUserOrganizer && !match.statusTime === TIME.PAST));
    };

    const handleResultClick = (id) => {
        const match = matches.find((element) => {
            return element.id === id;
        });
        setEditResultDialogOpen(!!(match.currentUserOrganizer && !match.hasProtocol));
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
                    </TableRow>
                </TableHead>
                <TableBody>
                    {matches ?
                        matches
                            .filter(filterPredicate)
                            .map(match => (
                            <MatchRow key={match.id}
                                      match={match}
                                      handleRowClick={handleRowClick}
                                      handleResultClick={handleResultClick}
                            />
                            ))
                        : 'Brak meczów.'}
                </TableBody>
            </Table>
            <Dialog
                open={editMatchDialogOpen}
                onClose={onDialogClose}
                classes={{paper: classes.dialogPaper}}
            >
                <DialogContent>
                    {/* <MatchCard></MatchCard> */}
                    tu match card
                    <br/>
                    {editable ? ' mozliwa edycja meczu' : ' niemozliwa edycja meczu '}
                </DialogContent>
            </Dialog>

            <Dialog
                open={editResultDialogOpen}
                onClose={onDialogClose}
                classes={{paper: classes.dialogPaper}}
            >
                <DialogContent>
                    tu bedzie formularz protokolu
                    {/* <br></br>
                    {editable ? ' mozliwa edycja meczu' : ' niemozliwa edycja meczu '} */}
                </DialogContent>
            </Dialog>

        </TableContainer>
    );
};

export default MatchesTable;

export const MatchRow = (props) => {
    return (
        <Fragment>
            <TableRow key={props.match.id} onClick={() => props.handleRowClick(props.match.id)}>
                <TableCell component="th" scope="row">{formatDate(new Date(props.match.beginningTime))}</TableCell>
                <TableCell>{props.match.title ? props.match.title : '-'}</TableCell>
                <TableCell>{props.match.teamNames ? props.match.teamNames : '-' }</TableCell>
                <TableCell onClick={() => props.handleResultClick(props.match.id)}>
                    {props.match.score ? props.match.score : '- : -'}
                    {props.match.statusTime === TIME.PRESENT}
                    {!props.match.hasProtocol && props.match.currentUserOrganizer ?
                        <u>Brak. Wprowadź protokół</u> : null}
                </TableCell>
                <TableCell>{props.match.currentUserPositionName ? props.match.currentUserPositionName : '-'}</TableCell>
                <TableCell>
                    <h3 align="center" onClick={() => props.handleProtocolClick(props.match.id)}>
                        {props.match.currentUserOrganizer === true ? '✅' : null}
                        {!props.match.hasProtocol && props.match.currentUserOrganizer ?
                            <u>Wprowadź protokół</u> : null}
                        {props.match.hasProtocol && props.match.currentUserOrganizer ?
                            <u>Edytuj protokół</u> : null}
                    </h3>
                </TableCell>
            </TableRow>
        </Fragment>
    );
};
