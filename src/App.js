import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
// * Component


import DevPostEdit from './components/postedit/DevPostEdit';
import PlanePostEdit from './components/postedit/PlanePostEdit';
import TILPostEdit from './components/postedit/TILPostEdit';
import TechPostEdit from './components/postedit/TechPostEdit';

import pages from './pages';
import components from './components';

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

            <Route exact path="/" component={pages.HomePage} />
            <Route path="/SignIn" component={pages.SignIn} />
            <Route path="/SignUp" component={pages.SignUpPage} />
            <Route path="/MyPage" component={pages.developer.MyPage} />
            <Route path="/Blog" component={pages.developer.MainBlogPage} />
            <Route path="/Resume" component={components.mypage.Resume} />
            <Route path="/CoverLetter" component={components.mypage.CoverLetter} />
            <Route path="/Portfolio" component={components.mypage.Portfolio} />
            <Route path="/PlanePost" component={components.post.PlanePost} />
            <Route path="/TILPost" component={components.post.TILPost} />
            <Route path="/TechPost" component={components.post.TechPost} />
            <Route path="/DevPost" component={components.post.DevPost} />
            <Route path="/PlanePostEdit" component={PlanePostEdit}></Route>
            <Route path="/TILPostEdit" component={TILPostEdit}></Route>
            <Route path="/TechPostEdit" component={TechPostEdit}></Route>
            <Route path="/DevPostEdit" component={DevPostEdit}></Route>

            <Redirect to="/"></Redirect>
          </Switch>
        </Router>
      </div>
    );
  }
}
