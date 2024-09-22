import axios from 'axios';
import Swal from 'sweetalert2';

//2023-10-20(금) : Hoyeon
//mrp에 적용하기 위한 mpsAxios 파일 생성

export const searchContractDetailInMpsAvailable = (setContractList: any, startDate: any, endDate: any) => {
  // MPS - MPS 등록 가능 조회
  console.log(startDate);
  console.log(endDate);
  axios
    .get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/production/mps/contractdetail-available`, {
      params: {
        startDate: startDate,
        endDate: endDate,
        searchCondition: 'contractDate'
      }
    })
    .then(({ data }) => {
      console.log('data1 : ', data);
      if (data.errorCode < 0) {
        Swal.fire({
          icon: data.errorCode < 0 ? 'error' : 'success',
          title: data.errorMsg
        });
      }
      setContractList(data.gridRowJson);
    })
    .catch((e) => {
      Swal.fire({
        icon: 'error',
        title: e
      });
    });
};
export const convertContractDetailToMps = (contract: any) => {
  console.log('contract : ', contract); //{key1:val1, key2:val2.....}
  axios
    .post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/production/mps/contractdetail`, contract)
    .then(({ data }) => {
      Swal.fire({
        icon: data.errorCode < 0 ? 'error' : 'success',
        title: data.errorMsg
      });
    })
    .catch((e) => {
      Swal.fire({
        icon: 'error',
        title: e
      });
    });
};

// export const searchMpsInfo = (setMpsList: any, calendarDate: any) => {
//   axios
//     .get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/production/mps/list`, {
//       params: {
//         startDate: calendarDate.startDate,
//         endDate: calendarDate.endDate,
//         includeMrpApply: 'includeMrpApply'
//       }
//     })
//     .then(({ data }) => {
//       console.log('리액트아니라고요', data);
//       setMpsList(data.gridRowJson);
//     })
//     .catch((e) => {
//       Swal.fire({
//         icon: 'error',
//         title: e
//       });
//     });
// };

export const searchMpsInfoInMrp = (setContractList: any, calendarDate: any) => {
  console.log('calendarDate1 : ', calendarDate);
  axios
    .get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/production/mps/list`, {
      // 2023-10-24(화) Hoyeon
      // MRP페이지에서 MPS리스트를 조회해야 하기 때문에 경로가 mps/list가 되어야 함.
      params: {
        startDate: calendarDate.startDate,
        endDate: calendarDate.endDate,
        searchCondition: 'includeMrpApply' //includeMrpApply -> searchCondition : 'contractDate'로 수정
      }
    })
    .then(({ data }) => {
      setContractList(data.gridRowJson);
    })
    .catch((e) => {
      Swal.fire({
        icon: 'error',
        title: e
      });
    });
};

// export const searchMpsInfoInMrp = (setContractList,calendarDate) => {  // 3-13추가 MRP에서 MPS 조회시
//     console.log("calendarDate1 : ", calendarDate);
//     axios.get("${process.env.NEXT_PUBLIC_BACKEND_URL}/production/mps/contractdetail-processplanavailable",{  // /mps/list -> mrp/list 로 변경(3-14)
//             params : {
//                 startDate:calendarDate.startDate,
//                 endDate :calendarDate.endDate,
//                 searchCondition:'contractDate'  //includeMrpApply -> searchCondition : 'contractDate'로 수정
//             }
//         }
//     ).then(({data}) => {
//
//         setContractList(data.gridRowJson);
//     }).catch(e => {
//         Swal.fire({
//             icon: "error",
//             title: e
//         });
//     });
// }
