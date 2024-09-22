import React, { useState, useCallback, useEffect } from 'react';
import Layout from 'layout';
import MyGrid from 'pages/utils/Mygrid';
import Axios from 'axios';
import Swal from 'sweetalert2';
import MainCard from 'ui-component/cards/MainCard';
import MyDialog from 'pages/utils/MyDialog';
import { DataGrid } from '@mui/x-data-grid';
import {textAlign} from "@mui/system";
import {Button, Grid, Box} from "@mui/material";
import MyCalendar from 'pages/utils/Mycalender';

const codeInfo = (props) => {
    const [list, setList] = useState([]);
    const [size, setSize] = useState('50vh');
    const [data, setData] = useState(null);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [selectRows, setSelectRows] = useState([]);

    const column = [
      { headerName: '코드번호', field: 'divisionCodeNo', minWidth: 100, flex: 1  }, 
      { headerName: '코드타입', field: 'codeType', minWidth: 100, flex: 1 },
      { headerName: '코드이름', field: 'divisionCodeName', minWidth: 100, flex: 1 },
      { headerName: '변경가능여부', field: 'codeChangeAvailable', minWidth: 100, flex: 1 }
    ]

    const serchCodeList = async () => {
      const response = await Axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/compinfo/code/list`);
      const codeList = response.data.codeList;
      console.log(codeList);
      setList(codeList);
    }

    return (
        <>
            <MainCard
                content={false}
                title={' '}
                secondary={
                    <Grid item xs={12} sm={6}>
                    <Button variant="contained" color="secondary" style={{ marginRight: '1vh', marginTop: '1vh' }} onClick={() => serchCodeList()} >
                      코드 조회
                    </Button>
                    <Button variant="contained" color="secondary" style={{ marginRight: '1vh', marginTop: '1vh' }} onClick={() => serchCodeList()} >
                      코드 추가
                    </Button>
                    <Button variant="contained" color="secondary" style={{ marginRight: '1vh', marginTop: '1vh' }} onClick={() => serchCodeList()} >
                      코드 수정
                    </Button>
                    <Button variant="contained" color="secondary" style={{ marginRight: '1vh', marginTop: '1vh' }} onClick={() => serchCodeList()} >
                      코드 삭제
                    </Button>
                  </Grid>
                }
            >
                <Box
                sx={{
                height: 400,
                width: '100%',
                background: 'white'
                }}
                >
                <DataGrid
                rows={list}
                columns={column}
                getRowId={(row) => row.divisionCodeNo}
                pageSize={10}
                rowsPerPageOptions={[10]}
                checkboxSelection
                disableRowSelectionOnClick
                onRowSelectionModelChange={itm => {
                  if (itm.length > 1) {
                    const itmSet = new Set(selectRows);
                    const result = itm.filter((s) => !itmSet.has(s));
                    setSelectRows(result);
                    console.log(result)
                  } else if(itm.length = 1) {
                    console.log(itm)
                    setSelectRows(itm)
                  } else {
                    setSelectRows([null]);
                  }
                }}
                rowSelectionModel={selectRows}
                />
                </Box>

            </MainCard>
        </>
    );
}

codeInfo.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default codeInfo
