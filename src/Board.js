import React, {useEffect, useState} from "react";
import MatchCard from "./MatchCard";
import {Avatar, Grid, Fab} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import NavDrawer from "./NavDrawer";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {Redirect} from "react-router-dom";

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

export const Board = ({token}) => {
    const classes = useStyles();
    const [newMatchClicked, setNewMatchClicked] = useState(false);

    if (newMatchClicked === true) {
        return <Redirect to={"/new-match"} push />
    } else
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
            <Fab variant={"extended"} color="primary" aria-label="add" className={classes.fab}
                 onClick={() => setNewMatchClicked(true)}>
                <AddIcon/>
                Nowy mecz
            </Fab>
        </NavDrawer>
};
