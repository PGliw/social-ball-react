import React, {useEffect, useState} from 'react'
import makeStyles from "@material-ui/core/styles/makeStyles";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        padding: theme.spacing(2),

    },
    header: {
        textAlign: 'center',
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(3),
    },
    add: {
        width: '100%',
        margin: theme.spacing(0, 2, 2),
    }
}));

export function AddFieldForm() {
    const classes = useStyles();

    const [fieldName, setFieldName] = useState(null);
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [payable, setPayable] = useState(null);
    const [reservationRequired, setReservationRequired] = useState(null);
    const [surface, setSurface] = useState(null);
    const [website, setWebsite] = useState(null);
    const [image, setImage] = useState(null);

    const [fieldError, setFieldError] = useState(null);
    const [latitudeError, setLatitudeError] = useState(null);
    const [longitudeError, setLongitudeError] = useState(null);
    const [surfaceError, setSurfaceError] = useState(null);
    const [websiteError, setWebsiteError] = useState(null);
    const [imageError, setImageError] = useState(null);

    const [addButtonEnabled, setAddButtonEnabled] = useState(false);

    useEffect(() => {
        setAddButtonEnabled(
            fieldName !== null
            && fieldError === null
            && latitude !== null
            && latitudeError === null
            && longitude !== null
            && longitudeError === null
            && surface !== null
            && surfaceError === null
            && website !== null
            && websiteError === null
            && image != null
            && imageError === null
        );
    }, [
        fieldName,
        latitude,
        latitudeError,
        longitude,
        longitudeError,
        surface,
        website,
        websiteError,
        image,
        imageError
    ]);

    const onSubmit = (e) => {
        // TO DO
    };

    return (
        <Container component="main" maxWidth="sm">
            <Paper className={classes.paper}>
                <CssBaseline/>
                <div>
                    <Typography className={classes.header} component="h1" variant="h5">
                        Dodaj boisko
                    </Typography>
                    <form className={classes.form} onSubmit={(e) => onSubmit(e)}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={12}>
                                <TextField
                                    label="Nazwa"
                                    id="fieldName"
                                    fullWidth
                                    required
                                    autoFocus
                                    variant="outlined"
                                    value={fieldName || ''}
                                    onChange={event => {
                                        setFieldName(event.target.value);
                                        setFieldError(event.target.value.length < 1
                                            ? 'nazwa nie moze być pusta'
                                            : null);
                                    }}
                                    error={fieldError !== null}
                                    helperText={fieldError}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Szerokość geograficzna"
                                    id="latitude"
                                    fullWidth
                                    required
                                    variant="outlined"
                                    value={latitude || ''}
                                    onChange={event => {
                                        setLatitude(event.target.value);
                                        setLatitudeError(parseFloat(event.target.value) > 90
                                        || parseFloat(event.target.value) < 0
                                        || isNaN(parseFloat(event.target.value))
                                            ? 'Podaj wartość z zakresu 0-90'
                                            : null);
                                    }}
                                    error={latitudeError !== null}
                                    helperText={latitudeError}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Długość geograficzna"
                                    id="longitude"
                                    fullWidth
                                    required
                                    variant="outlined"
                                    value={longitude || ''}
                                    onChange={event => {
                                        setLongitude(event.target.value);
                                        setLongitudeError(parseFloat(event.target.value) > 180
                                        || parseFloat(event.target.value) < 0
                                        || isNaN(parseFloat(event.target.value))
                                            ? 'Podaj wartość z zakresu 0-180'
                                            : null);
                                    }}
                                    error={longitudeError !== null}
                                    helperText={longitudeError}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <TextField
                                    label="Nawierzchnia"
                                    id="surface"
                                    fullWidth
                                    required
                                    variant="outlined"
                                    value={surface || ''}
                                    onChange={event => {
                                        setSurface(event.target.value);
                                        setSurfaceError(event.target.value.length < 1
                                            ? 'nazwa nie moze być pusta'
                                            : null);
                                    }}
                                    error={surfaceError !== null}
                                    helperText={surfaceError}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="Strona www"
                                    id="website"
                                    fullWidth
                                    required
                                    variant="outlined"
                                    value={website || ''}
                                    onChange={event => {
                                        const validWebsiteRegex = RegExp(/[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi);
                                        setWebsite(event.target.value);
                                        setWebsiteError(validWebsiteRegex.test(event.target.value)
                                            ? null
                                            : 'To nie jest poprawny adres www');
                                    }}
                                    error={websiteError !== null}
                                    helperText={websiteError}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="Zdjęcie"
                                    id="image"
                                    fullWidth
                                    required
                                    variant="outlined"
                                    value={image || ''}
                                    onChange={event => {
                                        const validWebsiteRegex = RegExp(/[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi);
                                        setImage(event.target.value);
                                        setImageError(validWebsiteRegex.test(event.target.value)
                                            ? null
                                            : 'To nie jest poprawny link do zdjęcia');
                                    }}
                                    error={imageError !== null}
                                    helperText={imageError}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={payable}
                                            onChange={event => {
                                                setPayable(event.target.checked);
                                            }}
                                            id="payable"
                                        />
                                    }
                                    label="Boisko płatne"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={reservationRequired}
                                            onChange={event => {
                                                setReservationRequired(event.target.checked);
                                            }}
                                            id="reservation"
                                        />
                                    }
                                    label="Wymagana rezerwacja"
                                />
                            </Grid>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                disabled={!addButtonEnabled}
                                className={classes.add}>
                                Dodaj
                            </Button>
                        </Grid>
                    </form>
                </div>
            </Paper>
        </Container>
    )
}