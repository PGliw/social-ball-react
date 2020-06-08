import React, { useEffect, useState } from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { Box, Grid, Link, Paper, Tab, Tabs, Dialog, DialogContent, Button } from "@material-ui/core";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { API_METHODS, withTokenFetchFromApi } from "../../api/baseFetch";
import Blink from 'react-blink-text';
import MatchCard from "../board/board/MatchCard";

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

function createData(id, data, nazwa, druzyny, wynik, pozycja, organizacja, odbylSie, trwa, maProtokol) {
    return { id, data, nazwa, druzyny, wynik, pozycja, organizacja, odbylSie, trwa, maProtokol };
}

const rows = [
    createData('1', '10.10.2020', 'Mecz o wszystko', 'Drużyny', 'Wynik', 'Moja pozycja', true, true, false, false),
    createData('2', '03.03.2019', 'Sparing', 'Lwy - Hipopotamy', 'wynik.', 'Lewy napastnik - organizator', false, true, true, false),
    createData('3', '02.02.2019', 'Rozwałka', 'Lwy - Wilki', '4 - 1', 'Środkowy pomocnik', true, false, false, false),
    createData('4', '01.03.2019', 'Mecz', 'Koty - Psy', 'wynik', 'Prawy napastnik - organizator', false, true, true, true),
    createData('5', '01.02.2019', 'Rozwałka2', 'Lwy - Wilki', '4 - 1', 'Środkowy pomocnik', false, false, false, false),
    createData('6', '01.04.2019', 'Rozwałka3', 'Lwy - Wilki', '4 - 1', 'Środkowy pomocnik', false, false, true, false),
];

export const MatchesTable = ({ token, logout, archiveMatches }) => {
    const classes = useStyles();
    const [showArchiveMatches, setShowArchiveMatches] = useState(archiveMatches);   //boolean
    const [editMatchDialogOpen, setEditMatchDialogOpen] = useState(false);
    const [editResultDialogOpen, setEditResultDialogOpen] = useState(false);
    const [editable, setEditable] = useState(false);


    // useEffect(() => {
    //     const fetchFromApiWithToken = withTokenFetchFromApi(token);
    //     fetchFromApiWithToken(
    //         API_METHODS.GET,
    //         //todo
    //     );
    // }, [token]);

    const onDialogClose = () => {
        setEditMatchDialogOpen(false);
        setEditResultDialogOpen(false);
    }

    function handleRowClick(id) {
        console.log('row')
        setEditMatchDialogOpen(editResultDialogOpen ? false : true);
        let match = rows.find((element) => {
            return element.id === id;
        })
        setEditable(match.organizacja && !match.odbylSie ? true : false);
    }

    function handleResultClick(id) {
        console.log('res')
        let match = rows.find((element) => {
            return element.id === id;
        })
        setEditResultDialogOpen(match.organizacja && !match.maProtokol ? true : false);
    }

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell >Data meczu</TableCell>
                        <TableCell >Nazwa meczu</TableCell>
                        <TableCell >Drużyny</TableCell>
                        <TableCell >Wynik</TableCell>
                        <TableCell >Moja pozycja</TableCell>
                        <TableCell >Jestem organizatorem</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        showArchiveMatches === true ?
                            (row.odbylSie === true ?
                                <TableRow key={row.id} onClick={() => handleRowClick(row.id)}>
                                    <TableCell component="th" scope="row">
                                        {row.data}
                                    </TableCell>
                                    <TableCell >{row.nazwa}</TableCell>
                                    <TableCell >{row.druzyny}</TableCell>
                                    <TableCell onClick={() => handleResultClick(row.id)} > {row.maProtokol ? row.wynik : row.organizacja ? <u>Brak. Wprowadź protokół</u> : row.wynik}</TableCell>
                                    <TableCell >{row.pozycja}</TableCell>
                                    <TableCell > <h3 align="center">{row.organizacja === true ? '✅' : null}</h3></TableCell>
                                </TableRow>
                                : null)
                            : (row.odbylSie === true ? null :
                                <TableRow key={row.id} onClick={() => handleRowClick(row.id)}>
                                    <TableCell component="th" scope="row">
                                        {row.data}
                                    </TableCell>
                                    <TableCell >{row.nazwa}</TableCell>
                                    <TableCell >{row.druzyny}</TableCell>
                                    <TableCell >{row.trwa === true ? <Blink text='Mecz trwa' fontSize='13'></Blink> : row.wynik}</TableCell>
                                    <TableCell >{row.pozycja}</TableCell>
                                    <TableCell > <h3 align="center">{row.organizacja === true ? '✅' : null}</h3></TableCell>
                                </TableRow>)

                    ))}
                </TableBody>
            </Table>
            <Dialog
                open={editMatchDialogOpen}
                onClose={onDialogClose}
                classes={{ paper: classes.dialogPaper }}
            >
                <DialogContent>
                    {/* <MatchCard></MatchCard> */}
                    tu match card
                    <br></br>
                    {editable ? ' mozliwa edycja meczu' : ' niemozliwa edycja meczu '}
                </DialogContent>
            </Dialog>

            <Dialog
                open={editResultDialogOpen}
                onClose={onDialogClose}
                classes={{ paper: classes.dialogPaper }}
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
