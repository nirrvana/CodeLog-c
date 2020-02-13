import React, { Component } from 'react';
import { connect } from 'react-redux';
import { currentPost } from '../../../redux/action';
import ReactMarkdown from 'react-markdown';
import CodeBlock from '../../postedit/CodeBlock';

class TechPostListElement extends Component {
  render() {
    const { data, handlePostId } = this.props;
    return (
      <div className="cl_PostListElement" onClick={() => handlePostId(data.id)}>
        <div className="cl_PostListElement_Title"> {data.title}</div>
        <ReactMarkdown
          className="cl_PostListElement_Contents"
          source={data.content.slice(0, 100) + '...'}
          renderers={{
            code: CodeBlock,
          }}
        />
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
