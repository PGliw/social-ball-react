import React, {useEffect, useState} from "react";
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, Grid, Typography, Avatar } from '@material-ui/core';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import SportsKabaddiIcon from '@material-ui/icons/SportsKabaddi';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%'
  },
  content: {
    alignItems: 'center',
    display: 'flex'
  },
  title: {
    fontWeight: 700
  },
  avatar: {
    backgroundColor: "#807777",
    height: 56,
    width: 56
  },
  icon: {
    height: 32,
    width: 32
  },
  difference: {
    marginTop: theme.spacing(2),
    display: 'flex',
    alignItems: 'center'
  },
  differenceIcon: {
    color: "#398733"
  },
  differenceValue: {
    color: "#398733",
    marginRight: theme.spacing(1)
  }
}));

export const ShotsCard = props => {
  const classes = useStyles();

  return (
    <Card
      className={classes.root}
    >
      <CardContent>
        <Grid
          container
          justify="space-between"
        >
          <Grid item>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
              variant="body2"
            >
              FAULE
            </Typography>
            <Typography variant="h3">{props.fauls}</Typography>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
              <SportsKabaddiIcon className={classes.icon} />
            </Avatar>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};
