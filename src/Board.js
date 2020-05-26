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
                comments={[
                    {
                        avatar: <Avatar alt="Natalia Wcisło" src="/static/images/avatar/2.jpg" />,
                        author: "Natalia Wcisło",
                        date: new Date(),
                        content: "Polecam ten mecz"
                    },
                    {
                        avatar: <Avatar alt="Jędrzej Jędrzejewski" src="/static/images/avatar/2.jpg" />,
                        author: "Jędrzej Jędrzejewski",
                        date: new Date(),
                        content: "Na pewno będę! Napisze długi komentarz tak żeby przetestować możliwości responsywności tej strony internetowej"
                    }
                ]}
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
                comments={[
                    {
                        avatar: <Avatar alt="Natalia Wcisło" src="/static/images/avatar/2.jpg" />,
                        author: "Natalia Wcisło",
                        date: new Date(),
                        content: "Również polecam ten mecz"
                    }
                ]}
            />
        </Grid>
    </Grid>
);
