import React from "react";
import PropTypes from "prop-types";

export default function Friend(props) {
    return (
        <li className='friend'>
            <img className="profile-pic" src={props.picSquare} />

            <h3>{props.name}</h3>

            <div className="nickname">
                Nickname: {props.nickname}
            </div>

            <div className="status">
                Button
            </div>

            <div className="num-friends">
                Friends: {props.friendCount}
            </div>
        </li>
    );
}

Friend.propTypes = {
    name: PropTypes.string.isRequired
    , picSquare: PropTypes.string.isRequired
    , nickname: PropTypes.string.isRequired
    , friendCount: PropTypes.number
};