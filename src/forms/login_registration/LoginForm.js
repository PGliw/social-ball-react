import React, {useEffect, useState} from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import {SERVER_URL} from "../../config";
import {Redirect} from "react-router-dom";

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

export function LoginForm({handleToken}) {
    const classes = useStyles();
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [keepLoggedIn, setKeepLoggedIn] = useState(false);
    const [emailError, setEmailError] = useState(null);
    const [passwordError, setPasswordError] = useState(null);
    const [submitButtonEnabled, setSubmitButtonEnabled] = useState(false);
    const [isLoginSuccessful, setLoginSuccessful] = useState(null);
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSuccessfulLogin = ({username, token}) => {
        if (token) {
            handleToken(token);
            setLoginSuccessful(true);
        }
    };

    useEffect(() => {
        setSubmitButtonEnabled(
            email !== null
            && emailError === null
            && password !== null
            && passwordError === null);
    }, [
        email,
        emailError,
        password,
        passwordError
    ]);

    useEffect(() => {
        if (error) {
            alert(error.message);
            console.log(error);
        }
    }, [error]);

    const onSubmit = (e) => {
        e.preventDefault();
        fetch(`${SERVER_URL}/token/generate-token`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email, password
            })
        }).then((response) => {
            setLoading(false);
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Something went wrong ...')
            }
        }).then(responseBody => handleSuccessfulLogin(responseBody))
            .catch(error => setError(error));
    };

    return (
        isLoginSuccessful === true ?
            <Redirect to={'/board'} push />
            :
            <Container component="main" maxWidth="sm">
                <Paper className={classes.paper}>
                    <CssBaseline/>
                    <div>
                        <Typography component="h1" variant="h5">
                            Logowanie
                        </Typography>
                        <form className={classes.form} onSubmit={(e) => onSubmit(e)}>
                            <Grid container spacing={2}>
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
                                <Grid item xs={12}>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={keepLoggedIn}
                                                onChange={event => {
                                                    setKeepLoggedIn(event.target.checked);
                                                }}
                                                id="keepLoggedIn"
                                            />
                                        }
                                        label="Nie wylogowuj mnie"
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
                                Zaloguj się
                            </Button>
                            <Grid container justify="flex-end">
                                <Grid item>
                                    <Link href="#/register" variant="body2">
                                        Nie masz konta? Zarejestruj się
                                    </Link>
                                </Grid>
                            </Grid>
                        </form>
                    </div>
                </Paper>
            </Container>
    );
}
