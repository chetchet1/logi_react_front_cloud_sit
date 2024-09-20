const SEARCH_MPS_LIST_SUCCESS = 'src/erp/logistic/Saga/SEARCH_MPS_SUCCESS';

const initialState = {
  MrpList: []
};

const mpslist = (state = initialState, action: any) => {
  switch (action.type) {
    case SEARCH_MPS_LIST_SUCCESS:
      return {
        ...state,
        MrpList: action.payload.gridRowJson
      };
    default:
      return state;
  }
};

export default mpslist;

//2023-11-06(월) Hoyeon
//Reducer 생성
