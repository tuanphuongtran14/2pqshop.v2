/* eslint-disable no-template-curly-in-string */
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import {
  Layout as AntLayout,
  Typography,
  Form,
  Input,
  Button,
  Select,
  Row,
  Col,
  Switch,
  DatePicker,
  notification,
} from 'antd';
import { connect } from 'react-redux';
import moment from "moment"
import * as actions from './actions';
import { HeaderLayout, BreadcrumbLayout, FooterLayout } from '../../Components';
import LoadingScreen from '../../Components/LoadingScreen';
const { Content } = AntLayout;
const { Option } = Select;
const { Title } = Typography;

const StyledCreateOrderForm = styled(AntLayout)`
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
`;

const openNotification = (type, message, description) => {
  notification[type]({
    message,
    description,
    placement: "topRight",
  });
};

const EditUser = ({ fetchUserById, fetchRoles, updateUserById, fetchUsers }) => {
  const location = useLocation();
  const [user, setUser] = useState({});
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form] = Form.useForm();
  const layout = {
    labelCol: {
      span: 6,
    },
    wrapperCol: {
      span: 6,
    },
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(location);
        const id = location.state.id;
        const [user, roles] = await Promise.all([
          fetchUserById(id),
          fetchRoles(),
        ]);
        setUser(user);
        setRoles(roles.filter(role => role.key !== 'public'));
        setLoading(false);
        console.log(user);
      } catch (error) {
        setLoading(false);
        const { data: messageCode } = error.response ? error.response.data : {};
        switch (messageCode) {
          default:
            openNotification("error", "L???y d??? li???u th???t b???i", "Kh??ng th??? li??n l???c t???i m??y ch???");
            break;
        }
      }
    };
    fetchData();
  }, [fetchRoles, fetchUserById, location]);

  const onFinish = (values) => {
    const update = async () => {
      try {
        const id = location.state.id;
        delete values.email;
        setLoading(true);
        const user = await updateUserById(id, values);
        fetchUsers();
        setUser(user);
        setLoading(false);
        openNotification("success", "C???p nh???t th??nh c??ng", "D??? li???u ???? ???????c l??u th??nh c??ng");
      } catch (error) {
        setLoading(false);
        const { data: messageCode } = error.response ? error.response.data : {};
        switch (messageCode) {
          default:
            openNotification("error", "C???p nh???t th???t b???i", "Kh??ng th??? li??n l???c t???i m??y ch???");
            break;
        }
      }
    };
    update();
  };


  const validateMessages = {
    required: '${label} is required!',
    types: {
      email: '${label} is not a valid email!',
      number: '${label} is not a valid number!',
    },
    number: {
      range: '${label} must be between ${min} and ${max}',
    },
  };

  if (loading) {
    return (<LoadingScreen />);
  }

  return (
    <StyledCreateOrderForm>
      <HeaderLayout />
      <Content style={{ margin: '0 16px' }}>
        <BreadcrumbLayout root="Ngu???i d??ng" branch="Ch???nh s???a" />

        <div className="site-layout-background" style={{ padding: 24, minHeight: 360, display: "flex", alignItems: "center", flexDirection:"column" }}>
          <Title className="main-title" level={3}>
            Ch???nh s???a th??ng tin ng?????i d??ng
          </Title>

          <Form
            form={form}
            style={{ width: "60%"}}
            labelCol={{
              span: 6,
            }}
            wrapperCol={{
              span: 18,
            }}
            name="nest-messages"
            onFinish={onFinish}
            validateMessages={validateMessages}
            fields={[
              {
                name: ["firstName"],
                value: user.firstName,
              },
              {
                name: ["lastName"],
                value: user.lastName,
              },
              {
                name: ["phone"],
                value: user.phone,
              },
              {
                name: ["email"],
                value: user.email,
              },
              {
                name: ["role"],
                value: user.role ? user.role._id : undefined,
              },
              {
                name: ["gender"],
                value: user.gender
              },
              {
                name: ["isConfirmed"],
                value: user.isConfirmed
              },
              {
                name: ["blocked"],
                value: user.blocked
              },
              {
                name: ["birthday"],
                value: user.birthday ? moment(user.birthday, "YYYY-MM-DD") : undefined
              },
            ]}
          >
            <Row>
              <Col span={11}>
                <Form.Item name='firstName' label="First name" rules={[{ required: true }]} value={user.firstName}>
                  <Input />
                </Form.Item>
              </Col>
              <Col span={2} />
              <Col span={11}>
                <Form.Item name='lastName'label="Last name" rules={[{ required: true }]}>
                  <Input />
                </Form.Item>
              </Col>
            </Row>

            <Row>
              <Col span={11}>
                <Form.Item name='email' label="Email" rules={[{ type: 'email', required: true }]}>
                  <Input disabled={true} />
                </Form.Item>
              </Col>
              <Col span={2} />
              <Col span={11}>
                <Form.Item name='phone' label="Phone" rules={[{ required: true }, {pattern: new RegExp(/^[0-9]*$/g), message: "S??? ??i???n tho???i kh??ng h???p l???"}]}>
                  <Input />
                </Form.Item>
              </Col>
            </Row>

            <Row>
              <Col span={11}>
                <Form.Item name="birthday" label="Ng??y sinh">
                  <DatePicker style={{width: "100%"}} />
                </Form.Item>
              </Col>
              <Col span={2} />
              <Col span={11}>
                <Form.Item
                  name="role"
                  label="Ph??n quy???n"
                  hasFeedback
                  rules={[{ required: true, message: 'H??y ch???n ph??n quy???n cho ng?????i d??ng' }]}
                >
                  <Select placeholder="Ph??n quy???n">
                    {
                      roles.map(role => (
                        <Option value={role.id}>{role.name}</Option>
                      ))
                    }
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            <Row>
              <Col span={11}>
                <Form.Item
                  name="gender"
                  label="Gi???i t??nh"
                  hasFeedback
                  rules={[{ required: true, message: 'H??y ch???n gi???i t??nh c???a b???n' }]}
                >
                  <Select placeholder="Gi???i t??nh">
                    <Option value="MALE">Nam</Option>
                    <Option value="FEMALE">N???</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={2} />
              <Col span={11}>
                <Form.Item name="isConfirmed" label="???? x??c th???c" valuePropName="checked">
                  <Switch />
                </Form.Item>
              </Col>
            </Row>

            <Row>
              <Col span={11}>
                <Form.Item name="blocked" label="???? ch???n" valuePropName="checked">
                  <Switch />
                </Form.Item>
              </Col>
              <Col span={2} />
              <Col span={11}>
              </Col>
            </Row>
            
            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 10 }} style={{ marginTop: "15px" }}>
              <Button type="primary" htmlType="submit">
                C???p nh???t th??ng tin
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Content>
      <FooterLayout />
    </StyledCreateOrderForm>
  );
};

const mapStateToProps = (state) => {};
const mapDispatchToProps = (dispatch) => {
  return {
    fetchUsers: (queryParams, page, pageSize) => {
      dispatch(actions.fetchUsers(queryParams, page, pageSize));
    },
    fetchUserById: (id) => actions.fetchUserById(id),
    fetchRoles: () => actions.fetchRoles(),
    updateUserById: (id, params) => actions.updateUserById(id, params),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditUser);
