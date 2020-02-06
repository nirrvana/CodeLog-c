import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// * Component
import MainBlogPage from './pages/developer/MainBlogPage';
import SignUpPage from './pages/SignUpPage';
import HomePage from './pages/HomePage';
import SignIn from './pages/SignIn';
// * CSS
import 'antd/dist/antd.css';
import './App.css';

export default class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <Switch>
            <Route
              exact
              path="/"
              component={() => <HomePage></HomePage>}
            ></Route>
            <Route path="/SignIn" component={() => <SignIn></SignIn>}></Route>
            <Route
              path="/SignUp"
              component={() => <SignUpPage></SignUpPage>}
            ></Route>
            <Route
              path="/Blog"
              component={() => <MainBlogPage></MainBlogPage>}
            ></Route>
          </Switch>
        </Router>
      </div>
    );
  }
}
