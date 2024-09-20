import axios from 'axios';
import Swal from 'sweetalert2';
//2023-10-20(금) : Hoyeon
//mrp에 적용하기 위한 mrpAxios 파일 생성
export const searchMpsList = (setMpsList: any, calendarDate: any) => {
  axios
    .get('http://localhost:8282/logi/production/searchMpsList', {
      params: {
        startDate: calendarDate.startDate,
        endDate: calendarDate.endDate,
        searchCondition: 'contractDate'
      }
    })
    .then(({ data }) => {
      console.log('MRP에 MPS조회 data ========== ' + JSON.stringify(data.result.data));
      if (data.errorCode < 0) {
        Swal.fire({
          icon: data.errorCode < 0 ? 'error' : 'success',
          title: data.errorMsg
        });
      }

      setMpsList(data.result.data.gridRowJson);
    })
    .catch((e) => {
      Swal.fire({
        icon: 'error',
        title: e
      });
    });
};
