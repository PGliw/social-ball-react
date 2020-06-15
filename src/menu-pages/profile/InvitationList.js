import React, {useEffect, useState} from "react";
import {Invitation} from "./Invitation";
import "./FriendsList.css";
import {API_METHODS, withTokenFetchFromApi} from "../../api/baseFetch";

export const InvitationList = ({token, user, logout, onFriendsChange}) => {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [acquaitances, setAcquaitances] = useState([]);


    useEffect(() => {
        const fetchFromApiWithToken = withTokenFetchFromApi(token);
        fetchFromApiWithToken(
            API_METHODS.GET,
            'acquaitances?status=pending',
            setLoading,
            setError,
            setAcquaitances);
    }, [token]);


    const renderInvitations = (acquaitances) => {
        return acquaitances !== null ? acquaitances
            .filter(friend => user ? user.id === friend.requestReceiver.id : null)
            .map(friend => (
                <Invitation
                    token={token}
                    logout={logout}
                    userId={friend.requestSender.id}
                    onFriendsChange={onFriendsChange}
                />
            )) : null;
    };

    return (
        <div>
            <div>
                &nbsp;
            </div>
            <ul>
                {renderInvitations(acquaitances)}
            </ul>
        </div>
    );
};
