/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { currentPost } from '../../../redux/action';
import moment from 'moment';

class NewCompanyListElement extends Component {
  render() {
    const { data } = this.props;
    return (
      <div>
        <ul>
          <div className="cl_ListElement">
            <div className="cl_ListElement_Title">{data.name}</div>
            <div className="cl_ListElement_Content">{data.info}</div>
            <div className="cl_ListElement_UpdatedAt">
              {moment(data.updatedAt)
                .subtract(1, 'days')
                .fromNow()}
            </div>
          </div>
        </ul>
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
)(NewCompanyListElement);
