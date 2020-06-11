import React, { useEffect, useState } from "react";
import friends from "./friends";
import { Friend } from "./Friend";
import "./FriendsList.css";
import { API_METHODS, withTokenFetchFromApi } from "../../api/baseFetch";

export const FriendsList = ({ token, logout }) => {
    // constructor(props) {
    //     super(props);

    //     console.log('cons');
    //     console.log(this.props);

    //     this.state = {
    //         searchText: ""
    //         , orderBy: "name"
    //         , order: "ascending"
    //         , acquaitances: this.props.acquaitances
    //     };
    //     console.log(this.props.acquaitances);
    // }

    const [searchText, setSearchText] = useState("");
    const [orderBy, setOrderBy] = useState("name");
    const [order, setOrder] = useState("ascending");
    const [acquaitances, setAcquaitances] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [user, setUser] = useState(null);

    // const handleChange = (field, event) => {
    //     // this.forceUpdate();
    //     setState({ [field]: event.target.value });
    // }

    // render() {
    //     const {
    //         searchText
    //         , orderBy
    //         , order
    //         , acquaitances
    //     } = this.state;

    //     console.log('render test');
    //     console.log(acquaitances);

    const handleAllAcquaitances = (newAllAcquaitances) => {
        console.log('newAllAcquantiances');
        console.log(newAllAcquaitances);
        setAcquaitances(newAllAcquaitances);
        console.log('acuaitances');
        console.log(acquaitances);
    };

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
            'acquaitances?status=accepted',
            setLoading,
            setError,
            handleAllAcquaitances);
    }, [token]);

    const friendsList = acquaitances !== null ? acquaitances
        .filter(friend => user.id && user.id !== friend.requestSender.id ? friend.requestSender.lastName.toLowerCase().includes(searchText.toLowerCase()) : friend.requestReceiver.lastName.toLowerCase().includes(searchText.toLowerCase()))
        .sort((a, b) => a[orderBy] > b[orderBy] ? 1 : 0)
        .map(friend => (
            <Friend
                token={token}
                logout={logout}
                id={user.id && user.id !== friend.requestSender.id ? friend.requestSender.id : friend.requestReceiver.id}
            // key={friend.name}
            />
        )) : null;

    return (
        { friends } === null ? console.log('null ac') : null,
        < div >
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
                {order === "descending" ? friendsList.reverse() : friendsList}
            </ul>
        </div >
    );
}
