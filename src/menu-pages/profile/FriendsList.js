import React, {useEffect, useState} from "react";

import "./FriendsList.css";
import {API_METHODS, withTokenFetchFromApi} from "../../api/baseFetch";
import {FriendListItem} from "./FriendListItem";

export const FriendsList = ({token, user, logout, refresher}) => {

        const [searchText, setSearchText] = useState("");
        const [orderBy, setOrderBy] = useState("name");
        const [order, setOrder] = useState("ascending");
        const [acquaitances, setAcquaitances] = useState([]);
        const [loading, setLoading] = useState(false);
        const [error, setError] = useState(null);

        const handleAllAcquaitances = (newAllAcquaitances) => {
            setAcquaitances(newAllAcquaitances);
        };

        useEffect(() => {
            const fetchFromApiWithToken = withTokenFetchFromApi(token);
            fetchFromApiWithToken(
                API_METHODS.GET,
                'acquaitances?status=accepted',
                setLoading,
                setError,
                handleAllAcquaitances);
        }, [token, refresher]);

        const mapAcquitancesToFriendsList = (acqs) => {
            const predicate = (friend) => {
                if (!friend || !friend.requestReceiver || !friend.requestSender) {
                    return false;
                }
                return user && user.id && user.id !== friend.requestSender.id
                    ? friend.requestSender.firstName.toLowerCase().includes(searchText.toLowerCase())
                    : friend.requestReceiver.firstName.toLowerCase().includes(searchText.toLowerCase());
            };
            return !!acqs ? acqs
                .filter(predicate)
                .sort((a, b) => a[orderBy] > b[orderBy] ? 1 : 0)
                .map(friend => (
                    <FriendListItem
                        token={token}
                        logout={logout}
                        userId={user && user.id && user.id !== friend.requestSender.id ? friend.requestSender.id : friend.requestReceiver.id}
                    />
                )) : null
        };

        return (
            < div>
                <form className="form-inline searchForm" role="form">
                    <div className="form-group">

                        <input
                            className="form-control"
                            onChange={event => setSearchText(event.target.value)}
                            placeholder="Szukaj znajomych"
                            value={searchText}
                        />

                        <select
                            className="input-medium"
                            onChange={event => setOrderBy(event.target.value)}
                            value={orderBy}
                        >
                            <option value="name">Według imienia</option>
                        </select>

                        <select
                            className="input-medium"
                            onChange={event => setOrder(event.target.value)}
                            value={order}
                        >
                            <option value="descending">Malejąco</option>
                            <option value="ascending">Rosnąco</option>
                        </select>

                    </div>
                </form>

                <div>
                    &nbsp;
                </div>
                <ul>
                    {order === "descending" ?
                        mapAcquitancesToFriendsList(acquaitances).reverse()
                        : mapAcquitancesToFriendsList(acquaitances)}
                </ul>
            </div>
        );
    }
;
