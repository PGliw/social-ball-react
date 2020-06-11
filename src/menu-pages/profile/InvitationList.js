import React, { useEffect, useState } from "react";
import friends from "./friends";
<<<<<<< HEAD
import Friend from "./Friend";
import { Invitation } from "./Invitation";
import "./FriendsList.css";
import { API_METHODS, withTokenFetchFromApi } from "../../api/baseFetch";

export const InvitationList = ({ token, logout }) => {
    // constructor(props) {
    //     super(props);

    //     this.state = {
    //         searchText: ""
    //         , orderBy: "name"
    //         , order: "ascending"
    //         , ddd: "test"
    //         , acquaitances: this.props.acquaitances
    //     };
    //     console.log(this.props);
    // }

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

    // render() {
    //     const {
    //         searchText
    //         , orderBy
    //         , order
    //         , acquaitances
    //     } = this.state;

    const invitationList = acquaitances !== null ? acquaitances
        .filter(friend => user ? user.id === friend.requestReceiver.id : null)
        .map(friend => (
            <Invitation
                token={token}
                logout={logout}
                id={friend.requestSender.id}
            // key={friend.name}
            />
        )) : null;

    return (
        <div>
=======
import Invitation from "./Invitation";
import "./FriendsList.css";
import { API_METHODS, withTokenFetchFromApi } from "../../api/baseFetch";

export default class InvitationList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            searchText: ""
            , orderBy: "name"
            , order: "ascending"
            , acquaitances: this.props.acquaitances
        };
        console.log(this.props);
    }

    handleChange(field, event) {
        this.setState({ [field]: event.target.value });
    }

    render() {
        const {
            searchText
            , orderBy
            , order
            , acquaitances
        } = this.state;

        const invitationsList = acquaitances
            .filter(friend => friend.requestSenderId.username.toLowerCase().includes(this.state.searchText.toLowerCase()))
            .sort((a, b) => a[orderBy] > b[orderBy] ? 1 : 0)
            .map(friend => (
                friend.status === "pending" ? //zaproszenia - oczekujacy
                    <Invitation
                        name={friend.requestSenderId.firstName + " " + requestSenderId.lastName}
                        picSquare={friend.requestSenderId.image}
                        nickname={friend.requestSenderId.username}
                    // key={friend.name}
                    />
                    : null
            ));

        return (
>>>>>>> development
            <div>
                &nbsp;
                </div>
<<<<<<< HEAD
            <ul>
                {invitationList}
            </ul>
        </div>
    );
=======
                <ul>
                    {invitationsList}
                </ul>
            </div>
        );
    }
>>>>>>> development
}