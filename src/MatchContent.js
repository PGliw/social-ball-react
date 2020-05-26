import React, {useState} from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {TeamBuilder} from "./forms/new_match/teambuilder/TeamBuilder";
import Paper from "@material-ui/core/Paper";
import {Select} from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import Dialog from "@material-ui/core/Dialog";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import DateFnsUtils from "@date-io/date-fns";
import {KeyboardDatePicker, KeyboardTimePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import {AddFieldForm} from "./forms/AddFieldForm";
import DialogContent from "@material-ui/core/DialogContent";

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

// id generator
const getItems = (count, team, offset = 0) =>
    Array.from({length: count}, (v, k) => k).map(k => ({
        id: `item-${team}-${k + offset}`,
        content: `item-${team}-${k + offset}`,
        num: k
    }));

const MatchContent = ({token}) => {
    const classes = useStyles();
    const [fields, setFields] = useState(["Soccerfield", "Footballclub", "Bojo"]);
    const [selectedField, setSelectedField] = useState("Soccerfield");
    const [selectedCity, setSelectedCity] = useState("");
    const [date, setDate] = useState(null);
    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);
    const [open, setOpen] = useState(false);
    const [coach, setCoach] = useState(null);
    const [equalTeams, setEqualTeams] = useState(true);
    const [color1, setColor1] = useState("#f54242");
    const [color2, setColor2] = useState("#ffffff");
    const [name1, setName1] = useState("Gospodarze");
    const [name2, setName2] = useState("Goście");
    const [players1, setPlayers1] = useState(7);
    const [players2, setPlayers2] = useState(7);
    const team1Items = getItems(7, 1);
    const team2Items = getItems(7, 2);
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

    const handleCityChange = (e) => setSelectedCity(e.target.value);

    const handleFieldChange = (e) => {
        const value = e.target.value;

        if (value === "") {
            // setSelectedField("");
            setOpen(true);
        } else setSelectedField(value);
    };

    const handleEqualTeamsChange = (e) => {
        const equal = e.target.checked;
        setEqualTeams(equal);
    };

    const onDialogClose = () => setOpen(false);

    const handleCoachChange = (e) => setCoach(e.target.value);

    return (
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
                            value={date}
                            onChange={date => setDate(date)}
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
                            onChange={time => setStartTime(time)}
                        />
                        <KeyboardTimePicker
                            label="Ostatni gwizdek"
                            id="endTime"
                            inputVariant="outlined"
                            fullWidth
                            value={endTime}
                            onChange={time => setEndTime(time)}
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
                        <Select labelId="field" onChange={handleFieldChange} value={selectedField}>
                            {fields.map(field => {
                                return (
                                    <MenuItem value={field} key={field}>
                                        {field}
                                    </MenuItem>
                                )
                            })}
                            <MenuItem value="">Nie ma na liście? &nbsp;<b>Dodaj nowe</b></MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl className={classes.field}>
                        <InputLabel id="referee">Sędzia</InputLabel>
                        <Select labelId="referee" onChange={handleFieldChange} value={selectedField}>
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
                    <Button className={classes.submitButton} variant="contained" color="primary">
                        Opublikuj
                    </Button>
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
                classes={{ paper: classes.dialogPaper }}
            >
                <DialogContent>
                    <AddFieldForm/>
                </DialogContent>
            </Dialog>
        </Paper>
    );
};

export default MatchContent;
