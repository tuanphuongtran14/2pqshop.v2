import * as types from './../constants/ActionTypes'

var initialState=[
];
const products=(state=initialState,action)=>{
    switch(action.type){
        case types.FETCH_PRODUCTS:
             return action.products;
        default:
            return [...state];
}}


export default products;
