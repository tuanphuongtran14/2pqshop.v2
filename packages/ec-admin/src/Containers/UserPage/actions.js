import * as types from './Constants';
import axios from './../../Configs/Axios';
import qs from "qs";

export const setUsers = (page) => {
  return {
    type: types.SET_USERS,
    page,
  };
};

export const fetchUsers = (queryParams = {}, page = 1, pageSize = 100) => {
  return async (dispatch) => {
    const query = qs.stringify({
      ...queryParams,
      page,
      pageSize,
    });
    const { results, pagination } = await axios.get(`/users?${query}`);
    dispatch(setUsers({ results, pagination }));
  };
};
