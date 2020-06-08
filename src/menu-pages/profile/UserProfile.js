import React, { useEffect, useState } from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { Box, Grid, Link, Paper, Tab, Tabs, Dialog, DialogContent, Button } from "@material-ui/core";
import ProfilePlaceholder from "../../assets/profile-placeholder.png";
import FriendsList from "./FriendsList";
import InvitationList from "./InvitationList";
import RoundedImage from "react-rounded-image";
import { a11yProps } from "./Tabs";
import TabPanel from "@material-ui/lab/TabPanel";
import * as PropTypes from "prop-types";
import TabContext from "@material-ui/lab/TabContext";
import NavDrawer from "../NavDrawer";
import logo from "../../assets/avatarPlaceholder.PNG";
import { API_METHODS, withTokenFetchFromApi } from "../../api/baseFetch";
import { UpdateDataForm } from "./UpdateDataForm";
import { MatchesTable } from "./MatchesTable";

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
    }]
};

const eventsArray = [
    { name: "X organizuje mecz", img: "logo" },
    { name: "Y strzelił gola", img: "logo" },
    { name: "Zakończył się mecz Z", img: "logo" },
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
    dialogPaper: {
        minHeight: '10vh',
        maxHeight: '100vh',
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

export const UserProfile = ({ token, logout }) => {
    const classes = useStyles();
    const [value, setValue] = React.useState('one');
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState("tresc");
    const [acquaitances, setAcquaitances] = useState(null);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleAllAcquaitances = (newAllAcquaitances) => {
        console.log(newAllAcquaitances);
        setAcquaitances(newAllAcquaitances);
    };

    useEffect(() => {
        const fetchFromApiWithToken = withTokenFetchFromApi(token);
        fetchFromApiWithToken(
            API_METHODS.GET,
            'profile',
            setLoading,
            setError,
            setUser);
    }, [token]);

    useEffect(() => {
        const fetchFromApiWithToken = withTokenFetchFromApi(token);
        fetchFromApiWithToken(
            API_METHODS.GET,
            'acquaitances',
            setLoading,
            setError,
            handleAllAcquaitances);
    }, [token]);

    const Row = ({ index }) => (
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

    const onDialogClose = () => setOpen(false);

    const handleClick = (e) => setOpen(true);

    return (
        <NavDrawer token={token} logout={logout}>
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
                                <h2>{user ? user.firstName + " " + user.lastName : null}</h2>
                                <p className={classes.positions}>Ulubione pozycje: napastnik</p>
                                <p>
                                    172 rozegrane mecze | 221 godzin na boisku | 71 strzelonych goli
                                </p>
                                <Button variant="outlined" color="primary" onClick={handleClick}>
                                    Zmień dane
                                </Button>
                            </Box>
                        </Box>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={9}>
                    <Paper className={classes.paper}>
                        <TabContext value={value}>
                            <Tabs value={value} onChange={handleChange} variant="fullWidth"
                                aria-label="wrapped label tabs example">
                                <Tab value="one" label="Aktywność znajomych" wrapped {...a11yProps('one')} />
                                <Tab value="two" label="Znajomi" wrapped {...a11yProps('two')} />
                                <Tab value="three" label="Zaproszenia do znajomych" wrapped {...a11yProps('three')} />
                                <Tab value="four" label="Moje mecze" wrapped {...a11yProps('four')} />
                                <Tab value="five" label="Archiwum meczy" wrapped {...a11yProps('five')} />
                            </Tabs>
                            <TabPanel value={value} hidden={value !== "one"} index="one">
                                {eventsArray.map((item, index) => Row({ index }))}
                            </TabPanel>
                            <TabPanel value={value} hidden={value !== "two"} index="two">
                                <FriendsList acquaitances={acquaitances} />
                            </TabPanel>
                            <TabPanel value={value} hidden={value !== "three"} index="three">
                                <InvitationList></InvitationList>
                            </TabPanel>
                            <TabPanel value={value} hidden={value !== "four"} index="four">
                                <MatchesTable archiveMatches={false}></MatchesTable>
                            </TabPanel>
                            <TabPanel value={value} hidden={value !== "five"} index="five">
                                <MatchesTable archiveMatches={true}></MatchesTable>
                            </TabPanel>
                        </TabContext>
                    </Paper>
                </Grid>
            </Grid>
            <Dialog
                open={open}
                onClose={onDialogClose}
                classes={{ paper: classes.dialogPaper }}
            >
                <DialogContent>
                    <UpdateDataForm></UpdateDataForm>
                </DialogContent>
            </Dialog>
        </NavDrawer>
    );
};

export default UserProfile;
