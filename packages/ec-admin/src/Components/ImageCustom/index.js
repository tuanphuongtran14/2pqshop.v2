import React from 'react';

const ImageLayoutCustom = (props) => {
  const {listImage}=props;

  return (
    <>
    <div className="mb-4" style={{width:'80%',margin:'0 auto', display: 'flex', flexWrap: 'wrap', justifyContent: 'center'}}>
      { 
        (listImage.length>0) ?
          listImage.map((item,index)=>{
            return (
              <div key={index} className=" me-2">
                <img alt={item} src={`http://localhost:8081${item}`} style={{width:'100px',height:'120px'}} />
              </div>
            )
          })
        :null
        
      }
    </div>
    </>
  );
};

export default ImageLayoutCustom;