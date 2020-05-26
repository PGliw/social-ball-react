import React from "react";
import MatchCard from "./MatchCard";
import {Avatar, Grid, Fab} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import NavDrawer from "./NavDrawer";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
        root: {
            marginTop: theme.spacing(4),
        }
    }
));

export const Board = ({token}) => {
    const classes = useStyles();

    return <NavDrawer token={token}>
        <Grid container direction="column" spacing={3} alignItems="center" style={{marginTop: "30px"}}
              className={classes.root}>
            <Grid item>
                <MatchCard
                    author="Natalia Wcisło"
                    date={new Date()}
                    avatar={
                        <Avatar alt="Natalia Wcisło" src="/static/images/avatar/2.jpg"/>
                    }
                    image="./assets/background.png"
                    description="No hejka chciałbym was zaprosić na meczyk piłki noznej ;)"
                />
            </Grid>
            <Grid item>
                <MatchCard
                    author="Natalia Wcisło"
                    date={new Date()}
                    avatar={
                        <Avatar alt="Natalia Wcisło" src="/static/images/avatar/2.jpg"/>
                    }
                    image="./assets/background.png"
                    description="No hejka chciałbym was zaprosić na meczyk piłki noznej ;)"
                />
            </Grid>
        </Grid>
        <Fab color="primary" aria-label="add">
            <AddIcon/>
        </Fab>
    </NavDrawer>
};
