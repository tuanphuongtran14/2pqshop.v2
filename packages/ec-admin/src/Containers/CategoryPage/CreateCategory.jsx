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
  Popconfirm,
  message,
  InputNumber,
  Row, Col,Space
} from 'antd';
import {HeaderLayout, BreadcrumbLayout,FooterLayout,ImageLayout} from './../../Components'
const { Content } = AntLayout;
const { Title, Text } = Typography;

const StyledCreateCategoryForm = styled(AntLayout)`
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
    bCategory-radius: 10px;
    bCategory-color: #058d23;
    background-color: #058d23;
  }
`;

const CreateCategoryForm = () => {
  const [showReportResult, setShowReportResult] = useState(false);
  const [dateData, setDateData] = useState({ month: '', year: '' });

  const layout = {
    labelCol: {
      span:6,
    },
    wrapperCol: {
      span: 14,
    },
  };

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
  return (
    <StyledCreateCategoryForm >
      <HeaderLayout />
      <Content style={{ margin: '0 16px' }}>
      <BreadcrumbLayout root="Category" branch="create" />

        <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
          <Title className="main-title" level={2}>
            Form thêm sản phẩm
          </Title>
          
          <Divider plain>Thêm hình ảnh sản phẩm</Divider>
          <div class="mt-2 text-center">
            <ImageLayout/>
          </div>
          <Form
            {...layout}
            name="nest-messages"
            validateMessages={validateMessages}
          >
            <Form.Item
              name="carName"
              label="Tên sản phẩm"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="numberRepair"
              label="Loại sản phẩm"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="ratio"
              label="Giá cả"
              rules={[
                {
                  required: true,
                  type: 'number',
                  min: 0,
                  max: 100,
                },
              ]}
            >
              <InputNumber style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item
              name="total"
              label="Thể loại"
              rules={[
                {
                  required: true,
                  type: 'number',
                },
              ]}
            >
              <InputNumber style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 10 }}>
              <Button type="primary" htmlType="submit">
                Thêm sản phẩm
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Content>
      <FooterLayout />
    </StyledCreateCategoryForm>
  );
};

export default CreateCategoryForm;
