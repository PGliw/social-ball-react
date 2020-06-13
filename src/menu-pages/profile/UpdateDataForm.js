import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import DateFnsUtils from '@date-io/date-fns';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { SERVER_URL } from "../../config";
import { Redirect } from "react-router-dom";
import { API_METHODS, fetchFromApi, withTokenFetchFromApi } from "../../api/baseFetch";

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
        width: '100%',
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export const UpdateDataForm = ({ token, logout }) => {
    const classes = useStyles();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [firstName, setFirstName] = useState(null);
    const [lastName, setLastName] = useState(null);
    const [email, setEmail] = useState(null);
    const [birthday, setBirthday] = useState(null);
    const [password, setPassword] = useState(null);
    const [repeatPassword, setRepeatPassword] = useState(null);

    const [firstNameError, setFirstNameError] = useState(null);
    const [lastNameError, setLastNameError] = useState(null);
    const [emailError, setEmailError] = useState(null);
    const [birthdayError, setBirthdayError] = useState(null);
    const [passwordError, setPasswordError] = useState(null);
    const [repeatPasswordError, setRepeatPasswordError] = useState(null);

    const [submitButtonEnabled, setSubmitButtonEnabled] = useState(false);

    const [isUpdateSuccessful, setUpdateSuccessful] = useState(null);
    // const [isLoading, setLoading] = useState(false);
    // const [error, setError] = useState(null);
    const [header, setHeader] = useState("");

    useEffect(() => {
        if (error) alert(error);
    }, [error]);

    useEffect(() => {
        setSubmitButtonEnabled(
            firstName !== null
            && firstNameError === null
            && lastName !== null
            && lastNameError === null
            && email !== null
            && emailError === null
            && birthday !== null
            && birthdayError === null
            && password !== null
            && passwordError === null
            && repeatPassword !== null
            && repeatPasswordError === null
            && isUpdateSuccessful === null);
    }, [
        firstName,
        firstNameError,
        lastName,
        lastNameError,
        email,
        emailError,
        birthday,
        birthdayError,
        password,
        passwordError,
        repeatPassword,
        repeatPasswordError,
        isUpdateSuccessful
    ]);

    useEffect(() => {
        console.log('useEffect');
        const fetchFromApiWithToken = withTokenFetchFromApi(token);
        fetchFromApiWithToken(
            API_METHODS.GET,
            'profile',
            setLoading,
            setError,
            setUser);
    }, [token]);

    // const onSubmit = (e) => {
    //     e.preventDefault();
    //     fetchFromApi(
    //         API_METHODS.PUT,
    //         "users",
    //         setLoading,
    //         setError,
    //         () => setUpdateSuccessful(true),
    //         {
    //             firstName: firstName,
    //             lastName: lastName,
    //             dateOfBirth: birthday.toISOString().split('T')[0],
    //             password: password,
    //             email: email,
    //             username: firstName,
    //         }
    //     );
    //     setHeader("✅ Zaktualizowano");
    // };

    const onSubmit = (e) => {
        console.log('onSubmit');
        const newUser = { ...user };
        newUser.firstName = firstName;
        newUser.lastName = lastName;
        newUser.email = email;
        newUser.birthday = birthday;
        newUser.password = password;
        newUser.firstName = firstName;
        console.log('test');
        updateUser(newUser);
        setHeader("✅ Zaktualizowano");
        setUpdateSuccessful(true)
    };

    const updateUser = (newUserDto) => {
        console.log('updateUser');
        const fetchFromApiWithToken = withTokenFetchFromApi(token);
        console.log('updateUser');
        fetchFromApiWithToken(
            API_METHODS.PUT,
            'profile',
            setLoading,
            setError,
            setUser,
            newUserDto);
    };

    return (
        <Container component="main" maxWidth="sm">
            <Paper className={classes.paper}>
                <CssBaseline />
                <div>
                    <Typography component="h1" variant="h5" align="center">
                        Aktualizuj dane
                        </Typography>
                    <form className={classes.form} onSubmit={(e) => onSubmit(e)}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Imię"
                                    id="firstName"
                                    fullWidth
                                    required
                                    autoFocus
                                    variant="outlined"
                                    value={firstName || ''}
                                    onChange={event => {
                                        setFirstName(event.target.value);
                                        setFirstNameError(event.target.value.length < 1
                                            ? 'Imię nie moze być puste!'
                                            : null);
                                    }}
                                    error={firstNameError !== null}
                                    helperText={firstNameError}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Nazwisko"
                                    id="lastName"
                                    fullWidth
                                    required
                                    variant="outlined"
                                    value={lastName || ''}
                                    onChange={event => {
                                        setLastName(event.target.value);
                                        setLastNameError(event.target.value.length < 1
                                            ? 'Nazwisko nie moze być puste!'
                                            : null);
                                    }}
                                    error={lastNameError !== null}
                                    helperText={lastNameError}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="Adres e-mail"
                                    id="email"
                                    fullWidth
                                    required
                                    variant="outlined"
                                    value={email || ''}
                                    onChange={event => {
                                        const validEmailRegex = RegExp(/^(([^<>()\\[\]\\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);
                                        setEmail(event.target.value);
                                        setEmailError(validEmailRegex.test(event.target.value)
                                            ? null
                                            : 'To nie jest poprawny adres email');
                                    }}
                                    error={emailError !== null}
                                    helperText={emailError}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <KeyboardDatePicker
                                        label="Data urodzenia"
                                        id="birthday"
                                        disableToolbar
                                        variant="inline"
                                        fullWidth
                                        format="dd/MM/yyyy"
                                        inputVariant="outlined"
                                        value={birthday}
                                        onChange={date => {
                                            setBirthday(date);
                                            const date13yearsAgo = new Date();
                                            date13yearsAgo.setFullYear(date13yearsAgo.getFullYear() - 13);
                                            setBirthdayError(date < date13yearsAgo
                                                ? null
                                                : 'Musisz mieć ukończone 13 lat');
                                        }}
                                        error={birthdayError !== null}
                                        helperText={birthdayError}
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
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    fullWidth
                                    variant="outlined"
                                    value={password || ''}
                                    onChange={event => {
                                        setPassword(event.target.value);
                                        setPasswordError(event.target.value.length < 8
                                            ? 'Hasło musi mieć przynajmniej 8 znaków'
                                            : null);
                                    }}
                                    error={passwordError !== null}
                                    helperText={passwordError}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Powtórz hasło"
                                    id="repeatPassword"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    fullWidth
                                    variant="outlined"
                                    value={repeatPassword || ''}
                                    onChange={event => {
                                        setRepeatPassword(event.target.value);
                                        setRepeatPasswordError(event.target.value === password
                                            ? null
                                            : 'Hasła muszą być identyczne');
                                    }}
                                    error={repeatPasswordError !== null}
                                    helperText={repeatPasswordError}
                                />
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
                            Aktualizuj
                            </Button>
                        <h2 align="center">{header}</h2>
                    </form>
                </div>
            </Paper>
        </Container>
    );
}
