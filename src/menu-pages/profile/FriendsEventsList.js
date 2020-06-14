import React, { useEffect, useState } from "react";
import { Event } from "./Event";
import "./FriendsList.css";
import { API_METHODS, withTokenFetchFromApi } from "../../api/baseFetch";

export const FriendsEventsList = ({ token }) => {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const fetchFromApiWithToken = withTokenFetchFromApi(token);
        fetchFromApiWithToken(
            API_METHODS.GET,
            'events?forAcquaitance=true',
            setLoading,
            setError,
            setEvents);
    }, [token]);

    const eventsList = events ? events
        .map(event => (
            <Event
                token={token}
                eventId={event.id}
            />
        )) : 'brak wydarzeń';

    return (
        <div>
            <div>
                &nbsp;
                </div>
            <ul>
                {eventsList}
            </ul>
        </div>
    );
}