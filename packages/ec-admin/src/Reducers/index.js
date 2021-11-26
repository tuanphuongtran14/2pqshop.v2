import { combineReducers } from "redux";
import auth from '../Containers/LoginPage/Reducers/auth';
// import status from '../Containers/TestPage/reducers/status'
// import lstProduct from '../Containers/TestPage/reducers/lstProduct'

const AppReducer=combineReducers({
    auth
    // status,
    // lstProduct
})

export default AppReducer;