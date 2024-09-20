import logiApi from 'api/logiApi';
import axios from 'api/logiApi';

export const downloadReport = (param) => {
  return axios.get('/sales/logisticExel', {
    params: param
  });
};

export const searchEstimate = async (param) => {
  const result = await axios.get('/logisales/estimate/list', {
    params: param
  });
  return result.data;
};

export const estimateCellClicked = async (params) => {
  const result = await axios.get('/logisales/estimatedetail/list', {
    params: {
      estimateNo: params.data.estimateNo
    }
  });
  return result.data;
};

export const searchItemCode = async (param) => {
  const result = await axios.get('/logiinfo/item/standardunitprice', {
    params: param
  });

  return result.data;
};

export const saveEstimateRow = async (param) => {
  const result = await axios.post(
    '/logisales/estimate/new',
    {
      estimateDate: param.estimateDate,
      newEstimateInfo: param
    },
    {
      headers: {
        'Content-Type': 'application/json'
      }
    }
  );
  return result.data;
};

export const searchCustomer = async () => {
  const result = await axios.get('/compinfo/customer/list', {
    params: {
      searchCondition: 'ALL',
      workplaceCode: ''
    }
  });
  return result.data;
};

export const searchItem = async () => {
  const result = await axios.get('/compinfo/codedetail/list', {
    params: {
      divisionCodeNo: 'IT-_I'
    }
  });
  return result.data;
};

export const searchDetailList = async (params) => {
  const result = await axios.get('/logisales/contractdetail/list', {
    params: {
      contractNo: params.data.contractNo
    }
  });
  return result.data;
};

export const searchContractList = async (param) => {
  const result = await axios.get(
    '/logisales/contract/list',
    {
      params: param
    },
    { withCredentials: true }
  );
  console.log(result.data);
  return result.data;
};

export const estimateSearch = async (param) => {
  const result = await axios.get('/logisales/estimate/list/contractavailable', {
    params: param
  });
  return result.data;
};

export const addContract = async (param) => {
  const result = await axios.post('/logisales/contract/new', {
    // batchList: param.batchList,
    // 그리드에서 다중선택 가능하게해서 배열로 넘겨야할듯 백단 원래 배열로 받는 로직도 주석으로 남겨놨으니 참고
    contractType: param.contractType,
    estimateNo: param.estimateNo,
    description: param.description,
    contractRequester: param.contractRequester,
    customerCode: param.customerCode,
    contractNo: param.contractNo,
    contractDate: param.contractDate,
    personCodeInCharge: param.personCodeInCharge
  });
  return result.data;
};

export const searchContractType = async () => {
  const result = await axios.get('/compinfo/codedetail/list', {
    params: {
      divisionCodeNo: 'CT'
    }
  });

  return result.data;
};

export const searchDialogCustomer = async () => {
  const result = await axios.get(
    '/compinfo/codedetail/list',
    {
      params: {
        divisionCodeNo: 'CL-01'
      }
    }
    //{ withCredentials: true }
  );

  return result.data;
};

// export const deliveryAvailableApi = (action: any) => {
//   console.log("hgfhjgfhjgfjh",action);
//   return axios.get('/sales/deliver/list/contractavailable', {
//     params: {
//       startDate: action.payload.startDate,
//       endDate: action.payload.endDate,
//       searchCondition: action.payload.searchCondition,
//       customerCode: action.payload.customerCode
//     }
//   });
// };

// 조회
const GET_API_URL = '/sales/deliver/list/contractavailable';

export const deliveryAvailableApi = async (ableContractInfo: any) => {
  try {
    const response = await logiApi.get(GET_API_URL, {
      params: { ableContractInfo }
    });
    console.log('있니?', response.data.gridRowJson);
    return response.data.gridRowJson;
  } catch (error) {
    console.log('error');
  }
};

// export const deliveryCompleteApi = () => {
//   return axios.get('/sales/delivery/list');
// };

// 납품현황
const COMPELETE_API_URL = '/sales/delivery/list';

export const deleveryCompleteApi = async () => {
  try {
    const response = await logiApi.get(COMPELETE_API_URL);
    console.log('api에 왔니?', response.data.gridRowJson);
    return response.data.gridRowJson;
  } catch (error) {
    console.log('error');
  }
};

// export function contractDetailListInMpsAvailable(param) {
//   return axios.get('http://localhost:8284/production/mps/contractdetail-available', {
//     batchList: param.searchCondition,
//     contractDate: param.startDate,
//     personCodeInCharge: param.endDate
//   });
// }