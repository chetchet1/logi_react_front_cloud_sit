import React, { useCallback, useState, useRef } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  List,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from '@mui/material';
import Page from 'ui-component/Page';
import Layout from 'layout';

function DeliveryDetailGrid(props) {
  const list = props.list;
  const [detailGrid, setDetailGrid] = useState();
  const dialogRef = useRef(null);

  const column = [
    { headerName: '수주상세일련번호', field: 'contractDetailNo' },
    { headerName: '수주일련번호', field: 'contractNo', hide: true },
    { headerName: '품목코드', field: 'itemCode', hide: true },
    { headerName: '품목명', field: 'itemName' },
    { headerName: '단위', field: 'unitOfContract' },
    { headerName: '납기일', field: 'dueDateOfContract' },
    { headerName: '수주수량', field: 'estimateAmount' },
    { headerName: '재고사용량', field: 'stockAmountUse' },
    { headerName: '필요제작수량', field: 'productionRequirement' },
    { headerName: '단가', field: 'unitPriceOfContract' },
    { headerName: '합계액', field: 'sumPriceOfContract' },
    { headerName: '처리상태', field: 'processingStatus' },
    { headerName: '작업완료여부', field: 'operationCompletedStatus' },
    { headerName: '납품완료여부', field: 'deliveryCompletionStatus' },
    { headerName: '비고', field: 'description', hide: true },
    { headerName: '상태', field: 'status', hide: true },
    { headerName: '상태2', field: 'beforeStatus', hide: true }
  ];

  const api = useCallback(
    (params) => {
      setDetailGrid(params);
      props.detailApi(params);
    },
    [props]
  );

  const detailClose = () => {
    props.detailClose();
  };
  const onCellClicked = (param) => {
    // setDetailList(param.data.contractDetailTOList);
    // setSelDelivery('select'); //select ??
    // setSize('60vh');
    // deliveryGrid.sizeColumnsToFit();
    // if (deliveryDetailGrid) {
    //   deliveryDetailGrid.setRowData(param.data.contractDetailTOList);
    // }
  };
  return (
    <Page title="수주 상세 조회">
      <Dialog fullWidth={true} maxWidth={'xs'} open={true}>
        <DialogTitle id="simple-dialog-title">수주 상세 조회</DialogTitle>
        <DialogContent>
          <List>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    {column.map((col) => (
                      <TableCell key={col.field}>{col.headerName}</TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {list.map((row) => (
                    <TableRow key={row.contractDetailNo} onClick={() => onCellClicked({ data: row })}>
                      {column.map((col) => (
                        <TableCell key={col.field}>{row[col.field]}</TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </List>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" color="secondary" onClick={detailClose}>
            상세 닫기
          </Button>
        </DialogActions>
      </Dialog>
    </Page>
  );
}
DeliveryDetailGrid.getLayout = function getLayout(Page) {
  return <Layout>{Page}</Layout>;
};
export default DeliveryDetailGrid;
