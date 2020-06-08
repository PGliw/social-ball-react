import React, { Component } from "react";
import friends from "./friends";
import Friend from "./Friend";
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
            , ddd: "test"
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

        const friendsList = friends
            .filter(friend => friend.name.toLowerCase().includes(this.state.searchText.toLowerCase()))
            .sort((a, b) => a[orderBy] > b[orderBy] ? 1 : 0)
            .map(friend => (
                <Invitation
                    name={friend.name}
                    picSquare={friend.pic_square}
                    friendCount={friend.friend_count}
                    nickname={friend.nickname}
                // key={friend.name}
                />
            ));

        return (
            <div>
                <div>
                    &nbsp;
                </div>
                <ul>
                    {friendsList}
                </ul>
            </div>
        );
    }
}