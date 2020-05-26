import React, {Component, useEffect, useState} from 'react';
import {RegistrationForm} from './forms/login_registration/RegistrationForm';
import {LoginForm} from './forms/login_registration/LoginForm';
import {UserProfile} from './UserProfile';
// import './App.css';
import {HashRouter as Router, Route} from 'react-router-dom';
import {Board} from "./Board";
import {Stats} from "./Stats";
import MatchForm from "./MatchForm";

const withToken = (token, RedirectComponent) => {
    return ({component: Component, ...rest}) =>
        <Route
            {...rest}
            render={props => (!!token ? <Component {...props} token={token}/> : RedirectComponent(props))}
        />
};


function App() {
    const [token, setToken] = useState(null);
    const LoginFormWithToken = (props) => <LoginForm {...props} handleToken={(newToken) => {
        setToken(newToken)
    }}/>;

    const PrivateRoute = withToken(token, LoginFormWithToken);

    return (
        <div className="App">
            <Router>
                <div className="container">
                    <Route exact path="/" render={LoginFormWithToken}/>
                    <Route path="/login" render={LoginFormWithToken}/>
                    <Route path="/register" component={RegistrationForm}/>
                    <PrivateRoute path="/profile" component={UserProfile}/>
                    <PrivateRoute path="/board" component={Board}/>
                    <PrivateRoute path="/stats" component={Stats}/>
                    <PrivateRoute path="/new-match" component={MatchForm}/>
                </div>
            </Router>
        </div>
    );
}

export default App;
