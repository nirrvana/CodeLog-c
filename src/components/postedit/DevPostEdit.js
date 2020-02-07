import React, { Component } from 'react';
import { connect } from 'react-redux';
import TabBlog from '../../pages/TabBlog';
import {} from '../../redux/action';
// * CSS
import { Tag, Input } from 'antd';
const { TextArea } = Input;

class DevPostEdit extends Component {
  render() {
    console.log(this.props);
    return (
      <div>
        <TabBlog></TabBlog>
        <div className="cl_PlanePost">
          <Input className="cl_PlanePost_Title cl_PlanePost_set " type="text" />

          <div className="cl_TILPost_Contents cl_PlanePost_Contents ">
            <div className="cl_TILPost_4F">
              Project concept
              <TextArea className="cl_TILPost_4F_content" type="text" />
            </div>
            <div className="cl_TILPost_4F">
              Coding Strategy
              <TextArea className="cl_TILPost_4F_content" type="text" />
            </div>
            <div className="cl_TILPost_4F">
              Error handling
              <TextArea className="cl_TILPost_4F_content" type="text" />
            </div>
            <div className="cl_TILPost_4F">
              Referenece
              <TextArea className="cl_TILPost_4F_content" type="text" />
            </div>
            <div className="cl_TILPost_4F">
              Lesson
              <TextArea className="cl_TILPost_4F_content" type="text" />
            </div>
          </div>
          <div className="cl_PlanePost_Tag cl_PlanePost_set">
            <Tag color="red">React</Tag>
            <Tag color="volcano">Redux</Tag>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {};
};
const mapDispatchToProps = (dispatch) => {
  return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(DevPostEdit);

/**
 *
 */
