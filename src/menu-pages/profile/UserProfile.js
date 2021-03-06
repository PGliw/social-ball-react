import React, {Fragment, useEffect, useState} from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {Box, Button, Dialog, DialogContent, Grid, Link, Paper, Tab, Tabs} from "@material-ui/core";
import ProfilePlaceholder from "../../assets/profile-placeholder.png";
import {FriendsList} from "./profile/FriendsList";
import {InvitationList} from "./profile/InvitationList";
import RoundedImage from "react-rounded-image";
import {a11yProps} from "./profile/Tabs";
import TabPanel from "@material-ui/lab/TabPanel";
import * as PropTypes from "prop-types";
import TabContext from "@material-ui/lab/TabContext";
import NavDrawer from "../NavDrawer";
import logo from "../../assets/avatarPlaceholder.PNG";
import {API_METHODS, withTokenFetchFromApi} from "../../api/baseFetch";
import {UpdateDataForm} from "./profile/UpdateDataForm";
import {MatchesTable} from "./profile/MatchesTable";
import {TIME} from "../../api/constants";
import {withMaterialDialog} from "../../hoc/withMaterialDialog";
import {MatchProtocol} from "../../forms/match_protocol/MatchProtocol";

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
    button: {
        marginLeft: 10,
    }
}));

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

export const UserProfile = ({token, logout}) => {
        const classes = useStyles();
        const [value, setValue] = React.useState('one');
        const [user, setUser] = useState(null);
        const [loading, setLoading] = useState(false);
        const [error, setError] = useState(null);
        const [open, setOpen] = useState(false);
        const [title, setTitle] = useState("tresc");
        const [acquaintances, setAcquaintances] = useState([]);
        const [positions, setPositions] = useState(null);
        const [stats, setStats] = useState(null);
        const [friendsListRefresher, setFriendsListRefresher] = useState(false);
        const handleChange = (event, newValue) => {
            setValue(newValue);
        };

        const updateUser = (newUserDto) => {
            const fetchFromApiWithToken = withTokenFetchFromApi(token);
            fetchFromApiWithToken(
                API_METHODS.PUT,
                'profile',
                setLoading,
                setError,
                setUser,
                newUserDto);
        };

        const onImageUploaded = (error, result) => {
            if (result && result.event === 'success' && result.info && result.info.url) {
                console.log(result);
                const imageUrl = result.info.url;
                const newUser = {...user};
                newUser.image = imageUrl;
                updateUser(newUser);
            }
        };

        const uploadWidget = window.cloudinary.createUploadWidget({
                cloud_name: 'pgliw',
                upload_preset: 'social_ball_images_preset',
                tags: ['profile', 'photo']
            },
            onImageUploaded
        );

        const showUploadWidget = () => uploadWidget.open();


        const fetchUser = () => {
            const fetchFromApiWithToken = withTokenFetchFromApi(token);
            fetchFromApiWithToken(
                API_METHODS.GET,
                'profile',
                setLoading,
                setError,
                setUser);
        };

        const handlePosition = (newPosition) => {
            setPositions(newPosition);
        };

        useEffect(() => {
            fetchUser()
        }, [token]);

        useEffect(() => {
            const fetchFromApiWithToken = withTokenFetchFromApi(token);
            fetchFromApiWithToken(
                API_METHODS.GET,
                'statistics',
                setLoading,
                setError,
                setStats);
        }, [token]);

        const handleAllAcquaitances = (newAllAcquaitances) => {
            console.log('newAllAcquantiances');
            console.log(newAllAcquaitances);
            setAcquaintances(newAllAcquaitances);
            console.log('acuaitances');
            console.log(acquaintances);
        };

        useEffect(() => {
            const fetchFromApiWithToken = withTokenFetchFromApi(token);
            fetchFromApiWithToken(
                API_METHODS.GET,
                'favouritePositions',
                setLoading,
                setError,
                handlePosition);
        }, [token]);

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

        const onDialogClose = () => setOpen(false);

        const handleClick = (e) => setOpen(true);

        const renderStats = (statistics) => {
            return <Fragment>
                <p>
                    {!!stats ? stats.matchesPlayed + " rozegranych meczów | " + stats.hoursPlayed + "  godzin na boisku | " + stats.goalsScored + " strzelonych goli" : null}
                </p>
                <p>
                    {!!stats ? stats.yellowCardsReceived + " otrzymanych żółtych kartek | " + stats.redCardsReceived + " otrzymanych czerwonych kartek | " + stats.fauls + "  faulowań" : null}
                </p>
            </Fragment>
        };

        return (
            <NavDrawer token={token} logout={logout}>
                <Grid className={classes.root}>
                    <Grid item xs={12}>
                        <Paper className={classes.paper}>
                            <Box display="flex" p={1} bgcolor="background.paper">
                                <Box className={classes.paperBox}>
                                    <RoundedImage image={user && user.image ? user.image : ProfilePlaceholder}
                                                  roundedColor="#e6e6e6"
                                                  roundedSize="13"
                                                  imageWidth="160"
                                                  imageHeight="160"
                                    />
                                </Box>
                                <Box className={classes.paperBox}>
                                    <h2>{user ? user.firstName + " " + user.lastName : null}</h2>
                                    <p className={classes.positions}>{positions && positions[0] ? "Ulubione pozycje: " + positions[0].positionId.side + " " + positions[0].positionId.name : null}</p>
                                    {renderStats(stats)}
                                    <Button variant="outlined" color="primary" onClick={showUploadWidget}>
                                        Aktualizuj zdjęcie
                                    </Button>
                                    <Button className={classes.button} variant="outlined" color="primary"
                                            onClick={handleClick}>
                                        Zmień dane
                                    </Button>
                                </Box>
                            </Box>
                        </Paper>
                    </Grid>
                    <Grid item xs={12}>
                        <Paper className={classes.paper}>
                            <TabContext value={value}>
                                <Tabs value={value} onChange={handleChange} variant="fullWidth"
                                      aria-label="wrapped label tabs example">
                                    <Tab value="one" label="Aktywność znajomych" wrapped {...a11yProps('one')} />
                                    <Tab onClick={() => console.log('onclick')} value="two" label="Znajomi"
                                         wrapped {...a11yProps('two')} />
                                    <Tab value="three" label="Zaproszenia do znajomych" wrapped {...a11yProps('three')} />
                                    <Tab value="four" label="Nadchodzące mecze" wrapped {...a11yProps('four')} />
                                    <Tab value="five" label="Archiwum meczów" wrapped {...a11yProps('five')} />
                                </Tabs>
                                <TabPanel value={value} hidden={value !== "one"} index="one">
                                    {/*{eventsArray.map((item, index) => Row({index}))}*/}
                                    <FriendsList token={token} user={user} refresher={friendsListRefresher}/>
                                </TabPanel>
                                <TabPanel value={value} hidden={value !== "two"} index="two">
                                    <FriendsList token={token} user={user} refresher={friendsListRefresher}/>
                                </TabPanel>
                                <TabPanel value={value} hidden={value !== "three"} index="three">
                                    <InvitationList token={token} user={user}
                                                    onFriendsChange={() => setFriendsListRefresher(!friendsListRefresher)}/>
                                </TabPanel>
                                <TabPanel value={value} hidden={value !== "four"} index="four">
                                    <MatchesTable token={token} user={user}
                                                  filterPredicate={match => match.statusTime === TIME.PRESENT || match.statusTime === TIME.FUTURE}/>
                                </TabPanel>
                                <TabPanel value={value} hidden={value !== "five"} index="five">
                                    <MatchesTable token={token} user={user}
                                                  filterPredicate={match => match.statusTime === TIME.PAST}/>
                                </TabPanel>
                            </TabContext>
                        </Paper>
                    </Grid>
                </Grid>
                {
                    withMaterialDialog(UpdateDataForm, open, onDialogClose, "Aktualizuj dane")({
                        token: token,
                        user: user,
                        handleUserUpdate: fetchUser,
                    })
                }
            </NavDrawer>
        );
    }
;

export default UserProfile;
