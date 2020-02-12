import React, { Component } from 'react';
import { connect } from 'react-redux';
import { currentPost } from '../../../redux/action';

class TechPostListElement extends Component {
  render() {
    const { data, handlePostId } = this.props;
    return (
      <div className="cl_PostListElement" onClick={() => handlePostId(data.id)}>
        <div className="cl_PostListElement_Title"> {data.title}</div>
        <div className="cl_PostListElement_Contents">
          {data.content.slice(0, 100)}
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    PostState: state.PostState,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    handlePostId: (id) => {
      dispatch(currentPost(id));
    },
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TechPostListElement);
