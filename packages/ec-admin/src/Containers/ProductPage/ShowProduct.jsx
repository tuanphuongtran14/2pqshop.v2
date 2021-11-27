/* eslint-disable no-template-curly-in-string */
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import * as actions from './actions';
import {useHistory, useLocation, useParams} from 'react-router-dom'
import {
  Layout as AntLayout,
  Typography,
  Form,
  Input,
  Button,
  Divider,
  Checkbox,
  InputNumber,
  Row, Col,
  Select,
  Space
} from 'antd';

import {HeaderLayout, BreadcrumbLayout,FooterLayout, ImageCustomLayout, LoadingScreenCustom, Toast} from './../../Components'
import { generateSku, removeAccents} from '../../helper/generateSku';
const { Content } = AntLayout;
const { Title, Text } = Typography;
const { Option } = Select;
const { TextArea } = Input;
const StyledShowProductForm = styled(AntLayout)`
  .main-title {
    margin-bottom: 30px;
    text-align: center;

    &-result {
      text-align: center;
    }
  }

  .filter-form {
    justify-content: center;
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

  .site-layout-background {
    background: #fff;
    position: relative;
    z-index:0
  }
`;

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

const ShowProductForm = () => {
  const history=useHistory();
  const [lstCategory,setListCategory]=useState([]);
  const [lstTag,setListTag]=useState([]);
  const lstGrade=[1,2,3,4,5];
  const [fileList, setFileList]=useState([]);
  const [optionS,setOptionS]=useState(false)
  const [optionM,setOptionM]=useState(false)
  const [optionL,setOptionL]=useState(false)
  const [optionXL,setOptionXL]=useState(false)
  const [product,setProduct]=useState({});
  const [grade,setGrade]=useState(0);
  const [listOption,setListOption]=useState([]);
  const location=useLocation();
  const [form] = Form.useForm();
  const [listImage,setListImage]=useState([]);
  const params=useParams();
  const [isLoading,setIsLoading] = useState(false);

  const layout = {
    labelCol: {
      span:6,
    },
    wrapperCol: {
      span: 14,
    },
  };

  useEffect(()=>{
    getListCategoryRequest();
    getListTagRequest();
    let id =location.state.id;
    getProductById(id);
  },[])

  const setForm=(product,options,grade)=>{
    let txtInputM=null;
    let txtInputS=null;
    let txtInputL=null;
    let txtInputXL=null;
    options.forEach(item=>{
      if(item.size==='S'){
        
        txtInputS=item.remaining
      }
      if(item.size==='M'){
        
        txtInputM=item.remaining
      }
      if(item.size==='L'){
        
        txtInputL=item.remaining
      }
      if(item.size==='XL'){
        
        txtInputXL=item.remaining
      }
    })
    setListOption(options);
    form.setFieldsValue({
      slug:product.slug,
      name:product.name,
      price:product.price,
      grade:grade,
      category:product.category,
      tags:product.tags,
      shortDesc:product.shortDesc,
      fullDesc:product.fullDesc,
      additionalInfo:product.additionalInfo,
      quantityM:txtInputM?txtInputM:0,
      quantityS:txtInputS?txtInputS:0,
      quantityL:txtInputL?txtInputL:0,
      quantityXL:txtInputXL?txtInputXL:0
    });
  }
  const getProductById= async (slug)=>{
    try{
      setIsLoading(true);
      let data = await actions.onGetProductByIdRequest(slug);
      setGrade(data.rating.grade);
      mapImageInData(data.images);
      setListImage(data.images);
      setProduct(data);
      setForm(data,data.options,data.rating.grade);
      setIsLoading(false);
    }
    catch(e){
      setIsLoading(false);
      console.log(e);
      Toast.notifyError("Đã có lỗi trong quá trình lấy dữ liệu");
    }
  }

  const mapImageInData=(list)=>{
    setListImage(list);
    let listData=[]
    list.forEach((item,index)=>{
      let data={
          uid: `-${index}`,
          name: item,
          status: 'done',
          url: `http://localhost:8081${item}`,
        }
        listData.push(data);
    })
    setFileList(listData);
  }

  const getListCategoryRequest=async()=>{
    try{
      setIsLoading(true);
      const data= await actions.onGetListCategoryRequest();
      setListCategory(data.results);
      setIsLoading(false);
    }catch(e){
      console.log(e);
      setIsLoading(false);
      Toast.notifyError("Đã có lỗi xảy ra khi lấy dữ liệu category")
    }
    
  }

  const getListTagRequest=async()=>{
    setIsLoading(true);
    try{
      const data= await actions.onGetListTagRequest();
      setListTag(data.results);
      setIsLoading(false);
    }catch(e){
      setIsLoading(false);
      Toast.notifyError("Đã có lỗi khi lấy danh sách tag")
    }
    
  }
  
  const onFinishAddItem = async (values) => {
  };

  

  const onChangeName= (e)=>{
  }
  const handleSizeS = (event) => {

    // if(!event.target.checked){
    //   setOptionS(false);
    // }else{
    //   setOptionS(true);
    // }
}

  const handleSizeM = (event) => {
    // if(!event.target.checked){
    //   setOptionM(false);
    // }else{
    //   setOptionM(true);
    // }
  }

  const handleSizeL = (event) => {
    // if(!event.target.checked){
    //   setOptionL(false);
    // }else{
    //   setOptionL(true);
    // }
  }

  const handleSizeXL = (event) => {
    // if(!event.target.checked){
    //   setOptionXL(false);
    // }else{
    //   setOptionXL(true);
    // }
  }

  const onRedirectUpdate=()=>{
    history.push({pathname:`/update-product/${params.slug}`,
    state:{
      id:location.state.id,
    }})
  }
  return (
    <StyledShowProductForm >
      <HeaderLayout />
      <Content style={{ margin: '0 16px' }}>
      <BreadcrumbLayout root="Product" branch="show" />

        <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
          <Title className="main-title" level={2}>
           Hiển thị sản phẩm
          </Title>
          < Divider plain style={{width:"60%"}}>Hình ảnh sản phẩm đã tạo</Divider>
          <div className="mt-2 text-center">
            <ImageCustomLayout listImage={listImage} />
          </div>
          <Form
            form={form}
            {...layout}
            name="nest-messages"
            onFinish={onFinishAddItem}
            validateMessages={validateMessages}
            fields={[
              {
                name: ["slug"],
                value: product.slug,
              }]
            }
          >
            <Form.Item
              name="slug"
              label="Slug"
              disabled={true}
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input  disabled={true}/>
            </Form.Item>
            <Form.Item
              name="name"
              label="Tên sản phẩm"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input disabled={true} onChange={onChangeName}/>
            </Form.Item>
            <Form.Item name="price" label="Giá cả"
              rules={[
                {
                  required: true,
                  type: 'number',
                  min: 10000,
                },
              ]}>
                <InputNumber disabled={true} style={{ width: '100%' }} />
            </Form.Item>
            <div className="form-group col-12 mx-0 px-0 mb-2 mt-2" style={{ zIndex: "0" }}>
                  <div style={{width:'70%',margin:'0px auto'}}>
                    <label  htmlFor="category">Kích cỡ & Số lượng</label>
                  </div>
                  <div className="border size-listing px-3 pt-2 pb-3" style={{width:'70%',margin:'0px auto'}}>
                  <Row>
                    <Col span={9}>
                        <Checkbox checked={optionS} onChange={handleSizeS}>Size S</Checkbox>
                    </Col>
                    <Col span={12}>
                      <Form.Item name="quantityS" label ="Số lượng">
                        <InputNumber disabled={!optionS}  style={{width:'80%'}}/>
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={9}>
                      
                      <Checkbox checked={optionM} onChange={handleSizeM}>Size M</Checkbox>
                      
                    </Col>
                    <Col span={12}>
                      <Form.Item name="quantityM" label ="Số lượng">
                        <InputNumber disabled={!optionM}  style={{width:'80%'}}/>
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={9}>
                      
                      <Checkbox checked={optionL} onChange={handleSizeL}>Size L</Checkbox>
                      
                    </Col>
                    <Col span={12}>
                      <Form.Item name="quantityL" label ="Số lượng">
                        <InputNumber disabled={!optionL}  style={{width:'80%'}}/>
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={9}>
                      
                      <Checkbox checked={optionXL} onChange={handleSizeXL}>Size XL</Checkbox>
                      
                    </Col>
                    <Col span={12}>
                      <Form.Item name="quantityXL" label ="Số lượng">
                        <InputNumber disabled={!optionXL}  style={{width:'80%'}}/>
                      </Form.Item>
                    </Col>
                  </Row>
                  </div>
              </div>
            <Form.Item name="grade" label="Xếp hạng"
              rules={[
                {
                  required: true,
                },
              ]}>
                <Select
                    showSearch
                    disabled={true}
                    style={{ width: '100%' }}
                    placeholder="Đánh giá sản phẩm"
                    optionFilterProp="children"
                    optionLabelProp="label"
                    filterOption={(input, option) =>{
                      return Number(option.value)===Number(input);
                    }
                  }
                  >{
                    lstGrade.map((item,index)=>(
                      <Option value={item} key={index}>
                        {item}
                      </Option>
                    ))
                  }
                  </Select> 
            </Form.Item>
            <Form.Item name="category" label="Thể loại"
              rules={[
                {
                  required: true,
                },
              ]}>
                <Select
                    showSearch
                    style={{ width: '100%' }}
                    disabled={true} 
                    placeholder="Chọn thể loại"
                    optionFilterProp="children"
                    optionLabelProp="label"
                    filterOption={(input, option) =>{
                        return option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0
                      }
                    }
                  > 
                  {
                    lstCategory.map((item,index)=>(
                      <Option value={item.name} key={index}>
                          {item.name}
                      </Option>
                    ))
                  } 
                  </Select> 
            </Form.Item>
            <Form.Item
              name="tags"
              label="Nhãn"
              rules={[
                {
                  required: true,

                },
              ]}
            >
              <Select
                    mode="multiple"
                    style={{ width: '100%' }}
                    placeholder="Chọn nhãn"
                    optionLabelProp="label"
                    disabled={true}
                  >
                    {
                    lstTag.map((item,index)=>(
                      <Option value={item.name} label={item.name} key={index}>
                        <div className="demo-option-label-item">
                          {item.name}
                        </div>
                      </Option>
                    ))
                  } 
                  </Select>
            </Form.Item>
            <Form.Item
              name="shortDesc"
              label="Mô tả ngắn"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <TextArea disabled={true} rows={3}/>
            </Form.Item>
            <Form.Item
              name="fullDesc"
              label="Mô tả"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <TextArea disabled={true} rows={7} />
            </Form.Item>
            <Form.Item
              name="additionalInfo"
              label="Thông tin thêm"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <TextArea disabled={true} rows={5}/>
            </Form.Item>
          </Form>
          <Space align="center">
            <Button type="primary" className="text-center" onClick={onRedirectUpdate}>
              Chỉnh sửa sản phẩm
            </Button>
          </Space>
          <LoadingScreenCustom isLoading={isLoading} setIsLoading={setIsLoading}/>
        </div>
      </Content>
      <FooterLayout />
    </StyledShowProductForm>
  );
};

export default ShowProductForm;
