export const SEARCH_MRP_GETMRPLIST_SUCCESS = 'src/erp/logistic/Saga/SEARCH_MRP_GETMRPLIST_SUCCESS';

const initialState = {
  MrpGetList: []
};

const mrplist = (state = initialState, action: any) => {
  switch (action.type) {
    case SEARCH_MRP_GETMRPLIST_SUCCESS:
      return {
        ...state,
        MrpGetList: action.payload.gridRowJson
      };
    default:
      return state;
  }
};

export default mrplist;

//2023-11-06(월) Hoyeon
//Reducer 생성
