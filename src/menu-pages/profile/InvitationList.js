import React, { useEffect, useState } from "react";
import friends from "./friends";
import Friend from "./Friend";
import { Invitation } from "./Invitation";
import "./FriendsList.css";
import { API_METHODS, withTokenFetchFromApi } from "../../api/baseFetch";

export const InvitationList = ({ token, logout }) => {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [user, setUser] = useState(null);
    const [acquaitances, setAcquaitances] = useState([]);

    useEffect(() => {
        const fetchFromApiWithToken = withTokenFetchFromApi(token);
        fetchFromApiWithToken(
            API_METHODS.GET,
            'profile',
            setLoading,
            setError,
            setUser);
    }, [token]);

    useEffect(() => {
        const fetchFromApiWithToken = withTokenFetchFromApi(token);
        fetchFromApiWithToken(
            API_METHODS.GET,
            'acquaitances?status=pending',
            setLoading,
            setError,
            setAcquaitances);
    }, [token]);

    const invitationList = acquaitances !== null ? acquaitances
        .filter(friend => user ? user.id === friend.requestReceiver.id : null)
        .map(friend => (
            <Invitation
                token={token}
                logout={logout}
                id={friend.requestSender.id}
            />
        )) : null;

    return (
        <div>
            <div>
                &nbsp;
                </div>
            <ul>
                {invitationList}
            </ul>
        </div>
    );
}