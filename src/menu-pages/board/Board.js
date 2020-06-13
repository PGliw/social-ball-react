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
    const [isProtocolOpened, setProtocolOpened] = useState(false);
    const [protocolMatchId, setProtocolMatchId] = useState(null);

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
                'footballMatches?detailed=true',
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

    const handleOpenProtocol = (matchId) => {
        setProtocolMatchId(matchId);
        setProtocolOpened(true);
    };

    const handleCloseProtocol = () => {
        setProtocolOpened(false);
        setProtocolMatchId(null);
    };

    if (newMatchClicked === true) {
        return <Redirect to={"/new-match"} push/>
    } else
        return <NavDrawer token={token} logout={logout}>
            <Grid container direction="column" spacing={3} alignItems="center" style={{marginTop: "30px"}}
                  className={classes.root}>
                {allMatches.map(footballMatch => (
                    <Grid item>
                        <MatchCard
                            openProtocol={() => handleOpenProtocol(footballMatch.id)}
                            footballMatch={footballMatch}
                            comments={[ // TODO fetch comments from API
                                {
                                    avatar: <Avatar alt="Natalia Wcisło" src="/static/images/avatar/2.jpg"/>,
                                    author: "Natalia Wcisło",
                                    date: new Date(),
                                    content: "Polecam ten mecz"
                                },
                                {
                                    avatar: <Avatar alt="Jędrzej Jędrzejewski" src="/static/images/avatar/2.jpg"/>,
                                    author: "Jędrzej Jędrzejewski",
                                    date: new Date(),
                                    content: "Na pewno będę! Napisze długi komentarz tak żeby przetestować możliwości responsywności tej strony internetowej"
                                }
                            ]}
                            positions={positions}
                        />
                    </Grid>))
                }
                {withMaterialDialog(MatchProtocol, isProtocolOpened, handleCloseProtocol, null)({
                    token: token,
                    matchId: protocolMatchId
                })}
            </Grid>
            <Fab variant={"extended"} color="primary" aria-label="add" className={classes.fab}
                 onClick={() => setNewMatchClicked(true)}>
                <AddIcon/>
                Nowy mecz
            </Fab>
        </NavDrawer>
};
