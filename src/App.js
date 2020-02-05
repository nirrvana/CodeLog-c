import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
// ? Component
import SignUpPage from './pages/SignUpPage';
import SignIn from './pages/SignIn';
import Tab from './pages/Tab';
// ? CSS
import './components/signup/SignUp.css';

export default class App extends Component {
  render() {
    return (
      <div>
        {/* 항상 보이는 상단 bar = Tab */}
        <h1>
          <Tab></Tab>
        </h1>
        <Router>
          <Switch>
            {/* 해당 경로로 이동하면 설정된 컴포넌트를 보여준다. */}
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
