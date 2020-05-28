import React from "react";
import NavDrawer from "./NavDrawer";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import logo from "./assets/avatarPlaceholder.PNG";
import Link from "@material-ui/core/Link";

const eventsArray = [
  { name: "X organizuje mecz", img: "logo" },
  { name: "Y strzelił gola", img: "logo" },
  { name: "Zakończył się mecz Z", img: "logo" },
];

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(7),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
  },
  grid: {
    marginTop: theme.spacing(-3),
    marginBottom: theme.spacing(1),
    padding: theme.spacing(2),
  },
  rowFlex: {
    border: "1.3px solid ",
    margin: "auto",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    padding: theme.spacing(1),
  },
  columnFlex: {
    marginTop: theme.spacing(2),
    border: "1.3px solid ",
    margin: "auto",
    display: "flex",
    flexDirection: "column",
    padding: theme.spacing(2),
  },
  img: {
    width: 150,
    height: 150,
  },
  eventImg: {
    width: 50,
    height: 50,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "left",
  },
  positions: {
    textAlign: "left",
  },
  event: {
    border: "1.3px solid ",
    padding: "10px",
    margin: "10px",
    display: "flex",
    flexDirection: "row",
  },
  textLeftRight: {
    textAlign: "right",
    position: "relative",
    margin: "2px",
  },
  leftText: {
    left: 0,
    position: "absolute",
    marginLeft: "10px",
  },
  rightText: {
    margin: "10px",
  },
}));

export const UserProfile = ({token}) => {
  const classes = useStyles();

  const Row = ({ index }) => (
    <div className={classes.event}>
      <Grid container justify="left">
        <Grid item>
          <img width={50} height={50} align="left" src={logo}></img>
        </Grid>
      </Grid>
      <Grid>
        <Grid container justify="flex-end">
          <Grid item>
            <p>{eventsArray[index].name}</p>
          </Grid>
        </Grid>
        <Grid container justify="flex-end">
          <Grid item>
            <Link href="">Zobacz</Link>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );

  return (
    <NavDrawer token={token}>
      <Paper className={classes.paper}>
        <Grid className={classes.rowFlex}>
          <img className={classes.img} src={logo} />
          <Grid className={classes.grid}>
            <p className={classes.name}>Jan Kowalski</p>
            <p className={classes.positions}>Ulubione pozycje: napastnik</p>
            <p>
              172 rozegrane mecze | 221 godzin na boisku | 71 strzelonych goli
            </p>
          </Grid>

          <Link href="">
            <h3>Zarządzaj kontem</h3>
          </Link>
        </Grid>
        <div>
          <span>&nbsp;</span>
        </div>
        <Grid className={classes.rowFlex}>
          <Grid className={classes.columnFlex}>
            <h3 className={classes.textLeftRight}>
              <span className={classes.leftText}>Znajomi:</span>
              <span className={classes.rightText}>23</span>
            </h3>
            {eventsArray.map((item, index) => Row({ index }))}
          </Grid>
          <Grid className={classes.columnFlex}>
            <h3>Moja aktywność</h3>
          </Grid>
        </Grid>
      </Paper>
    </NavDrawer>
  );
};
