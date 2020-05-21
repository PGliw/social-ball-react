import React from "react";
import NavDrawer from "./NavDrawer";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import logo from "./assets/avatarPlaceholder.PNG";
import Link from "@material-ui/core/Link";
import FriendsList from "./FriendsList";


const options = {
  animationEnabled: true,
  exportEnabled: true,
  theme: "light2",
  title: {
    text: "Godziny na boisku według dnia w biężącym miesiącu"
  },
  axisX: {
    interval: 1,
  },
  data: [{
    type: "column",
    indexLabelFontColor: "#5A5757",
    indexLabelPlacement: "outside",
    dataPoints: [
      { x: 1, y: 3 },
      { x: 2, y: 5 },
      { x: 3, y: 0 },
      { x: 4, y: 0 },
      { x: 5, y: 0 },
      { x: 6, y: 7 },
      { x: 7, y: 1 },
      { x: 8, y: 1 },
      { x: 9, y: 1 },
      { x: 10, y: 0 },
      { x: 11, y: 0 },
      { x: 12, y: 0 },
      { x: 13, y: 4 },
      { x: 14, y: 7 },
      { x: 15, y: 2 },
      { x: 16, y: 1 },
      { x: 17, y: 2 },
      { x: 18, y: 0 },
      { x: 19, y: 1 },
      { x: 20, y: 2 },
      { x: 21, y: 6 },
      { x: 22, y: 3 },
      { x: 23, y: 0 },
      { x: 24, y: 0 },
      { x: 25, y: 0 },
      { x: 26, y: 1 },
      { x: 27, y: 2 },
      { x: 28, y: 2 },
      { x: 29, y: 4 },
      { x: 30, y: 0 },
      { x: 31, y: 0 },
    ]
  }]
}

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
    // display: "flex",
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

const UserProfile = () => {
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
    <NavDrawer>
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

          <Grid >
            {/* <CanvasJSChart options={options} /> */}
          </Grid>

          <Grid className={classes.columnFlex}>
            <h3 className={classes.textLeftRight}>
              <span className={classes.leftText}>Wydarzenia znajomych:</span>
              <span className={classes.rightText}></span>
            </h3>
            {eventsArray.map((item, index) => Row({ index }))}
          </Grid>
          <Grid className={classes.columnFlex}>
            <Grid className="friends" >
              <h3 className={classes.textLeftRight}>
                <span className={classes.leftText}>Łącznie znajomych:</span>
                <span className={classes.rightText}>23</span>
              </h3>
              <FriendsList />
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </NavDrawer>
  );
};

export default UserProfile;
