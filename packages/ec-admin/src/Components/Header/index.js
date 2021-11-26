import React, { useState } from 'react';
import styled from 'styled-components';
import {
  Layout as AntLayout,
  Typography,
  Button,

} from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
const { Header } = AntLayout;
const { Text } = Typography;
const HeaderLayout=()=>{
    return(
        <Header className="site-layout-background" style={{padding:'0 20px',textAlign: 'right'}}>
            <Text style={{margin:'10px'}} className="info-login" >Chúc mừng sinh nhật Quốc đẹp trai</Text>
            <Button className="btn-success" >Đăng xuất</Button>
        </Header>
    )
    
}

export default HeaderLayout;