/* eslint-disable no-template-curly-in-string */

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import * as actions from './actions'
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
import {convertNumberToMoney} from './../../helper/convertNumberToMoney'
import { DownloadOutlined, EditOutlined, EyeOutlined,DeleteOutlined } from '@ant-design/icons';
import {HeaderLayout, BreadcrumbLayout,FooterLayout,LoadingScreenCustom} from './../../Components'
import {useLocation, useHistory} from 'react-router-dom'
const { Title, Text } = Typography;
const { Column } = Table;
const { Content } = AntLayout;
const StyleManageProduct = styled(AntLayout)`
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

const ManageProductPage = () => {

  const location=useLocation();
  const [dataSource, setDataSource] = useState([]);
  const [pageSize, setPageSize] = useState(10);
  const [pageIndex, setPageIndex] = useState(1);
  const [totalProducts, setTotalProduct] = useState(0);
  const history=useHistory();
  const [isLoading,setIsLoading] = useState(false);

  useEffect( ()=>{
    onGetListProduct({
      pageIndex,
      pageSize
    })
  },[location.pathname,pageIndex,pageSize])

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

  const onGetListProduct =async(pagination)=>{
        try {
            setIsLoading(true);
            const data = await actions.onGetListProductRequest(pagination);
            setIsLoading(false);
            let lstTempProduct = data.results;
            let lstProduct = lstTempProduct.map((item, index) => {
            return {
                ...item,
                key: index,
                index: index + 1,
                price:convertNumberToMoney(item.price)
            };
            });
            const panigionServer = data.pagination;
            setDataSource(lstProduct);
            setTotalProduct(panigionServer.total);
        } catch (e) {
          setIsLoading(false);
            alert('Đã có lỗi xảy ra vui lòng kiểm tra lại');
        }
    
    }
    const onPageChange = (pageIndex, pageSize) => {
        setPageIndex(pageIndex);
        setPageSize(pageSize);
    }
    const onSearch=(values)=>{
        console.log(values);
    }

  const onDeleteProduct=async(item)=>{
    try{
      const check=window.confirm(`Bạn có muốn xóa sản phẩm ${item.id}`);
      if(check){
        setIsLoading(true);
        await actions.onDeleletProductRequest(item.id);
        setIsLoading(false);
        alert('Đã xóa sản phẩm thành công');
        setPageIndex(1);
        onGetListProduct({
          pageIndex:1,
          pageSize
        })
      }
    }catch(e){
      setIsLoading(false);
      alert('Đã có lỗi xảy ra vui lòng thử lại!');
    }
  }

  const onRedirectUpdate=(item)=>{
    history.push({pathname:`/update-product/${item.slug}`,
    state:{
      id:item.id
    }})
  }

  const onRedirectShow=(item)=>{
    history.push({pathname:`/show-product/${item.slug}`,
    state:{
      id:item.id
    }})
  }

  return (
    <>
    <StyleManageProduct >
      <HeaderLayout />
      <Content style={{ margin: '0 16px' }}>
        <BreadcrumbLayout root="Product" branch="manage" />
        <div className="site-layout-background" style={{ padding: 24, minHeight: 360, position: 'relative' }}>
          <Title className="main-title" level={2}>
            Danh sách sản phẩm
          </Title>

          <Form
            name="basic"
            className="filter-form"
            initialValues={{
              remember: true,
            }}
            onFinish={onSearch}
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
            <Text className="result-total">Tổng sản phẩm hiện nay: {totalProducts} sản phẩm</Text>;
            <Table className="result-table" dataSource={dataSource} 
            pagination={{current:pageIndex,pageSize: pageSize,total: totalProducts,
             showSizeChanger: true, pageSizeOptions: ['5', '10', '15'],
             onChange:onPageChange}} >
              <Column title="Số thứ tụ" dataIndex="index"/>
              <Column title="Mã sản phẩm" dataIndex="sku" />
              <Column title="Tên sản phẩm" dataIndex="name"  />
              <Column title="Giá bán" dataIndex="price"/>
              <Column
                    title="Thực hiện"
                    key="action"
                    render={(item) => {
                        return(
                            <Space size="middle">
                                <Button icon={<EyeOutlined />} onClick={()=>{onRedirectShow(item)}}/>
                                <Button icon={<EditOutlined/>} onClick={()=>{onRedirectUpdate(item)}}/>
                                <Button icon={<DeleteOutlined/>} onClick={()=>onDeleteProduct(item)}/>
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
          <LoadingScreenCustom isLoading={isLoading} setIsLoading={setIsLoading}/>
        </div>
        
      </Content>
      <FooterLayout />
    </StyleManageProduct>
    
    </>
    
  );
};

export default ManageProductPage;
