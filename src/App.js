import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
// * Component

import WriteDevPost from './pages/WriteDevPost';
import Callback from './components/signin/Callback';
import pages from './pages';
import components from './components';

// * CSS
import 'antd/dist/antd.css';
import './pages/Post.css';
import './pages/PostEdit.css';
import './App.css';

export default class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <Switch>
            <Route exact path="/" component={pages.HomePage} />
            <Route path="/WriteDevPost" component={WriteDevPost}></Route>
            <Route path="/SignIn" component={pages.SignIn}></Route>
            <Route path="/SignUp" component={pages.SignUpPage} />
            <Route path="/MyPage" component={pages.developer.MyPage} />
            <Route path="/Blog" component={pages.developer.MainBlogPage} />
            <Route
              path="/DeveloperSignUp"
              component={components.signup.DeveloperSignUp}
            />
            <Route
              path="/CompanySignUp"
              component={components.signup.CompanySignUp}
            />
            <Route
              path="/PartnerSignUp"
              component={components.signup.PartnerSignUp}
            />
            <Route path="/Resume" component={components.mypage.Resume} />
            <Route
              path="/CoverLetter"
              component={components.mypage.CoverLetter}
            />
            <Route path="/Portfolio" component={components.mypage.Portfolio} />
            <Route path="/PlainPost" component={components.post.PlainPost} />
            <Route path="/TILPost" component={components.post.TILPost} />
            <Route path="/TechPost" component={components.post.TechPost} />
            <Route path="/DevPost" component={components.post.DevPost} />
            <Route
              path="/PlainPostEdit"
              component={components.postedit.PlainPostEdit}
            ></Route>
            <Route
              path="/TILPostEdit"
              component={components.postedit.TILPostEdit}
            ></Route>
            <Route
              path="/TechPostEdit"
              component={components.postedit.TechPostEdit}
            ></Route>
            <Route
              path="/DevPostEdit"
              component={components.postedit.DevPostEdit}
            ></Route>
            <Route path="/:Callback" component={Callback}></Route>
            <Redirect to="/"></Redirect>
          </Switch>
        </Router>
      </div>
    );
  }
}
