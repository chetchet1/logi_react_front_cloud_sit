import React, { useState, useCallback } from 'react';
import {
  Button,
  Checkbox,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Modal,
  Box
} from '@mui/material';
import MyCalendar from 'pages/utils/Mycalender';
import MyDialog from 'pages/utils/MyDialog';
import moment from 'moment';
import Axios from 'axios';
import DeliveryDetailGrid from './DeliveryDetailGrid';
import Swal from 'sweetalert2';
import MainCard from 'ui-component/cards/MainCard';
import SimpleModal from 'components/forms/plugins/Modal/SimpleModal';
import Layout from 'layout';
import { useDispatch, useSelector } from 'react-redux';
import { deliveryAvailableRequest } from './reducer/SalesReducer';
import Page from 'ui-component/Page';
import ContractDetailModal from './ContractDetailModal';
import axios from 'axios';
import { ContractDetail } from 'types/logi/contract/tpyes';
import { DataGrid } from '@mui/x-data-grid';

function DeliverySearch(props) {
  let today = moment(new Date()).format('yyyy-MM-DD');
  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(today);
  const [customerSearch, setCustomerSearch] = useState(false);
  const [dateSearch, setDateSearch] = useState(true);
  const [selDelivery, setSelDelivery] = useState();
  const [contractDetailNo, setContractDetailNo] = useState();
  const [deliveryDetailGrid, setDeliveryDetailGrid] = useState();

  const [selected, setSelected] = useState([]);
  const [contractDetail, setContractDetail] = useState<ContractDetail[]>([]);
  const [contractNo, setContractNo] = useState({});
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();

  let detailList = useSelector((state: any) => state.sales.contractAvailableList);
  // state.sales.contractavailableList가 불리언 값인지 확인
  // console.log(typeof detailList);

  const columns = [
    { headerName: '수주번호', field: 'contractNo' },
    { headerName: '견적번호', field: 'estimateNo' },
    { headerName: '유형', field: 'contractTypeName' },
    { headerName: '거래처코드', field: 'customerCode', hide: true },
    { headerName: '거래처명', field: 'customerName' },
    { headerName: '견적일자', field: 'contractDate', hide: true },
    { headerName: '수주일자', field: 'contractDate' },
    { headerName: '수주요청자', field: 'contractRequester' },
    { headerName: '수주담당자명', field: 'empNameInCharge' }
  ];
  //------Modal Data-----//
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
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

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

  //---------//

  const contractDetailData = async () => {
    try {
      const param = selected[0].contractNo;
      const response = await axios.get(`${process.env.REACT_APP_DOCKER_API_URL}/logisales/contractdetail/list`, {
        params: {
          contractNo: param
        }
      });
      const result = response.data.gridRowJson;

      setContractDetail(result);
      // 모달 열기
      handleOpen();
    } catch (error) {
      console.error('견적 조회 중 오류 발생: ', error);
      // 오류 처리를 추가하세요.
    } finally {
      handleOpen();
    }
  };

  //-----------------------//
  const [selCustomer, setSelCutomer] = useState({
    detailCodeName: '',
    detailCode: ''
  });

  const handleClick = (event: any, name: string) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected: string[] = [];

    if (selectedIndex === -1) {
      // contractNo를 추출하고 newSelected 배열에 추가
      const contractNo = name.contractNo;
      setContractNo(contractNo);

      newSelected = [name]; // 선택된 값 하나만 새 배열에 넣음
    }
    setSelected(newSelected);
  };

  const conditionChange = (e) => {
    if (e.target.value === 'customerSearch') {
      setCustomerSearch(true);
      setDateSearch(false);
    }
    if (e.target.value === 'dateSearch') {
      setCustomerSearch(false);
      setDateSearch(true);
    }
  };

  const onCellClicked = (param) => {};

  const onChangeDate = (e: any) => {
    if (e.target.id === 'startDate') {
      setStartDate(e.target.value);
    } else {
      setEndDate(e.target.value);
    }
  };

  const onDialogCellClicked = (params) => {};

  const customerSearchClick = () => {};

  const detailClose = () => {};

  const updateDetail = (contractDetailNo) => {
    setContractDetailNo(contractDetailNo);
  };

  const delivery = async () => {
    // return Swal.fire({
    //   icon: 'success',
    //   text: '일자별 재고수량과 약속 가능재고가 충분합니다.'
    // });
    console.log(selected[0].contractDetailTOList[0].contractDetailNo);
    
    try {
      const param = selected[0].contractDetailTOList[0].contractDetailNo;
      await axios.get(`${process.env.REACT_APP_DOCKER_API_URL}/sales/deliver`, {
        params: {
          contractDetailNo: param
        }});
      Swal.fire({
        icon: 'success',
        title: '납품 성공'
      }).then((result) => {
        deliverySearch();
      }).catch((err) => {
        
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: '발주 및 재고처리 실패'
      }).then((result) => {
        deliverySearch();
      }).catch((err) => {
        
      });
    }
  };

  const basicInfo = (startDate: any, endDate: any) => {
    setStartDate(startDate);
    setEndDate(endDate);
  };

  const deliverySearch = () => {
    let param = {};
    if (customerSearch === true) {
      param = {
        ableContractInfo: JSON.stringify({
          startDate: 'null',
          endDate: 'null',
          searchCondition: 'searchByCustomer',
          customerCode: selCustomer.detailCode
        })
      };
    }
    if (dateSearch === true) {
      param = {
        ableContractInfo: JSON.stringify({
          startDate: startDate,
          endDate: endDate,
          searchCondition: 'searchByDate',
          customerCode: 'null'
        })
      };
    }

    dispatch(deliveryAvailableRequest(param));
  };

  return (
    <Page title="납품">
      <MainCard content={false} title="납품">
        <div style={{ float: 'left' }}>
          <RadioGroup row aria-label="searchCondition" name="searchCondition" defaultValue="dateSearch">
            <FormControlLabel
              value="customerSearch"
              control={<Radio color="secondary" />}
              label="거래처명"
              style={{ marginRight: '5vh', marginTop: '1vh', marginLeft: '2vh' }}
              onChange={conditionChange}
            />
            <FormControlLabel
              value="dateSearch"
              control={<Radio color="secondary" />}
              label="날짜"
              style={{ marginRight: '1vh', marginTop: '1vh' }}
              onChange={conditionChange}
            />
          </RadioGroup>
        </div>

        <div style={{ marginRight: '1vh', marginTop: '1vh', marginLeft: '1vh', float: 'right' }}>
          {dateSearch === true ? (
            <MyCalendar onChangeDate={onChangeDate} basicInfo={basicInfo} />
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

          <Button variant="contained" color="secondary" style={{ marginRight: '1vh', marginTop: '1vh' }} onClick={deliverySearch}>
            조회
          </Button>
          <Button variant="contained" color="secondary" style={{ marginTop: '1vh', marginRight: '1vh' }} onClick={contractDetailData}>
            수주내역 조회
          </Button>
          <Button variant="contained" color="secondary" style={{ marginTop: '1vh', marginRight: '1vh' }} onClick={delivery}>
            납품
          </Button>
        </div>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell key={column.headerName}>{column.headerName}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {Array.isArray(detailList) &&
                detailList.map((list: any, index: number) => {
                  const isSelected = selected.includes(list);
                  const labelId = `enhanced-table-checkbox-${index}`;
                  return (
                    <TableRow
                      key={index}
                      sx={{ py: 3 }}
                      hover
                      tabIndex={-1}
                      role="checkbox"
                      onClick={(event) => handleClick(event, list)}
                      selected={isSelected}
                    >
                      {columns.map((column) => {
                        const value = list[column.field];
                        return <TableCell key={labelId}>{value || 'No Data'}</TableCell>;
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>

        {selDelivery === undefined ? '' : <DeliveryDetailGrid list={detailList} detailClose={detailClose} updateDetail={updateDetail} />}
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
      </MainCard>
    </Page>
  );
}

DeliverySearch.getLayout = function getLayout(Page) {
  return <Layout>{Page}</Layout>;
};

export default DeliverySearch;