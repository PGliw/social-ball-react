import React from "react";
import {Link} from "react-router-dom";
import './RegistrationForm.css'

export class RegistrationForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fields: {
                hasAccepted: false
            },
            errors: {},
            isSubmitButtonEnabled: false
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

    onSubmit = () => {
        alert("Cześć "+this.state.fields.firstName);
    }; // placeholder - will be removed by api call

    render() {
        return (
            <div className="registration-card">
                <h1>Rejestracja</h1>
                <form onSubmit={this.onSubmit}>
                    <label>
                        Imię
                        <input
                            type="text"
                            name="firstName"
                            value={this.state.fields.firstName || ''} // initially undefined
                            onChange={this.handleInputChange}
                        />
                        {this.renderErrorMessage(this.state.errors.firstName)}
                    </label>
                    <label>
                        Nazwisko
                        <input
                            type="text"
                            name="lastName"
                            value={this.state.fields.lastName || ''}
                            onChange={this.handleInputChange}
                        />
                        {this.renderErrorMessage(this.state.errors.lastName)}
                    </label>
                    <label>
                        Data urodzenia
                        <input
                            type="date"
                            name="birthday"
                            value={this.state.fields.birthday || ''}
                            onChange={this.handleInputChange}
                        />
                        {this.renderErrorMessage(this.state.errors.birthday)}
                    </label>
                    <label>
                        Adres e-mail
                        <input
                            type="email"
                            name="email"
                            value={this.state.fields.email || ''}
                            onChange={this.handleInputChange}
                        />
                        {this.renderErrorMessage(this.state.errors.email)}
                    </label>
                    <label>
                        Hasło
                        <input
                            type="password"
                            name="password"
                            value={this.state.fields.password || ''}
                            onChange={this.handleInputChange}
                        />
                        {this.renderErrorMessage(this.state.errors.password)}
                    </label>
                    <label>
                        Powtórz hasło
                        <input
                            type="password"
                            name="replyPassword"
                            value={this.state.fields.replyPassword || ''}
                            onChange={this.handleInputChange}
                        />
                        {this.renderErrorMessage(this.state.errors.replyPassword)}
                    </label>
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
