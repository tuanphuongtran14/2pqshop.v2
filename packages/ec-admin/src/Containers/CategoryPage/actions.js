import * as types from './Constants'
import axios from './../../Configs/Axios'


export const onGetListCatagorysRequest=({pageIndex,pageSize})=>{
    return new Promise( async(resolve, reject) => {
        try{
            const data= await axios.get(`/categories?page=${pageIndex}&pageSize=${pageSize}`);
            resolve(data);
        
        }catch(e){
            reject(e.response)
        }
    })
}
