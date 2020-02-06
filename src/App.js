import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
// * Component
import MainBlogPage from './pages/developer/MainBlogPage';
import SignUpPage from './pages/SignUpPage';
import HomePage from './pages/HomePage';
import SignIn from './pages/SignIn';
import MyPage from './pages/developer/MyPage';
import Resume from './components/mypage/Resume';
import Portfolio from './components/mypage/Portfolio';
import CoverLetter from './components/mypage/CoverLetter';
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
            <Route exact path="/" component={HomePage}></Route>
            <Route path="/SignIn" component={SignIn}></Route>
            <Route path="/SignUp" component={SignUpPage}></Route>
            <Route path="/MyPage" component={MyPage}></Route>
            <Route path="/Resume" component={Resume}></Route>
            <Route path="/CoverLetter" component={CoverLetter}></Route>
            <Route path="/Portfolio" component={Portfolio}></Route>
            <Route path="/PlanePost" component={PlanePost}></Route>
            <Route path="/TILPost" component={TILPost}></Route>
            <Route path="/TechPost" component={TechPost}></Route>
            <Route path="/DevPost" component={DevPost}></Route>
            <Route path="/Blog" component={MainBlogPage}></Route>
            <Redirect to='/'></Redirect>
          </Switch>
        </Router>
      </div>
    );
  }
}
