import React from 'react';
import {RegistrationForm} from './forms/login_registration/RegistrationForm';
import {LoginForm} from './forms/login_registration/LoginForm';
import {UserProfile} from './UserProfile';
import './App.css';
import {HashRouter as Router, Route} from 'react-router-dom';
import {Home} from "./Home";
import {Example} from "./forms/new_match/teambuilder/Example";

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
                    <Route path="/example" component={Example}/>
                </div>
            </Router>
        </div>
    );
}

export default App;
