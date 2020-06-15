import React from 'react';
import NavDrawer from '../NavDrawer';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import {BarCard} from "./stats/BarCard";
import {GoalsCard} from "./stats/GoalsCard";
import {ShotsCard} from "./stats/ShotsCard";
import {YellowCardsCard} from "./stats/YellowCardsCard";
import {RedCardsCard} from "./stats/RedCardsCard";
import {PieChartCard} from "./stats/PieChartCard";

const useStyles = makeStyles(theme => ({
    root: {
      padding: theme.spacing(4)
    },
    toolbar: theme.mixins.toolbar,
  }));

export const Stats = ({token, logout}) => {
    const classes = useStyles();

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
                    <ShotsCard token={token} logout={logout} />
                </Grid>
                <Grid
                    item
                    lg={3}
                    sm={6}
                    xl={3}
                    xs={12}
                >
                    <GoalsCard token={token} logout={logout} />
                </Grid>
                <Grid
                    item
                    lg={3}
                    sm={6}
                    xl={3}
                    xs={12}
                >
                    <YellowCardsCard token={token} logout={logout} />
                </Grid>
                <Grid
                    item
                    lg={3}
                    sm={6}
                    xl={3}
                    xs={12}
                >
                    <RedCardsCard token={token} logout={logout} />
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
