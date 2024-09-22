import {
  Button,
  FormControlLabel,
  TextField,
  Grid,
  RadioGroup,
  Radio,
  Box,
  InputLabel,
  FormControl,
  Dialog,
  Modal,
  Select,
  MenuItem
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import Layout from 'layout';
import { ReactElement } from 'react-markdown/lib/react-markdown';
import { DataGrid } from '@mui/x-data-grid';
import MainCard from 'ui-component/cards/MainCard';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import useInput from 'utils/useInput';

//✔️[수주 관리] 페이지
function LogisticsBOMSearch() {
  const [divisionCode, setDivisionCode] = useState(null);
  const [condition, setCondition] = useState(null);
  const [itemCode, setItemCode] = useState(null);
  const [deployCondition, setDeployCondition] = useState(null);
  const [options, setOptions] = useState([]);
  const [bomData, setBomData] = useState([]);

  const columnDefs = [
    { headerName: 'BOM번호', field: 'bomNo', width: 120 },
    { headerName: 'BOM레벨', field: 'bomLevel', width: 100 },
    { headerName: '상위품목코드', field: 'parentItemCode', width: 120 },
    { headerName: '품목코드', field: 'itemCode', width: 120 },
    { headerName: '품목명', field: 'itemName', width: 120 },
    { headerName: '단위', field: 'unitOfStock', width: 100 },
    { headerName: '정미수량', field: 'netAmount', width: 100 },
    { headerName: '손실율', field: 'lossRate', width: 100 },
    { headerName: '필요수량', field: 'necessaryAmount', width: 100 },
    { headerName: '리드타임', field: 'leadTime', width: 100 },
    { headerName: 'isLeaf', field: 'isLeaf', width: 100 },
    { headerName: '비고', field: 'description', width: 100 }
  ];

  const onChangeData2 = (e: any) => {
    console.log('e', e.target.value);
    setItemCode(e.target.value);
  };

  const fetchData = async (divisionCode: any) => {
    console.log('divisionCode', divisionCode);
    try {
      const result = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/compinfo/codedetail/list`, {
        params: {
          divisionCodeNo: divisionCode
        }
      });
      const codeList = result.data.codeList;

      const optionData = codeList.map((item) => ({
        detailCode: item.detailCode, // detailCode를 객체의 detailCode 속성으로 설정
        detailCodeName: item.detailCodeName // detailCodeName을 객체의 detailCodeName 속성으로 설정
      }));

      setOptions(optionData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    // if (detailCode.data)
    //     setData(detailCode.data.codeList);
    fetchData(divisionCode);
  }, [divisionCode]);

  const onDivisionChange = (e: any) => {
    console.log('divisionCodedivisionCode', e.target.value);
    setDivisionCode(e.target.value);
    setDeployCondition(e.currentTarget.value);
  };

  const onConditionChange = (e: any) => {
    console.log('conditioncondition', e.target.value);
    setCondition(e.target.value);
    setDeployCondition(e.currentTarget.value);
  };

  const handleClickOpen = () => {
    {
      if (divisionCode === null) {
        alert('품목분류를 먼저 선택해주세요.');
        return;
      } else if (condition === null) {
        alert('검색조건을 선택해주세요.');
        return;
      } else {
        console.log(divisionCode + ' && ' + condition);
        fetchData2();
      }
    }
  };

  const fetchData2 = async () => {
    console.log('divisionCode', divisionCode);
    try {
      const result = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/stock/bom/deploy`, {
        params: {
          deployCondition: condition,
          itemCode: itemCode,
          itemClassificationCondition: divisionCode
        }
      });

      console.log('result', result.data);
      setBomData(result.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div style={{ flex: 1 }}>
          <fieldset>
            <legend>품목분류</legend>
            <FormControl>
              <RadioGroup row aria-label="itemCode" onChange={onDivisionChange}>
                <FormControlLabel value="IT-CI" control={<Radio />} label="완제품" />
                <FormControlLabel value="IT-SI" control={<Radio />} label="반제품" />
                <FormControlLabel value="IT-MA" control={<Radio />} label="원재료" />
              </RadioGroup>
            </FormControl>
          </fieldset>
        </div>
        <div style={{ flex: 1 }}>
          <fieldset>
            <legend>BOM 검색조건</legend>
            <FormControl>
              <RadioGroup row aria-label="condition" onChange={onConditionChange}>
                <FormControlLabel value="forward" control={<Radio />} label="정전개" />
                <FormControlLabel value="reverse" control={<Radio />} label="역전개" />
              </RadioGroup>
            </FormControl>
          </fieldset>
        </div>
        <div style={{ display: 'flex', flex: 1, alignItems: 'center' }}>
          <FormControl sx={{ m: 1, minWidth: 140 }}>
            <InputLabel id="itemCode">품목코드</InputLabel>
            <Select
              name="itemName"
              onChange={(e) => {
                onChangeData2(e);
              }}
            >
              {options.map((option, index) => (
                <MenuItem key={index} value={option.detailCode}>
                  {option.detailCodeName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Button
            style={{ marginLeft: '8px' }} // 필요에 따라 마진 조정
            variant="contained"
            color="secondary"
            onClick={handleClickOpen}
          >
            BOM 조회
          </Button>
        </div>
      </div>

      <MainCard>
        <Box
          sx={{
            height: 500,
            width: '100%',
            background: 'white'
          }}
        >
          <DataGrid rows={bomData} columns={columnDefs} pageSize={10} rowsPerPageOptions={[10]} getRowId={(row) => row.bomNo} />
          {/* <Button onClick={() => yearSetOpen(false)}>닫기</Button> */}
        </Box>
      </MainCard>
    </>
  );
}

LogisticsBOMSearch.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
export default LogisticsBOMSearch;
