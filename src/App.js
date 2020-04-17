import React from 'react';
import {RegistrationForm} from './forms/RegistrationForm';
import {LoginForm} from './forms/LoginForm';
import {UserProfile} from './UserProfile';
import './App.css';
import {NavDrawerTest} from './NavDrawerTest';
import {HashRouter as Router, Route} from 'react-router-dom';
import {Home} from "./home/Home";

function App() {
    return (
        <div className="App">
            <Router>
                <div className="container">
                    <Route exact path="/" component={LoginForm}/>
                    <Route path="/login" component={LoginForm}/>
                    <Route path="/register" component={RegistrationForm}/>
                    <Route path="/home" component={Home}/>
                    <Route path="/profile" component={UserProfile}/>
                </div>
            </Router>
        </div>
    );
}

export default App;
