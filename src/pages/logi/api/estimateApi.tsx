import axios from 'api/logiApi';

export const getEstimateData = (action) =>
  axios.get('/logisales/estimate/list', {
    params: {
      startDate: action.payload.startDate,
      endDate: action.payload.endDate,
      dateSearchCondition: action.payload.dateSearchCondition
    }
  });

export const postEstimateData = (action) =>
  axios.post(
    '/logisales/estimate/new',
    {
      estimateDate: action.payload.estimateDate,
      newEstimateInfo: action.payload.newData
    },
    {
      headers: {
        'Content-Type': 'application/json'
      }
    }
  );

// const getEstimateData2 = async (startDate:string, endDate:string, dateSearchCondition:string) => {
//   const params = {
//     startDate: startDate,
//     endDate: endDate,
//     dateSearchCondition: dateSearchCondition
//   };

//   const response = await axios.get(`${process.env.REACT_APP_DOCKER_API_URL}/logisales/estimate/list`, { params: params });
//   let datatata = response.data.gridRowJson;
//   console.log('서버에서 받은 데이터 ㅇㅅㅇ???:', response.data.gridRowJson);

//   return datatata;
// };

//k Nam ik
// const postEstimateData = async (estimateDate: any, newData: any) => {

//   const response = await axios.post(
//     `${process.env.REACT_APP_DOCKER_API_URL}/logisales/estimate/new`,
//     {
//       estimateDate: estimateDate,
//       newEstimateInfo: newData
//     },
//     {
//       headers: {
//         'Content-Type': 'application/json'
//       }
//     }
//   );
//   console.log('응답 ㅇㅅㅇ???:', response);
//   if(response!=null){alert("등록되었습니다.")}
//   return response.data.errorMsg;
// };

// export { getEstimateData , postEstimateData };
