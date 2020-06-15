import React, {useEffect, useState} from "react";
import NavDrawer from '../NavDrawer';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import {BarCard} from "./stats/BarCard";
import {GoalsCard} from "./stats/GoalsCard";
import {ShotsCard} from "./stats/ShotsCard";
import {YellowCardsCard} from "./stats/YellowCardsCard";
import {RedCardsCard} from "./stats/RedCardsCard";
import {PieChartCard} from "./stats/PieChartCard";
import {API_METHODS, withTokenFetchFromApi} from "../../api/baseFetch";

const useStyles = makeStyles(theme => ({
    root: {
      padding: theme.spacing(4)
    },
    toolbar: theme.mixins.toolbar,
  }));

export const Stats = ({token, logout}) => {
    const classes = useStyles();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [fauls, setFauls] = useState(null);
    const [goalsScored, setGoalsScored] = useState(null);
    const [yellowCardsReceived, setYellowCardsReceived] = useState(null);
    const [redCardsReceived, setRedCardsReceived] = useState(null);

    useEffect(() => {
        const fetchFromApiWithToken = withTokenFetchFromApi(token);
        fetchFromApiWithToken(
            API_METHODS.GET,
            'statistics',
            setLoading,
            setError,
            (data) => {
                setFauls(data.fauls);
                setGoalsScored(data.goalsScored);
                setYellowCardsReceived(data.yellowCardsReceived);
                setRedCardsReceived(data.redCardsReceived);
            }
        );
    }, [token]);

    return (
        <NavDrawer token={token} logout={logout} className={classes.root}>
            <div className={classes.toolbar} />
            <Grid
                container
                spacing={4}
            >
                <Grid
                    item
                    lg={3}
                    sm={6}
                    xl={3}
                    xs={12}
                >
                    <ShotsCard fauls={fauls} />
                </Grid>
                <Grid
                    item
                    lg={3}
                    sm={6}
                    xl={3}
                    xs={12}
                >
                    <GoalsCard goalsScored={goalsScored} />
                </Grid>
                <Grid
                    item
                    lg={3}
                    sm={6}
                    xl={3}
                    xs={12}
                >
                    <YellowCardsCard yellowCardsReceived={yellowCardsReceived} />
                </Grid>
                <Grid
                    item
                    lg={3}
                    sm={6}
                    xl={3}
                    xs={12}
                >
                    <RedCardsCard redCardsReceived={redCardsReceived} />
                </Grid>
                <Grid
                    item
                    lg={8}
                    md={12}
                    xl={9}
                    xs={12}
                >
                    <BarCard token={token} logout={logout} />
                </Grid>
                <Grid
                    item
                    lg={4}
                    md={12}
                    xl={9}
                    xs={12}
                >
                    <PieChartCard token={token} logout={logout} />
                </Grid>
            </Grid>
        </NavDrawer>
    );
};
