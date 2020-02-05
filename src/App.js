import React, { Component } from 'react';
import { connect } from 'react-redux';
import SignIn from './pages/SignIn';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

class App extends Component {
  render() {
    const { token } = this.props;
    console.log(1004, token)
    if (!token) {
      return (
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={SignIn} />
            <Redirect to="/" />
          </Switch>
        </BrowserRouter>
      );
    } else {
      return (
        <div>hello</div>
      )
    }
  }
}

const mapStateToProps = state => ({ 
  token: state.session.token,
});

export default connect(mapStateToProps)(App);
