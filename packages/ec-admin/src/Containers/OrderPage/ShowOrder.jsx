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
import {HeaderLayout, BreadcrumbLayout,FooterLayout,LoadingScreenCustom, Toast} from './../../Components'
import {useLocation, useHistory, useParams} from 'react-router-dom'
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

const layout = {
  labelCol: {
    span:6,
  },
  wrapperCol: {
    span: 14,
  },
};


const ManageOrderPage = () => {

  const location=useLocation();
  const [dataSource, setDataSource] = useState([]);
  const [pageSize, setPageSize] = useState(10);
  const [pageIndex, setPageIndex] = useState(1);
  const [totalProducts, setTotalProduct] = useState(0);
  const history=useHistory();
  const [isLoading,setIsLoading] = useState(false);
  const [form] = Form.useForm();
  const params = useParams();
  const [detailOrder,setDetailOrder]=useState([]);

  // useEffect( ()=>{
  //   console.log('có');
  //  // onGetListProduct({
  //     pageIndex,
  //     pageSize
  //   })
  // },[location.pathname,pageIndex,pageSize])

  useEffect(()=>{
    console.log(params.id)
    onGetOrderById(params.id);
  },[])

  const onGetOrderById=async (id)=>{
    try{
      setIsLoading(true);
      const data= await actions.onGetOrderByIdRequest(id);
      mapObjectToFrom(data);
      let lstTempDetailOrder = data.results;
      let lstDetailOrder = lstTempDetailOrder.map((item, index) => {
      return {
          ...item,
          key: index,
          index: index + 1,
          finalAmount:convertNumberToMoney(item.finalAmount)
      }});
      setDetailOrder(lstDetailOrder);
      setIsLoading(false);
    }
    catch(e){
      setIsLoading(false);
      Toast.notifyError("Lỗi khi lấy dữ liệu thể loại sản phẩm này.")
    }
  }

  const mapObjectToFrom=(obj)=>{
    form.setFieldsValue({
      name:obj.name,
      description:obj.description,
    });
  }

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
          //  const data = await actions.onGetListProductRequest(pagination);
          const data=null
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
            Toast.notifyError('Đã có lỗi xảy ra vui lòng kiểm tra lại');
        }
    
    }
    const onPageChange = (pageIndex, pageSize) => {
        setPageIndex(pageIndex);
        setPageSize(pageSize);
    }
    const onSearch= async(values)=>{
      try{
        setIsLoading(true);
        if(values.keyword===''){
          setPageIndex(1);
          return ;
        }
       // const data = await actions.onSearchProductRequest(values.keyword,{
         const data=null;
        //   pageIndex,
        //   pageSize
        // });
        console.log(data);
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
        Toast.notifyError("Đã có lỗi. Vui lòng thử lại")
      }
      

    }

    const onFinishAddItem = async (values) => {
      try{
        setIsLoading(true);
       // const result= await actions.onUpdateCategoryRequest(params.id,values);
        setIsLoading(false);
        //Toast.notifySuccess(`Cập nhật thể loại sản phẩm thành công. Bạn có thể tìm kiếm với mã ${result.id}`);
        history.push('/categories');
        setIsLoading(false);
      }catch(e){
        setIsLoading(false);
        console.log(e);
        Toast.notifyError("Đã có lỗi xảy ra vui lòng kiểm tra lại");
      }
       
    };

  const onDeleteProduct=async(item)=>{
    try{
      const check=window.confirm(`Bạn có muốn xóa sản phẩm ${item.id}`);
      if(check){
        setIsLoading(true);
     //   await actions.onDeleletProductRequest(item.id);
        setIsLoading(false);
        Toast.notifySuccess('Đã xóa sản phẩm thành công');
        setPageIndex(1);
        onGetListProduct({
          pageIndex:1,
          pageSize
        })
      }
    }catch(e){
      setIsLoading(false);
      Toast.notifyError('Đã có lỗi xảy ra vui lòng thử lại!');
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
        <BreadcrumbLayout root="Product" branch="manage" />
        <div className="site-layout-background" style={{ padding: 24, minHeight: 360, position: 'relative' }}>
          <Title className="main-title" level={2}>
            Danh sách sản phẩm
          </Title>

          <Divider plain>Hiển thị hóa đơn</Divider>
          <Form
            {...layout}
            form={form}
            name="nest-messages"
            onFinish={onFinishAddItem}
            validateMessages={validateMessages}
          >
            <Form.Item
              name="slug"
              label="Tên khách hàng"
              disabled={true}
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input disabled={true}/>
            </Form.Item>
            <Form.Item
              name="name"
              label="Địa chỉ"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="description"
              label="Số điện thoại"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="description"
              label="Chi phí thanh toán"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="description"
              label="Ngày đặt hàng"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 10 }}>
              <Button type="primary" htmlType="submit">
                Thêm thể loại
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
              <Column title="Kích cở" dataIndex="size"/>
              <Column title="Số lượng" dataIndex="quantity"/>
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

export default ManageOrderPage;
