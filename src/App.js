import React from 'react';
import {RegistrationForm} from './RegistrationForm';
import {LoginForm} from './LoginForm';
import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom';

function App() {
    return (
        <div className="App">
            <Router>
                <div className="container">
                    <Route exact path="/" component={LoginForm}/>
                    <Route path="/register" component={RegistrationForm}/>
                </div>
            </Router>
        </div>
    );
}

export default App;
