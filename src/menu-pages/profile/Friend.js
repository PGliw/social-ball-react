import React, { useState } from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import UserDialog from "./UserDialog";
import makeStyles from "@material-ui/core/styles/makeStyles";
import DialogContent from "@material-ui/core/DialogContent";
import Dialog from "@material-ui/core/Dialog";
import { Box, Link } from "@material-ui/core";
import ProfilePlaceholder from "../../assets/profile-placeholder.png";
import RoundedImage from "react-rounded-image";
import { API_METHODS, withTokenFetchFromApi } from "../../api/baseFetch";

const useStyles = makeStyles((theme) => ({
    box: {
        padding: theme.spacing(1),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    button: {
        width: '75%',
        margin: theme.spacing(0, 2, 2),
    }
}));

export default function Friend(props) {
    const classes = useStyles();

    const [open, setOpen] = useState(false);
    const [statistics, setStatistics] = useState(null);
    const [favoritePosition, setFavoritePosition] = useState(null);
    const [user, setUser] = useState(null);

    const onDialogClose = () => setOpen(false);

    useEffect(() => {
        const fetchFromApiWithToken = withTokenFetchFromApi(token);
        fetchFromApiWithToken(
            API_METHODS.GET,
            `profile/${id}`,
            setLoading,
            setError,
            setUser);
    }, [token]);

    useEffect(() => {   //positions
        const fetchFromApiWithToken = withTokenFetchFromApi(token);
        fetchFromApiWithToken(
            API_METHODS.GET,
            `favouritePositions/${id}`,
            setLoading,
            setError,
            setFavoritePosition);
    }, [token]);

    useEffect(() => {   //statistics
        const fetchFromApiWithToken = withTokenFetchFromApi(token);
        fetchFromApiWithToken(
            API_METHODS.GET,
            `statistics/${id}`,
            setLoading,
            setError,
            setStatistics
        );
    }, [token]);

    return (
        <li className='friend'>
            <img className="profile-pic" src={props.picSquare} />

            <h3>{props.name}</h3>

            <div className="nickname">
                Nickname: {props.nickname}
            </div>
            <br></br>

            <Button
                type="submit"
                variant="contained"
                color="primary"
                className="button"
                onClick={() => { setOpen(true); }}
            >
                Zobacz profil
                            </Button>
            <Dialog
                open={open}
                onClose={onDialogClose}>
                <DialogContent >
                    <Box className={classes.box}>
                        <RoundedImage className={classes.image} image={ProfilePlaceholder}
                            roundedColor="#e6e6e6"
                            roundedSize="13"
                            imageWidth="160"
                            imageHeight="160"
                        />
                        <h2>{user ? user.firstName + " " + user.lastName : null}</h2>
                        <p className={classes.positions}>{favoritePosition ? favoritePosition.PositionResponse.side + " " + favoritePosition.PositionResponse.name : null}</p>
                        <p>
                            {statistics ? statistics.matchesPlayed + " " + statistics.hoursPlayed + " " + statistics.goalsScored : null}
                        </p>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            disabled={added}
                            className={classes.button}>
                            Wyślij zaproszenie do znajomych
                            </Button>
                    </Box>
                </DialogContent>
            </Dialog>
        </li>
    );
}

Friend.propTypes = {
    name: PropTypes.string.isRequired
    , picSquare: PropTypes.string.isRequired
    , nickname: PropTypes.string.isRequired
    , added: PropTypes.bool.isRequired
    , id: PropTypes.string.isRequired
};