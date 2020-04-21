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
import {KeyboardDatePicker, MuiPickersUtilsProvider, KeyboardTimePicker} from "@material-ui/pickers";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
    settings: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
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

const MatchContent = () => {
    const classes = useStyles(),
        [fields, setFields] = useState(["Soccerfield", "Footballclub", "Bojo"]),
        [selectedField, setSelectedField] = useState(""),
        [selectedCity, setSelectedCity] = useState(""),
        [date, setDate] = useState(null),
        [startTime, setStartTime] = useState(null),
        [endTime, setEndTime] = useState(null),
        [open, setOpen] = useState(false),
        [coach, setCoach] = useState(null),
        [equalTeams, setEqualTeams] = useState(true),
        [samePositions, setSamePositions] = useState(true);

    const handleCityChange = (e) => setSelectedCity(e.target.value);

    const handleFieldChange = (e) => {
        const value = e.target.value;

        if (value === "") {
            setSelectedField("");
            setOpen(true);
        } else setSelectedField(value);
    };

    const handleEqualTeamsChange = (e) => {
        const equal = e.target.checked;
        setEqualTeams(equal);
        if (equal === false) {
            setSamePositions(false);
        }
    };

    const handleSamePositionsChange = (e) => {
        const checked = e.target.checked;
        const theSame = equalTeams !== false && checked;
        setSamePositions(theSame);
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
                    <label>
                        <input type="checkbox" checked={samePositions}
                               onChange={handleSamePositionsChange}/>
                        Takie samo rozstawienie drużyn
                    </label>
                    <br/>
                    <Button className={classes.submitButton} variant="contained" color="primary">
                        Opublikuj
                    </Button>
                </Grid>
                <Grid item sm={12} md={8}>
                    <TeamBuilder
                        equalTeams={equalTeams}
                        samePositions={samePositions}
                    />

                </Grid>
            </Grid>
            <Dialog open={open} onClose={onDialogClose}>
                Jakiś dialog
            </Dialog>
        </Paper>
    );
};

export default MatchContent;
