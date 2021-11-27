import axios from './../../Configs/Axios';


export const countNewOrders = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const count = await axios.get("/orders/count/new-orders");
      resolve(count);
    } catch (e) {
      reject(e.response);
    }
  });
};

export const countOrdersInCurrentDay = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const count = await axios.get("/orders/count/current-day");
      resolve(count);
    } catch (e) {
      reject(e.response);
    }
  });
};

export const countOrdersInCurrentMonth = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const count = await axios.get("/orders/count/current-month");
      resolve(count);
    } catch (e) {
      reject(e.response);
    }
  });
};

export const countOrdersBytMonth = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const data = await axios.get("/orders/count/by-month");
      resolve(data);
    } catch (e) {
      reject(e.response);
    }
  });
};

export const getProfitInCurrentMonth = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const totalProfit = await axios.get("/orders/stat/profit-current-month");
      if (typeof totalProfit === 'object')
        resolve(totalProfit.data);
        
      resolve(totalProfit);
    } catch (e) {
      reject(e.response);
    }
  });
};

export const getProfitByMonth = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const data = await axios.get("/orders/stat/profit-by-month");
      resolve(data);
    } catch (e) {
      reject(e.response);
    }
  });
};

