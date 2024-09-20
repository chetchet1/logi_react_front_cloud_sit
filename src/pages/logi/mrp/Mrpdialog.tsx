import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MyGrid from 'pages/utils/Mygrid';
import mrpListColumn from 'pages/logi/mrp/mrpColumn';
import MainCard from 'ui-component/cards/MainCard';
import { TextField, Button, Box, Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import MyCalendar from 'pages/utils/Mycalender';
import useInput from 'utils/useInput';
import Swal from 'sweetalert2';
import { today } from 'utils/hr/lib';
import { DataGrid } from '@mui/x-data-grid';
import { getMrpSimulatorList, postMrpSimulator } from 'pages/logi/mrp/redux/mrpSimulatorToolkit';


const Mrpdialog = ({ selectedRows, mrpClose, searchMps }: any) => {

  const [mrpSimulatorList, setMrpSimulatorList] = useState([]);
  const [Date, setDate] = useState('');

  const Columns = [
    {
      headerName: '주생산계획번호',
      field: 'mpsNo',
      width: 130,
      suppressSizeToFit: true,
      headerCheckboxSelection: false,
      headerCheckboxSelectionFilteredOnly: true,
      suppressRowClickSelection: true,
      checkboxSelection: true
    },
    { headerName: 'BOM번호', field: 'bomNo', width: 130 },
    { headerName: '품목구분', field: 'itemClassification', width: 100 },
    { headerName: '품목코드', field: 'itemCode' },
    { headerName: '품목명', field: 'itemName', width: 150 },
    { headerName: '발주/작업지시 기한', field: 'orderDate', width: 150 },
    { headerName: '발주/작업지시 완료기한', field: 'requiredDate', width: 170 },
    { headerName: '계획수량', field: 'planAmount', width: 100},
    { headerName: '누적손실율', field: 'totalLossRate', width: 100},
    { headerName: '계산수량', field: 'caculatedAmount', width: 100 },
    { headerName: '필요수량', field: 'requiredAmount', width: 100 },
    { headerName: '단위', field: 'unitOfMrp', width: 100 }
  ];

  const dispatch = useDispatch();

  const state = useSelector((state) => {
    return state.mrpSimulator.mrpSimulatorList;
  });

  const theme = useTheme();

  useEffect(() => {
    const selectedRow = selectedRows[0];
    dispatch(getMrpSimulatorList(selectedRow));
  }, []); 

  useEffect(() => {
    setMrpSimulatorList(state);
    console.log(state);
  }, [state]); 

  const registerMrp = () => {
    try {
      dispatch(postMrpSimulator({date: Date, list: mrpSimulatorList}));
      Swal.fire({
        icon: 'success',
        title: 'MPS 등록완료'
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'MPS 등록에러'
      });
    }
    mrpClose();
    searchMps();

  };

  return (
    <>
    <MainCard
      title="MRP 모의전개"
      content={false}
      secondary={
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth label="등록일자"
            name="등록일자"
            type={"date"}
            onChange={(event) => { setDate(event.target.value) }}
            InputLabelProps={{ shrink: true, }}
            style={{ width: '130px', height: '40px', marginRight: '2vh' }}
          />

          <Button
            variant="contained"
            color="secondary"
            style={{ marginRight: '1vh', marginTop: '1vh' }}
            onClick={() => registerMrp()}
          >
            MPS 등록
          </Button>
        </Grid>
      }
    >
            <Box
              sx={{
                height: 500,
                width: '100%',
                '& .MuiDataGrid-root': {
                  border: 'none',
                  '& .MuiDataGrid-cell': {
                    borderColor: theme.palette.mode === 'dark' ? theme.palette.text.primary + 15 : 'grey.200'
                  },
                  '& .MuiDataGrid-columnsContainer': {
                    color: theme.palette.mode === 'dark' ? 'grey.600' : 'grey.900',
                    borderColor: theme.palette.mode === 'dark' ? theme.palette.text.primary + 15 : 'grey.200'
                  },
                  '& .MuiDataGrid-columnSeparator': {
                    color: theme.palette.mode === 'dark' ? theme.palette.text.primary + 15 : 'grey.200'
                  }
                }
              }}
            >
              <DataGrid
                rows={mrpSimulatorList}
                columns={Columns}
                pageSize={10}
                rowsPerPageOptions={[10]}
                getRowId={(row) => row.bomNo}
              />
            </Box>
    </MainCard>
    </>
  );
};

export default Mrpdialog;