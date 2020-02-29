/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { currentPost } from '../../../redux/action';

class NewCompanyListElement extends Component {
  render() {
    const { data } = this.props;
    return (
      <div>
        <ul>
          <div className="cl_ListElement_NewCompany">
            <div className="cl_ListElement_NewCompany_Title">
              {data.company_name}
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
