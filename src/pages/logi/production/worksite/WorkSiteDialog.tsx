import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MyGrid from 'pages/utils/Mygrid';
import mrpListColumn from 'pages/logi/mrp/mrpColumn';
import MainCard from 'ui-component/cards/MainCard';
import Swal from 'sweetalert2';
import { TextField, Button, Box, Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import MyCalendar from 'pages/utils/Mycalender';
import useInput from 'utils/useInput';
import { today } from 'utils/hr/lib';
import { DataGrid } from '@mui/x-data-grid';
import { getWorkSiteSituationList, registerWorkcompletion } from 'pages/logi/production/worksite/redux/workSiteToolkit';


const WorkSiteDialog = (props) => {

  const [list, setList] = useState([]);
  const [Date, setDate] = useState('');

  const Columns = [
    { headerName: '작업지시번호', field: 'workOrderNo', width: 150 },
    { headerName: '작업장명', field: 'workSiteName', width: 130 },
    { headerName: '제작품목분류', field: 'wdItem', width: 130 },
    { headerName: '제작품목코드', field: 'parentItemCode', width: 130 },
    { headerName: '제작품목명', field: 'parentItemName', width: 130 },
    { headerName: '작업품목분류', field: 'itemClassIfication', width: 170 },
    { headerName: '작업품목코드', field: 'itemCode', width: 130},
    { headerName: '작업품목명', field: 'itemName', width: 130},
    { headerName: '작업량', field: 'requiredAmount', width: 130 }
  ];

  const dispatch = useDispatch();

  const state = useSelector((state) => {
    return state.workSite.WorkSiteSituationList;
  });

  const theme = useTheme();

  useEffect(() => {
    dispatch(getWorkSiteSituationList(props));
  }, []); 

  useEffect(() => {
    setList(state);
    console.log(state);
  }, [state]);

  const workcompletion = () => {
    try {
      const itemCodes = list.map(item => item.itemCode);
      dispatch(registerWorkcompletion({props, itemCodes}));
      props.close()
      Swal.fire({
        icon: 'success',
        title: '검사 및 제작 성공'
      }).then((result) => {
        props.serchWorkSiteList()
      }).catch((err) => {
        
      });
    } catch (error) {
      props.close()
      Swal.fire({
        icon: 'error',
        title: '검사 및 제작 실패'
      }).then((result) => {
        props.serchWorkSiteList()
      }).catch((err) => {
        
      });
    }

  }

  return (
    <>
    <MainCard
      title="MRP 모의전개"
      content={false}
      secondary={
        <Grid item xs={12} sm={6}>
          <Button
            variant="contained"
            color="secondary"
            style={{ marginRight: '1vh', marginTop: '1vh' }}
            onClick={() => workcompletion()}
          >
            검사 및 제작완료
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
                rows={list}
                columns={Columns}
                pageSize={10}
                rowsPerPageOptions={[10]}
                getRowId={(row) => row.workOrderNo}
              />
            </Box>
    </MainCard>
    </>
  );
};

export default WorkSiteDialog;