import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
// * Component
import SignUpPage from './pages/SignUpPage';
import HomePage from './pages/HomePage';
import SignIn from './pages/SignIn';
// * CSS
import './components/signup/SignUp.css';
import './pages/Tab.css';

export default class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <Route path="/" exact component={() => <HomePage></HomePage>}></Route>
          <Switch>
            <Route path="/SignIn" component={() => <SignIn></SignIn>}></Route>
            <Route
              path="/SignUp"
              component={() => <SignUpPage></SignUpPage>}
            ></Route>
          </Switch>
        </Router>
      </div>
    );
  }
}
