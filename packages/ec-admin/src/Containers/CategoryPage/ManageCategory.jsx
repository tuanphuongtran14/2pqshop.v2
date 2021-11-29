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
import { HeaderLayout, BreadcrumbLayout, FooterLayout } from './../../Components';
import { useLocation, useHistory } from 'react-router-dom';
const { Title, Text } = Typography;
const { Column } = Table;
const { Content } = AntLayout;
const StyleManageCategory = styled(AntLayout)`
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

const ManageCategoryPage = () => {
    const location=useLocation();
    const [pageSize, setPageSize] = useState(10);
    const [pageIndex, setPageIndex] = useState(1);
    const [totalProducts, setTotalProduct] = useState(0);
    const [dataSource, setDataSource] = useState([]);
    const history=useHistory();
    const [form] = Form.useForm();

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

    useEffect(() => {
        onGetListCatagorys({
        pageIndex,
        pageSize,
        });
        
    }, [location.pathname, pageIndex, pageSize]);

    const onPageChange = (pageIndex, pageSize) => {
        setPageIndex(pageIndex);
        setPageSize(pageSize);
    };
    const onGetListCatagorys = async (pagination) => {
        try {
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
        setTotalProduct(panigionServer.total);
        } catch (e) {
        alert('Đã có lỗi xảy ra vui lòng kiểm tra lại');
        }
    };
    const onSearch = (values) => {
        console.log(values);
    };

    const onRedirectUpdate=(item)=>{
      history.push(`/categories/${item.id}/update`)
    }

    const onRedirectShow=(item)=>{
      history.push(`/categories/${item.id}`)
    }

    return (
        <StyleManageCategory>
        <HeaderLayout />
        <Content style={{ margin: '0 16px' }}>
            <BreadcrumbLayout root="Product" branch="manage" />
            <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
            <Title className="main-title" level={2}>
                Danh sách loại sản phẩm
            </Title>
            {/* <div className={showReportResult ? 'show' : 'hide'}> */}
            <div>
                <Divider plain>Danh sách loại sản phẩm hiện nay</Divider>
                <Text className="result-total">Tổng số loại sản phẩm hiện nay: {totalProducts} loại</Text>;
                <Table
                className="result-table"
                dataSource={dataSource}
                pagination={{
                    current: pageIndex,
                    pageSize: pageSize,
                    total: totalProducts,
                    showSizeChanger: true,
                    pageSizeOptions: ['5', '10', '15'],
                    onChange: onPageChange,
                }}
                >
                <Column title="Số thứ tụ" dataIndex="index" />
                <Column title="Mã loại sản phẩm" dataIndex="id" />
                <Column title="Tên loại sản phẩm" dataIndex="name" />
                <Column
                    title="Thực hiện"
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
                            console.log(item);
                            }}
                        />
                        </Space>
                    );
                    }}
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
        </StyleManageCategory>
    );
    };

    export default ManageCategoryPage;
