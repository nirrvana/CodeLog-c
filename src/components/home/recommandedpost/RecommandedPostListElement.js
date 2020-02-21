// * Library
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import ReactMarkdown from 'react-markdown';
// * File
import CodeBlock from '../../postedit/CodeBlock';
import { currentPost } from '../../../redux/action';
import moment from 'moment';

class RecommandedPostListElement extends Component {
  render() {
    const { data, handlePostId } = this.props;
    const contentFirstKey = Object.keys(data.content)[0];
    return (
      <div>
        <ul>
          <Link to={'/' + data.theme + 'post'}>
            <div
              className="cl_ListElement"
              onClick={() => handlePostId(data.id)}
            >
              <div className="cl_ListElement_Title cl_ListElement_Set">
                {data.title}
              </div>

              <div className="cl_ListElement_Content cl_ListElement_Set">
                <ReactMarkdown
                  className="cl_Post_Contents"
                  source={data.content[contentFirstKey]}
                  renderers={{
                    code: CodeBlock,
                  }}
                />
              </div>
              <div className="cl_ListElement_Set">
                <span className="cl_ListElement_Likes ">
                  {data.likes + ' likes'}
                </span>
                <span className="cl_ListElement_UpdatedAt ">
                  {moment(data.updatedAt)
                    .subtract(1, 'days')
                    .fromNow()}
                </span>
              </div>
            </div>
          </Link>
        </ul>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {};
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
)(RecommandedPostListElement);
