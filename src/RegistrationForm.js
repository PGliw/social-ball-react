
import DateFnsUtils from '@date-io/date-fns';
import {MuiPickersUtilsProvider, KeyboardDatePicker} from '@material-ui/pickers';

import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
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
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function RegistrationForm() {
    const classes = useStyles();
    const [fields, setFields] = React.useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        repeatPassword: '',
        hasAccepted: false,
    });
    const [errors, setErrors] = React.useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        repeatPassword: '',
        hasAccepted: false,
    });
    const [submitButtonEnabled, setSubmitButtonEnabled] = React.useState(false);

    const handleInputChange = (event) => {
        // const fields = this.state.fields;
        // const target = event.target;
        // const name = target.name;
        // const value = name === "hasAccepted" ? target.checked : target.value;
        // fields[name] = value;
        //
        // const errors = this.state.errors;
        // switch (name) {
        //     case 'firstName':
        //         errors.firstName =
        //             value.length < 1
        //                 ? 'Imię nie moze być puste!'
        //                 : null;
        //         break;
        //     case 'lastName':
        //         errors.lastName =
        //             value.length < 1
        //                 ? 'Nazwisko nie może być puste!'
        //                 : null;
        //         break;
        //     case 'email':
        //         const validEmailRegex =
        //             RegExp(/^(([^<>()\\[\]\\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);
        //         errors.email =
        //             validEmailRegex.test(value)
        //                 ? null
        //                 : 'To nie jest poprawny adres email';
        //         break;
        //     case 'birthday':
        //         const dateEntry = new Date(value);
        //         const date13yearsAgo = new Date();
        //         date13yearsAgo.setFullYear(date13yearsAgo.getFullYear() - 13);
        //         errors.birthday =
        //             dateEntry < date13yearsAgo
        //                 ? null
        //                 : 'Żeby samodzielnie się zarejestrować musisz mieć ukończone 13 lat';
        //         break;
        //     case 'password':
        //         errors.password =
        //             value.length < 8
        //                 ? 'Hasło musi mieć przynajmniej 8 znaków'
        //                 : null;
        //         break;
        //     case 'repeatPassword':
        //         errors.repeatPassword =
        //             value === fields.password ? null : 'Hasła muszą być identyczne';
        //         break;
        //     case 'hasAccepted':
        //         errors.hasAccepted =
        //             value ? null : 'Zgoda jest wymagana';
        //         break;
        //     default:
        //         break;
        // }
        // this.setState(
        //     {
        //         fields: fields,
        //         errors: errors,
        //         isSubmitButtonEnabled:
        //             errors.firstName === null
        //             && errors.lastName === null
        //             && errors.email === null
        //             && errors.password === null
        //             && errors.birthday === null
        //             && errors.repeatPassword === null
        //             && errors.hasAccepted === null
        //     });
    };

    const onSubmit = () => {
        alert("Cześć "+this.state.fields.firstName);
    }; // placeholder - will be removed by api call

    return (
        <Container component="main" maxWidth="sm">
            <Paper className={classes.paper}>
                <CssBaseline />
                <div>
                    <Typography component="h1" variant="h5">
                        Rejestracja
                    </Typography>
                    <form className={classes.form}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Imię"
                                    id="firstName"
                                    name="firstName"
                                    fullWidth
                                    required
                                    autoFocus
                                    variant="outlined"
                                    value={fields.firstName || ''}
                                    onChange={handleInputChange}
                                    error={errors.firstName}
                                    helperText={errors.firstName}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Nazwisko"
                                    id="lastName"
                                    name="lastName"
                                    fullWidth
                                    required
                                    variant="outlined"
                                    value={fields.lastName || ''}
                                    onChange={handleInputChange}
                                    error={errors.lastName}
                                    helperText={errors.lastName}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="Adres e-mail"
                                    id="email"
                                    name="email"
                                    fullWidth
                                    required
                                    variant="outlined"
                                    value={fields.email || ''}
                                    onChange={handleInputChange}
                                    error={errors.email}
                                    helperText={errors.email}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <KeyboardDatePicker
                                        label="Data urodzenia"
                                        id="birthday"
                                        name="birthday"
                                        disableToolbar
                                        variant="inline"
                                        fullWidth
                                        format="dd/MM/yyyy"
                                        inputVariant="outlined"
                                        value={fields.birthday}
                                        onChange={handleInputChange}
                                        KeyboardButtonProps={{
                                            'aria-label': 'change date',
                                        }}
                                    />
                                </MuiPickersUtilsProvider>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Hasło"
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    fullWidth
                                    variant="outlined"
                                    value={fields.password || ''}
                                    onChange={handleInputChange}
                                    error={errors.password}
                                    helperText={errors.password}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Powtórz hasło"
                                    id="repeatPassword"
                                    name="repeatPassword"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    fullWidth
                                    variant="outlined"
                                    value={fields.repeatPassword || ''}
                                    onChange={handleInputChange}
                                    error={errors.repeatPassword}
                                    helperText={errors.repeatPassword}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl required error={errors.hasAccepted} component="fieldset">
                                    <FormGroup>
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={fields.hasAccepted}
                                                    onChange={handleInputChange}
                                                    name="hasAccepted"
                                                    error={errors.hasAccepted}
                                                />
                                            }
                                            label="Akceptuję warunki regulaminu"
                                        />
                                    </FormGroup>
                                    {!errors.hasAccepted ? null : (
                                        <FormHelperText>{errors.hasAccepted}</FormHelperText>
                                    )}
                                </FormControl>
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            disabled={!submitButtonEnabled}
                            className={classes.submit}
                        >
                            Zarejestruj się
                        </Button>
                        <Grid container justify="flex-end">
                            <Grid item>
                                <Link href="#" variant="body2">-
                                    Masz już konto? Przejdź do logowania
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </Paper>
        </Container>
    );
}
