import React, { Component } from "react";
import friends from "./friends";
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
            <div>
                <div>
                    &nbsp;
                </div>
                <ul>
                    {invitationsList}
                </ul>
            </div>
        );
    }
}