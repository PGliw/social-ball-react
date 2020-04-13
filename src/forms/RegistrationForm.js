import React from "react";
import {Link, Redirect} from "react-router-dom";
import './CommonForm.css'
import {FormInput} from "./FormInput";
import {SERVER_URL} from "../config";

export class RegistrationForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fields: {
                hasAccepted: false
            },
            errors: {},
            isSubmitButtonEnabled: false,
            isRegistrationSuccessful: false
        }
    }

    handleInputChange = (event) => {
        const fields = this.state.fields;
        const target = event.target;
        const name = target.name;
        const value = name === "hasAccepted" ? target.checked : target.value;
        fields[name] = value;

        const errors = this.state.errors;
        switch (name) {
            case 'firstName':
                errors.firstName =
                    value.length < 1
                        ? 'Imię nie moze być puste!'
                        : null;
                break;
            case 'lastName':
                errors.lastName =
                    value.length < 1
                        ? 'Nazwisko nie może być puste!'
                        : null;
                break;
            case 'email':
                const validEmailRegex =
                    RegExp(/^(([^<>()\\[\]\\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);
                errors.email =
                    validEmailRegex.test(value)
                        ? null
                        : 'To nie jest poprawny adres email';
                break;
            case 'birthday':
                const dateEntry = new Date(value);
                const date13yearsAgo = new Date();
                date13yearsAgo.setFullYear(date13yearsAgo.getFullYear() - 13);
                errors.birthday =
                    dateEntry < date13yearsAgo
                        ? null
                        : 'Żeby samodzielnie się zarejestrować musisz mieć ukończone 13 lat';
                break;
            case 'password':
                errors.password =
                    value.length < 8
                        ? 'Hasło musi mieć przynajmniej 8 znaków'
                        : null;
                break;
            case 'replyPassword':
                errors.replyPassword =
                    value === fields.password ? null : 'Hasła muszą być identyczne';
                break;
            case 'hasAccepted':
                errors.hasAccepted =
                    value ? null : 'Zgoda jest wymagana';
                break;
            default:
                break;
        }
        this.setState(
            {
                fields: fields,
                errors: errors,
                isSubmitButtonEnabled:
                    errors.firstName === null
                    && errors.lastName === null
                    && errors.email === null
                    && errors.password === null
                    && errors.birthday === null
                    && errors.replyPassword === null
                    && errors.hasAccepted === null
            });
    };

    renderErrorMessage = (message) => !message ? null : (<div className="error-message">{message}</div>);

    onSubmit = (e) => {
        e.preventDefault();
        const fields = this.state.fields;
        fetch(`${SERVER_URL}/users`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: Math.floor((1000) * Math.random()), // TODO replace
                firstName: fields.firstName,
                lastName: fields.lastName,
                dateOfBirth: new Date(fields.birthday).toISOString().split('T')[0],
                password: fields.password,
                email: fields.email,
                username: fields.email
            })
        }).then((response) => {
            if (response.status === 200) {
                this.setState({
                    isRegistrationSuccessful: true
                })
            }
            return response.json();
        }).then((data => {
            if (data.message) {
                alert(data.message)
            }
        }))
    };

    render() {
        if (this.state.isRegistrationSuccessful === true) {
            return <Redirect to='/login'/>
        } else return (
            <div className="registration-card">
                <h1>Rejestracja</h1>
                <form onSubmit={this.onSubmit}>
                    <FormInput
                        label="Imię"
                        name="firstName"
                        type="text"
                        value={this.state.fields.firstName || ''}
                        onChange={this.handleInputChange}
                        error={this.state.errors.firstName}
                    />
                    <FormInput
                        label="Nazwisko"
                        name="lastName"
                        type="text"
                        value={this.state.fields.lastName || ''}
                        onChange={this.handleInputChange}
                        error={this.state.errors.lastName}
                    />
                    <FormInput
                        label="Data urodzenia"
                        name="birthday"
                        type="date"
                        value={this.state.fields.birthday || ''}
                        onChange={this.handleInputChange}
                        error={this.state.errors.birthday}
                    />
                    <FormInput
                        label="Adres e-mail"
                        name="email"
                        type="email"
                        value={this.state.fields.email || ''}
                        onChange={this.handleInputChange}
                        error={this.state.errors.email}
                    />
                    <FormInput
                        label="Hasło"
                        name="password"
                        type="password"
                        value={this.state.fields.password || ''}
                        onChange={this.handleInputChange}
                        error={this.state.errors.password}
                    />
                    <FormInput
                        label="Powtórz hasło"
                        name="replyPassword"
                        type="replyPassword"
                        value={this.state.fields.replyPassword || ''}
                        onChange={this.handleInputChange}
                        error={this.state.errors.replyPassword}
                    />
                    <label>
                        <input
                            type="checkbox"
                            name="hasAccepted"
                            checked={this.state.fields.hasAccepted}
                            onChange={this.handleInputChange}
                        />
                        Akceptuję warunki regulaminu (wymagane)
                        {this.renderErrorMessage(this.state.errors.hasAccepted)}
                    </label>
                    <input type="submit" value="Zarejestruj się" disabled={!this.state.isSubmitButtonEnabled}/>
                    <p>Masz już konto? <Link to="/">Przejdź do logowania</Link></p>
                </form>
            </div>
        );
    }
}
