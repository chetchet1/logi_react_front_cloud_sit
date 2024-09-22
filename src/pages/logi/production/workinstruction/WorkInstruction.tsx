import React, { useState, useCallback, useEffect } from 'react';
import MyGrid from 'pages/utils/Mygrid';
import Axios from 'axios';
import Swal from 'sweetalert2';
import MainCard from 'ui-component/cards/MainCard';
import MyDialog from 'pages/utils/MyDialog';
import { DataGrid } from '@mui/x-data-grid';
import {textAlign} from "@mui/system";
import {Button, Grid, Box} from "@mui/material";
import WorkOrderDialog from './WorkOrderDialog';

const WorkInstruction = (props) => {
    const [list, setList] = useState([]);
    const [size, setSize] = useState('50vh');
    const [searchOpenDialog, setSearchOpenDialog] = useState(false);
    const [data, setData] = useState(null);
    const [workOderableGridApi, setWorkOderableGridApi] = useState(null);
    const [selectRows, setSelectRows] = useState([]);
    const [selectionModel, setSelectionModel] = useState([null]);

    const column = [
        { headerName: '소요량취합번호', field: 'mrpGatheringNo', minWidth: 150 ,flex: 1,},
        { headerName: '품목분류', field: 'itemClassification', minWidth: 120 ,flex: 1,},
        { headerName: '품목코드', field: 'itemCode', minWidth: 120 ,flex: 1,},
        { headerName: '품목명', field: 'itemName', minWidth: 150 ,flex: 1,},
        { headerName: '단위', field: 'unitOfMrp', minWidth: 120 ,flex: 1,},
        { headerName: '필요수량', field: 'requiredAmount', minWidth: 120 ,flex: 1,},
        { headerName: '작업지시기한', field: 'orderDate', minWidth: 120 ,flex: 1,},
        { headerName: '작업완료기한', field: 'requiredDate', minWidth: 120 ,flex: 1,}
    ];

    useEffect(() => {
      setSelectionModel([null])
    }, [])

    const customerSearchClick = () => {
        const targetValue = selectRows[0];
        const data = list.filter(item => item.mrpNo === targetValue)[0];
        setData(data);
        if(!data){
            return Swal.fire('오류','작업목록선택','error');
        }
        else{
            setSearchOpenDialog(true);
            console.log(data)
            console.log("작업지시모의전개 클릭");
        }
    };

    const close = () => {
        setSearchOpenDialog(false);
    };

    const contractSearch = () => { //작업지시 (작업지시필요목록조회)
        console.log("작업지시 실행");
        Axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/quality/workorder/mrpavailable`)
            .then(({data}) => {
                setList(data.gridRowJson);
                console.log(data.gridRowJson);
            })
            .catch(e => {
                Swal.fire('오류', e, 'error');
            });
    };

    return (
        <>
            <MainCard
                content={false}
                title={'작업지시 필요 리스트 ( MRP 취합 기반 )'}
                secondary={<Grid item xs={12} sm={6} sx={{textAlign: 'right'}}>
                    <Button variant="contained" color="secondary" onClick={customerSearchClick}
                            style={{ marginRight: '1vh', marginTop: '1vh' }}
                    >
                        작업지시모의전개
                    </Button>
                    <Button variant="contained" color="secondary" onClick={contractSearch}
                            style={{ marginRight: '1vh', marginTop: '1vh' }}
                    >
                        작업지시필요목록조회
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
                getRowId={(row) => row.mrpNo}
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

                <MyDialog open={searchOpenDialog} close={close} maxWidth={'200px'}>
                    <WorkOrderDialog data={data} close={()=>close()} setList={setList} contractSearch={()=>contractSearch()}/>
                </MyDialog>

            </MainCard>
        </>
    );
}

export default WorkInstruction
