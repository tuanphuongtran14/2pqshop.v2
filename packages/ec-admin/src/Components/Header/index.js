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
    const HeaderStyled = styled(Header)`
    .info-login{
        margin: 10px;
    }
    .btn-logout{
        background:	#00FF00;
        color:#FFFFFF;
    }`;
    return(
        <HeaderStyled className="site-layout-background" style={{padding:'0 20px',textAlign: 'right'}}>
            <Text className="info-login" >Hello Quốc đẹp trai</Text>
            <Button className="btn-success" >Đăng xuất</Button>
        </HeaderStyled>
    )
    
}

export default HeaderLayout;