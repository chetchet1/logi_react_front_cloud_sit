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
import { DataGrid, GridActionsCellItem, GridSaveAltIcon, GridToolbarContainer } from '@mui/x-data-grid';
import MainCard from 'ui-component/cards/MainCard';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';

//✔️[수주 관리] 페이지
function LogisticsBOMRegister() {
  const [divisionCode, setDivisionCode] = useState(null);
  const [divisionCode3, setDivisionCode3] = useState(null);

  const [condition, setCondition] = useState(null);
  const [itemCode, setItemCode] = useState(null);
  const [deployCondition, setDeployCondition] = useState(null);
  const [options, setOptions] = useState([]);
  const [options3, setOptions3] = useState([]);

  const [bomData, setBomData] = useState([]);
  const [bomItemName, setBomItemName] = useState([]);

  const [noData, setNoData] = useState(0);

  const [rows, setRows] = React.useState(bomData);
  const [id, setId] = useState('');
  const [noValues, setNoValues] = useState([]);
  const [maxNo, setMaxNo] = useState(0); // Initialize maxNo with 0

  const columns = [
    {
      headerName: 'NO',
      field: 'no',
      width: 100
    },
    {
      //
      headerName: '품목구분',
      field: 'itemClassificationName',
      width: 130,
      editable: true,
      type: 'singleSelect',
      align: 'center',
      headerAlign: 'center',
      renderCell: (params) => (
        <Box
          sx={{
            width: 150
          }}
        >
          <FormControl
            sx={{
              m: 1,
              minWidth: 100
            }}
          >
            <InputLabel>{params.row.itemClassificationName}</InputLabel>
            <Select
              name="contractType"
              onChange={(e) => {
                setDivisionCode3(e.target.value);
                const newValue = e.target.value;
                params.row.itemClassificationName = newValue;
              }}
            >
              <MenuItem value="IT-CI">완제품</MenuItem>
              <MenuItem value="IT-SI">반제품</MenuItem>
              <MenuItem value="IT-MA">원재료</MenuItem>
            </Select>
          </FormControl>
        </Box>
      )
    },
    {
      headerName: '품목명',
      field: 'itemName',
      width: 200,
      editable: true,
      align: 'center',
      headerAlign: 'center',
      type: 'singleSelect',
      renderCell: (params) => (
        <Box
          sx={{
            width: 180
          }}
        >
          <FormControl
            sx={{
              m: 1,
              minWidth: 150
            }}
          >
            <InputLabel>{params.row.itemName}</InputLabel>
            <Select
              name="itemName"
              onChange={(e) => {
                const newValue = e.target.value;
                params.row.itemCode = newValue;
              }}
            >
              {options3.map((option3, index) => (
                <MenuItem key={index} value={option3.detailCode}>
                  {option3.detailCodeName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      )
    },
    {
      headerName: '품목코드',
      field: 'itemCode',
      width: 130,
      align: 'center',
      headerAlign: 'center',
      editable: true,
      hide: true
    },
    {
      //
      headerName: '정미수량',
      field: 'netAmount',
      width: 130,
      type: 'number',
      editable: true,
      align: 'center',
      headerAlign: 'center',
      renderCell: (params) => (
        <Box
          sx={{
            width: 150
          }}
        >
          <TextField
            id="netAmount"
            name="netAmount"
            label={params.row.netAmount}
            sx={{
              m: 1,
              minWidth: 100
            }}
            onChange={(e) => {
              const newValue = e.target.value;
              params.row.netAmount = newValue;
            }}
          >
            {params.row.netAmount}
          </TextField>
        </Box>
      )
    },
    {
      headerName: '설명',
      field: 'description',
      width: 130,
      editable: true,
      align: 'center',
      headerAlign: 'center',
      renderCell: (params) => (
        <Box
          sx={{
            width: 150
          }}
        >
          <TextField
            id="description"
            name="description"
            label={params.row.description}
            sx={{
              m: 1,
              minWidth: 100
            }}
            onChange={(e) => {
              const newValue = e.target.value;

              // params.row를 업데이트하여 새 설명으로 설정
              params.row.description = newValue;
            }}
          />
        </Box>
      )
    },
    {
      headerName: 'itemClassification', //
      field: 'itemClassification',
      width: 130,
      hide: true
    },
    {
      headerName: 'parentItemCode', //
      field: 'parentItemCode',
      width: 130,
      hide: true
    },
    {
      headerName: 'beforeStatus',
      field: 'beforeStatus',
      width: 130,
      hide: true
    },
    {
      headerName: 'deleteStatus',
      field: 'deleteStatus',
      width: 130,
      hide: true
    },
    {
      field: 'insert',
      type: 'insert',
      headerName: '등록',
      width: 130,
      align: 'center',
      headerAlign: 'center',
      cellClassName: 'insert',
      renderCell: (params) => (
        <GridActionsCellItem
          icon={<GridSaveAltIcon />}
          label="Save"
          sx={{
            color: 'primary.main'
          }}
          onClick={() => handleInsertClick(params)}
        />
      )
    },
    {
      field: 'update',
      type: 'update',
      headerName: '수정',
      width: 130,
      align: 'center',
      headerAlign: 'center',
      cellClassName: 'update',
      renderCell: (params) => (
        <GridActionsCellItem
          icon={<EditIcon />}
          label="Edit"
          className="textPrimary"
          onClick={() => handleEditClick(params)}
          color="inherit"
        />
      )
    },
    {
      field: 'delete',
      type: 'actions',
      headerName: '삭제',
      align: 'center',
      headerAlign: 'center',
      width: 130,
      cellClassName: 'actions',
      renderCell: (params) => (
        <GridActionsCellItem
          icon={<DeleteIcon />}
          label="Edit"
          className="textPrimary"
          onClick={() => handleDeleteClick(params)}
          color="inherit"
        />
      )
    },
    {
      headerName: 'status', //
      field: 'status',
      width: 130,
      hide: true
    }
  ];

  useEffect(() => {
    fetchData3(divisionCode3);
  }, [divisionCode3]);

  const fetchData3 = async (divisionCode3: any) => {
    console.log('divisionCode3', divisionCode3);
    try {
      const result = await axios.get(`${process.env.REACT_APP_DOCKER_API_URL}/compinfo/codedetail/list`, {
        params: {
          divisionCodeNo: divisionCode3
        }
      });
      const codeList = result.data.codeList;

      const optionData = codeList.map((item) => ({
        detailCode: item.detailCode, // detailCode를 객체의 detailCode 속성으로 설정
        detailCodeName: item.detailCodeName // detailCodeName을 객체의 detailCodeName 속성으로 설정
      }));

      setOptions3(optionData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const fetchData = async (divisionCode: any) => {
    console.log('divisionCode', divisionCode);
    try {
      const result = await axios.get(`${process.env.REACT_APP_DOCKER_API_URL}/compinfo/codedetail/list`, {
        params: {
          divisionCodeNo: divisionCode
        }
      });
      const codeList = result.data.codeList;
      const optionData = codeList.map((item) => ({ detailCode: item.detailCode, detailCodeName: item.detailCodeName }));

      setOptions(optionData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const fetchData2 = async () => {
    console.log('divisionCode', divisionCode);
    try {
      const result = await axios.get(`${process.env.REACT_APP_DOCKER_API_URL}/stock/bom/info`, {
        params: {
          parentItemCode: itemCode
        }
      });

      console.log('result', result.data);
      const noValues = result.data.map((item) => item.no);
      const items = result.data.map((item) => ({ itemCode: item.itemCode, itemName: item.itemName }));
      console.log('items', items);

      const maxNo = Math.max(...noValues);
      setBomItemName(items);
      setBomData(result.data);
      setNoData(maxNo);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  console.log('bomItemName', bomItemName);

  useEffect(() => {
    fetchData(divisionCode);
  }, [divisionCode]);

  const onDivisionChange = (e) => {
    console.log('e', e.target.value);
    setDivisionCode(e.target.value);
  };

  const onChangeData2 = (e: any) => {
    console.log('e', e.target.value);
    setItemCode(e.target.value);
  };

  const handleClickOpen = () => {
    {
      if (divisionCode === null) {
        alert('품목분류를 먼저 선택해주세요.');
        return;
      } else {
        console.log(divisionCode + ' && ' + condition);
        fetchData2();
      }
    }
  };

  const onCellClick = (params) => {
    console.log('paramsparams', params);
    setId(params.row.id);
  };

  const handleClick = () => {
    const newMaxNo = noData + 1; // maxNo 증가
    let newData = {
      no: newMaxNo,
      itemClassificationName: '',
      itemCode: '',
      itemName: '',
      netAmount: '',
      customerBusinessItems: '',
      decription: '',
      status: 'INSERT',
      parentItemCode: itemCode //"" -> itemCode로 수정
    };

    setNoData(newMaxNo); // maxNo 업데이트
    setBomData((oldRows) => [...oldRows, newData]);
  };

  const handleDeleteClick = async (params) => {
    console.log('params.idddd', params.id);

    try {
      let newData = {
        no: params.row.no,
        itemClassificationName: params.row.itemClassificationName,
        itemCode: params.row.itemCode,
        itemName: '',
        netAmount: params.row.netAmount,
        customerBusinessItems: '',
        decription: params.row.description,
        status: 'DELETE',
        parentItemCode: params.row.parentItemCode
      };

      console.log('newData', newData);

      // 서버로 삭제 요청 보내기
      const result = await axios.post(`${process.env.REACT_APP_DOCKER_API_URL}/stock/bom/batch`, [newData]);

      console.log('서버 응답:', result.data);

      // 서버 요청이 성공하면 bomData 배열에서 해당 데이터 제거
      if (result.status === 200) {
        setBomData((oldRows) => {
          // oldRows 배열에서 newData와 일치하지 않는 항목들만 유지
          return oldRows.filter((row) => row.no !== params.row.no);
        });
        alert('항목이 삭제되었습니다.');
        console.log('마지막 항목이 삭제되었습니다.');
      }
    } catch (error) {
      console.error('에러 발생:', error);
    }
  };

  const handleEditClick = async (params) => {
    console.log('params.idddd', params.id);

    try {
      let newData = {
        no: params.row.no,
        itemClassificationName: params.row.itemClassificationName,
        itemCode: params.row.itemCode,
        itemName: '',
        netAmount: params.row.netAmount,
        customerBusinessItems: '',
        decription: params.row.description,
        status: 'UPDATE',
        parentItemCode: params.row.parentItemCode
      };
      console.log('newData', newData);
      const result = await axios.post(`${process.env.REACT_APP_DOCKER_API_URL}/stock/bom/batch`, [newData]);
      alert('항목이 수정되었습니다.');

      console.log('서버 응답:', result.data);
    } catch (error) {
      console.error('에러 발생:', error);
    }
  };

  const [selectedRows, setSelectedRows] = useState(null);


  const handleInsertClick = async (params) => {
    console.log('params.idddd', params.id);

    try {
      let newData = {
        no: params.row.no,
        itemClassificationName: params.row.itemClassificationName,
        itemCode: params.row.itemCode,
        itemName: '',
        netAmount: params.row.netAmount,
        customerBusinessItems: '',
        decription: params.row.description,
        status: 'INSERT',
        parentItemCode: params.row.parentItemCode
      };
      console.log('newData', newData);
      const result = await axios.post(`${process.env.REACT_APP_DOCKER_API_URL}/stock/bom/batch`, [newData]);

      console.log('서버 응답:', result.data);
      alert('항목이 등록되었습니다.');
    } catch (error) {
      console.error('에러 발생:', error);
    }
  };

  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div style={{ marginRight: '10px' }}>
          <RadioGroup row aria-label="itemCode" onChange={onDivisionChange}>
            <fieldset>
              <legend>품목분류</legend>
              <FormControlLabel value="IT-CI" control={<Radio />} label="완제품" />
              <FormControlLabel value="IT-SI" control={<Radio />} label="반제품" />
            </fieldset>
          </RadioGroup>
        </div>
        <div style={{ marginRight: '10px' }}>
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
        </div>
        <div style={{ marginRight: '10px' }}>
          <Button style={{ width: 120 }} variant="contained" color="secondary" size="medium" onClick={handleClickOpen}>
            BOM 조회
          </Button>
        </div>
      </div>

      <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
        Add record
      </Button>

      <MainCard>
  <Box
    sx={{
      height: 500, // MainCard의 높이
      width: '100%',
      background: 'white'
    }}
  >
    <DataGrid
      rows={bomData}
      columns={columns}
      pageSize={10}
      rowsPerPageOptions={[10]}
      getRowId={(row) => row.no}
      checkboxSelection
      editMode="row"
      onCellClick={onCellClick}
      density="comfortable"
      autoHeight={true} // MainCard의 높이에 맞게 DataGrid 크기 조정

      // autoPageSize // 페이지 크기 자동 조정
    />
  </Box>
</MainCard>
    </>
  );
}

LogisticsBOMRegister.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
export default LogisticsBOMRegister;
