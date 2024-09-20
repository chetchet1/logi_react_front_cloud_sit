import axios from 'api/logiApi'; //'${process.env.REACT_APP_DOCKER_API_URL}/logi'

export const searchWorkSiteList = (param) => {
    return axios.get('/quality/workorder/list');
};

export const searchWorkSiteSituationList = (param) => {
    console.log(param);
    return axios.get('/quality/worksite/situation',{
        params: {
            workSiteCourse : param.workSiteCourse,
            workOrderNo: param.workOrderNo,
            itemClassIfication : param.itemClassIfication
        }
    });
};

export const workCompletion = (param) => {
  const formData = new FormData();

  formData.append('workOrderNo', param.props.workOrderNo);
  formData.append('itemCode', param.props.itemCode);
  formData.append('itemCodeList', JSON.stringify(param.itemCodes));

  console.log(param.props.workOrderNo);
  console.log(param.props.itemCode);
  console.log(param.itemCodes);

  axios.post(
    '/quality/workorder/workcompletion', formData
  )
}

export const searchWorkSiteLogList = (param) => {
  return axios.get('/quality/workorder/worksitelog',{
      params: {
          workSiteLogDate : param
      }
  });
};

// export const mrpGatherInsert = (param) => {
//   console.log(param);

//   const mrpNoList = param.mrpList.map(item => item.mrpNo);
//   const mrpNoListString = mrpNoList.join(',');

//   const formData = new FormData();

//   formData.append('mrpGatheringRegisterDate', param.Date);
//   formData.append('mrpNoList', JSON.stringify(mrpNoListString));
//   formData.append('mrpNoAndItemCodeList', JSON.stringify(param.mrpList));

//   axios.post(
//     '/production/mrp/gathering', formData
//   );
// }
