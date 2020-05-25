import React from "react";
import NavDrawer from "./NavDrawer";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {Grid, Box, Link, Paper, Tabs, Tab} from "@material-ui/core";
import ProfilePlaceholder from "./assets/profile-placeholder.png";
import FriendsList from "./FriendsList";
import RoundedImage from "react-rounded-image";
import TabsWrappedLabel, {a11yProps} from "./Tabs";
import TabPanel from "@material-ui/lab/TabPanel";
import * as PropTypes from "prop-types";
import TabContext from "@material-ui/lab/TabContext";


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
            {x: 1, y: 3},
            {x: 2, y: 5},
            {x: 3, y: 0},
            {x: 4, y: 0},
            {x: 5, y: 0},
            {x: 6, y: 7},
            {x: 7, y: 1},
            {x: 8, y: 1},
            {x: 9, y: 1},
            {x: 10, y: 0},
            {x: 11, y: 0},
            {x: 12, y: 0},
            {x: 13, y: 4},
            {x: 14, y: 7},
            {x: 15, y: 2},
            {x: 16, y: 1},
            {x: 17, y: 2},
            {x: 18, y: 0},
            {x: 19, y: 1},
            {x: 20, y: 2},
            {x: 21, y: 6},
            {x: 22, y: 3},
            {x: 23, y: 0},
            {x: 24, y: 0},
            {x: 25, y: 0},
            {x: 26, y: 1},
            {x: 27, y: 2},
            {x: 28, y: 2},
            {x: 29, y: 4},
            {x: 30, y: 0},
            {x: 31, y: 0},
        ]
    }]
};

const eventsArray = [
    {name: "X organizuje mecz", img: "logo"},
    {name: "Y strzelił gola", img: "logo"},
    {name: "Zakończył się mecz Z", img: "logo"},
];

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        marginTop: theme.spacing(6),
    },
    paper: {
        padding: theme.spacing(1),
        margin: theme.spacing(2),
    },
    paperBox: {
        padding: theme.spacing(1),
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
}));

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

const UserProfile = () => {
    const classes = useStyles();
    const [value, setValue] = React.useState(1);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const Row = ({index}) => (
        <Paper className={classes.paper}>
            <Box display="flex" p={1} bgcolor="background.paper">
                <Box className={classes.paperBox}>
                    <RoundedImage image={ProfilePlaceholder}
                                  roundedColor="#e6e6e6"
                                  roundedSize="13"
                                  imageWidth="80"
                                  imageHeight="80"
                    />
                </Box>
                <Box className={classes.paperBox}>
                    <p>{eventsArray[index].name}</p>
                    <Link href="">Zobacz</Link>
                </Box>
            </Box>
        </Paper>
    );

    return (
        <NavDrawer>
            <Grid className={classes.root}>
                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                        <Box display="flex" p={1} bgcolor="background.paper">
                            <Box className={classes.paperBox}>
                                <RoundedImage image={ProfilePlaceholder}
                                              roundedColor="#e6e6e6"
                                              roundedSize="13"
                                              imageWidth="160"
                                              imageHeight="160"
                                />
                            </Box>
                            <Box className={classes.paperBox}>
                                <h2>Jan Kowalski</h2>
                                <p className={classes.positions}>Ulubione pozycje: napastnik</p>
                                <p>
                                    172 rozegrane mecze | 221 godzin na boisku | 71 strzelonych goli
                                </p>
                                <Link href="">
                                    <h3>Zarządzaj kontem</h3>
                                </Link>
                            </Box>
                        </Box>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Paper className={classes.paper}>
                        <TabContext value={value}>
                            <Tabs value={value} onChange={handleChange} variant="fullWidth"
                                  aria-label="wrapped label tabs example">
                                <Tab value={1} label="Aktywność znajomych" {...a11yProps('two')} />
                                <Tab value={2} label="Lista znajomych" {...a11yProps('three')} />
                            </Tabs>
                            <TabPanel value={value} index={1}>
                                {eventsArray.map((item, index) => Row({index}))}
                            </TabPanel>
                            <TabPanel value={value} index={2}>
                                <FriendsList/>
                            </TabPanel>
                        </TabContext>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Paper className={classes.paper}>
                        <h3>Moje mecze</h3>
                    </Paper>
                </Grid>
            </Grid>
        </NavDrawer>
    );
};

export default UserProfile;
