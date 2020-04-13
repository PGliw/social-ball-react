import React from "react";
import {Link, Redirect} from "react-router-dom";
import "./CommonForm.css";
import "./FormInput"
import {FormInput} from "./FormInput";
import {SERVER_URL} from "../config";

export class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fields: {
                keepLoggedIn: false
            },
            errors: {},
            isSubmitButtonEnabled: false,
            isLoginSuccessful: false
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
            case "email":
                const validEmailRegex = RegExp(
                    /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i
                );
                errors.email = validEmailRegex.test(value)
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
                errors.email === null && errors.password === null,
        });
    };

    onSubmit = (e) => {
        e.preventDefault();
        fetch(`${SERVER_URL}/token/generate-token`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.state.fields)
        }).then((response) => {
            if (response.status === 200) {
                this.setState({
                    isLoginSuccessful: true
                });
            }
            console.log(response.status);
            return response.json();
        }).then((data => {
            if (data.message) {
                alert(data.message);
            }
        }))
    };

    render() {
        if (this.state.isLoginSuccessful === true) {
            return <Redirect to='/home'/>
        } else return (
            <div className="registration-card">
                <h1>Logowanie</h1>
                <form onSubmit={this.onSubmit}>
                    <FormInput
                        label="Adres e-mail"
                        type="email"
                        name="email"
                        value={this.state.fields.email || ""}
                        onChange={this.handleInputChange}
                        error={this.state.errors.email}
                    />
                    <FormInput
                        label="Hasło"
                        type="password"
                        name="password"
                        value={this.state.fields.password || ""}
                        onChange={this.handleInputChange}
                        error={this.state.errors.password}
                    />
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
