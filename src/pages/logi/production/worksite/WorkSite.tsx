import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MyGrid from 'pages/utils/Mygrid';
import Axios from 'axios';
import Swal from 'sweetalert2';
import MainCard from 'ui-component/cards/MainCard';
import MyDialog from 'pages/utils/MyDialog';
import { DataGrid } from '@mui/x-data-grid';
import {textAlign} from "@mui/system";
import {Button, Grid, Box} from "@mui/material";
import { getworkSiteList } from 'pages/logi/production/worksite/redux/workSiteToolkit';
import WorkSiteDialog from './WorkSiteDialog';

const WorkSite = (props) => {
    const [list, setList] = useState([]);
    const [size, setSize] = useState('50vh');
    const [workSiteDialog, setWorkSiteDialog] = useState(false);
    const [workOrderNo, setWorkOrderNo] = useState('');
    const [workSiteCourse, setWorkSiteCourse] = useState('');
    const [itemCode, setItemCode] = useState('');
    const [itemClassIfication, setItemClassIfication] = useState('');
    const [selectRows, setSelectRows] = useState([]);

    const column = [
        { headerName: '작업지시일련번호', field: 'workOrderNo', minWidth: 150 ,flex: 1,},
        { headerName: '소요량취합번호', field: 'mrpGatheringNo', minWidth: 150 ,flex: 1,},
        { headerName: '품목분류', field: 'itemClassification', minWidth: 120 ,flex: 1,},
        { headerName: '품목코드', field: 'itemCode', minWidth: 150 ,flex: 1,},
        { headerName: '품목명', field: 'itemName', minWidth: 140 ,flex: 1,},
        { headerName: '단위', field: 'unitOfMrp', minWidth: 120 ,flex: 1,},
        { headerName: '생산공정명', field: 'productionProcessName', minWidth: 120 ,flex: 1,},
        { headerName: '작업장명', field: 'workSiteName', minWidth: 120 ,flex: 1,},
        { headerName: '원재료검사', field: 'inspectionStatus', minWidth: 120 ,flex: 1,},
        { headerName: '제품제작', field: 'productionStatus', minWidth: 120 ,flex: 1,},
        { headerName: '제품검사', field: 'completionStatus', minWidth: 120 ,flex: 1,}
    ];

    const dispatch = useDispatch();

    const state = useSelector((state) => {
      return state.workSite.workSiteList;
    });

    useEffect(() => {
        dispatch(getworkSiteList());
    }, [])

    useEffect(() => {
        setList(state);
        console.log(state);
    }, [state])

    const click1 = (Course) => {
        setWorkOrderNo (selectRows[0]);
        for (let i = 0; i < list.length; i++) {
            if (list[i].workOrderNo === selectRows[0]) {
                setItemClassIfication(list[i].itemClassification);
                setItemCode(list[i].itemCode);
            }
        };
        setWorkSiteCourse(Course);
        setWorkSiteDialog(true);
    }

    const close = () => {
        setWorkSiteDialog(false);
    };

    const serchWorkSiteList = () => {
        dispatch(getworkSiteList());
    };

    return (
        <>
            <MainCard
                content={false}
                title={'제품 작업장'}
                secondary={<Grid item xs={12} sm={6} sx={{textAlign: 'right'}}>
                    <Button variant="contained" color="secondary" onClick={()=>click1('Production')}
                            style={{ marginRight: '1vh', marginTop: '1vh' }}
                    >
                        제품 제작
                    </Button>
                    <Button variant="contained" color="secondary" onClick={()=>click1('SiteExamine')}
                            style={{ marginRight: '1vh', marginTop: '1vh' }}
                    >
                        판매제품 검사
                    </Button>
                </Grid>
                }
            >
                <Box
                sx={{
                height: 500,
                width: '100%',
                background: 'white'
                }}
                >
                <DataGrid
                rows={list}
                columns={column}
                getRowId={(row) => row.workOrderNo}
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

                <MyDialog open={workSiteDialog} close={close} maxWidth={'200px'}>
                    <WorkSiteDialog 
                    workSiteCourse={workSiteCourse}
                    itemClassIfication={itemClassIfication}
                    workOrderNo = {workOrderNo}
                    itemCode = {itemCode}
                    serchWorkSiteList = {()=>{serchWorkSiteList()}}
                    close = {()=>{close()}}
                    />
                </MyDialog>

            </MainCard>
        </>
    );
}

export default WorkSite
