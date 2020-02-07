import React, { Component } from 'react';
import { connect } from 'react-redux';
//# redux
import { mypage } from '../../redux/action';
import { getMyPageData } from '../../redux/api';
//# component
import Tab from '../../components/mypage/Tab';
import PostTagCount from '../../components/mypage/PostTagCount';
import UserInfo from '../../components/mypage/UserInfo';
import RecommendedCompanyList from '../../components/mypage/RecommendedCompanyList';
import fakedata from '../../fakedata';
import './MyPage.css';

class MyPage extends Component {
  componentDidMount() {
    this.props.receiveData();
  }

  render() {
    return (
      <div className="cl_MyPage">
        <Tab />
        <PostTagCount />
        <UserInfo />
        <h1 className="cl_Company_Title">로 추천된 ***님의 파트너사는</h1>
        <RecommendedCompanyList fakeData={fakedata} />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.session.token,
});

const mapDispatchToProps = (dispatch) => ({
  receiveData: (token) => (event) => {
    getMyPageData(token).then(({ data: { post_count, tag_count } }) => {
      dispatch(mypage(post_count, tag_count));
    });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(MyPage);
