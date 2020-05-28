import React, { Component } from "react";
import friends from "./friends";
import Friend from "./Friend";
import "./FriendsList.css";

export default class FriendsList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            searchText: ""
            , orderBy: "name"
            , order: "ascending"
        };
    }

    handleChange(field, event) {
        this.setState({ [field]: event.target.value });
    }

    render() {
        const {
            searchText
            , orderBy
            , order
        } = this.state;

        const friendsList = friends
            .filter(friend => friend.name.toLowerCase().includes(this.state.searchText.toLowerCase()))
            .sort((a, b) => a[orderBy] > b[orderBy] ? 1 : 0)
            .map(friend => (
                <Friend
                    name={friend.name}
                    picSquare={friend.pic_square}
                    friendCount={friend.friend_count}
                    nickname={friend.nickname}
                    key={friend.name}
                />
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