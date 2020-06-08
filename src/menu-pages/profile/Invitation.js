import React from "react";
import PropTypes from "prop-types";
import { Button } from "@material-ui/core";

export default function Invitation(props) {
    return (
        <li className='friend'>
            <img className="profile-pic" src={props.picSquare} />

            <h3>{props.name}</h3>

            <div className="nickname">
                Nickname: {props.nickname}
            </div>

            <div className="status">
                <Button variant="outlined" color="primary" >
                    Akceptuj
                </Button>
                &nbsp;
                <Button variant="outlined" color="primary" >
                    Odrzuć
                </Button>
            </div>
        </li>
    );
}

Invitation.propTypes = {
    name: PropTypes.string.isRequired
    , picSquare: PropTypes.string.isRequired
    , nickname: PropTypes.string.isRequired
};