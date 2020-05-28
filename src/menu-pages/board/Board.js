import React, {useEffect, useState} from "react";
import MatchCard from "./board/MatchCard";
import {Avatar, Fab, Grid} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import NavDrawer from "../NavDrawer";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {Redirect} from "react-router-dom";
import {API_METHODS, withTokenFetchFromApi} from "../../api/baseFetch";

const useStyles = makeStyles((theme) => ({
        root: {
            marginTop: theme.spacing(4),
        },
        fab: {
            margin: 0,
            top: 'auto',
            right: 20,
            bottom: 20,
            left: 'auto',
            position: 'fixed',
        }
    }
));

export const Board = ({token, logout}) => {
    const classes = useStyles();
    const [newMatchClicked, setNewMatchClicked] = useState(false);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [allMatches, setAllMatches] = useState([]);
    const [positions, setPositions] = useState(null);

    const handleAllMatches = (newAllMatches) => {
        console.log(newAllMatches);
        setAllMatches(newAllMatches);
    };

    useEffect(() => {
        if (error) alert(error);
    }, [error]);

    useEffect(() => {
            const fetchFromProtectedApi = withTokenFetchFromApi(token);
            fetchFromProtectedApi(
                API_METHODS.GET,
                'footballMatches',
                setLoading,
                setError,
                handleAllMatches,
            );
        },
        [token]
    );

    useEffect(() => {
        const fetchFromAdiWithToken = withTokenFetchFromApi(token);
        fetchFromAdiWithToken(API_METHODS.GET, 'positions', setLoading, setError, setPositions);
    }, [token]);

    if (newMatchClicked === true) {
        return <Redirect to={"/new-match"} push/>
    } else
        return <NavDrawer token={token} logout={logout}>
            <Grid container direction="column" spacing={3} alignItems="center" style={{marginTop: "30px"}}
                  className={classes.root}>
                {allMatches.map(footballMatch => (
                    <Grid item>
                        <MatchCard
                            footballMatch={footballMatch}
                            positions={positions}
                        />
                    </Grid>))
                }
            </Grid>
            <Fab variant={"extended"} color="primary" aria-label="add" className={classes.fab}
                 onClick={() => setNewMatchClicked(true)}>
                <AddIcon/>
                Nowy mecz
            </Fab>
        </NavDrawer>
};
