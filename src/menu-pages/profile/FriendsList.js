import React, { Component } from "react";
import friends from "./friends";
import Friend from "./Friend";
import "./FriendsList.css";
import { API_METHODS, withTokenFetchFromApi } from "../../api/baseFetch";

export default class FriendsList extends Component {
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

        const friendsList = acquaitances
            .filter(friend => friend.requestSender.username.toLowerCase().includes(this.state.searchText.toLowerCase()))
            .sort((a, b) => a[orderBy] > b[orderBy] ? 1 : 0)
            .map(friend => (
                friend.status === "accepted" ? //znajomi - zaakceptowani
                    <Friend
                        name={friend.requestSender.firstName + " " + friend.requestSender.lastName}
                        picSquare={friend.requestSender.image}
                        nickname={friend.requestSender.username}
                        added={true}
                        id={friend.requestSender.id}
                    // key={friend.name}
                    />
                    : null
            ));

        return (
            <div>
                <form className="form-inline searchForm" role="form">
                    <div className="form-group">

                        <input
                            className="form-control"
                            onChange={event => this.handleChange("searchText", event)}
                            placeholder="Szukaj znajomych"
                            value={searchText}
                        />

                        <select
                            className="input-medium"
                            onChange={event => this.handleChange("orderBy", event)}
                            value={orderBy}
                        >
                            <option value="name">Według imienia</option>
                        </select>

                        <select
                            className="input-medium"
                            onChange={event => this.handleChange("order", event)}
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
            </div>
        );
    }
}