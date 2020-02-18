import React, { Component } from 'react';
import { connect } from 'react-redux';

class PostTagCount extends Component {
  render() {
    const { post_count, tag_count } = this.props;
    return (
      <div className="cl_Company_Tags">
        <div className="cl_Count_Wrapper">
          <div className="cl_Count_Name">Tag and Post</div>
          <div className="cl_Count_element">{post_count}8Posts</div>
          <div className="cl_Count_element">{tag_count}24Tags</div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  token: state.session.token,
  post_count: state.mypage.post_count,
  tag_count: state.mypage.tag_count,
});

export default connect(mapStateToProps)(PostTagCount);
