import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// * Component
import MainBlogPage from './pages/developer/MainBlogPage';
import SignUpPage from './pages/SignUpPage';
import HomePage from './pages/HomePage';
import SignIn from './pages/SignIn';
import PlanePost from './components/post/PlanePost';
import TILPost from './components/post/TILPost';
import TechPost from './components/post/TechPost';
import DevPost from './components/post/DevPost';

// * CSS
import 'antd/dist/antd.css';
import './pages/Post.css';
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

              path="/PlanePost"
              component={() => <PlanePost></PlanePost>}
            ></Route>
            <Route
              path="/TILPost"
              component={() => <TILPost></TILPost>}
            ></Route>
            <Route
              path="/TechPost"
              component={() => <TechPost></TechPost>}
            ></Route>
            <Route
              path="/DevPost"
              component={() => <DevPost></DevPost>}
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
