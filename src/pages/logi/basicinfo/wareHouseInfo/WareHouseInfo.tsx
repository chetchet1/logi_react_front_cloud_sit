import Layout from 'layout';
import { useEffect, useState } from 'react';

import {
  Button,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import Page from 'ui-component/Page';
import MainCard from 'ui-component/cards/MainCard';
import { addWareHouseTO, saveWarehouseList, searchWarehouseList, warehouseDetail } from '../action/LogisticsInfoAction';
import WarehouseDialog from './WareHouseDialog';
import WarehouseDialogInfo from './WareHouseDialogInfo';

function WareHouseInfo() {
  const [addOpenDialog, setAddOpenDialog] = useState(false);
  const dispatch = useDispatch();
  const warehouseList = useSelector((state) => state.logisticsinfo.warehouseList);
  const warehouseDetailList = useSelector((state) => state.logisticsinfo.warehouseDetail);
  const [showWarehouseDetailDialog, setShowWarehouseDetailDialog] = useState(false); // 자재조회 다이얼로그 표시 여부 상태 추가

  const [selected, setSelected] = useState<string[]>([]); // 선택된 아이템의 문자열 배열
  // forceRender 상태를 추가
  const [forceRender, setForceRender] = useState(false);
  const [warehouseCode, setWarehouseCode] = useState({});

  const columns = [
    {
      headerName: '창고 코드',
      field: 'warehouseCode'
    },
    {
      headerName: '창고명',
      field: 'warehouseName',
      editable: true
    },
    {
      headerName: '창고 사용여부',
      field: 'warehouseUseOrNot',
      editable: true,
      cellEditor: 'agSelectCellEditor',
      cellEditorParams: { values: ['Y', 'N'] }
    },
    { headerName: '설명', field: 'description', editable: true },
    { headerName: 'status', field: 'status' }
  ];
  const column = [
    {
      headerName: '창고코드',
      field: 'warehouseCode'
    },
    {
      headerName: '자재코드',
      field: 'itemCode',
      editable: true
    },
    {
      headerName: '자재명',
      field: 'itemName',
      editable: true,
      cellEditor: 'agSelectCellEditor',
      cellEditorParams: { values: ['Y', 'N'] }
    },
    { headerName: '단위', field: 'unitOfStock', editable: true },
    { headerName: '안전재고량', field: 'safetyAllowanceAmount', editable: true },
    { headerName: '가용재고량', field: 'stockAmount', editable: true },
    { headerName: '전체재고량', field: 'totalStockAmount', editable: true }
  ];

  const addClick = () => {
    setAddOpenDialog(true);
  };

  const close = () => {
    setAddOpenDialog(false);
  };

  const handleClick = (event: any, name: any) => {
    console.log('@@@@@name@@@@@@', name);
    const selectedIndex = selected.indexOf(name);
    let newSelected: string[] = [];
    if (selectedIndex === -1) {
      newSelected = [name]; // 선택된 값 하나만 새 배열에 넣음
    }
    setSelected(newSelected);
    setWarehouseCode(name.warehouseCode);
  };

  const searchOnClick = () => {
    console.log('자재조회 클릭!');
    console.log('현재 warehouseCode는??? : ', warehouseCode);
    dispatch(warehouseDetail({ warehouseCode }));
    setShowWarehouseDetailDialog(true); // 자재조회 테이블 표시
  };
  console.log('@@@@@warehouseDetailList@@@@@', warehouseDetailList);

  const onSubmit = (warehouseTo) => {
    // 복사본을 만들어서 새 행을 생성
    const newRows = [...warehouseList, warehouseTo];
    dispatch(addWareHouseTO(warehouseTo)); // Redux를 통해 저장
    // 콘솔에 로그 출력 (새 행 확인)
    console.log('새로운 행:', warehouseTo);
    console.log('전체 데이터:', newRows);
    setAddOpenDialog(false);
  };

  const onSave = () => {
    dispatch(saveWarehouseList(warehouseList));
    setForceRender(!forceRender); // forceRender를 토글하여 리랜더링을 강제로 발생시킴

    return Swal.fire({
      icon: 'success',
      title: '저장 되었습니다'
    });
  };

  const onDelete = () => {
    const selectedData = selected;

    if (selectedData) {
      let newSelected = [];
      selectedData.map((selectedRow) => {
        if (selectedRow.status === 'INSERT') newSelected = newSelected.concat((selectedRow.status = 'DELETE'));
        else newSelected = newSelected.concat((selectedRow.status = 'DELETE'));
      });
      setSelected(newSelected);
      onSave();
    } else {
      Swal.fire({
        icon: 'error',
        title: '창고를 선택해주세요.'
      });
    }
  };

  useEffect(() => {
    dispatch(searchWarehouseList());
  }, [dispatch, forceRender]);

  return (
    <Page title="Collapse Table">
      <MainCard
        title="창고 관리"
        content={false}
        secondary={
          <Grid item xs={12} sm={6} sx={{ textAlign: 'right' }}>
            <Button variant="contained" color="secondary" style={{ marginRight: '1vh' }} onClick={addClick}>
              창고 추가
            </Button>
            <Button variant="contained" color="secondary" style={{ marginRight: '1vh' }} onClick={searchOnClick}>
              자재조회
            </Button>
            <Button variant="contained" color="secondary" style={{ marginRight: '1vh' }} onClick={onDelete}>
              삭제
            </Button>
            <Button variant="contained" color="secondary" onClick={onSave}>
              저장
            </Button>
          </Grid>
        }
      >
        <TableContainer>
          <Table aria-label="창고 관리">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell sx={{ py: 3 }} key={column.headerName} style={{ minWidth: column.minWidth }}>
                    {column.headerName}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {warehouseList &&
                warehouseList.map((list: any, index: number) => {
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
                      {columns.map((column, index) => {
                        const value = list[column.field];
                        return <TableCell key={labelId}>{value || 'No Data'}</TableCell>;
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>

        <WarehouseDialog open={addOpenDialog} close={close}>
          <div>
            <WarehouseDialogInfo onSubmit={onSubmit} />
          </div>
        </WarehouseDialog>
      </MainCard>

      <Dialog open={showWarehouseDetailDialog} onClose={() => setShowWarehouseDetailDialog(false)} sx={{ minWidth: '1000px' }}>
        <DialogTitle>자재 조회</DialogTitle>
        <DialogContent>
          <TableContainer>
            <Table aria-label="자재 조회">
              <TableHead>
                <TableRow>
                  {column.map((col) => (
                    <TableCell sx={{ py: 3 }} key={col.headerName} style={{ minWidth: col.minWidth }}>
                      {col.headerName}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {warehouseDetailList &&
                  warehouseDetailList.map((list: any, index: number) => {
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
                        {column.map((col, index) => {
                          const value = list[col.field];
                          return <TableCell key={labelId}>{value || 'No Data'}</TableCell>;
                        })}
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowWarehouseDetailDialog(false)} color="primary">
            닫기
          </Button>
        </DialogActions>
      </Dialog>

      <WarehouseDialog open={addOpenDialog} close={close}>
        <div>
          <WarehouseDialogInfo onSubmit={onSubmit} />
        </div>
      </WarehouseDialog>
    </Page>
  );
}

WareHouseInfo.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default WareHouseInfo;
