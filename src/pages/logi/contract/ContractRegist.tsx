import {
  Button,
  TextField,
  Grid,
  Box,
  InputLabel,
  FormControl,
  Modal,
  Select,
  MenuItem
} from '@mui/material';
import React, { useState, useEffect } from 'react';
import Layout from 'layout';
import Page from 'ui-component/Page';
import { ReactElement } from 'react-markdown/lib/react-markdown';
import { DataGrid } from '@mui/x-data-grid';
import MainCard from 'ui-component/cards/MainCard';
import axios from 'axios';
import { getEstimateData } from '../estimate/action/EstimateAction';
import { Contract } from 'types/logi/contract/tpyes';
import ContractModal from 'pages/utils/ContractModal';
import { ContractDetail } from 'types/logi/contract/tpyes';
import { dispatch } from 'store';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import Swal from 'sweetalert2';

//✔️[수주 관리] 페이지
function ContractRegist() {
  const [startDate, setStartDate] = useState<string>(moment().startOf('month').format('YYYY-MM-DD'));
  const [endDate, setEndDate] = useState<string>(moment().format('YYYY-MM-DD'));
  const [customerSearch, setCustomerSearch] = useState(false);
  const [dateSearch, setDateSearch] = useState(true);
  const [searchOpenDialog, setSearchOpenDialog] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 열림 상태
  const [contractDetail, setContractDetail] = useState<ContractDetail[]>([]);
  const [dateSearchCondition, setDateSearchCondition] = useState('estimateDate');
  const today = moment(new Date()).format('yyyy-MM-DD');

  //Modal Test
  const [open2, setOpen2] = React.useState(false);

  //
  const [list, setList] = useState([]);
  const [selectRows, setSelectRows] = useState([])
  const [updatedRow, setUpdateRows ] = useState([]);

  const handleOpen2 = (params) => {
    console.log(params);
    setEstimateDetail(params.row.estimateDetailTOList);
    setOpen2(true);
  };
  const handleClose2 = () => {
    setOpen2(false);
  };

  const [contractData, setContractData] = useState<Contract[]>([]);

  const columns = [
    {
      headerName: '견적일련번호',
      field: 'estimateNo',
      minWidth: 150,
      flex: 1,
      editable: false
    },
    {
      headerName: '거래처코드',
      field: 'customerCode',
      minWidth: 120,
      flex: 1,
      editable: false
    },
    {
      headerName: '견적일자',
      field: 'estimateDate',
      minWidth: 120,
      flex: 1,
      editable: false
    },
    {
      headerName: '수주여부',
      field: 'contractStatus',
      minWidth: 120,
      flex: 1,
      editable: false
    },
    {
      headerName: '견적요청자',
      field: 'estimateRequester',
      minWidth: 120,
      flex: 1
    },
    {
      headerName: '유효일자',
      field: 'effectiveDate',
      minWidth: 120,
      flex: 1,
      editable: false
    },
    // {
    //   headerName: '견적담당자코드',
    //   field: 'personCodeInChange',
    //   width: 152
    // },
    {
      headerName: '수주요청자',
      field: 'contractRequester',
      minWidth: 120,
      flex: 1,
      editable: true,
    },
    {
      headerName: '수주유형',
      field: "country",
      editable: true,
      minWidth: 120,
      flex: 1,
      type: "singleSelect",
      valueOptions: ["긴급수주", "수주일반"]
    },
    {
      headerName: '견적상세조회',
      field: 'estimateDetail',
      minWidth: 150,
      flex: 1,
      renderCell: (params) => (
        <Button variant="contained" color="secondary" onClick={()=>handleOpen2(params)}>
          내역확인
        </Button>
      )
    }
  ];

  const columns2 = [
    {
      headerName: '견적상세일련번호',
      field: 'estimateDetailNo'
    },
    {
      headerName: '견적수량',
      field: 'estimateAmount'
    },
    {
      headerName: '품목명',
      field: 'itemName'
    },
    {
      headerName: '견적단가',
      field: 'unitPriceOfEstimate'
    },
    {
      headerName: '합계액',
      field: 'sumPriceOfEstimate'
    },
    {
      headerName: '납기일',
      field: 'dueDateOfEstimate'
    }
  ];

  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 700,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3
  };

  const containerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end' // 오른쪽 정렬
  };

  const textFieldStyle = {
    marginRight: '1vh', // 간격 조정
    flexGrow: 1, // TextField가 남은 공간을 모두 차지하도록 설정
    maxWidth: '120px' // 가로 크기 조정s
  };
  const buttonStyle = {
    fontSize: '0.8rem', // 버튼의 폰트 크기를 줄임
    padding: '0.3rem 1rem' // 버튼의 패딩을 조절
  };

  const onChangeDate = (e: any) => {
    if (e.target.id === 'startDate') {
      setStartDate(e.target.value);
      console.log('startDate', e.target.value);
      console.log('❇️startDate', startDate);
    } else {
      setEndDate(e.target.value);
      console.log('endDate', e.target.value);
      console.log('❇️endDate', endDate);
    }
  };

  const dispatch = useDispatch();

  const estimateData = useSelector((state) => state.estimate.estimateList);

  useEffect(()=>{
    setList(estimateData);
  }, [estimateData])

  // const processRowUpdate = (newRow) => {
  //   const updatedRow = { ...newRow }; 
  //   setUpdateRows(prevRows => [...prevRows, updatedRow]);
  //   return updatedRow;
  // };

  const processRowUpdate = (newRow) => {
    const newRows = { ...newRow };
    const existingIndex = updatedRow.findIndex(row => row.estimateNo === newRows.estimateNo);
    if (existingIndex !== -1) {
      const updatedRows = [...updatedRow];
      updatedRows[existingIndex] = { ...newRow };
      setUpdateRows(updatedRows);
    } else {
      setUpdateRows(prevRows => [...prevRows, { ...newRow }]);
    }
    return newRows;
  };

  const handleEstimateRequest = () => {
    dispatch(getEstimateData({ startDate, endDate, dateSearchCondition }));
  };

  const [contractType, setContractType] = useState(''); // 상태 변수 추가
  const [contractRequester, setContractRequester] = useState(''); // 상태 변수 추가
  const [selList, setSelList] = useState([]);
  const [selectedContract, setSelectedContract] = useState(null);
  const [estimateDetail, setEstimateDetail] = useState([]);

  const handleChange = (e) => {
    console.log('수주', e);

    if (e.target.name === 'contractRequester') {
      console.log('contractRequester 값:', e.target.value);
      setContractRequester(e.target.value);
      // list.contractRequester = contractRequester;
    } else if (e.target.name === 'contractType') {
      console.log('contractType 값:', e.target.value);
      setContractType(e.target.value);
      // list.contractType = contractType;
    }
  };

  const submitContract = async () => {
    // if (!contractType || !contractRequester) {
    //   alert('수주유형과 수주요청자를 모두 입력해주세요');
    //   return; // 유효한 데이터가 없으면 함수 종료
    // }
    try {
      const Contract = updatedRow.find(item => item.estimateNo === selectRows[0]);
      const country = Contract.country === '수주일반' ? 'CT-01' 
      : Contract.country === '긴급수주' ? 'CT-02' : null;

      const combinedContract = {
        contractDate: today,
        estimateNo: Contract.estimateNo,
        description: Contract.description,
        customerCode: Contract.customerCode,
        contractNo: null,
        personCodeInCharge: 'EMP-01',
        contractType: country,
        contractRequester: Contract.contractRequester
      };

      console.log(combinedContract);

      const response = await axios.post(`${process.env.REACT_APP_DOCKER_API_URL}/logisales/contract/new`, combinedContract);
      console.log('서버 응답:', response.data);
      Swal.fire({
        icon: 'success',
        title: '등록 완료되었습니다.'
      }).then((result) => {
        handleEstimateRequest()
      }).catch((err) => {
        
      });
    } catch (error) {
      console.error('서버 요청 중 오류 발생: ', error);
      // 오류 처리를 추가하세요.
    }
  };

  return (
    <>
      {' '}
      <Page title="ContractSearch">
        {' '}
        <MainCard content={false} title="수주 등록">
          <MainCard>
            <Grid
              xs={12}
              sm={6}
              sx={{
                textAlign: 'none'
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-end'
                }}
              >
                <div
                  style={{
                    marginRight: '1vh',
                    marginTop: '1vh',
                    marginLeft: '1vh'
                  }}
                >
                  <div style={containerStyle}>
                    <InputLabel htmlFor="startDate">시작일</InputLabel>
                    <TextField id="startDate" onChange={onChangeDate} type={'date'} style={textFieldStyle} defaultValue={startDate} />
                    <InputLabel htmlFor="startDate">종료일</InputLabel>
                    <TextField id="endDate" onChange={onChangeDate} type={'date'} style={textFieldStyle} defaultValue={endDate} />
                  </div>
                </div>

                <Button
                  variant="contained"
                  color="secondary"
                  style={{
                    ...buttonStyle,
                    marginRight: '8px'
                  }}
                  onClick={() => handleEstimateRequest()}
                >
                  견적조회
                </Button>

                <Button
                  variant="contained"
                  color="secondary"
                  style={{
                    ...buttonStyle,
                    marginLeft: '8px'
                  }}
                  onClick={() => submitContract()}
                >
                  수주등록
                </Button>
              </div>
            </Grid>
          </MainCard>
        </MainCard>
        <MainCard>
          <Box
            sx={{
              height: 500,
              width: '100%',
              background: 'white'
            }}
          >
            <DataGrid
              rows={list}
              columns={columns}
              pageSize={10}
              rowsPerPageOptions={[10]}
              getRowId={(row) => row.estimateNo}
              disableRowSelectionOnClick
              checkboxSelection
              // onCellEditStop={(params: GridCellEditStopParams, event: MuiEvent) => {
              //   // 안좋은방법
              //   if(params.field == "contractRequester"){
              //     const updatedList = list.map(item => {
              //         if (item.estimateNo === params.row.estimateNo) {
              //             const contractRequester = event.target.value;
              //             return { ...item, contractRequester: contractRequester };
              //         } else {
              //             return item;
              //         }
              //     });
              //     setList(updatedList);
              //   }
              //   else if(params.field == "country"){
              //     const updatedList = list.map(item => {
              //       if (item.estimateNo === params.row.estimateNo) {
              //           const country = event.target.outerText;
              //           return { ...item, country: country };
              //       } else {
              //           return item;
              //       }
              //   });
              //     setList(updatedList);
              //   }
              // }}
              onRowSelectionModelChange={itm => {
                if (itm.length > 1) {
                  const itmSet = new Set(selectRows);
                  const result = itm.filter((s) => !itmSet.has(s));
        
                  setSelectRows(result);
                } else {
                  setSelectRows(itm);
                }
              }}
              rowSelectionModel = {selectRows}
              processRowUpdate={processRowUpdate}
              onProcessRowUpdateError={(error) => error}
            />{' '}
          </Box>
        </MainCard>
        <React.Fragment>
          <Modal open={open2} onClose={handleClose2}>
            <Box
              sx={{
                ...style,
                width: 800,
                height: 400,
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <h2
                style={{
                  marginBottom: '10px'
                }}
              >
                견적상세내역
              </h2>
              <MainCard>
                <Box
                  sx={{
                    height: 300,
                    width: '100%',
                    background: 'white'
                  }}
                >
                  <DataGrid
                    rows={estimateDetail}
                    columns={columns2}
                    pageSize={10}
                    rowsPerPageOptions={[10]}
                    getRowId={(row) => row.estimateDetailNo}
                  />{' '}
                </Box>
              </MainCard>
              <Button
                onClick={handleClose2}
                style={{
                  marginLeft: 'auto'
                }}
              >
                Close
              </Button>
            </Box>
          </Modal>
        </React.Fragment>
      </Page>
    </>
  );
}

ContractRegist.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
export default ContractRegist;