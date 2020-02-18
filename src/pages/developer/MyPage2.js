import React, { Component } from 'react';
import { getMyPageData } from '../../redux/api';
//* component
import MypageTab from '../../pages/TabMypage';
// * css
import { Upload, Icon, message } from 'antd';
import fakedata from '../../fakedata';

class MyPage2 extends Component {
  state = {
    post_count: null,
    tag_count: null,
    recommended_companies: [...fakedata],
  };

  componentDidMount() {
    getMyPageData()
      .then(({ data: { post_count, tags } }) =>
        this.setState({ post_count, tag_count: tags.length }),
      )
      .catch((err) =>
        this.setState({
          post_count: 'Fail to receive post count',
          tag_count: 'Fail to receive tag count',
        }),
      );
  }

  render() {
    const props = {
      name: 'file',
      multiple: true,
      action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
      onChange(info) {
        const { status } = info.file;
        if (status !== 'uploading') {
          console.log(info.file, info.fileList);
        }
        if (status === 'done') {
          message.success(`${info.file.name} file uploaded successfully.`);
        } else if (status === 'error') {
          message.error(`${info.file.name} file upload failed.`);
        }
      },
    };
    const { Dragger } = Upload;
    const { post_count, tag_count, recommended_companies } = this.state;
    return (
      <div>
        <MypageTab />
        <div className="cl_Mypage_Tags">
          <div className="cl_Count_Wrapper">
            <div className="cl_Count_Name">Tag and Post</div>
            <div className="cl_Count_element">{post_count}Posts</div>
            <div className="cl_Count_element">{tag_count}Tags</div>
          </div>
        </div>
        <div className="cl_Document_Upload_Wrapper">
          <div className="cl_Document_Upload_Header">Resume and portfolio</div>
          <div className="cl_Document_Upload_container" >
          <Dragger {...props}>
            <p className="ant-upload-drag-icon">
              <Icon type="inbox" />
            </p>
            <p className="ant-upload-text">
              Click or drag resume or portfolio to this area to upload
            </p>
            <p className="ant-upload-hint">
              Support for a single or bulk upload. Strictly prohibit from
              uploading company data or other band files
            </p>
          </Dragger>
          </div>
          
        </div>
        <div className="cl_Company_Recommend cl_CompanyMyPage_Set">
          <div className="cl_Recommended_Header">
            Recommended Company for you
          </div>
          <div className="cl_Company_Recommended_List">
            {recommended_companies.map((recommended_company, index) => (
              <div className="cl_Company_Recommended_Element" index={index}>
                <span>{recommended_company.id}</span>
                <span>{recommended_company.body}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default MyPage2;
