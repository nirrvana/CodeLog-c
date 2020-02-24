import React, { Component } from 'react';
import { getMyPageData } from '../../redux/api';
//* component
import MypageTab from '../../pages/TabMypage';
// * css
import { Upload, Icon, message, Tag } from 'antd';
import fakedata from '../../fakedata';

class MyPage2 extends Component {
  state = {
    username: '',
    post_count: null,
    tag_count: null,
    certificate: '',
    tags: [],
    recommended_companies: [...fakedata],
    recommended_tags: ['연봉삼천', '야근없음', '리액트', '프론트'],
  };

  componentDidMount() {
    getMyPageData()
      .then(
        ({ data: { username, post_count, tag_count, certificate, tags } }) => {
          this.setState({
            username,
            post_count,
            tag_count,
            certificate,
            tags,
          });
        },
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
        }
        if (status === 'done') {
          message.success(`${info.file.name} file uploaded successfully.`);
        } else if (status === 'error') {
          message.error(`${info.file.name} file upload failed.`);
        }
      },
    };
    const { Dragger } = Upload;
    const {
      post_count,
      tag_count,
      certificate,
      recommended_companies,
    } = this.state;
    return (
      <div>
        <MypageTab />

        <div className="cl_Dev_Mypage">
          <div className="cl_Dev_Mypage_Header">Tag and Post</div>
          <div className="cl_Dev_Mypage_Tag_Post cl_Dev_Mypage_Set">
            <div className="cl_Dev_Mypage_Tag_Post_Set">
              <div className="cl_Dev_Mypage_Tag_Post_Datas">
                <div className="cl_Dev_Mypage_Tag_Post_Data">{post_count}</div>
                Posts
              </div>
            </div>

            <div className="cl_Dev_Mypage_Tag_Post_Set">
              <div className="cl_Dev_Mypage_Tag_Post_Datas">
                <div className="cl_Dev_Mypage_Tag_Post_Data">{tag_count}</div>
                Tags
              </div>
            </div>
            <div className="cl_Dev_Mypage_Tag_Post_Set">
              <div className="cl_Dev_Mypage_Tag_Post_Datas">
                <div className="cl_Dev_Mypage_Tag_Post_Data">{certificate}</div>
                수료
              </div>
            </div>
          </div>
          <div className="cl_Dev_Mypage_Header">Resume and portfolio</div>

          <div className="cl_Dev_Mypage_Resume_Portfolio cl_Dev_Mypage_Set">
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

          <div className="cl_Dev_Mypage_Recommended_companies cl_Dev_Mypage_Set">
            <div className="cl_Dev_Mypage_Recommended_Header">
              Recommended Company for you
            </div>
            <div className="cl_Dev_Mypage_Recommended_company">
              {recommended_companies.map((recommended_company, index) => (
                <div
                  className="cl_Dev_Mypage_Recommended_company_Item"
                  index={index}
                >
                  <div>{recommended_company.id}</div>
                  <div>{recommended_company.body.slice(0, 10)}</div>
                  <Tag
                    className="cl_Dev_Mypage_Recommended_company_Tags"
                    color="#108ee9"
                  >
                    tag place
                  </Tag>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MyPage2;
