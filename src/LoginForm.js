import React from "react";
import {Link} from "react-router-dom";
import "./LoginForm.css";

export class LoginForm extends React.Component {
    render() {
        return (
            <div>
                <p>Tutaj będzie formularz logowania!</p>
                <Link to="/register">Zarejestruj się</Link>
            </div>
        );
    }
}
