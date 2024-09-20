import axios from 'api/logiApi'; //'${process.env.REACT_APP_DOCKER_API_URL}/logi'

export const searchMpsList = (param) => {
  axios.get('/production/searchMpsInfo', {
    params: {
      startDate: param.payload.startDate,
      endDate: param.payload.endDate
    }
  });
};

export const searchMrpList = () => {
  console.log('api 시작')
  return axios.get('/production/mrp/list', {
    params: {
      mrpGatheringStatusCondition: ""
    }
  });
  console.log('api 끝')
};

export const searchOpenMrpList = (param) => {
  return axios.get('/production/openMrp', {
    params: {
      mpsNoListStr: param
    }
  });
};

export const mrpInsert = (param) => {
  const formData = new FormData();

  formData.append('batchList', JSON.stringify(param.list));
  formData.append('mrpRegisterDate', param.date);

  axios.post(
    '/production/mrp', formData
  )
}

export const searchGetMpsList = (param) => {
  axios.get('/logistics/production/getMrpList', {
    params: {
      mrpGatheringStatusCondition: param.payload.mrpGatheringStatusCondition
    }
  });
}

  export const searchGatherList = (param) => {
    const mrpNoList = param.map(item => item.mrpNo);
    const mrpNoListString = mrpNoList.join(',');
  
    return axios.get('/production/mrp/gathering-list', {
      params: {
        mrpNoList: mrpNoListString
      }
    });
  };

  // export const searchGatherList = (param) => {
  //   console.log('api 시작');
  //   console.log(param);

  //   // FormData 객체 생성
  //   const formData = new FormData();

  //   // "batchList" 파라미터에 객체 추가
  //   formData.append('mrpNoList', JSON.stringify(param));
  //   console.log(formData);
  //   // return axios.get('/production/mrp/gathering-list', formData);

  //   console.log('api 끝');
  // };

export const mrpGatherInsert = (param) => {
  console.log(param);

  const mrpNoList = param.mrpList.map(item => item.mrpNo);
  const mrpNoListString = mrpNoList.join(',');

  const formData = new FormData();

  formData.append('mrpGatheringRegisterDate', param.Date);
  formData.append('mrpNoList', JSON.stringify(mrpNoListString));
  formData.append('mrpNoAndItemCodeList', JSON.stringify(param.mrpList));

  axios.post(
    '/production/mrp/gathering', formData
  );
}

export const searchMrpGathering = (param) => {
  console.log(param);
  return axios.get('/production/mrp/mrpgathering/list', {
    params: {
        searchDateCondition: param.daySelect,
        mrpGatheringStartDate: param.startDate,
        mrpGatheringEndDate: param.endDate,
      }
    }
  );
}

  // 참조
  // const updateEstimate = async (updateEstimateDetail: EstimateDetail) => {
  //   try {
  //     console.log('\n\nupdateEstimateDetail\n\n', updateEstimateDetail);

  //     // FormData 객체 생성
  //     const formData = new FormData();

  //     // "batchList" 파라미터에 객체 추가
  //     formData.append('batchList', JSON.stringify([updateEstimateDetail]));

  //     const response = await axios.post('${process.env.REACT_APP_DOCKER_API_URL}/logisales/estimatedetail/batch', formData);
  //     console.log('서버 응답 데이터:', response.data); // 서버 응답 데이터를 콘솔에 출력
  //     alert('견적상세내역이 수정되었습니다.');
  //   } catch (error) {
  //     // 오류 처리
  //   }
  // };

