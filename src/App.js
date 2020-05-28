import React, {Component, useEffect, useState} from 'react';
import {RegistrationForm} from './forms/login_registration/RegistrationForm';
import {LoginForm} from './forms/login_registration/LoginForm';
import {UserProfile} from './menu-pages/profile/UserProfile';
// import './App.css';
import {HashRouter as Router, Route} from 'react-router-dom';
import {Board} from "./menu-pages/board/Board";
import {Stats} from "./menu-pages/stats/Stats";
import MatchForm from "./forms/new_match/MatchForm";

const withTokenAndLogout = (token, logout, RedirectComponent) => ({component: Component, ...rest}) =>
    <Route
        {...rest}
        render={props => (!!token ? <Component {...props} token={token} logout={logout}/> : RedirectComponent(props))}
    />;


function App() {
    const [token, setToken] = useState(null);
    const LoginFormWithToken = (props) => <LoginForm {...props} handleToken={(newToken) => {
        setToken(newToken)
    }}/>;
    const logout = () => setToken(null);

    const PrivateRoute = withTokenAndLogout(token, logout, LoginFormWithToken);

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
