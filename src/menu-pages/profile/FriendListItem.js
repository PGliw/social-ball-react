import React, {useEffect, useState} from "react";
import Button from "@material-ui/core/Button";
import makeStyles from "@material-ui/core/styles/makeStyles";
import ProfilePlaceholder from "../../assets/profile-placeholder.png";
import {API_METHODS, withTokenFetchFromApi} from "../../api/baseFetch";
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

export const FriendListItem = ({token, logout, userId}) => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleUser = (newUser) => {
        setUser(newUser);
    };

    useEffect(() => {
        const fetchFromApiWithToken = withTokenFetchFromApi(token);
        fetchFromApiWithToken(
            API_METHODS.GET,
            `users/${userId}`,
            setLoading,
            setError,
            handleUser);
    }, [token]);

    return <li className='friend'>
        <img className="profile-pic" src={user && user.image ? user.image : ProfilePlaceholder}
             alt={user ? user.firstName + " " + user.lastName : 'obrazek usera'}/>
        <h3>{user ? user.firstName + " " + user.lastName : null}</h3>
        <br/>
        <Button
            type="submit"
            variant="outlined"
            color="primary"
            className="button"
            onClick={() => setOpen(true)}
        >
            Zobacz profil
        </Button>
        {withMaterialDialog(OtherUserProfile,
            open, () => setOpen(false), user ? user.firstName + " " + user.lastName : null
        )({
                token: token,
                user: user,
                userId: userId
            }
        )}
    </li>
};
