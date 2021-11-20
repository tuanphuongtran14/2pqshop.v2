/* eslint-disable no-template-curly-in-string */

import React, { useState } from 'react';
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

import { DownloadOutlined, EditOutlined, EyeOutlined,DeleteOutlined } from '@ant-design/icons';
import {HeaderLayout, BreadcrumbLayout,FooterLayout} from './../../Components'
const { Title, Text } = Typography;
const { Column } = Table;
const { Content } = AntLayout;
const StyleManageTag = styled(AntLayout)`
  .site-layout-background {
    background: #fff;
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

const ManageTagPage = () => {
  const [showReportResult, setShowReportResult] = useState(false);
  const [dateData, setDateData] = useState({ month: '', year: '' });
  const [dataSource] = useState([
    {
        key:'1',
        index: '1',
        sku: 'Toyota1',
        TagName: 'Toyota',
        price: 10000,
    },
    {   
        key:'2',
        index: '1',
        sku: 'Toyota2',
        TagName: 'Toyota',
        price: 10000,
      },
      { 
        key:'3',
        index: '1',
        sku: 'Toyota3',
        TagName: 'Toyota',
        price: 10000,
      },
  ]);

  const columns = [
    {
      title: 'STT',
      dataIndex: 'index',
      key: 'index',
    },
    {
      title: 'Mã sản phẩm',
      dataIndex: 'sku',
      key: 'sku',
    },
    {
      title: 'Tên sản phẩm',
      dataIndex: 'TagName',
      key: 'TagName',
    },
    {
      title: 'Giá bán',
      dataIndex: 'price',
      key: 'price',
    }
  ];

  dataSource.map((item, index) => (item.carNumber = index + 1));

  const validateMessages = {
    required: 'Nhập ${label}!',
    types: {
      email: '${label} không phải là email hợp lệ!',
      number: '${label} không phải là số hợp lệ!',
    },
    number: {
      min: "'${label}' không thể nhỏ hơn ${min}",
      max: "'${label}' không thể lớn hơn ${max}",
      range: '${label} phải ở giữa ${min} và ${max}',
    },
  };

  const onFinishCreateTable = (values) => {
    const { month, year } = values;
    setDateData({ ...dateData, month: month, year: year });
    setShowReportResult(true);
  };

  const onFinishFailedCreateTable = (errorInfo) => {
    console.log('Failed:', errorInfo);
    setShowReportResult(false);
  };

  const ResultTitle = () => (
    <Title className="main-title-result" level={4}>
      Kết quả báo cáo doanh thu tháng {dateData.month} năm {dateData.year}
    </Title>
  );

  const TotalValues = () => {
    const total = dataSource.reduce((a, b) => a + b.total, 0);
    return <Text className="result-total">Tổng doanh thu tháng: {total} đồng</Text>;
  };
  
  return (
    <StyleManageTag >
      <HeaderLayout />
      <Content style={{ margin: '0 16px' }}>
        <BreadcrumbLayout root="Tag" branch="manage" />
        <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
          <Title className="main-title" level={2}>
            Danh sách sản phẩm
          </Title>

          <Form
            name="basic"
            className="filter-form"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinishCreateTable}
            onFinishFailed={onFinishFailedCreateTable}
            autoComplete="off"
            layout="inline"
            validateMessages={validateMessages}
          >
            <Form.Item
              name="keyword"
              // rules={[
              //   {
              //     type: 'text',
              //     min: 1,
              //     max: 20,
              //   },
              // ]}
            >
              <Input placeholder="Nhập mã/tên sản phẩm" style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Tìm kiếm 
              </Button>
            </Form.Item>
          </Form>

          {/* <div className={showReportResult ? 'show' : 'hide'}> */}
          <div>
            <Divider plain>Danh sách sản phẩm hiện nay</Divider>
            <ResultTitle />
            <TotalValues />
            <Table className="result-table" dataSource={dataSource} pagination={{current: 2,
      pageSize: 10,total: 200}} >
              <Column title="Số thứ tụ" dataIndex="index"/>
              <Column title="Mã sản phẩm" dataIndex="sku" />
              <Column title="Tên sản phẩm" dataIndex="TagName"  />
              <Column title="Giá bán" dataIndex="price"/>
              <Column
                    title="Thực hiện"
                    key="action"
                    render={(item) => {
                        return(
                            <Space size="middle">
                                <Button icon={<EyeOutlined />} onClick={()=>{console.log(item)}}/>
                                <Button icon={<EditOutlined/>} onClick={()=>{console.log(item)}}/>
                                <Button icon={<DeleteOutlined/>} onClick={()=>{console.log(item)}}/>
                            </Space>
                        )}
                    }
                    />
            </Table>
            <Button
              className="button-finish"
              icon={<DownloadOutlined />}
              type="primary"
              size="middle"
            >
              In excel danh sách sản phẩm
            </Button>
          </div>
        </div>
      </Content>
      <FooterLayout />
    </StyleManageTag>
  );
};

export default ManageTagPage;
