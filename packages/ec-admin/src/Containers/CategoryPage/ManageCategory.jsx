/* eslint-disable no-template-curly-in-string */

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import {
  Layout as AntLayout,
  Breadcrumb,
  Typography,
  Form,
  Input,
  Button,
  Divider,
  Table,
  Space,
} from 'antd';
import * as actions from './actions';
import { DownloadOutlined, EditOutlined, EyeOutlined, DeleteOutlined } from '@ant-design/icons';
import { HeaderLayout, BreadcrumbLayout, FooterLayout, LoadingScreenCustom, Toast } from './../../Components';
import { useHistory } from 'react-router-dom';
const { Title, Text } = Typography;
const { Column } = Table;
const { Content } = AntLayout;
const StyleManageCategory = styled(AntLayout)`
  .site-layout-background {
    background: #fff;
    position: relative;
    z-index:0
  }

  .main-title {
    margin-bottom: 50px;
    text-align: center;

    &-result {
      text-align: center;
    }
  }

  .filter-form {
    justify-content: center;
    margin-bottom: 50px;
  }

  .show {
    display: block;
  }

  .hide {
    display: none;
  }

  .result-total {
    display: flex;
    justify-content: center;
    margin-bottom: 30px;
  }

  .result-table {
    margin-bottom: 30px;
  }

  .button-finish {
    display: flex;
    align-items: center;
    margin-left: auto;
    border-radius: 10px;
    border-color: #058d23;
    background-color: #058d23;
  }
`;

const ManageCategoryPage = () => {

    const [pageSize, setPageSize] = useState(10);
    const [pageIndex, setPageIndex] = useState(1);
    const [totalCategories, setTotalCategories] = useState(0);
    const [dataSource, setDataSource] = useState([]);
    const [isSearch, setIsSearch] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const history=useHistory();

    useEffect(() => {
        onGetListCatagorys({
        pageIndex,
        pageSize,
        });
        
    }, [isSearch]);

    const onPageChange = (pageIndex, pageSize) => {
        setPageIndex(pageIndex);
        setPageSize(pageSize);
        setIsSearch(!isSearch);
    };
    const onGetListCatagorys = async (pagination) => {
        try {
          setIsLoading(true);
          const data = await actions.onGetListCatagorysRequest(pagination);
          let lstTempCatagory = data.results;
          let lstCatagory = lstTempCatagory.map((item, index) => {
              return {
              ...item,
              key: index,
              index: index + 1,
              };
          });
          const panigionServer = data.pagination;
          setDataSource(lstCatagory);
          setTotalCategories(panigionServer.total);
          setIsLoading(false);
        } catch (e) {
          setIsLoading(false);
          Toast.notifyError("???? c?? l???i x???y ra. Vui l??ng ki???m tra l???i")
        }
    };

    const onRedirectUpdate=(item)=>{
      history.push(`/Categories/${item.id}/update`)
    }

    const onRedirectShow=(item)=>{
      history.push(`/Categories/${item.id}`)
    }

    const onDeleteCategory = async (category) =>{
      let isDelete= window.confirm(`B???n c?? mu???n x??a th??? lo???i ${category.id} n??y kh??ng?`);
      if(! isDelete) return;
      try{
        setIsLoading(true);
        await actions.onDeleteCategoryByIdRequest(category.id);
        setIsLoading(false);
        setIsSearch(!isSearch);
        Toast.notifySuccess(`X??a s???n ph???m ${category.id} th??nh c??ng`)
      }catch(e){
        setIsLoading(false);
        Toast.notifyError("???? c?? l???i x???y ra. Vui l??ng ki???m tra l???i")
      }
    }

    return (
        <StyleManageCategory>
        <HeaderLayout />
        <Content style={{ margin: '0 16px' }}>
            <BreadcrumbLayout root="Th??? lo???i s???n ph???m" branch="Qu???n l??" />
            <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
              <Title className="main-title" level={2}>
                  Danh s??ch lo???i s???n ph???m
              </Title>
              {/* <div className={showReportResult ? 'show' : 'hide'}> */}
              <div>
                  <Divider plain>Danh s??ch lo???i s???n ph???m hi???n nay</Divider>
                  <Text className="result-total">T???ng s??? lo???i s???n ph???m hi???n nay: {totalCategories} lo???i</Text>;
                  <Table
                  className="result-table"
                  dataSource={dataSource}
                  pagination={{
                      current: pageIndex,
                      pageSize: pageSize,
                      total: totalCategories,
                      showSizeChanger: true,
                      pageSizeOptions: ['5', '10', '15'],
                      onChange: onPageChange,
                  }}
                  >
                  <Column title="S??? th??? t???" dataIndex="index" />
                  <Column title="M?? lo???i s???n ph???m" dataIndex="id" />
                  <Column title="T??n lo???i s???n ph???m" dataIndex="name" />
                  <Column
                      title="Th???c hi???n"
                      key="action"
                      render={(item) => {
                      return (
                          <Space size="middle">
                          <Button
                              icon={<EyeOutlined />}
                              onClick={() => {
                                onRedirectShow(item);
                              }}
                          />
                          <Button
                              icon={<EditOutlined />}
                              onClick={() => {
                              onRedirectUpdate(item);
                              }}
                          />
                          <Button
                              icon={<DeleteOutlined />}
                              onClick={() => {
                              onDeleteCategory(item);
                              }}
                          />
                          </Space>
                      );
                      }}
                  />
                  </Table>
              </div>
              <LoadingScreenCustom isLoading={isLoading} setIsLoading={setIsLoading}/>
            </div>
        </Content>
        <FooterLayout />
        </StyleManageCategory>
    );
    };

    export default ManageCategoryPage;
