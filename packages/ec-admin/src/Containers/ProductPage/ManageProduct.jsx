/* eslint-disable no-template-curly-in-string */

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import * as actions from './actions'
import {
  Layout as AntLayout,
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
import {HeaderLayout, BreadcrumbLayout,FooterLayout,LoadingScreenCustom, Toast} from './../../Components'
import {useLocation, useHistory} from 'react-router-dom'
const { Title, Text } = Typography;
const { Column } = Table;
const { Content } = AntLayout;
const StyleManageProduct = styled(AntLayout)`
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

const ManageProductPage = () => {

  const [dataSource, setDataSource] = useState([]);
  const [pageSize, setPageSize] = useState(10);
  const [pageIndex, setPageIndex] = useState(1);
  const [totalProducts, setTotalProduct] = useState(0);
  const history=useHistory();
  const [isLoading,setIsLoading] = useState(false);
  const [isSearch, setIsSearch] =useState(false);
  const [form] = Form.useForm();

  useEffect( ()=>{
    onGetListProduct({
      pageIndex,
      pageSize
    })
  },[isSearch])

  useEffect(()=>{
    form.setFieldsValue({
      keyword:'',
    });
  },[])

  const validateMessages = {
    required: 'Nh???p ${label}!',
    types: {
      email: '${label} kh??ng ph???i l?? email h???p l???!',
      number: '${label} kh??ng ph???i l?? s??? h???p l???!',
    },
    number: {
      min: "'${label}' kh??ng th??? nh??? h??n ${min}",
      max: "'${label}' kh??ng th??? l???n h??n ${max}",
      range: '${label} ph???i ??? gi???a ${min} v?? ${max}',
    },
  };

  const onGetListProduct =async(pagination)=>{
        try {
            setIsLoading(true);
            const data = await actions.onGetListProductRequest(pagination);
            
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
            setIsLoading(false);
        } catch (e) {
          setIsLoading(false);
            Toast.notifyError('???? c?? l???i x???y ra vui l??ng ki???m tra l???i');
        }
    }
    const onPageChange = (pageIndex, pageSize) => {
        setPageIndex(pageIndex);
        setPageSize(pageSize);
        setIsSearch(!isSearch);
    }
    const onSearch= async(values)=>{
      try{
        setIsLoading(true);
        if(values.keyword===''){
          setIsSearch(!isSearch);
          return ;
        }
        const data = await actions.onSearchProductRequest(values.keyword,{
          pageIndex,
          pageSize
        });
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
        setIsLoading(false);
      }
      
      catch(e){
        setIsLoading(false);
        Toast.notifyError("???? c?? l???i. Vui l??ng th??? l???i")
      }
    }

  const onDeleteProduct=async(item)=>{
    try{
      const check=window.confirm(`B???n c?? mu???n x??a s???n ph???m ${item.id}`);
      if(check){
        setIsLoading(true);
        await actions.onDeleletProductRequest(item.id);
        setIsLoading(false);
        setIsSearch(!isSearch);
        Toast.notifySuccess('???? x??a s???n ph???m th??nh c??ng');
      }
    }catch(e){
      setIsLoading(false);
      Toast.notifyError('???? c?? l???i x???y ra vui l??ng th??? l???i!');
    }
  }

  const onRedirectUpdate=(item)=>{
    history.push({pathname:`/products/${item.slug}/update`,
    state:{
      id:item.id
    }})
  }

  const onRedirectShow=(item)=>{
    history.push({pathname:`/products/${item.slug}`,
    state:{
      id:item.id
    }})
  }

  return (
    <>
    <StyleManageProduct >
      <HeaderLayout />
      <Content style={{ margin: '0 16px' }}>
        <BreadcrumbLayout root="S???n ph???m" branch="Qu???n l??" />
        <div className="site-layout-background" style={{ padding: 24, minHeight: 360, position: 'relative' }}>
          <Title className="main-title" level={2}>
            Danh s??ch s???n ph???m
          </Title>

          <Form
            form={form}
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
              rules={[
                { 

                },
              ]}
            >
              <Input placeholder="Nh???p m??/t??n s???n ph???m" style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                T??m ki???m 
              </Button>
            </Form.Item>
          </Form>

          {/* <div className={showReportResult ? 'show' : 'hide'}> */}
          <div>
            <Divider plain>Danh s??ch s???n ph???m hi???n nay</Divider>
            <Text className="result-total">T???ng s???n ph???m hi???n nay: {totalProducts} s???n ph???m</Text>;
            <Table className="result-table" dataSource={dataSource} 
            pagination={{current:pageIndex,pageSize: pageSize,total: totalProducts,
             showSizeChanger: true, pageSizeOptions: ['5', '10', '15'],
             onChange:onPageChange}} >
              <Column title="S??? th??? t???" dataIndex="index"/>
              <Column title="M?? s???n ph???m" dataIndex="sku" />
              <Column title="T??n s???n ph???m" dataIndex="name"  />
              <Column title="Gi?? b??n" dataIndex="price"/>
              <Column
                    title="Th???c hi???n"
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
