import React, { Component } from 'react';
import { connect } from 'react-redux';

class PostTagCount extends Component {
  render() {
    const { post_count, tag_count } = this.props;
    return (
      <div className="cl_Post_Tag">
        <div className="cl_Post_Count">{post_count}8개의 포스팅</div>
        <div className="cl_tag_Count">{tag_count}24개의 태그</div>
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
