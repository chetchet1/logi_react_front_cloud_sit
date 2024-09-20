import axios from 'api/logiApi'; //'${process.env.REACT_APP_DOCKER_API_URL}/logi'

export const searchStockList = (param) => {
  return axios.get('/stock/sto/list');
};

export const searchOrderInfoDeliveryList = (param) => {
  return axios.get('/purchase/order/delivery');
};

export const putInspectionStock = (param) => {
  const sendData = param.join(',');
  axios.put('/stock/inspection', { sendData: sendData });
};

export const getwarehousingStock = (param) => {
  const paramString = param.join(',');
  axios.get('/stock/sto/warehousing', {
    params: {
      orderNoList: paramString
    }
  });
};

export const getStockLog = (param) => {
  return axios.get('/stock/sto/log-list', {
    params: {
      startDate: param.startDate,
      endDate: param.endDate
    }
  });
};