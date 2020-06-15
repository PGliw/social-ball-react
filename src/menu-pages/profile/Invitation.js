import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import {Box, Button} from "@material-ui/core";
import {API_METHODS, withTokenFetchFromApi} from "../../api/baseFetch";
import makeStyles from "@material-ui/core/styles/makeStyles";
import ProfilePlaceholder from "../../assets/profile-placeholder.png";
import RoundedImage from "react-rounded-image";
import DialogContent from "@material-ui/core/DialogContent";
import Dialog from "@material-ui/core/Dialog";
import {withMaterialDialog} from "../../hoc/withMaterialDialog";
import {OtherUserProfile} from "./OtherUserProfile";

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

export const Invitation = ({token, logout, userId}) => {
    const classes = useStyles();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [open, setOpen] = useState(false);
    const [requestDone, setRequestDone] = useState(false);
    const [header, setHeader] = useState("");

    const onDialogClose = () => setOpen(false);

    useEffect(() => {
        const fetchFromApiWithToken = withTokenFetchFromApi(token);
        fetchFromApiWithToken(
            API_METHODS.GET,
            `users/${userId}`,
            setLoading,
            setError,
            setUser);
    }, [token]);

    const acceptRequest = () => {
        const fetchFromApiWithToken = withTokenFetchFromApi(token);
        fetchFromApiWithToken(
            API_METHODS.PUT,
            `acquaitances/accept?senderId=${userId}`,
            setLoading,
            setError,
            () => {
                setHeader("✅ Dodano");
                setRequestDone(true);
            }
        );
    };

    const denyRequest = () => {
        const fetchFromApiWithToken = withTokenFetchFromApi(token);
        fetchFromApiWithToken(
            API_METHODS.PUT,
            `acquaitances/reject?senderId=${userId}`,
            setLoading,
            setError,
            () => {
                setRequestDone(true);
                setHeader("❌ Odrzucono");
            });
    };

    return (
        <li className='friend'>
            <img className="profile-pic" src={user && user.image ? user.image : ProfilePlaceholder}/>
            <h3>{user ? user.firstName + " " + user.lastName : null}</h3>
            <br/>
            <div className="status">
                <Button variant="outlined" color="primary" disabled={requestDone}
                        onClick={() => {
                            acceptRequest();
                        }}>
                    Akceptuj
                </Button>
                &nbsp;
                <Button variant="outlined" color="primary" disabled={requestDone}
                        onClick={() => {
                            denyRequest();
                        }}>
                    Odrzuć
                </Button>
                &nbsp;
                <Button
                    type="submit"
                    variant="outlined"
                    color="primary"
                    className="button"
                    onClick={() => {
                        setOpen(true);
                    }}
                >
                    Zobacz profil
                </Button>
                <h2>{header}</h2>

            </div>
            {
                withMaterialDialog(OtherUserProfile, open, onDialogClose, user ? user.firstName + " " + user.lastName : null)({
                    token: token,
                    user: user,
                    userId: userId
                })
            }
        </li>
    );
};

Invitation.propTypes = {
    name: PropTypes.string.isRequired
    , picSquare: PropTypes.string.isRequired
    , nickname: PropTypes.string.isRequired
};
