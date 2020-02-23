import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import { getSessionData } from '../src/redux/api';
import { signin } from '../src/redux/action';
// * Component
import WriteDevPost from './pages/WriteDevPost';
import WritePlainPost from './pages/WritePlainPost';
import WriteTechPost from './pages/WriteTechPost';
import WriteTILPost from './pages/WriteTILPost';
import DeveloperSignIn from './components/signin/DeveloperSignIn';
import CompanySignIn from './components/company/CompanySignIn';
import Callback from './components/signin/Callback';
import SignOut from './components/signout/SignOut';
import pages from './pages';
import components from './components';

// * CSS
import './css/css';
import 'antd/dist/antd.css';
class App extends Component {
  state = {
    token: false,
  };

  componentDidMount() {
    this.checkSessionData();
  }

  checkSessionData = () => {
    getSessionData()
      .then(({ data: { token } }) => {
        if (token) {
          this.props.handleSignin();
        }
      })
      .catch((err) => console.log('Error occurred while login..'));
  };

  render() {
    return (
      <div>
        <Router>
          <Switch>
            <Route exact path="/" component={pages.HomePage} />
            <Route path="/writedevpost" component={WriteDevPost}></Route>
            <Route path="/writeplainpost" component={WritePlainPost}></Route>
            <Route path="/writetechpost" component={WriteTechPost}></Route>
            <Route path="/writetilpost" component={WriteTILPost}></Route>
            <Route path="/signout" component={SignOut}></Route>
            <Route path="/signin" component={pages.SignIn}></Route>
            <Route path="/developersignin" component={DeveloperSignIn}></Route>
            <Route path="/companysignin" component={CompanySignIn}></Route>
            <Route path="/signup" component={pages.SignUpPage} />
            <Route path="/mypage" component={pages.developer.MyPage} />
            <Route
              path="/companymypage"
              component={pages.company.CompanyMyPagePage}
            />
            <Route
              path="/companyedit"
              component={components.company.CompanyMyPageEdit}
            />
            <Route path="/blog" component={pages.developer.MainBlogPage} />
            <Route
              path="/developersignup"
              component={components.signup.DeveloperSignUp}
            />
            <Route
              path="/companysignup"
              component={components.signup.CompanySignUp}
            />
            <Route path="/plainpost" component={components.post.PlainPost} />
            <Route path="/tilpost" component={components.post.TILPost} />
            <Route path="/techpost" component={components.post.TechPost} />
            <Route path="/devpost" component={components.post.DevPost} />
            <Route
              path="/plainpostedit"
              component={components.postedit.PlainPostEdit}
            ></Route>
            <Route
              path="/tilpostedit"
              component={components.postedit.TILPostEdit}
            ></Route>
            <Route
              path="/techpostedit"
              component={components.postedit.TechPostEdit}
            ></Route>
            <Route
              path="/devpostedit"
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
const mapStateToProps = (state) => ({
  isLogin: state.session.isLogin,
});

const mapDispatchToProps = (dispatch) => ({
  handleSignin: () => {
    dispatch(signin());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
