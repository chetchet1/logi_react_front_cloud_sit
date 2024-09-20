//🌟new

import * as types from '../action/BasicInfoActionType';

// 액션 타입 정의
type Action = {
  type: string;
  mode?: string;
  workplaceTo?: WorkplaceType;
  newList?: WorkplaceType[];
  modWorkplaceTO: WorkplaceType;
  clientinfoTO: ClientInfoType;
  financeinfoTO: FinanInfoType;
  payload?: any;
  error?: any;
};

// 사업장 정보 타입 정의
type WorkplaceType = {
  workplaceCode: string;
  corporationLicenseNumber: string;
  companyCode: string;
  businessLicenseNumber: string;
  isMainOffice: 'Y' | 'N'; // 'Y' 또는 'N' 중 하나
  status: 'INSERT' | 'UPDATE' | 'DELETE' | string; // 여러 가능한 상태 중 하나
  workplaceBasicAddress: string;
  workplaceBusinessConditions: string;
  workplaceBusinessItems: string;
  workplaceCeoName: string;
  workplaceCloseDate: string | Date | null;
  workplaceDetailAddress: string;
  workplaceEstablishDate: string | Date | null;
  workplaceFaxNumber: string;
  workplaceName: string;
  workplaceOpenDate: string | Date | null;
  workplaceTelNumber: string;
  workplaceZipCode: string | null;
  // 다른 필드들도 여기에 추가
};
// 일반거래처 정보 타입 정의
type ClientInfoType = {
  customerCode: string;
  workplaceCode: string;
  companyCode: string;
  customerName: string;
  customerType: string;
  status: 'INSERT' | 'UPDATE' | 'DELETE' | string; // 여러 가능한 상태 중 하나
  customerCeo: string;
  customerBusinessConditions: string;
  customerBusinessItems: string;
  customerTelNumber: string;
};
// 금융거래처 정보 타입 정의
type FinanInfoType = {
  accountAssociatesCode: string;
  workplaceCode: string;
  accountAssociatesName: string;
  accountNumber: string;
  financialInstituteCode: string;
  status: 'INSERT' | 'UPDATE' | 'DELETE' | string; // 여러 가능한 상태 중 하나
  customerCode: string;
  searchCondition: string;
};

type State = {
  workplaceList: WorkplaceType[];
  ClientInfoList: any[];
  FinanInfoList: any[];
  DepartmentList: any[];
  errorMsg?: any;
  error?: any;
};

const initialState: State = {
  workplaceList: [],
  ClientInfoList: [],
  FinanInfoList: [],
  DepartmentList: []
};

function basicinfo(state: State = initialState, action: Action): State {
  switch (action.type) {
    case types.WORKPLACE_LIST:
      if (action.mode === 'add') {
        let newList = [...state.workplaceList, action.workplaceTo!];
        return {
          ...state,
          workplaceList: newList
        };
      } else if (action.mode === 'delete') {
        let newList = action.newList || [];
        return {
          ...state,
          workplaceList: newList
        };
      } else if (action.mode === 'update') {
        console.log('workplaceList222222', state.workplaceList[0].workplaceCode);
        console.log('workplaceList3333333', action.modWorkplaceTO);
        // 기존 목록에서 수정해야 하는 작업장을 찾아 업데이트
        return {
          ...state,
          workplaceList: state.workplaceList.map((workplace) =>
            workplace.workplaceCode === action.modWorkplaceTO.workplaceCode ? action.modWorkplaceTO : workplace
          )
        };
      } else {
        return {
          ...state
        };
      }

    case types.SEARCH_WORKPLACE_LIST:
      return {
        ...state,
        workplaceList: []
      };
    case types.SEARCH_WORKPLACE_LIST_SUCCESS:
      return {
        ...state,
        workplaceList: action.payload.gridRowJson
      };
    case types.SEARCH_WORKPLACE_LIST_FAILURE:
      return {
        ...state,
        errorMsg: action.payload
      };

    case types.SAVE_WORKPLACE:
      return {
        ...state
      };

    case types.SAVE_WORKPLACE_SUCCESS:
      let result = state.workplaceList.filter((workplace) => workplace.status !== 'DELETE');
      return {
        ...state,
        workplaceList: result
      };

    case types.SAVE_WORKPLACE_FAILURE:
      return {
        ...state,
        errorMsg: action.payload
      };

    case types.SAVE_CLIENTINFO:
      console.log(action.payload);
      return {
        ...state
      };
    case types.SAVE_CLIENT_SUCCESS:
      return {
        ...state,
        ClientInfoList: action.payload.result
      };

    case types.SAVE_CLIENT_FAILURE:
      return {
        ...state,
        error: action.error
      };

    case types.SAVE_FINANINFO_SUCCESS:
      const SuccessMsg = '저장되었습니다.';
      alert(SuccessMsg);
      return {
        ...state,
        FinanInfoList: action.payload.result
      };

    case types.SAVE_FINANINFO_FAILURE:
      return {
        ...state,
        error: action.error
      };
    case types.SEARCH_CLIENTINFO:
      if (action.mode === 'add') {
        let newList = [...state.ClientInfoList, action.clientinfoTO!];
        return {
          ...state,
          ClientInfoList: newList
        };
      } else if (action.mode === 'delete') {
        let newList = action.newList || [];
        return {
          ...state,
          ClientInfoList: newList
        };
      } else {
        return {
          ...state
        };
      }
    case types.SEARCH_CLIENTINFO_SUCCESS:
      return {
        ...state,
        ClientInfoList: action.payload.gridRowJson
      };

    case types.SEARCH_CLIENTINFO_FAILURE:
      return {
        ...state,
        error: action.payload
      };
    case types.SEARCH_FINANINFO:
      if (action.mode === 'add') {
        let newList = [...state.FinanInfoList, action.financeinfoTO!];
        return {
          ...state,
          FinanInfoList: newList
        };
      } else if (action.mode === 'delete') {
        let newList = action.newList || [];
        return {
          ...state,
          FinanInfoList: newList
        };
      } else {
        return {
          ...state
        };
      }
    case types.SEARCH_FINANINFO_SUCCESS:
      return {
        ...state,
        FinanInfoList: action.payload.gridRowJson
      };

    case types.SEARCH_FINANINFO_FAILURE:
      return {
        ...state,
        error: action.error
      };

    case types.SEARCH_DEPTINFO_SUCCESS:
      return {
        ...state,
        DepartmentList: action.payload.gridRowJson
      };
    case types.SEARCH_DEPTINFO_FAILURE:
      return {
        ...state,
        error: action.error
      };
    case types.ADD_DEPTINFO:
      return {
        ...state,
        DepartmentList: [...state.DepartmentList, action.payload.newRow]
      };
    case types.SAVE_DEPTINFO_SUCCESS:
      let deptInfoMsg = '저장되었습니다.';
      alert(deptInfoMsg);
      return state;

    case types.SAVE_DEPTINFO_FAILURE:
      return {
        ...state,
        error: action.error
      };
    default:
      return state;
  }
}

export default basicinfo;
