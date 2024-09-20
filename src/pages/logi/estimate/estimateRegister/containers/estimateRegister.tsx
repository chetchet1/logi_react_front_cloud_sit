import React, { ReactElement, useEffect, useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
  Button,
  Box,
  Collapse,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField
} from '@mui/material';
import Swal from 'sweetalert2';

// project imports
import Layout from 'layout';
import Page from 'components/ui-component/Page';
import MainCard from 'ui-component/cards/MainCard';
import SubCard from 'ui-component/cards/SubCard';
import SecondaryAction from 'ui-component/cards/CardSecondaryAction';

// assets
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { postEstimateData } from '../../action/EstimateAction';

// 견적 등록
// table data
type BasicTableData = {
  name: string;
  calories: number;
  fat: number;
  carbs: number;
  protein: number;
  price: number;
  history?: { date: string; customerId: string; amount: number }[];
};
function createData(name: string, calories: number, fat: number, carbs: number, protein: number, price: number) {
  return {
    name,
    calories,
    fat,
    carbs,
    protein,
    price,
    history: [
      { date: '2020-01-05', customerId: '11091700', amount: 3 },
      { date: '2020-01-02', customerId: 'Anonymous', amount: 1 }
    ]
  };
}

const textFieldStyle = {
  marginRight: '1vh', // 간격 조정
  flexGrow: 1, // TextField가 남은 공간을 모두 차지하도록 설정
  maxWidth: '120px' // 가로 크기 조정s
};

const buttonStyle = {
  fontSize: '0.8rem', // 버튼의 폰트 크기를 줄임
  padding: '0.3rem 1rem' // 버튼의 패딩을 조절
};

function Row({ row }: { row: BasicTableData }) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = useState([]);
  const [optionz, setOptionz] = useState([]);
  const [sumPriceOfEstimate, setSumPriceOfEstimate] = useState(0);

  const [selectedCustomer, setSelectedCustomer] = useState({
    customerCode: '',
    customerName: ''
  });

  const [selectedCustomer2, setSelectedCustomer2] = useState({
    detailCode: '',
    detailCodeName: '',
    unitOfEstimate: 0
  });
  const dispatch = useDispatch();

  useEffect(() => {
    fetchData();
    fetchData2();
  }, []);

  const fetchData = async () => {
    try {
      const result = await axios.get(`${process.env.REACT_APP_DOCKER_API_URL}/compinfo/customer/list`, {
        params: {
          searchCondition: 'ALL',
          workplaceCode: ''
        }
      });
      console.log('resulttt123', result.data.gridRowJson);

      // 서버에서 가져온 데이터를 options 배열로 가공
      const optionData = result.data.gridRowJson.map((item) => ({
        customerCode: item.customerCode,
        customerName: item.customerName
      }));
      setOptions(optionData);

      console.log('options array:', optionData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const changeData = async (e) => {
    await fetchData();

    const selectedOption = options.find((option) => option.customerName === e.target.value);

    setSelectedCustomer({
      customerCode: selectedOption.customerCode,
      customerName: selectedOption.customerName
    });
  };
  console.log('SelectedCustomer', selectedCustomer);

  const fetchData2 = async () => {
    try {
      const result = await axios.get(`${process.env.REACT_APP_DOCKER_API_URL}/compinfo/codedetail/list`, {
        params: {
          divisionCodeNo: 'IT-_I'
        }
      });

      // 서버에서 가져온 데이터 중 detailCodeName만 options 배열로 설정
      const optionData2 = result.data.codeList.map((item) => ({
        detailCode: item.detailCode,
        detailCodeName: item.detailCodeName
      }));
      console.log('result.data', result.data);
      setOptionz(optionData2);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const changeData2 = async (e) => {
    await fetchData2();

    const selectedOption = optionz.find((option) => option.detailCode === e.target.value);

    let unitOfEstimate = 0;

    if (selectedOption) {
      // 선택한 옵션에 따라 unitOfEstimate 값을 설정
      if (selectedOption.detailCode === 'DK-AP01') {
        unitOfEstimate = 75000;
      } else if (selectedOption.detailCode === 'DK-AP02') {
        unitOfEstimate = 71000;
      } else if (selectedOption.detailCode === 'DK-01') {
        unitOfEstimate = 1000000;
      } else if (selectedOption.detailCode === 'DK-02') {
        unitOfEstimate = 90000;
      }
    }

    setSelectedCustomer2({
      detailCode: selectedOption.detailCode,
      detailCodeName: selectedOption.detailCodeName,
      unitOfEstimate: unitOfEstimate
    });

    console.log('SelectedCustomer', selectedCustomer2);
  };
  console.log('SelectedCustomerrrrr', selectedCustomer2);
  // detailCode
  // :
  // "DK-01"
  // detailCodeName
  // :
  // "디지털카메라 NO.1" 이렇게 담김

  // useEffect(() => {
  //     console.log("selectedCustomer2.detailCode밖",selectedCustomer2.detailCode) ;
  //   if (selectedCustomer2.detailCode === 'DK-AP01') {
  //     console.log("selectedCustomer2.detailCode안",selectedCustomer2.detailCode) ;
  //     setSumPriceOfEstimate(estimateAmount * 75000);
  //   } else if (selectedCustomer2.detailCode === 'DK-AP02') {
  //     setSumPriceOfEstimate(estimateAmount * 71000);
  //   } else if (selectedCustomer2.detailCode === 'DK-01') {
  //     console.log("test")
  //     setSumPriceOfEstimate(estimateAmount * 1000000);
  //   } else if (selectedCustomer2.detailCode === 'DK-02') {
  //     setSumPriceOfEstimate(estimateAmount * 90000);
  //   }
  // }, [estimateAmount,selectedCustomer2]);

  useEffect(() => {
    // estimateAmount와 selectedCustomer2.detailCode가 둘 다 값이 있을 때 실행
    if (estimateAmount !== null && selectedCustomer2.detailCode !== null) {
      const updatedSumPrice =
        selectedCustomer2.detailCode === 'DK-AP01'
          ? estimateAmount * selectedCustomer2.unitOfEstimate
          : selectedCustomer2.detailCode === 'DK-AP02'
          ? estimateAmount * selectedCustomer2.unitOfEstimate
          : selectedCustomer2.detailCode === 'DK-01'
          ? estimateAmount * selectedCustomer2.unitOfEstimate
          : selectedCustomer2.detailCode === 'DK-02'
          ? estimateAmount * selectedCustomer2.unitOfEstimate
          : 0; // 기본값 또는 예외 처리

      setSumPriceOfEstimate(updatedSumPrice);
    }
  }, [estimateAmount, selectedCustomer2.detailCode]);

  const [estimateDate, setEstimateDate] = useState('');
  const [effectiveDate, setEeffectiveDate] = useState('');
  const [personCodeInCharge, setPersonCodeInCharge] = useState('');
  const [estimateRequester, setEstimateRequester] = useState('');
  const [rowDataEstimate, setRowDataEstimate] = useState([]);

  const onChangeData2 = (e: any) => {
    if (e.target.id === 'estimateDate') {
      const dateString = e.target.value.toString();
      setEstimateDate(dateString);
    } else if (e.target.id === 'effectiveDate') {
      const dateString2 = e.target.value.toString();
      setEeffectiveDate(dateString2);
    } else if (e.target.id === 'personCodeInCharge') {
      setPersonCodeInCharge(e.target.value);
    } else if (e.target.id === 'estimateRequester') {
      setEstimateRequester(e.target.value);
    }
  };
  console.log('estimateDate', estimateDate);
  console.log('effectiveDate', effectiveDate);
  console.log('personCodeInCharge', personCodeInCharge);
  console.log('estimateRequester', estimateRequester);

  const [itemName, setItemName] = useState('');
  const [dueDateOfEstimate, setDueDateOfEstimate] = useState('');
  const [estimateAmount, setEstimateAmount] = useState<number>(0);
  const [unitOfEstimate, setUnitOfEstimate] = useState('');

  const onChangeData3 = (e: any) => {
    if (e.target.name === 'itemName') {
      //품목명
      setItemName(e.target.value);
      console.log('???????', e.target.value);
    } else if (e.target.id === 'dueDateOfEstimate') {
      //납기일
      const dateString2 = e.target.value.toString();
      setDueDateOfEstimate(dateString2);
    } else if (e.target.id === 'estimateAmount') {
      //견적수량
      setEstimateAmount(e.target.value);
    } else if (e.target.id === 'unitOfEstimate') {
      //견적단가
      setUnitOfEstimate(e.target.value);
    }
  }; //sumPriceOfEstimate 합계액
  console.log('itemName', itemName);
  console.log('dueDateOfEstimate', dueDateOfEstimate);
  console.log('estimateAmount', estimateAmount);
  console.log('unitOfEstimate', unitOfEstimate);

  interface ContractData {
    contractStatus: string | null;
    customerCode: string;
    customerName: string;
    description: string | null;
    effectiveDate: string;
    estimateDate: string;
    estimateDetailTOList: EstimateDetail[];
    estimateNo: string;
    estimateRequester: string;
    personCodeInCharge: string;
    personNameCharge: string | null;
    status: string;
  }

  interface EstimateDetail {
    status: string;
    unitOfEstimate: string;
    estimateNo: string;
    unitPriceOfEstimate: number;
    estimateDetailNo: string;
    description: string;
    dueDateOfEstimate: string;
    estimateAmount: number;
    itemCode: string;
    itemName: string;
    sumPriceOfEstimate: number;
  }

  console.log('sumPriceOfEstimateeeeee', sumPriceOfEstimate);

  // const insertEstimate = async () => {
  //   const newData: ContractData = {
  //     contractStatus: '',
  //     customerCode: selectedCustomer.customerCode,
  //     customerName: selectedCustomer.customerName,
  //     description: '',
  //     effectiveDate: effectiveDate,
  //     estimateDate: estimateDate,
  //     estimateDetailTOList: [], // 여기를 빈 배열로 초기화
  //     estimateNo: '',
  //     estimateRequester: estimateRequester,
  //     personCodeInCharge: personCodeInCharge,
  //     personNameCharge: '',
  //     status: 'INSERT'
  //   };

  //   const detailData: EstimateDetail[] = [
  //     {
  //       status: 'INSERT',
  //       unitOfEstimate: 'EA',
  //       estimateNo: '',
  //       unitPriceOfEstimate: selectedCustomer2.unitOfEstimate,
  //       estimateDetailNo: '',
  //       description: '',
  //       dueDateOfEstimate: dueDateOfEstimate,
  //       estimateAmount: estimateAmount,
  //       itemCode: selectedCustomer2.detailCode,
  //       itemName: selectedCustomer2.detailCodeName,
  //       sumPriceOfEstimate: sumPriceOfEstimate
  //     }
  //   ];

  //   newData.estimateDetailTOList = detailData;

  // try {
  //   const result = await axios.post(
  //     `${process.env.REACT_APP_DOCKER_API_URL}/logisales/estimate/new`,
  //     {
  //       estimateDate: estimateDate,
  //       newEstimateInfo: newData
  //     },
  //     {
  //       headers: {
  //         'Content-Type': 'application/json'
  //       }
  //     }
  //   );
  //   alert('견적 내역이 등록되었습니다.');
  //   console.log('Estimate inserted:', result.data);
  // } catch (error) {
  //   console.error('Error inserting estimate:', error);
  // }
  // };

  const insertEstimate = () => {
    const newData: ContractData = {
      contractStatus: '',
      customerCode: selectedCustomer.customerCode,
      customerName: selectedCustomer.customerName,
      description: '',
      effectiveDate: effectiveDate,
      estimateDate: estimateDate,
      estimateDetailTOList: [], // 여기를 빈 배열로 초기화
      estimateNo: '',
      estimateRequester: estimateRequester,
      personCodeInCharge: personCodeInCharge,
      personNameCharge: '',
      status: 'INSERT'
    };

    const detailData: EstimateDetail[] = [
      {
        status: 'INSERT',
        unitOfEstimate: 'EA',
        estimateNo: '',
        unitPriceOfEstimate: selectedCustomer2.unitOfEstimate,
        estimateDetailNo: '',
        description: '',
        dueDateOfEstimate: dueDateOfEstimate,
        estimateAmount: estimateAmount,
        itemCode: selectedCustomer2.detailCode,
        itemName: selectedCustomer2.detailCodeName,
        sumPriceOfEstimate: sumPriceOfEstimate
      }
    ];

    newData.estimateDetailTOList = detailData;

    // 등록 데이터 전송
    dispatch(postEstimateData({ estimateDate, newData }));

    Swal.fire({
      icon: 'success',
      title: '등록성공'
    }).then(() => {
      window.location.reload();
    }).catch((err) => {
      
    });
  };

  // const message = useSelector((state) => state.estimateRegist.estimateRegistData);
  // console.log("message",message);

  return (
    <>
      <TableRow hover sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell data-action="itemName">
          <FormControl sx={{ m: 1, minWidth: 140 }}>
            <InputLabel>거래처명</InputLabel>
            <Select
              name="itemName"
              onChange={(e) => {
                console.log('eeee', e);
                changeData(e);
              }}
            >
              {options.map((option, index) => (
                <MenuItem
                  key={index}
                  value={option.customerName} // customerCode를 값으로 설정
                >
                  {`${option.customerName}`} {/* customerCode와 customerName을 함께 표시 */}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </TableCell>

        <TableCell>
          <TextField
            id="estimateDate"
            // onChange={onChangeData2}
            sx={{ m: 1, minWidth: 140 }}
            type={'date'}
            style={textFieldStyle}
            onChange={onChangeData2}
            defaultValue="견적일자"
          />
        </TableCell>

        <TableCell>
          <TextField
            id="effectiveDate"
            sx={{ m: 1, minWidth: 140 }}
            onChange={onChangeData2}
            type={'date'}
            style={textFieldStyle}
            defaultValue="유효일자"
          />
        </TableCell>

        <TableCell>
          <TextField
            id="personCodeInCharge"
            name="personCodeInCharge"
            label="견적담당자"
            sx={{ m: 1, minWidth: 70 }}
            onChange={onChangeData2}
          ></TextField>
        </TableCell>

        <TableCell>
          <TextField
            id="estimateRequester"
            name="estimateRequester"
            label="견적요청자"
            sx={{ m: 1, minWidth: 70 }}
            onChange={onChangeData2}
          ></TextField>
        </TableCell>

        <TableCell sx={{ pl: 3 }}>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>

        <TableCell>
          <Button variant="contained" color="secondary" style={buttonStyle} onClick={() => insertEstimate()}>
            등록
          </Button>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            {open && (
              <Box sx={{ margin: 1 }}>
                <TableContainer>
                  <SubCard
                    sx={{ bgcolor: theme.palette.mode === 'dark' ? 'dark.800' : 'grey.50', mb: 2 }}
                    title="견적상세추가"
                    content={false}
                    secondary={<Stack direction="row" spacing={2} alignItems="center"></Stack>}
                  >
                    <Table size="small" aria-label="purchases">
                      <TableHead>
                        <TableRow>
                          <TableCell>견적수량</TableCell>
                          <TableCell>*</TableCell>
                          <TableCell>품목명/품목코드</TableCell>
                          <TableCell>견적단가</TableCell>
                          <TableCell>=</TableCell>
                          <TableCell>합계액</TableCell>
                          <TableCell>단위</TableCell>
                          <TableCell>납기일</TableCell>
                          <TableCell>비고</TableCell>
                        </TableRow>
                      </TableHead>

                      <TableBody>
                        <TableCell>
                          <TextField
                            id="estimateAmount"
                            name="estimateAmount"
                            label="견적수량"
                            sx={{ m: 1, minWidth: 80 }}
                            onChange={onChangeData3}
                          >
                            견적수량
                          </TextField>
                        </TableCell>
                        <TableCell>*</TableCell>

                        <TableCell data-action="itemName">
                          <FormControl sx={{ m: 1, minWidth: 140 }}>
                            <InputLabel></InputLabel>
                            <Select
                              id="itemName"
                              name="itemName"
                              onChange={(e) => {
                                console.log('eeee', e);
                                changeData2(e);
                                onChangeData3(e);
                              }}
                            >
                              {optionz.map((option, index) => (
                                <MenuItem key={index} value={option.detailCode}>
                                  {`${option.detailCodeName} / ${option.detailCode} `}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </TableCell>

                        <TableCell>
                          <TextField
                            id="unitOfEstimate"
                            name="unitOfEstimate"
                            label={selectedCustomer2.unitOfEstimate}
                            sx={{ m: 1, minWidth: 80 }}
                            onChange={onChangeData2}
                          >
                            selectedCustomer2.unitOfEstimate
                          </TextField>
                        </TableCell>
                        <TableCell>=</TableCell>

                        <TableCell>
                          <TextField
                            id="sumPriceOfEstimate"
                            name="sumPriceOfEstimate"
                            label={sumPriceOfEstimate}
                            sx={{ m: 1, minWidth: 130 }}
                            onChange={onChangeData3}
                          >
                            {sumPriceOfEstimate}
                          </TextField>
                        </TableCell>

                        <TableCell>EA</TableCell>

                        <TableCell>
                          <TextField
                            id="dueDateOfEstimate"
                            onChange={onChangeData3}
                            type={'date'}
                            sx={{ m: 1, minWidth: 130 }}
                            style={textFieldStyle}
                            defaultValue="납기일"
                          />
                        </TableCell>

                        <TableCell>
                          <TextField id="description" name="description" label="비고" sx={{ m: 1, minWidth: 80 }} onChange={onChangeData3}>
                            비고
                          </TextField>
                        </TableCell>
                      </TableBody>
                    </Table>
                  </SubCard>
                </TableContainer>
              </Box>
            )}
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0, 3.99)
  // createData('Ice cream sandwich', 237, 9.0, 37, 4.3, 4.99),
  // createData('Eclair', 262, 16.0, 24, 6.0, 3.79)
];

// ==============================|| TABLE - COLLAPSIBLE ||============================== //

function estimateRegister() {
  let newRow: any = [];
  rows.forEach((element) => {
    newRow.push({
      ...element,
      history: null
    });
  });
  return (
    <Page title="견적 등록">
      <MainCard
        content={false}
        title="견적 등록"
        secondary={
          <Stack direction="row" spacing={2} alignItems="center">
            <SecondaryAction link="https://next.material-ui.com/components/tables/" />
          </Stack>
        }
      >
        {/* table */}
        <TableContainer>
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow>
                <TableCell>거래처명</TableCell>
                <TableCell>견적일자</TableCell>
                <TableCell>유효일자</TableCell>
                <TableCell>견적담당자</TableCell>
                <TableCell>견적요청자</TableCell>
                <TableCell>견적상세기입란</TableCell>
                <TableCell>등록란</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <Row key={row.name} row={row} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </MainCard>
    </Page>
  );
}

estimateRegister.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default estimateRegister;