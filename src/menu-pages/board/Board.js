import React, {useEffect, useState} from "react";
import MatchCard from "./board/MatchCard";
import {Avatar, Fab, Grid} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import NavDrawer from "../NavDrawer";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {Redirect} from "react-router-dom";
import {API_METHODS, withTokenFetchFromApi} from "../../api/baseFetch";
import {MatchProtocol} from "../../forms/match_protocol/MatchProtocol";
import {withMaterialDialog} from "../../hoc/withMaterialDialog";

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
    const [filteredMatches, setFilteredMatches] = useState([]);
    const [matchFilterPredicate, setMatchFilterPredicate] = useState(() => _ => true);
    const [user, setUser] = useState(null);

    const handleAllMatches = (newAllMatches) => {
        console.log(newAllMatches);
        setAllMatches(newAllMatches);
    };

    useEffect(() => {
        setFilteredMatches(allMatches.filter(_ => true))
    }, [matchFilterPredicate, allMatches]);

    useEffect(() => {
        if (error) alert(error);
    }, [error]);

    useEffect(() => {
            const fetchFromProtectedApi = withTokenFetchFromApi(token);
            fetchFromProtectedApi(
                API_METHODS.GET,
                'footballMatches?detailed=true',
                setLoading,
                setError,
                handleAllMatches,
            );
        },
        [token]
    );

    useEffect(() => {
            const fetchFromApiWithToken = withTokenFetchFromApi(token);
            fetchFromApiWithToken(
                API_METHODS.GET,
                'profile',
                setLoading,
                setError,
                setUser);
        },
        [token]
    );

    useEffect(() => {
        const fetchFromAdiWithToken = withTokenFetchFromApi(token);
        fetchFromAdiWithToken(API_METHODS.GET, 'positions', setLoading, setError, setPositions);
    }, [token]);

    const updateOneMatch = (index, newMatch) => {
        const newMatches = [...allMatches];
        newMatches[index] = newMatch;
        setAllMatches(newMatches);
    };

    const handleRefreshMatch = (matchId) => {
        const idx = allMatches.findIndex(match => match.id === matchId);
        if (idx >= 0) {
            const fetchFromProtectedApi = withTokenFetchFromApi(token);
            fetchFromProtectedApi(
                API_METHODS.GET,
                `footballMatches/${matchId}`,
                setLoading,
                setError,
                (newMatch) => updateOneMatch(idx, newMatch)
            );
        } else {
            console.error("Match with id=" + matchId + " not found");
        }
    };

    if (newMatchClicked === true) {
        return <Redirect to={"/new-match"} push/>
    } else
        return <NavDrawer token={token} logout={logout}>
            <Grid container direction="column" spacing={3} alignItems="center" style={{marginTop: "30px"}}
                  className={classes.root}>
                {filteredMatches.map(footballMatch => (
                    <Grid item>
                        <MatchCard
                            footballMatch={footballMatch}
                            refreshMatch={() => handleRefreshMatch(footballMatch.id)}
                            currentUser={user}
                            token={token}
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
