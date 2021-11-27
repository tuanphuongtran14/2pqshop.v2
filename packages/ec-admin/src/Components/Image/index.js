import React, { useEffect} from 'react';
import { Upload } from 'antd';
import ImgCrop from 'antd-img-crop';

const ImageLayout = (props) => {
  const {fileList, setFileList}=props;

  const onChange = ({ file,fileList: newFileList }) => {
    setFileList(newFileList);
    

  };

  const onPreview = async file => {
    let src = file.url;
    if (!src) {
      src = await new Promise(resolve => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow.document.write(image.outerHTML);
  };

  const onChangeFile=(e)=>{
    const lst=[];
    lst.push(e.target.files[0]);
    setFileList(lst);
  }
  return (
    <ImgCrop rotate >
      <Upload
        listType="picture-card"
        fileList={fileList}
        onChange={onChange}
        beforeUpload={() => false} 
        onPreview={onPreview}
      >
       {fileList.length < 5 && '+ Upload'}
      </Upload>
    </ImgCrop>
    
  );
};

export default ImageLayout;