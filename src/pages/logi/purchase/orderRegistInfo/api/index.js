import axios from 'api/logiApi'; //'${process.env.REACT_APP_DOCKER_API_URL}/logi'

export const searchOrderList = (param) => {
  return axios.get('/purchase/order/list', {
    params: {
      startDate: param.startDate,
      endDate: param.endDate
    }
  });
};

export const searchOrderDialogList = (param) => {
  console.log(param);
  const mrpGatheringNoListString = param.selectedRows.join(',');
  return axios.get('/purchase/order/dialog', {
    params: {
      mrpGatheringNoList: mrpGatheringNoListString
    }
  });
};

export const registerOrder = (param) => {
  console.log(param.selectedRows);
  
  const formData = new FormData();
  formData.append('mrpGatheringNoList', JSON.stringify(param.selectedRows));

  axios.post('/purchase/order', formData);
};

export const searchOrderInfoList = (param) => {
  return axios.get('/purchase/order/info', {
    params: {
      startDate: param.startDate,
      endDate: param.endDate
    }
  });
};