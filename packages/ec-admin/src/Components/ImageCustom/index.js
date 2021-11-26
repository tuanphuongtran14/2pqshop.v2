import React, {useRef, useEffect} from 'react';
import { Upload } from 'antd';
import ImgCrop from 'antd-img-crop';
const ImageLayoutCustom = (props) => {
  const {listImage, setListImage, fileList,setFileList}=props;
  const refImage = useRef(null);
  const refUpload = useRef(null);
  const onRemove = (item) => {
    let list = [...listImage];
    let index = list.findIndex(data=>data===item);
    list.splice(index,1);
    setListImage(list);

  };
  const onChange = ({ file,fileList: newFileList }) => {
    setFileList(newFileList);
    

  };
  // useEffect(()=>{
  //   let height1=refUpload.current.clientHeight;
  //   console.log(height1);
  // })

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

  return (
    //<ImgCrop rotate >
    <>
    <div  style={{width:'80%',margin:'0 auto', display: 'flex', flexWrap: 'wrap'}}>
      { 
        (listImage.length>0) ?
          listImage.map((item,index)=>{
            return (
              <div key={index} className=" me-2" style={{position:'relative'}}>
                <span style={{position:'absolute',top:'2px',right:'2px'}} className="text-danger" onClick={()=>onRemove(item)}><i class="far fa-2x fa-window-close"></i></span> 
                <img alt={item} src={`http://localhost:8081${item}`} style={{width:'100px',height:'120px'}} ref={refImage}/>
              </div>
            )
          })
        :null
        
      }
      <ImgCrop rotate >
      <Upload
        ref={refUpload}
        listType="picture-card"
        fileList={fileList}
        onChange={onChange}
        beforeUpload={() => false} 
        onPreview={onPreview}
      >
       {fileList.length < 5 && '+ Upload'}
      </Upload>
    </ImgCrop>
    </div>
    </>
  );
};

export default ImageLayoutCustom;