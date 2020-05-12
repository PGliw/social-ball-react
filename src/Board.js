import React from "react";
import MatchCard from "./MatchCard";
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';

export const Board = () => (
    <Grid container direction="column" spacing={3} alignItems="center" >
        <Grid item>
            <MatchCard
                author="Natalia Wcisło"
                date={new Date()}
                avatar={
                    <Avatar alt="Natalia Wcisło" src="/static/images/avatar/2.jpg" />
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
                    <Avatar alt="Natalia Wcisło" src="/static/images/avatar/2.jpg" />
                }
                image="./assets/background.png"
                description="No hejka chciałbym was zaprosić na meczyk piłki noznej ;)"
            />
        </Grid>
    </Grid>
);
