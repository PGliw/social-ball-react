import React from "react";
import { Link } from "react-router-dom";
import "./LoginForm.css";

export class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fields: {},
            errors: {},
            isSubmitButtonEnabled: false,
        };
    }

    handleInputChange = (event) => {
        const fields = this.state.fields;
        const target = event.target;
        const name = target.name;
        const value = name === "keepLoggedIn" ? target.checked : target.value;
        fields[name] = value;

        const errors = this.state.errors;
        switch (name) {
            case "login":
                const validEmailRegex = RegExp(
                    /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i
                );
                errors.login = validEmailRegex.test(value)
                    ? null
                    : "To nie jest poprawny adres email";
                break;
            case "password":
                errors.password =
                    value.length < 8
                        ? "Hasło musi mieć przynajmniej 8 znaków"
                        : null;
                break;
            default:
                break;
        }
        this.setState({
            fields: fields,
            errors: errors,
            isSubmitButtonEnabled:
                errors.login === null && errors.password === null,
        });
    };

    renderErrorMessage = (message) =>
        !message ? null : <div className="error-message">{message}</div>;

    onSubmit = () => {
        alert("Cześć " + this.state.fields.login);
    }; // placeholder - will be removed by api call

    render() {
        return (
            <div className="registration-card">
                <h1>Logowanie</h1>
                <form onSubmit={this.onSubmit}>
                    <label>
                        Adres e-mail
                        <input
                            type="email"
                            name="login"
                            value={this.state.fields.login || ""}
                            onChange={this.handleInputChange}
                        />
                        {this.renderErrorMessage(this.state.errors.login)}
                    </label>
                    <label>
                        Hasło
                        <input
                            type="password"
                            name="password"
                            value={this.state.fields.password || ""}
                            onChange={this.handleInputChange}
                        />
                        {this.renderErrorMessage(this.state.errors.password)}
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="keepLoggedIn"
                            checked={this.state.fields.keepLoggedIn}
                            onChange={this.handleInputChange}
                        />
                        Nie wylogowuj mnie
                    </label>
                    <input
                        type="submit"
                        value="Zaloguj się"
                        disabled={!this.state.isSubmitButtonEnabled}
                    />
                    <p>
                        Nie masz konta? <Link to="/register">Zarejestruj się!</Link>
                    </p>
                </form>
            </div>
        );
    }
}
