import React, { useState } from 'react';
import 'antd/dist/antd.css';
import { Layout, Menu } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { HomeOutlined, TagOutlined , UserOutlined, ShoppingCartOutlined,SkinOutlined, FilterOutlined } from '@ant-design/icons';

const { Sider } = Layout;
const StyledSider = styled(Sider)`
  .logo {
    height: 32px;
    margin: 16px;
    background: rgba(255, 255, 255, 0.3);
  }
  
  
`;
const { SubMenu } = Menu;

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const onCollapse = () => {
    setCollapsed(!collapsed);
  };

  return (
    <StyledSider collapsible collapsed={collapsed} onCollapse={onCollapse} >
      <div className="logo" />
      <Menu theme="dark" defaultSelectedKeys={[location.pathname]} mode="inline">
        <Menu.Item key="/" icon={<HomeOutlined />}>
            <span>Home Page</span>
            <Link to="/"></Link>
        </Menu.Item>
        <SubMenu key="product" icon={<SkinOutlined  />} title="products">
          <Menu.Item key="/manage-products">
                <span>Manage products</span>
                <Link to="/manage-products">
                </Link>
          </Menu.Item>
          <Menu.Item key="/create-product">
            <span>Create products</span>
            <Link to="/create-product">
            </Link>
          </Menu.Item>
        </SubMenu>
        <SubMenu key="category" icon={<FilterOutlined />} title="category">
          <Menu.Item key="/manage-categorys">
            <span>Manage categorys</span>
            <Link to="/manage-categorys">
            </Link>
          </Menu.Item>
          <Menu.Item key="/create-category">
            <span>Create category</span>
            <Link to="/create-category">
            </Link>
          </Menu.Item>
        </SubMenu>
        <SubMenu key="tag" icon={<TagOutlined />} title="tag">
          <Menu.Item key="/manage-tags">
            <span>Manage tags</span>
            <Link to="/manage-tags">
            </Link>
          </Menu.Item>
          <Menu.Item key="/create-tag">
            <span>Create tag</span>
            <Link to="/create-tag">
            </Link>
          </Menu.Item>
        </SubMenu>
        <SubMenu key="order" icon={<ShoppingCartOutlined />} title="order">
          <Menu.Item key="/manage-orders">
            <span>Manage orders</span>
            <Link to="/manage-orders">
            </Link>
          </Menu.Item>
          <Menu.Item key="/create-order">
            <span>Create order</span>
            <Link to="/create-order">
            </Link>
          </Menu.Item>
        </SubMenu>
        <Menu.Item key="/register-admin" icon={<UserOutlined />}>
            <span>Register new admin</span>
            <Link to="/register-admin"></Link>
        </Menu.Item>
      </Menu>
    </StyledSider>
  );
};

export default Sidebar;
// .ant-menu{
//   color:white;
//   background:#3155E2 !important;
// }
// .ant-menu > .ant-menu-item:hover,
// .ant-menu > .ant-menu-submenu:hover{
//   color: red;
//   background: #5e8e2f !important;
// }
// .ant-menu > .ant-menu-item-active,
// .ant-menu> .ant-menu-submenu-active,
// .ant-menu > .ant-menu-item-selected,
// .ant-menu > .ant-menu-submenu-selected {
//   color: red;
//   background: #84ea1e !important;
// }
// .ant-menu > .ant-menu-item-open,
// .ant-menu> .ant-menu-submenu-open,
