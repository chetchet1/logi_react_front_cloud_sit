import React, { useState } from 'react';
import MainCard from 'ui-component/cards/MainCard';
import Axios from 'axios';
import Swal from 'sweetalert2';
import {Button, Grid, Box} from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';

const WorkOrderStatus = (props) => {
    const [list, setList] = useState([]);
    const [size, setSize] = useState('50vh');
    //const [selectedRows, setSelectedRows] = useState([]);
    const [grid, setGrid] = useState([]);
    const [selectRows, setSelectRows] = useState([]);

    const column = [
            {
                headerName: '작업지시일련번호',
                field: 'workOrderNo',
                minWidth: 150,
                flex: 1,
            },
            {
                headerName: '소요량취합번호',
                field: 'mrpGatheringNo',
                minWidth: 150,
                flex: 1,
            },
            { headerName: '품목분류', field: 'itemClassification' },
            { headerName: '품목코드', field: 'itemCode' },
            {
                headerName: '품목명',
                field: 'itemName',
                minWidth: 150,
                flex: 1,
            },
            { headerName: '단위', field: 'unitOfMrp', minWidth: 100, flex: 1,},
            { headerName: '지시수량', field: 'requiredAmount' , minWidth: 90, flex: 1,},
            { headerName: '생산공정코드', field: 'productionProcessCode' , minWidth: 100, flex: 1,},
            { headerName: '생산공정명', field: 'productionProcessName' , minWidth: 130, flex: 1,},
            { headerName: '작업장코드', field: 'workSiteCode' , minWidth: 100, flex: 1,},
            // { headerName: '작업장명', field: 'workStieName' , flex: 1,},
            {
                headerName: '완료상태',
                field: 'completionStatus',
                minWidth: 50,
                //suppressSizeToFit: true,
                /*cellRenderer: function(params) {
                    if (params.value === 'Y') {
                        return (params.value = '🟢');
                    }
                    return '❌';
                } */
            },
            {
                headerName: '작업완료된수량',
                suppressSizeToFit: true,
                minWidth: 130,
                field: 'actualCompletionAmount',
                editable: true,
                renderCell: function(params) {
                    console.log('오나요');
                    return params.value !== undefined ? `${params.value}` : '📷';
                 }
            }
    ];

    const onCellClicked = params => {
        setGrid(params);
    };

    const completionRegist = async () => {
        try {
            const workOrderNo = selectRows[0]
            const selectedItem = list.find(item => item.workOrderNo === workOrderNo);
            const actualCompletionAmount = selectedItem ? selectedItem.actualCompletionAmount : null;
    
            console.log(workOrderNo);
            console.log(actualCompletionAmount);
    
            await Axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/quality/workorder/completion`, {
                params: {
                    workOrderNo: workOrderNo,
                    actualCompletionAmount: actualCompletionAmount
                }
            })

            Swal.fire({
                icon: 'success',
                title: '작업완료'
            }).then((result) => {
                contractSearch();
            }).catch((err) => {
                
            });
            
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: '작업실패'
            }).then((result) => {
                contractSearch();
            }).catch((err) => {
                
            });
        }

    };

    const contractSearch = () => {
        Axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/quality/workorder/list`)
            .then(response => {
                const responseList = response.data.gridRowJson;
                const conteactList = responseList.filter(obj => obj.operaioncompleted === null);
                setList(conteactList);
                console.log(conteactList);
            })
            .catch(e => {
                Swal.fire('오류', e, 'error');
            });
    };

    return (
        <>
            <MainCard
                content={false}
                title="작업지시현황"
                secondary={<Grid item xs={12} sm={6} sx={{textAlign: 'right'}}>
                    <Button
                        variant="contained"
                        color="secondary"
                        style={{ marginRight: '1vh' }}
                        onClick={contractSearch}
                    >
                        작업지시현황조회
                    </Button>
                    <Button
                        variant="contained"
                        color="secondary"
                        //style={{ marginTop: "1vh" }}
                        onClick={completionRegist}
                    >
                        작업완료등록
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
                            } else {
                                setSelectRows(itm);
                            }
                        }}
                        rowSelectionModel={selectRows}
                        processRowUpdate={(newRow) => {
                            console.log('Process Row Update:', newRow); // 업데이트된 행 로그

                            const updatedList = list.map(item => {
                                if (item.workOrderNo === newRow.workOrderNo) {
                                    return { ...item, ...newRow };
                                }
                                return item;
                            });

                            setList(updatedList);
                            return newRow;
                        }}
                    />
            </Box>
            </MainCard>
        </>
    );
}

export default WorkOrderStatus
