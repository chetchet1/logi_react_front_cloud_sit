import { Button, FormControlLabel, TextField, Grid, RadioGroup, Radio, Box, InputLabel, FormControl, Dialog, Modal } from '@mui/material';
import React, { useState } from 'react';
import Layout from 'layout';
import Page from 'ui-component/Page';
import { ReactElement } from 'react-markdown/lib/react-markdown';
import { DataGrid } from '@mui/x-data-grid';
import MainCard from 'ui-component/cards/MainCard';
import axios from 'axios';
import { Contract,ContractDetail } from 'types/logi/contract/tpyes';
import ContractModal from 'pages/utils/ContractModal';

//✔️[수주 관리] 페이지
function ContractSearch() {
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [customerSearch, setCustomerSearch] = useState(false);
  const [dateSearch, setDateSearch] = useState(true);
  const [searchOpenDialog, setSearchOpenDialog] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 열림 상태
  const [contractDetail, setContractDetail] = useState<ContractDetail[]>([]);
  //Modal Test
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [contractData, setContractData] = useState<Contract[]>([]);
  const [selCustomer, setSelCustomer] = useState({
    detailCodeName: '',
    detailCode: ''
  });

  const onDialogCellClicked = (params) => {
    setSelCustomer({
      detailCodeName: params.data.detailCodeName,
      detailCode: params.data.detailCode
    });

    setSearchOpenDialog(false);
  };

  const customerSearchClick = () => {
    setSearchOpenDialog(true);
  };

  const columns = [
    { headerName: '수주번호', field: 'contractNo', minWidth: 120, flex: 1 },
    { headerName: '견적번호', field: 'estimateNo', minWidth: 120, flex: 1 },
    { headerName: '유형', field: 'contractTypeName', minWidth: 120, flex: 1 },
    { headerName: '거래처코드', field: 'customerCode', hide: true, minWidth: 100, flex: 1 },
    { headerName: '거래처명', field: 'customerName', minWidth: 120, flex: 1 },
    // { headerName: '견적일자', field: 'contractDate', hide: true, minWidth: 100, flex: 1 },
    { headerName: '수주일자', field: 'contractDate', minWidth: 120, flex: 1 },
    { headerName: '수주요청자', field: 'contractRequester', minWidth: 120, flex: 1 },
    { headerName: '수주담당자명', field: 'empNameInCharge', minWidth: 120, flex: 1 },
    { headerName: '납품완료여부', field: 'deliveryCompletionStatus', minWidth: 120, flex: 1 },
    // { headerName: 'contractType', field: 'contractType', hide: true, minWidth: 100, flex: 1 },
    // { headerName: 'personCodeInCharge', field: 'personCodeInCharge', hide: true, minWidth: 100, flex: 1 },
    {
      headerName: '수주상세조회',
      field: 'estimateDetail',
      width: 150,
      renderCell: (params) => (
        <Button variant="contained" color="secondary">
          내역확인
        </Button>
      )
    }
  ];

  const column2 = [
    { headerName: '수주상세일련번호', field: 'contractDetailNo', hide: true },
    { headerName: '수주일련번호', field: 'contractNo' },
    { headerName: '품목코드', field: 'itemCode', hide: true },
    { headerName: '품목명', field: 'itemName' },
    { headerName: '단위', field: 'unitOfContract' },
    { headerName: '납기일', field: 'dueDateOfContract' },
    { headerName: '수주수량', field: 'estimateAmount' },
    { headerName: '재고사용량', field: 'stockAmountUse' },
    { headerName: '필요제작수량', field: 'productionRequirement' },
    {
      headerName: '단가',
      field: 'unitPriceOfContract'
    },
    {
      headerName: '합계액',
      field: 'sumPriceOfContract'
    },
    { headerName: '처리상태', field: 'processingStatus' },
    { headerName: '작업완료여부', field: 'operationCompletedStatus' },
    { headerName: '납품완료여부', field: 'deliveryCompletionStatus' },
    { headerName: '비고', field: 'description', hide: true },
    { headerName: '상태', field: 'status', hide: true },
    { headerName: '상태2', field: 'beforeStatus', hide: true }
  ];
  const rows = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];

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
  const conditionChange = (e) => {
    //라디오버튼을 누를때마다 변경되는 로직
    if (e.target.value === 'customerSearch') {
      //라디오버튼이 '거래처명'이면
      setCustomerSearch(true);
      setDateSearch(false);
    }
    if (e.target.value === 'dateSearch') {
      //라디오버튼이 '날짜'이면
      setCustomerSearch(false);
      setDateSearch(true);
    }
  };

  const contractSearch = async () => {
    let param;
    // if (customerSearch === true) {
    //     param = {
    //         startDate: 'null',
    //         endDate: 'null',
    //         searchCondition: 'searchByCustomer',
    //         customerCode: selCustomer.detailCode
    //     };
    // }
    if (dateSearch === true) {
      param = {
        startDate: startDate,
        endDate: endDate,
        searchCondition: 'searchByDate',
        customerCode: 'null'
      };
    }

    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/logisales/contract/list`, {
        params: param
      });

      const result = response.data;
      console.log(result);
      setContractData(response.data.gridRowJson);
    } catch (error) {
      console.error('견적 조회 중 오류 발생: ', error);
      // 오류 처리를 추가하세요.
    }
  };

  function fetchData() {
    contractSearch();
  }

  const contractDetailData = async (params) => {
    try {
      // 데이터 요청
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/logisales/contractdetail/list`, {
        params: {
          contractNo: params.id
        }
      });
      const result = response.data;

      setContractDetail(result.gridRowJson);
      console.log('contractDetail', result.gridRowJson);
      // 모달 열기
      handleOpen();
      //   setOpen(true);
    } catch (error) {
      console.error('견적 조회 중 오류 발생: ', error);
      // 오류 처리를 추가하세요.
    }
  };

  // const contractDetailData = async (params:any) => {
  //     setOpen(true);
  //     console.log("params.id",params.id);

  //     try {
  //         const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/logisales/contractdetail/list`, {
  //             params: {
  //                 contractNo: params.id
  //             }
  //         });

  //         const result = response.data;
  //         console.log("contractDetial",result);
  //         console.log("contarctDetailData",result.data);

  //     } catch (error) {
  //         console.error("견적 조회 중 오류 발생: ", error);
  //         // 오류 처리를 추가하세요.
  //     }
  // };

  function ContractSearch() {
    return (
      <Grid item xs={12} sm={6} sx={{ textAlign: 'right' }}>
        <div align="left" style={{ float: 'left' }}>
          {/* ✅라디오 그룹  */}
          <RadioGroup row aria-label="searchCondition" name="searchCondition" defaultValue="dateSearch">
            <FormControlLabel
              value="customerSearch"
              control={<Radio color="secondary" />}
              label="거래처명"
              style={{ marginRight: '5vh', marginTop: '1vh', marginLeft: '2vh' }}
              onChange={conditionChange}
              textRightPadding="50px"
            />
            <FormControlLabel
              value="dateSearch"
              control={<Radio color="secondary" />}
              label="날짜"
              style={{ marginRight: '1vh', marginTop: '1vh' }}
              onChange={conditionChange}
              textRightPadding="50px"
            />
          </RadioGroup>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
          {dateSearch === true ? (
            <div style={{ marginRight: '1vh', marginTop: '1vh', marginLeft: '1vh' }}>
              <div style={containerStyle}>
                <InputLabel htmlFor="startDate" style={{ marginRight: '1vh'}}>시작일</InputLabel>
                <TextField id="startDate" onChange={onChangeDate} type={'date'} style={textFieldStyle} defaultValue={startDate} />
                <InputLabel htmlFor="startDate" style={{ marginRight: '1vh'}}>종료일</InputLabel>
                <TextField id="endDate" onChange={onChangeDate} type={'date'} style={textFieldStyle} defaultValue={endDate} />
              </div>
            </div>
          ) : (
            <TextField
              id="customerName"
              label="거래처명"
              value={selCustomer.detailCodeName}
              style={{ marginRight: '1vw' }}
              disabled
              onClick={customerSearchClick}
            />
          )}
          <Button variant="contained" color="secondary" style={buttonStyle} onClick={() => fetchData()}>
            수주조회
          </Button>
        </div>
      </Grid>
    );
  }

  return (
    <>
      <Page title="ContractSearch">
        <MainCard content={false} title="🗒️수주 조회">
          <MainCard>{ContractSearch()}</MainCard>
          <Box
            sx={{
              height: 600,
              width: '100%',
              background: 'white'
            }}
          >
            <DataGrid
              rows={contractData}
              columns={columns}
              pageSize={10}
              rowsPerPageOptions={[10]}
              getRowId={(row) => row.contractNo}
              onRowClick={contractDetailData}
            />
            {/* <Button onClick={() => yearSetOpen(false)}>닫기</Button> */}
          </Box>
        </MainCard>
        <React.Fragment>
          {/* <Button onClick={handleOpen}>Open Child Modal</Button> */}
          <Modal open={open} onClose={handleClose} aria-labelledby="child-modal-title" aria-describedby="child-modal-description">
            <Box sx={{ ...style, width: 700, height: 500, display: 'flex', flexDirection: 'column' }}>
              <h2 style={{ marginBottom: '10px' }}>수주상세조회</h2>
              <DataGrid
                rows={contractDetail}
                columns={column2}
                pageSize={10}
                rowsPerPageOptions={[10]}
                getRowId={(row) => row.contractDetailNo}
                // onRowClick={contractDetailData}
              />
              <Button onClick={handleClose} style={{ marginLeft: 'auto' }}>
                Close
              </Button>
            </Box>
          </Modal>
        </React.Fragment>
      </Page>
    </>
  );
}

ContractSearch.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
export default ContractSearch;
