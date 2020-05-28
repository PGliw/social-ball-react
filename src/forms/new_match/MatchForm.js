import React, {useEffect, useState} from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {TeamBuilder} from "./teambuilder/TeamBuilder";
import Paper from "@material-ui/core/Paper";
import {Select, MenuItem, Dialog, InputLabel, FormControl, Typography, Button, Grid, DialogContent, withStyles} from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";
import {KeyboardDatePicker, KeyboardTimePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import {AddPitchForm} from "./AddPitchForm";
import NavDrawer from "../../NavDrawer";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import {SERVER_URL} from "../../config";
import {Redirect} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    settings: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    dialogPaper: {
        minHeight: '58vh',
        maxHeight: '70vh',
    },
    team: {
        display: "flex",
        width: "40%",
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        alignItems: "flex-end",
        flex: 1
    },
    actions: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    selects: {
        display: "flex",
        flexDirection: "column",
        marginLeft: theme.spacing(6),
        marginRight: theme.spacing(6)
    },
    city: {
        width: "100%",
        margin: theme.spacing(1)
    },
    field: {
        width: "100%",
        margin: theme.spacing(1)
    },
    submitButton: {
        marginLeft: theme.spacing(4)
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    paper: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        padding: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
            marginTop: theme.spacing(6),
            marginBottom: theme.spacing(6),
            padding: theme.spacing(3),
        },
    },
}));

// player id generator
const getItems = (count, team, offset = 0) =>
    Array.from({length: count}, (v, k) => k).map(k => ({
        id: `item-${team}-${k + offset}`,
        content: `item-${team}-${k + offset}`,
        num: k
    }));

//styles for dialog title
const styles = (theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
});

const DialogTitle = withStyles(styles)((props) => {
    const {children, classes, onClose, ...other} = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon/>
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

const MatchForm = ({token}) => {
    const classes = useStyles();
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [pitches, setPitches] = useState([]);
    const [selectedPitch, setSelectedPitch] = useState(null);
    const [selectedCity, setSelectedCity] = useState("Wrocław");
    const [selectedReferee, setSelectedRefree] = useState(null);
    const [date, setDate] = useState(new Date());
    const [startTime, setStartTime] = useState(new Date());
    const [endTime, setEndTime] = useState(new Date());
    const [open, setOpen] = useState(false);
    const [equalTeams, setEqualTeams] = useState(true);
    const [color1, setColor1] = useState("#f54242");
    const [color2, setColor2] = useState("#ffffff");
    const [name1, setName1] = useState("Gospodarze");
    const [name2, setName2] = useState("Goście");
    const [players1, setPlayers1] = useState(7);
    const [players2, setPlayers2] = useState(7);
    const team1Items = getItems(7, 1);
    const team2Items = getItems(7, 2);
    const [description, setDescription] = useState("");
    const [isCloseClicked, setCloseClicked] = useState(false);
    const [positions, setPositions] = useState([]);

    const [isPublishButtonEnabled, setPublishButtonEnabled] = useState(false);
    const [isPublished, setPublished] = useState(false);

    useEffect(() => {
        setPublishButtonEnabled(
            selectedPitch !== null
            && date !== null
            && startTime !== null
            && endTime !== null
        );
    }, [
        selectedPitch,
        date,
        startTime,
        endTime
    ]);

    useEffect(() => {
        if (error) alert(error);
    }, [error]);

    const [team1, setTeam1] = useState(
        {
            goalkeepers: team1Items.slice(0, 1),
            defenders: team1Items.slice(1, 3),
            midfields: team1Items.slice(3, 6),
            forwards: team1Items.slice(6, 7)
        }
    );
    const [team2, setTeam2] = useState(
        {
            goalkeepers: team2Items.slice(0, 1),
            defenders: team2Items.slice(1, 3),
            midfields: team2Items.slice(3, 6),
            forwards: team2Items.slice(6, 7)
        }
    );
    const [team1Limits, setTeam1Limits] = useState(
        {
            goalkeepers: true,
            defenders: false,
            midfields: false,
            forwards: false
        }
    );
    const [team2Limits, setTeam2Limits] = useState(
        {
            goalkeepers: true,
            defenders: false,
            midfields: false,
            forwards: false
        }
    );
    const limits = {
        goalkeepers: 1,
        defenders: 5,
        midfields: 5,
        forwards: 5
    };

    const handleMatchDate = (newMatchDateTime) => {
        const newStartDateTime = new Date(newMatchDateTime);
        newStartDateTime.setHours(startTime.getHours(), startTime.getMinutes(), startTime.getSeconds());
        setStartTime(newStartDateTime);
        const newEndDateTime = new Date(newMatchDateTime);
        newEndDateTime.setHours(endTime.getHours(), endTime.getMinutes(), endTime.getSeconds());
        setEndTime(newEndDateTime);
    };

    const withTimeAndSetterHandleTime = (time, setTime) => (newTime) => {
        const newDateTime = new Date(time);
        newDateTime.setHours(newTime.getHours(), newTime.getMinutes(), newTime.getSeconds());
        setTime(newDateTime);
    };

    const handleStartTime = withTimeAndSetterHandleTime(startTime, setStartTime);

    const handleEndTime = withTimeAndSetterHandleTime(endTime, setEndTime);

    const lineCountToSides = (lineCount) => {
        let result = null;
        const MIDDLE_LEFT = "lewy-środkowy", MIDDLE_RIGHT = "prawy-środkowy", MIDDLE = "środkowy", LEFT = "lewy",
            RIGHT = "prawy";
        switch (lineCount) {
            case 0:
                result = [];
                break;
            case 1:
                result = [MIDDLE];
                break;
            case 2:
                result = [MIDDLE_LEFT, MIDDLE_RIGHT];
                break;
            case 3:
                result = [MIDDLE_LEFT, MIDDLE, MIDDLE_RIGHT];
                break;
            case 4:
                result = [LEFT, MIDDLE_LEFT, MIDDLE_RIGHT, RIGHT];
                break;
            case 5:
                result = [LEFT, MIDDLE_LEFT, MIDDLE, MIDDLE_RIGHT, RIGHT];
                break;
        }
        if (result === null) {
            console.error(`Result of lineCountToSides is null (lineCount=${lineCount})`);
        }
        return result;
    };

    const teamToMatchMemberDtoArray = ({goalkeepers, defenders, midfields, forwards,}) => {
        const GOALKEEPER = "bramkarz", DEFENDER = "obrońca", MIDFIELD = "pomocnik", FORWARD = "napastnik";
        let goalkeepersObjArr = [];
        if (goalkeepers.length > 0) goalkeepersObjArr = [{name: GOALKEEPER, side: null}];
        const defendersObjArr = lineCountToSides(defenders.length).map(sideName => ({
            name: DEFENDER,
            side: sideName
        }));
        const midfieldsObjArr = lineCountToSides(midfields.length).map(sideName => ({
            name: MIDFIELD,
            side: sideName
        }));
        const forwardObjArr = lineCountToSides(forwards.length).map(sideName => (
            {name: FORWARD, side: sideName})
        );
        const playersObjArr = goalkeepersObjArr.concat(defendersObjArr, midfieldsObjArr, forwardObjArr);
        return playersObjArr.map(playerObj => {
            const positionObj = positions.find(position => position.name === playerObj.name && position.side === playerObj.side);
            if (!positionObj) {
                console.error("Position not found");
                console.log(playerObj);
            }

            return {
                isConfirmed: false,
                userId: null,
                positionId: positionObj.id,
            }
        });
    };

    useEffect(() => {
        setLoading(true);
        getPitches().then();
        getPositions().then();
    }, []);

    const getPositions = () =>
        fetch(`${SERVER_URL}/positions`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
        }).then((response) => {
            setLoading(false);
            if (response.ok) {
                return response.json();
            } else {
                const error = response.statusText;
                throw new Error(error)
            }
        }).then(responseBody => {
            return setPositions(responseBody)
        })
            .catch(error => setError(error));

    const getPitches = () =>
        fetch(`${SERVER_URL}/footballPitches`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
        }).then((response) => {
            setLoading(false);
            if (response.ok) {
                return response.json();
            } else {
                const error = response.statusText;
                throw new Error(error)
            }
        }).then(responseBody => setPitches(responseBody))
            .catch(error => setError(error));

    const postFootballMatch = () => {
        setLoading(true);
        return fetch(`${SERVER_URL}/footballMatches`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            body: JSON.stringify(
                {
                    beginningTime: startTime.toISOString(),
                    description: description,
                    endingTime: endTime.toISOString(),
                    id: null,
                    pitchId: selectedPitch.id,
                }
            )
        }).then((response) => {
            setLoading(false);
            if (response.ok) {
                return response.json();
            } else {
                const error = response.statusText;
                throw new Error(error)
            }
        })
    };

    const withFootballMatchIdPostTeamFun = (footballMatchId) => (name, membersCount, shirtColours, teamMembers) => {
        setLoading(true);
        return fetch(`${SERVER_URL}/teams`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            body: JSON.stringify({name, membersCount, shirtColours, teamMembers, footballMatchId,})
        }).then((response) => {
            setLoading(false);
            if (response.ok) {
                return response.json();
            } else {
                const error = response.statusText;
                throw new Error(error)
            }
        })

    };

    const handleSubmit = () => {
        setLoading(true);
        postFootballMatch()
            .then(responseBody => {
                const matchId = responseBody.id;
                return withFootballMatchIdPostTeamFun(matchId);
            })
            .then(postTeamFunction => {
                const matchMembersTeam1 = teamToMatchMemberDtoArray(team1);
                const matchMembersTeam2 = teamToMatchMemberDtoArray(team2);
                return Promise.all([
                    postTeamFunction(name1, players1, color1, matchMembersTeam1),
                    postTeamFunction(name2, players2, color2, matchMembersTeam2),
                ]);
            })
            .then(([team1response, team2response]) => {
                    setPublished(true);
            })
            .catch(error => setError(error));
    };

    const handleCityChange = (e) => setSelectedCity(e.target.value);

    const handlePitchChange = (e) => {
        const value = e.target.value;

        if (value === "") {
            setOpen(true);
        } else setSelectedPitch(value);
    };

    const handleRefereeChange = (e) => {
        const value = e.target.value;

        if (value === "") {
            setOpen(true);
        } else setSelectedRefree(value);
    };

    const handleEqualTeamsChange = (e) => {
        const equal = e.target.checked;
        setEqualTeams(equal);
    };

    const onDialogClose = () => setOpen(false);

    if (isCloseClicked) {
        return <Redirect to={"/board"}/>;
    } else {
        return <NavDrawer token={token}>
            <Paper className={classes.paper} elevation={3}>
                <Typography variant="h5">
                    Nowy mecz
                </Typography>
                <Grid container spacing={3}>
                    <Grid className={classes.details} item sm={12} md={4}>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker
                                label="Termin"
                                id="date"
                                disableToolbar
                                variant="inline"
                                fullWidth
                                format="dd/MM/yyyy"
                                inputVariant="outlined"
                                value={startTime}
                                onChange={handleMatchDate}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                            <KeyboardTimePicker
                                label="Pierwszy gwizdek"
                                id="startTime"
                                variant="inline"
                                inputVariant="outlined"
                                fullWidth
                                value={startTime}
                                onChange={handleStartTime}
                            />
                            <KeyboardTimePicker
                                label="Ostatni gwizdek"
                                id="endTime"
                                inputVariant="outlined"
                                fullWidth
                                value={endTime}
                                onChange={handleEndTime}
                            />
                        </MuiPickersUtilsProvider>

                        <FormControl className={classes.city}>
                            <InputLabel id="city">Miasto</InputLabel>
                            <Select labelId="city" onChange={handleCityChange} value={selectedCity}>
                                <MenuItem value="Kalisz">Kalisz</MenuItem>
                                <MenuItem value="Wrocław">Wrocław</MenuItem>
                                <MenuItem value="Kraków">Kraków</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl className={classes.field}>
                            <InputLabel id="field">Boisko</InputLabel>
                            <Select labelId="field" onChange={handlePitchChange} value={selectedPitch}>
                                {pitches.map(pitch => {
                                    return (
                                        <MenuItem value={pitch.id} key={pitch.id}>
                                            {pitch.name}
                                        </MenuItem>
                                    )
                                })}
                                <MenuItem value="">Nie ma na liście? &nbsp;<b>Dodaj nowe</b></MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl className={classes.field}>
                            <InputLabel id="referee">Sędzia</InputLabel>
                            <Select labelId="referee" onChange={handleRefereeChange} value={selectedReferee}>
                                <MenuItem value={true}>Tak</MenuItem>
                                <MenuItem value={false}>Nie</MenuItem>
                                <MenuItem value={null}>Obojętne</MenuItem>
                            </Select>
                        </FormControl>
                        <label>
                            <input type="checkbox" checked={equalTeams} onChange={handleEqualTeamsChange}/>
                            Równe składy drużyn
                        </label>
                        <br/>
                        {isPublished ?
                            (
                                <div>
                                    <h2>✅ Opublikowano</h2>
                                    <Button variant="outlined" className={classes.submitButton} color="primary"
                                            onClick={() => setCloseClicked(true)}>
                                        Zamknij
                                    </Button>
                                </div>
                            )
                            :
                            (
                                <div>
                                    <Button className={classes.submitButton} variant="contained" color="primary"
                                            disabled={!isPublishButtonEnabled} onClick={handleSubmit}>
                                        Opublikuj
                                    </Button>
                                    <Button variant="outlined" className={classes.submitButton} color="primary"
                                            onClick={() => setCloseClicked(true)}>
                                        Anuluj
                                    </Button>
                                </div>
                            )
                        }

                    </Grid>
                    <Grid item sm={12} md={8}>
                        <TeamBuilder
                            equalTeams={equalTeams}
                            colors={[color1, color2]}
                            colorSetters={[setColor1, setColor2]}
                            names={[name1, name2]}
                            nameSetters={[setName1, setName2]}
                            players={[players1, players2]}
                            playersSetters={[setPlayers1, setPlayers2]}
                            teams={[team1, team2]}
                            teamSetters={[setTeam1, setTeam2]}
                            teamLimits={[team1Limits, team2Limits]}
                            teamLimitsSetters={[setTeam1Limits, setTeam2Limits]}
                            limits={limits}
                        />

                    </Grid>
                </Grid>
                <Dialog
                    open={open}
                    onClose={onDialogClose}
                    classes={{paper: classes.dialogPaper}}
                >
                    <DialogTitle onClose={onDialogClose}>
                        Nowe boisko
                    </DialogTitle>
                    <DialogContent>
                        <AddPitchForm token={token}/>
                    </DialogContent>
                </Dialog>
            </Paper>
        </NavDrawer>
    }
};

export default MatchForm;
