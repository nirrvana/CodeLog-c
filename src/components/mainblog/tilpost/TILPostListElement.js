// * Library
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
// * File
import CodeBlock from '../../postedit/CodeBlock';
import { currentPost } from '../../../redux/action';

class TILPostListElement extends Component {
  render() {
    const { data, handlePostId } = this.props;

    return (
      <Link to="/TILPost">
        <div
          className="cl_PostListElement"
          onClick={() => handlePostId(data.id)}
        >
          <div className="cl_PostListElement_Title"> {data.title}</div>
          <ReactMarkdown
            className="cl_PostListElement_Contents"
            source={data.content.slice(0, 100)}
            renderers={{
              code: CodeBlock,
            }}
          />
        </div>
      </Link>
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
export default connect(mapStateToProps, mapDispatchToProps)(TILPostListElement);
