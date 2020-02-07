import React, { Component } from 'react';
import { connect } from 'react-redux';
import TabBlog from '../../pages/TabBlog';
// * CSS
import { Tag, Input } from 'antd';
const { TextArea } = Input;

class DevPostEdit extends Component {
  render() {
    console.log(this.props.isEdit);
    const { isEdit } = this.props;
    return (
      <div>
        <TabBlog></TabBlog>
        <div className="cl_PlanePost">
          <Input
            className="cl_PlanePost_Title cl_PlanePost_set "
            type="text"
            defaultValue={isEdit.state.ClikedPost.title}
          />

          <div className="cl_TILPost_Contents cl_PlanePost_Contents ">
            <div className="cl_TILPost_4F">
              Project concept
              <TextArea
                className="cl_TILPost_4F_content"
                type="text"
                defaultValue={isEdit.state.ClikedPost.contents[0]}
              />
            </div>
            <div className="cl_TILPost_4F">
              Coding Strategy
              <TextArea
                className="cl_TILPost_4F_content"
                type="text"
                defaultValue={isEdit.state.ClikedPost.contents[1]}
              />
            </div>
            <div className="cl_TILPost_4F">
              Error handling
              <TextArea
                className="cl_TILPost_4F_content"
                type="text"
                defaultValue={isEdit.state.ClikedPost.contents[2]}
              />
            </div>
            <div className="cl_TILPost_4F">
              Referenece
              <TextArea
                className="cl_TILPost_4F_content"
                type="text"
                defaultValue={isEdit.state.ClikedPost.contents[3]}
              />
            </div>
            <div className="cl_TILPost_4F">
              Lesson
              <TextArea
                className="cl_TILPost_4F_content"
                type="text"
                defaultValue={isEdit.state.ClikedPost.contents[4]}
              />
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
  return {
    isEdit: state.isEdit,
  };
};
export default connect(mapStateToProps)(DevPostEdit);

/**
 *
 */
